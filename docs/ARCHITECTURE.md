# ARCHITECTURE — The Unspoken

> Kiến trúc mã nguồn sau tái cấu trúc T-002 (08/10/2026).
> Đặc tả nghiệp vụ: `Project.docx` + `Story.txt`. Tóm tắt và các điểm chờ xác nhận: `PROJECT_MEMORY.md`.
> Quy ước code: `docs/CONVENTIONS.md`.

## 1. Tổng quan

```
┌──────────────────────── Trình duyệt ────────────────────────┐
│  React 19 (web shell)              Phaser 4.2.1 (game)      │
│  ─ Router, Auth, Admin   ◄─EventBus─►  scenes / ui / systems│
│  ─ features/*/api  ──Axios + JWT──┐                         │
└───────────────────────────────────┼─────────────────────────┘
                                    ▼  REST /api/**
┌──────────────── Spring Boot 3.4 (Java 17) ──────────────────┐
│ JwtAuthenticationFilter → Controller → Service → Repository │
└───────────────────────────────────┼─────────────────────────┘
                                    ▼  Spring Data JPA
                                 MySQL (db/schema.sql)
```

Client–Server phân rã, Hybrid Layered Architecture (Project.docx §1.1). Luồng 5 bước: §1.2.

## 2. Frontend — `frontend/src`

Ba vùng tách bạch, phụ thuộc **một chiều**:

| Vùng | Thư mục | Được import | KHÔNG được import |
|---|---|---|---|
| Web shell (React) | `app/`, `features/` | `shared/`, `config/`, `game/` (chỉ `createGame`, `EventBus`, hằng số) | — |
| Game (Phaser) | `game/` | `shared/logger`, `config/env` | React, `features/` |
| Dùng chung | `shared/`, `config/` | — | `features/`, `game/` |

Logic thuần (không Phaser, không React) nằm ở `game/systems/` và `game/core/GameSession.js` → unit test bằng Vitest.

```
frontend/
├─ index.html · vite.config.js · eslint.config.js · .prettierrc.json · .env.example
├─ public/assets/
│  ├─ dialogues/chapter-1.json          JSON kịch bản (§3.2) — PENDING(ISS-07) schema
│  ├─ images/{backgrounds,portraits,evidence,ui}/   portraits = chân dung VUÔNG 512×512 (.webp, ô chân dung nhỏ — hiện chưa nạp)
│  ├─ images/characters/               ảnh NỬA THÂN TRÊN nền trong suốt (.webp) — nhân vật đứng trái/phải khi hội thoại
│  └─ audio/{bgm,sfx}/
└─ src/
   ├─ main.jsx                           điểm vào React
   ├─ styles/index.css                   Tailwind
   ├─ config/env.js                      nơi DUY NHẤT đọc import.meta.env
   ├─ app/
   │  ├─ App.jsx                         ErrorBoundary → AuthProvider → Router
   │  ├─ ErrorBoundary.jsx
   │  └─ router/{AppRouter.jsx, ProtectedRoute.jsx, routePaths.js}
   ├─ shared/
   │  ├─ api/endpoints.js                NGUỒN DUY NHẤT đường dẫn API (§4.3)
   │  ├─ api/httpClient.js               Axios + Bearer token + ApiError
   │  ├─ storage/{storage.js, storageKeys.js}   localStorage an toàn
   │  ├─ logger/logger.js                log có namespace, bật/tắt theo env
   │  └─ ui/{AuthCard.jsx, FormField.jsx}
   ├─ features/                          mỗi tính năng: api/ · pages/ · state/ · hooks/ · services/ · components/
   │  ├─ auth/      login/register (username + password, §4.3)
   │  ├─ game/      GamePlayPage, PhaserGame (mount/destroy), useGameBridge, saveService (Hybrid Storage §6.3)
   │  ├─ bug-report/ POST /api/reports/bug
   │  └─ admin/     AdminDashboardPage (Tailwind, §5.1) — PENDING(ISS-10/11/12)
   └─ game/
      ├─ index.js                        createGame(parent) — điểm vào DUY NHẤT của Phaser
      ├─ config/gameConfig.js            1280×720, FIT, danh sách scene
      ├─ constants/{sceneKeys, gameEvents, gameplay}.js
      ├─ core/EventBus.js                cầu nối React ↔ Phaser
      ├─ core/GameSession.js             trạng thái ván chơi: chapter, credibility, notebook
      ├─ core/runtime.js                 session + autosave, lưu trong game.registry
      ├─ data/dialogueData.js            nơi DUY NHẤT biết cấu trúc file JSON hội thoại
      ├─ data/characters.js              nơi DUY NHẤT khai báo nhân vật: ảnh nửa thân, biểu cảm, nhép miệng, bên đứng
      ├─ systems/credibility.js          max(0, c − ΔP) (§3.3)
      ├─ systems/notebook.js             4 tab Evidence/People/Timeline/Statements (§3.2)
      ├─ systems/autosave.js             5 phút + sự kiện quan trọng (§5.2)
      ├─ systems/lipSync.js              dừng miệng ở dấu câu khi chữ đang chạy
      ├─ ui/{DialogueBox, CharacterStage, CredibilityBar, Hotspot, TextButton, theme}.js   CharacterStage = nhân vật nửa thân trái/phải
      ├─ scenes/                          Boot → Preload → MainMenu → Dialogue → RoomInvestigation
      │                                   (+ Notebook overlay, Deduction, BadEnding)
      └─ debug/DebugScene.js             overlay FPS/scene/uy tín — chỉ khi env.debug
```

