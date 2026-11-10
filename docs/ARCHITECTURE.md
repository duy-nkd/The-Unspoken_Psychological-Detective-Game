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
│  ├─ fonts/                           3 font menu (OFL) + README cách thêm file (DEC-012)
│  └─ audio/{bgm,sfx}/
└─ src/
   ├─ main.jsx                           điểm vào React
   ├─ styles/index.css                   Tailwind + @font-face font menu (DEC-012)
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
   │  ├─ play/      GamePlayPage, PhaserGame (mount/destroy), useGameBridge, saveService (Hybrid Storage §6.3) — DEC-011
   │  ├─ bug-report/ POST /api/reports/bug
   │  └─ admin/     AdminDashboardPage (Tailwind, §5.1) — PENDING(ISS-10/11/12)
   └─ game/
      ├─ index.js                        createGame(parent) — điểm vào DUY NHẤT của Phaser
      ├─ config/gameConfig.js            1280×720, FIT, danh sách scene
      ├─ constants/{sceneKeys, gameEvents, gameplay}.js
      ├─ core/EventBus.js                cầu nối React ↔ Phaser
      ├─ core/GameSession.js             trạng thái ván chơi: chapter, credibility, notebook
      ├─ core/runtime.js                 session + autosave + settings + t() (chuỗi giao diện), lưu trong game.registry
      ├─ core/settingsStore.js           đọc/ghi thiết lập localStorage 'theUnspoken.settings.v1' (DEC-012)
      ├─ core/fonts.js                   chờ font menu tải xong trước khi vẽ chữ
      ├─ data/dialogueData.js            nơi DUY NHẤT biết cấu trúc file JSON hội thoại
      ├─ data/characters.js              nơi DUY NHẤT khai báo nhân vật: ảnh nửa thân, biểu cảm, nhép miệng, bên đứng
      ├─ data/uiText.js                  chuỗi GIAO DIỆN tiếng Việt / English (không chứa lời thoại) — DEC-012
      ├─ data/rooms/{index,room201,hallway}.js   dữ liệu phòng 2.5D: ảnh nền, đa giác sàn đi được, vật cản,
      │                                  lớp che (baseY = xếp theo chiều sâu), điểm tương tác (hotspot + điểm đứng),
      │                                  cửa nối phòng (target/entrances), phối cảnh — DEC-013/014/015
      ├─ data/rooms/inspectContent.js    đọc lời khi xem đồ vật từ public/assets/dialogues/<phòng>-inspect.json
      ├─ entities/Player.js              thám tử đi trong phòng: phím/chuột, hoạt ảnh, co giãn theo độ sâu — DEC-013
      ├─ systems/credibility.js          max(0, c − ΔP) (§3.3)
      ├─ systems/notebook.js             4 tab Evidence/People/Timeline/Statements (§3.2)
      ├─ systems/autosave.js             5 phút + sự kiện quan trọng (§5.2)
      ├─ systems/lipSync.js              dừng miệng ở dấu câu khi chữ đang chạy
      ├─ systems/settings.js             thiết lập người chơi: mặc định, chuẩn hóa, quy đổi (âm lượng, tốc độ chữ, cỡ chữ)
      ├─ systems/i18n.js                 translate(lang, key, params) — thiếu khóa rơi về tiếng Việt
      ├─ systems/menuNavigation.js       ↑ ↓ trong menu, bỏ qua mục bị khóa
      ├─ systems/walkArea.js             va chạm đa giác (không xuyên tường/đồ), trượt dọc tường, chia bước nhỏ
      ├─ systems/pathfinding.js          A* trên lưới 16 px cho bấm-chuột-để-đi + làm mượt đường
      ├─ systems/depthScale.js           phối cảnh: chiều cao/tốc độ/bàn chân theo y chân
      ├─ systems/facing.js               hướng nhìn -> hoạt ảnh (đi ngang 6 hình, đứng 4 hướng)
      ├─ systems/tutorial.js             máy trạng thái tutorial phòng 201 (lưu trong GameSession)
      ├─ ui/{DialogueBox, CharacterStage, CredibilityBar, Hotspot, TextButton, theme}.js   CharacterStage = nhân vật nửa thân trái/phải
      ├─ ui/{MenuItem, IconButton, PanelButton, SegmentedControl, Slider, Toggle, ConfirmDialog}.js   thành phần menu/cài đặt (DEC-012)
      ├─ ui/MenuBackdrop.js              cảnh nền menu vẽ bằng code — TẠM tới khi có ảnh nền (ISS-27)
      ├─ ui/RoomWidgets.js               nhãn "E", bảng hướng dẫn, vòng sáng, viền đồ vật, thông báo ngắn
      ├─ scenes/                          Boot → Preload → MainMenu → Dialogue → RoomInvestigation
      │                                   (+ Settings overlay từ MainMenu, Notebook overlay, Deduction, BadEnding)
      └─ debug/DebugScene.js             overlay FPS/scene/uy tín — chỉ khi env.debug
