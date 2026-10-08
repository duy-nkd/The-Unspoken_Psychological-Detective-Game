# CONVENTIONS — Quy ước làm việc của nhóm

Mục tiêu: ai mở file nào cũng đoán được nó làm gì, lỗi xảy ra ở đâu, sửa ở chỗ nào.

## 1. Nguyên tắc chung
1. **Một nguồn sự thật** cho mỗi thứ: đường dẫn API (`shared/api/endpoints.js`), scene key (`game/constants/sceneKeys.js`), tên sự kiện (`game/constants/gameEvents.js`), thông số gameplay (`game/constants/gameplay.js`), schema CSDL (`backend/.../db/schema.sql`), biến môi trường (`config/env.js`, `application.yml`). Không viết chuỗi/số cứng trùng lặp.
2. **Không tự thêm đặc tả.** Chỗ nào tài liệu chưa quy định → để comment `PENDING(ISS-xx): ...` (mã ISS trong `PROJECT_MEMORY.md` mục E) và hỏi trước khi điền.
3. **Logic thuần tách khỏi framework.** Công thức, quy tắc game nằm trong `game/systems/` hoặc Service backend — không nằm trong scene/component/controller.
4. **Lỗi đi qua một cửa:** frontend `ApiError` (`shared/api/httpClient.js`), backend `ApiException` → `GlobalExceptionHandler`.

## 2. Đặt tên
| Loại | Quy ước | Ví dụ |
|---|---|---|
| React component, Phaser Scene/GameObject class | PascalCase, file trùng tên | `LoginPage.jsx`, `DialogueBox.js` |
| Hàm, biến, file module JS | camelCase | `saveService.js`, `applyPenalty()` |
| Hằng số / enum object | UPPER_SNAKE_CASE + `Object.freeze` | `SCENE_KEYS`, `AUTOSAVE.INTERVAL_MS` |
| Hook React | `useXxx` | `useAuth`, `useGameBridge` |
| Sự kiện EventBus | `'<miền>:<hành-động>'` | `'save:requested'` |
| Test | đặt cạnh file, đuôi `.test.js` | `credibility.test.js` |
| Java | package theo tính năng, lớp PascalCase, DTO là `record` | `game/dto/SaveProgressRequest` |
| Cột/bảng SQL | snake_case đúng Project.docx §2.1 | `credibility_score` |

## 3. Import
- Frontend dùng alias `@/` = `frontend/src/` cho import khác thư mục; import cùng tính năng dùng đường dẫn tương đối ngắn.
- Chiều phụ thuộc: xem `docs/ARCHITECTURE.md` mục 2. **`game/` không bao giờ import React hoặc `features/`.**

## 4. Thêm mới — checklist
**Scene Phaser mới**
1. Tạo `game/scenes/XxxScene.js` (class kế thừa `Phaser.Scene`, `super(SCENE_KEYS.XXX)`).
2. Thêm key vào `game/constants/sceneKeys.js`.
3. Đăng ký trong `game/config/gameConfig.js`.
4. Listener EventBus đăng ký trong scene → gỡ ở `Phaser.Scenes.Events.SHUTDOWN`.

**Endpoint mới** (chỉ sau khi API Contract được duyệt)
1. Backend: DTO `record` → Service (logic + `ApiException`) → Controller (chỉ ánh xạ HTTP).
2. Thêm path vào `shared/api/endpoints.js` → hàm gọi trong `features/<tính năng>/api/`.
3. Cập nhật `docs/ARCHITECTURE.md` (bảng endpoint) và `PROJECT_MEMORY.md`.

**Asset mới**: đặt trong `public/assets/<loại>/`, nạp trong `PreloadScene.preload()`, dùng qua key.

## 5. Debug nhanh
| Muốn xem | Cách |
|---|---|
| Log chi tiết frontend | `VITE_DEBUG=true` trong `frontend/.env.local` (mặc định bật khi `npm run dev`) |
| Trạng thái game | Console trình duyệt: `__THE_UNSPOKEN__.runtime.session` |
| FPS, scene đang chạy | Debug Overlay góc dưới trái (phím `` ` `` ẩn/hiện) |
| Vị trí hotspot | Bật debug → viền vàng quanh vùng bấm |
| Log backend chi tiết | Biến môi trường `LOG_LEVEL_APP=DEBUG` |
| Câu SQL Hibernate | `LOG_SQL=DEBUG` |
| Entity lệch bảng | Backend báo lỗi ngay khi khởi động (`ddl-auto=validate`) — so với `db/schema.sql` |

## 6. Trước khi commit
```powershell
cd frontend; npm run check      # lint + format:check + test + build
cd ../backend; mvn test
```

## 7. Git
- Nhánh: `main` (ổn định) · `feature/<mô-tả>` · `fix/<mô-tả>`.
- Commit: `<loại>(<phạm vi>): <mô tả>` — loại: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`.
  Ví dụ: `feat(game): thêm Hotspot cho phòng trọ chương 1`.
- Không commit `.env*` (trừ `.env.example`), `node_modules/`, `target/`, `dist/`.