### Luồng scene
```
Boot ─► Preload (nạp JSON) ─► MainMenu ─New Game─► Dialogue ─hết thoại─► RoomInvestigation
                                  ▲                                     │ N ⇄ Notebook (launch + pause)
                                  └──── BadEnding ◄── uy tín = 0 ───────┘ S = lưu thủ công
```

### Luồng lưu game (§5.2, §6.3)
```
Phaser: runtime.requestSave(reason)  ── lý do: interval 5' | manual (S) | evidence-collected
   └─ EventBus.emit('save:requested', { reason, snapshot })
React: useGameBridge ─► saveService.persistProgress
   ├─ 1. localStorage (luôn luôn)
   └─ 2. POST /api/game/save  ── mất mạng → { remote:false, reason:'offline' }, không crash
```

## 3. Backend — `backend/src/main/java/com/capstone/detectivegame`

**Package-by-feature**; mỗi tính năng giữ đủ tầng Controller → Service → Repository (§1.2).

```
DetectiveGameApplication.java
common/    ApiException · ApiErrorResponse · MessageResponse · GlobalExceptionHandler
security/  SecurityConfig · JwtAuthenticationFilter · JwtTokenProvider · JwtProperties · CorsProperties
user/      User (bảng users) · UserRepository
auth/      AuthController (/api/auth) · AuthService · dto/{RegisterRequest, LoginRequest, JwtResponse}
game/      GameProgressController (/api/game) · GameProgressService · GameSave · GameSaveRepository
           dto/{SaveProgressRequest, SaveProgressResponse, GameProgressResponse}
report/    BugReportController (/api/reports) · BugReportService · BugReport · BugReportStatus · BugReportRepository
           dto/BugReportRequest
evidence/  EvidenceMaster (bảng evidence_master) · EvidenceMasterRepository
```

Tài nguyên:
- `resources/db/schema.sql` — SQL **nguyên văn** §2.1–2.2 (nguồn sự thật của CSDL).
- `resources/application.yml` — `ddl-auto: validate`, JWT, CORS, mức log qua biến môi trường.

| Endpoint (§4.3) | Controller | Quyền (§4.2) |
|---|---|---|
| `POST /api/auth/register` → 201 | AuthController | Permit All |
| `POST /api/auth/login` → 200 | AuthController | Permit All |
| `POST /api/game/save` → 200 | GameProgressController | JWT |
| `GET /api/game/load/{userId}` → 200 | GameProgressController | JWT |
| `POST /api/reports/bug` → 201 | BugReportController | JWT (tạm — ISS-09) |

## 4. Bản đồ yêu cầu → mã nguồn

| REQ | Nơi hiện thực |
|---|---|
| REQ-010..014 (SQL) | `backend/.../db/schema.sql`, entity `User`, `GameSave`, `EvidenceMaster`, `BugReport` |
| REQ-020 MainMenu | `game/scenes/MainMenuScene.js` |
| REQ-021 Dialogue + typewriter | `game/scenes/DialogueScene.js`, `game/ui/DialogueBox.js`, `game/data/dialogueData.js` |
| REQ-022 Point-and-Click | `game/scenes/RoomInvestigationScene.js`, `game/ui/Hotspot.js` |
| REQ-024 Notebook 4 tab | `game/systems/notebook.js`, `game/scenes/NotebookScene.js` |
| REQ-025 Deduction | `game/scenes/DeductionScene.js` (khung — ISS-16) |
| REQ-026/027 Uy tín, Bad Ending | `game/systems/credibility.js`, `game/ui/CredibilityBar.js`, `game/scenes/BadEndingScene.js` |
| REQ-030 Save thủ công/auto | `game/systems/autosave.js`, `game/core/runtime.js` |
| REQ-040/041 Security, JWT | `security/*` |
| REQ-042..046 API | `features/*/api/*`, `shared/api/endpoints.js`; backend `auth/`, `game/`, `report/` |
| REQ-050 Admin | `features/admin/pages/AdminDashboardPage.jsx` (khung — ISS-10/11/12) |
| REQ-064 Hybrid Storage | `features/game/services/saveService.js` |

## 5. Chưa làm (chờ đặc tả)
Tìm `PENDING(ISS-` trong mã nguồn để thấy toàn bộ điểm chờ xác nhận, ví dụ:
```powershell
git grep -n "PENDING(ISS-"
```