```

### Luồng scene

```
Boot ─► Preload ─► MainMenu ⇄ Settings
                      │ Ván mới
                      ▼
                 RoomInvestigation (tutorial phòng 201)
                      │ ra cửa hoặc bỏ qua tutorial
                      ▼
                 StoryScene (runner Data Contract 2.0)
                      ├─⇄ RoomInvestigation (hành lang và phòng 204)
                      ├─⇄ Notebook (Lời khai, Lịch sử trò chuyện, lưu)
                      ├── Suy luận, Bad Ending và tải checkpoint theo graph
                      └── Tiêu đề Chương 2 ─► CH2_ENTRY
```

`StoryScene` hiển thị nút hiện tại. Các lựa chọn hợp lệ và giao dịch kịch bản do `game/narrative/storyRunner.js` xử lý.
Điểm bấm và điểm đứng nằm trong `game/data/rooms/room204.js`. Hotspot chọn nhánh qua `game/data/storyMap.js`.

### Thiết lập & ngôn ngữ (DEC-012)
```
SettingsScene (bản nháp) ─Lưu─► runtime.settings.set() ─► localStorage 'theUnspoken.settings.v1'
                                   └─ EventBus 'settings:changed' ─► game/index.js: sound.volume/mute
                                                                  └─► MainMenu vẽ lại (ngôn ngữ mới)
DialogueScene đọc thiết lập khi vào: tốc độ chữ · cỡ chữ · tự động chuyển thoại
React useGameBridge ─ 'save:availability' { hasSave } ─► runtime.saveAvailable ─► MainMenu (mờ "Tiếp tục", hỏi trước khi ghi đè)
```

### Luồng lưu game (§5.2, §6.3)
```
Phaser: runtime.requestSave(reason)  ── định kỳ 5 phút | nút Lưu trong Sổ tay | vật chứng | đổi phase/checkpoint
   └─ EventBus.emit('save:requested', { reason, snapshot })
React: useGameBridge ─► saveService.persistProgress
   ├─ 1. localStorage theo tài khoản (state v2, tutorial, vị trí khi đi lại)
   └─ 2. POST /api/game/save khi đã có userId (ISS-29)
Tiếp tục điều tra ─► useGameBridge đọc bản lưu cục bộ ─► runner mở lại current_node
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

## 3a. Ánh xạ với Project.docx bản mới §3.1 / §4.1 (DEC-009)

Project.docx bản mới (`docs/sources/chapter1/reference/Project.docx`) mô tả cấu trúc thư mục khác. Theo **DEC-009 (13/10/2026)** dự án **giữ cấu trúc hiện tại**; bảng dưới cho biết mỗi thành phần trong tài liệu nằm ở đâu.

| Project.docx §3.1 (frontend) | Cấu trúc hiện tại |
|---|---|
| `src/api/` (authApi, gameApi, adminApi) | `shared/api/{httpClient, endpoints}.js` + `features/<tính năng>/api/` |
| `src/components/` | `shared/ui/` + `features/<tính năng>/components/` |
| `src/pages/` (Login, Register, GamePlay, AdminDashboard) | `features/<tính năng>/pages/` |
| `src/redux/slices/` (session, user, game progress cache) | **Không dùng Redux**: React Context `features/auth/state/` + `game/core/GameSession.js` + `shared/storage/` |
| `src/App.jsx` | `app/App.jsx` + `app/router/` |
| `src/game/config.js` | `game/config/gameConfig.js` |
| `src/game/scenes/` | `game/scenes/` (giữ nguyên tên 5 scene §3.2) |
| `src/game/entities/` (Player, Hotspots, NPC) | `game/ui/` (Hotspot, DialogueBox, CharacterStage…) |
| `src/game/managers/` (Dialogue, Investigation, Sound) | `game/core/`, `game/systems/`, `game/data/` |
| `public/assets/{images,audio,dialogues}` | Giữ nguyên |

| Project.docx §4.1 (backend, theo tầng) | Cấu trúc hiện tại (theo tính năng) |
|---|---|
| `config/` (SecurityConfig, JwtTokenProvider, JwtAuthenticationFilter, CorsConfig) | `security/` |
| `controller/` (Auth, GameProgress, Evidence, BugReport) | `auth/`, `game/`, `report/` (EvidenceController chưa có: §4.3 chưa đặc tả endpoint vật chứng) |
| `dto/` (request/, response/) | `<tính năng>/dto/` |
| `model/` (User, GameSave, EvidenceItem, BugReport) | `user/User`, `game/GameSave`, `evidence/EvidenceMaster`, `report/BugReport` |
| `repository/` | `<tính năng>/…Repository` |
| `service/` | `<tính năng>/…Service` |

Tên lớp, endpoint §4.3 và luồng Controller → Service → Repository (§1.2) không đổi; chỉ cách nhóm thư mục khác.

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
| REQ-064 Hybrid Storage | `features/play/services/saveService.js` |

## 5. Chưa làm (chờ đặc tả)
Tìm `PENDING(ISS-` trong mã nguồn để thấy toàn bộ điểm chờ xác nhận, ví dụ:
```powershell
git grep -n "PENDING(ISS-"
```
