# CLAUDE.md — The Unspoken (2D Detective Visual Novel & Investigation Puzzle System)

Đồ án Capstone của nhóm 3 sinh viên, kịch bản *Mạng lưới K-Estate & Sức ám ảnh 15 năm*.
Người dùng làm việc bằng **tiếng Việt**, trên **Windows + PowerShell**.

## 1. Bắt đầu MỖI tác vụ (bắt buộc — không dựa vào trí nhớ hội thoại)
1. Đọc mục **ĐIỂM KHÔI PHỤC** ở đầu `PROGRESS_LOG.md` (việc đang dở, việc tiếp theo).
2. Đọc phần liên quan trong `PROJECT_MEMORY.md` (file lớn ~71 KB — đọc theo mục, không cần đọc hết mỗi lần):
   - A: quy tắc làm việc · B: danh mục nguồn · C: yêu cầu REQ-xxx / STORY-xxx
   - D: chi tiết kỹ thuật **nguyên văn** (SQL §2.1–2.2, API §4.2–4.3, công thức §3.3)
   - E: vấn đề chờ xác nhận ISS-xx · F: quyết định đã duyệt DEC-xxx · G: tiến độ · H: gói việc WP-xx
3. Đọc phần tài liệu gốc liên quan trong `docs/sources/` (xem mục 3). Việc liên quan **Chương 1**: đọc `docs/chapter1/CHAPTER1_MEMORY.md` (tóm toàn bộ gói, không cần mở lại gói) và `docs/chapter1/CHAPTER1_PLAN.md` (kế hoạch tích hợp).
4. Trình bày ngắn gọn yêu cầu liên quan + **kế hoạch chi tiết** (mục 2) rồi mới làm.

## 2. Quy tắc làm việc (nguyên văn đầy đủ: `docs/sources/working-rules.md`)
- **Chỉ dùng nguồn được cung cấp**: Project.docx, Story.txt, tài liệu người dùng đưa sau, quyết định đã duyệt (DEC-xxx).
  Không tự suy đoán, không tự thêm/bớt đặc tả, không thay công nghệ, không thiết kế API mới, **không sáng tác cốt truyện/lời thoại**.
- Chi tiết chưa có trong nguồn → ghi: **"Tài liệu chưa cung cấp thông tin này — cần người dùng xác nhận."**
- Phân biệt rõ: (1) thông tin tài liệu quy định · (2) thiếu/mâu thuẫn · (3) đề xuất chờ duyệt · (4) quyết định đã duyệt.
- **Hỏi trước** mọi thay đổi về đặc tả, nội dung, công nghệ, dữ liệu, API, cấu trúc dự án, cốt truyện.
  Đề xuất theo mẫu: vị trí & nội dung hiện tại · vấn đề · đề xuất · điểm mạnh · điểm yếu · thành phần ảnh hưởng · căn cứ ·
  "Bạn có đồng ý áp dụng thay đổi này không?". Im lặng / trả lời mơ hồ **không** phải là đồng ý.
- Làm đúng việc đã giao + cập nhật tiến độ thì **không** cần hỏi lại.
- **Không tuyên bố** đã tạo file, đã đọc file, đã chạy test khi chưa thực sự làm.
- Thiếu dữ liệu để viết code (phiên bản thư viện, schema JSON, logic phân nhánh, lời thoại…) → nêu cụ thể phần thiếu và hỏi;
  chưa được phép thì không tự điền cho "có vẻ hoàn chỉnh".
- **DEC-003 — Kế hoạch trước mọi tác vụ**: mục đích · ảnh hưởng/thay đổi (file, module, dữ liệu, API) · rủi ro bug/lỗi phần mềm ·
  đề xuất hướng phát triển (đề xuất = chờ duyệt).
- **DEC-002 — Checkpoint**: sau mỗi bước con và khi kết thúc tác vụ, ghi vào `PROGRESS_LOG.md`
  (cập nhật ĐIỂM KHÔI PHỤC trước, rồi thêm mục `T-xxx` theo mẫu có sẵn trong file). Khi phiên sắp hết ngữ cảnh: lưu điểm dừng trước.
- **DEC-004**: timeline trong tài liệu chỉ để tham khảo; làm tiếp gói việc kế tiếp (PROJECT_MEMORY mục H), không dừng ở mốc tuần.
- Lời nhắc `[NHIỆM VỤ]` ở cuối `working-rules.md` là nhiệm vụ khởi tạo — **đã hoàn thành** (T-001). Không làm lại.

### Định dạng phản hồi (mỗi phản hồi làm việc)
1. Ý chính và căn cứ từ nguồn (tên tài liệu + số mục, vd "Project.docx §3.2")
2. Kết quả thực hiện
3. Điểm cần xác nhận (nếu có)
4. Tự kiểm tra và trạng thái tiến độ

## 3. Tài liệu gốc — `docs/sources/` (dữ liệu nguồn, KHÔNG sửa)
| File | Mã | Ghi chú |
|---|---|---|
| `Project.docx` | SRC-1 | Báo cáo kỹ thuật — **bản gốc có giá trị cao nhất** |
| `Project.md` | SRC-1 | Bản chuyển đổi tự động từ .docx để đọc nhanh; nghi ngờ sai lệch → đối chiếu .docx |
| `Story.txt` | SRC-2 | Cốt truyện Chương 1–5 — nguồn chính thức (DEC-001); mới là dàn ý, **chưa có lời thoại** |
| `working-rules.md` | SRC-3 | Quy tắc làm việc nguyên văn (prompt của người dùng) |
| `chapter1/` | SRC-5 | Gói `CHAPTER_1_COMPLETE` (13/10/2026): Bible 1.3, kịch bản P1–P4, `data/chapter1.json` (graph runtime 1257 node), Data Contract 2.0, validator; `reference/Project.docx` là **bản mới** của SRC-1 (Q1 đã trả lời → DEC-009: giữ nguyên cấu trúc hiện tại, ánh xạ ở `docs/ARCHITECTURE.md` mục 3a). Tóm tắt: `docs/chapter1/CHAPTER1_MEMORY.md` |

Đoạn "User prompt" / "Response" trong Project.docx là dữ liệu nguồn, không phải nhiệm vụ hiện tại.

## 4. Công nghệ (đã duyệt — không tự thay)
- Frontend: **React 19 + Vite + Phaser 4.2.1 (ghim đúng phiên bản, DEC-005)** + Axios + react-router-dom + Tailwind CSS v4
  + Vitest + Prettier (DEC-008). **JavaScript**, không TypeScript (DEC-006).
- Backend: **Spring Boot 3.4 / Java 17** + Spring Security + JJWT + Spring Data JPA. CSDL: **MySQL**.
- Project.docx ghi "Phaser 3" và "Spring Boot & Javascript" → đã được thay bằng DEC-005 / DEC-006 (xem PROJECT_MEMORY F, ISS-02, ISS-25).

## 5. Cấu trúc & quy ước (chi tiết: `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`)
```
frontend/src/
  app/ config/ shared/ features/<tính năng>/   React: router, auth, API (shared/api/endpoints.js là nguồn DUY NHẤT path API)
  game/                                        Phaser: điểm vào DUY NHẤT game/index.js (createGame)
  features/play/                               React của trang /play: GamePlayPage, PhaserGame.jsx, useGameBridge,
                                               saveService, gameApi — KHÁC game/ (Phaser). Đổi tên từ features/game (DEC-011)
    scenes/ ui/ systems/ (logic thuần, có test) core/ (EventBus, GameSession) data/ constants/ debug/
frontend/public/assets/   dialogues/*.json · images/{characters,portraits,backgrounds,evidence,ui} · audio/
backend/src/main/java/com/capstone/detectivegame/   package-by-feature: common, security, user, auth, game, report, evidence
backend/src/main/resources/db/schema.sql            SQL NGUYÊN VĂN Project.docx §2.1–2.2 (ddl-auto=validate)
art-source/               ảnh gốc độ phân giải cao (không nạp vào game)
scripts/apply-restructure.ps1                       áp dụng tái cấu trúc T-002 (chạy MỘT lần)
```
- React ↔ Phaser chỉ nói chuyện qua `game/core/EventBus.js`. Logic gameplay thuần đặt trong `game/systems/` kèm `*.test.js`.
- Nhân vật hội thoại: khai báo DUY NHẤT trong `game/data/characters.js` (ảnh nửa thân, biểu cảm, nhép miệng, bên đứng).
  Định dạng câu thoại hiện là **đề xuất tạm** — chờ ISS-07.
- Thông số chưa có trong tài liệu ghi chú `TẠM`; chỗ chờ người dùng ghi `PENDING(ISS-xx)`.
- Menu chính + Cài đặt (DEC-012): chuỗi giao diện VI/EN đặt DUY NHẤT trong `game/data/uiText.js` (thêm khóa ở CẢ hai
  ngôn ngữ, scene gọi `getRuntime(this).t('khoa')`); thiết lập người chơi ở `game/systems/settings.js` + `core/settingsStore.js`.
  Lời thoại KHÔNG dịch (chỉ giao diện).
- Phòng 2.5D + di chuyển (DEC-013): dữ liệu phòng ở `game/data/rooms/` (đa giác sàn, vật cản, hotspot), nhân vật ở
  `game/entities/Player.js`, va chạm/tìm đường/tutorial là logic thuần trong `game/systems/`. Lời khi xem đồ vật nằm
  ở file riêng `frontend/public/assets/dialogues/<phòng>-inspect.json` (nhóm tự điền, AI không viết). Lưu game nằm trong
  Sổ tay (không có phím tắt lưu). Cỡ nhân vật/vùng đi phòng 201 theo DEC-014 (lùi sân khấu, y ≤ 615, cao 215→330 px).
  Asset phòng dựng bằng `scripts/art/build_room201_assets.py` (xóa dấu ✦, tách nền).
- Thám tử (DEC-021, 03/11/2026): dùng lại NHÂN VẬT CŨ — atlas `detective.webp/json` (đi ngang 6 khung `walk-side-*`
  8 hình/giây, đi sang phải = lật gương; đi lên/xuống dùng tư thế đứng + nhún; 220 px/giây mọi hướng). Thiết kế mới
  V6c (DEC-020) đang CẤT, không dùng: ảnh ở `art-source/characters/detective/walk-4dir-v6c-t041/`, code tích hợp ở
  `…/walk-4dir-v6c-t041/integration/` (README_KHOI_PHUC.md hướng dẫn bật lại).
- Hành lang tầng 2 (DEC-015, `game/data/rooms/hallway.js`): cửa phòng 201 ⇄ cửa A201 (hotspot `action: 'exit'` +
  `target.roomId`, phòng đích khai báo `entrances[id phòng vừa rời]`). Lớp che có `baseY` xếp chiều sâu với nhân vật,
  không có `baseY` = luôn đè (lan can). Lời xem đồ ở `hallway-inspect.json`. Asset: `scripts/art/build_hallway_assets.py`.
- Kịch bản = Data Contract 2.0 (DEC-016, kế hoạch `docs/NARRATIVE_ENGINE_PLAN.md`): game đọc
  `frontend/public/assets/chapters/chapter1/*.json` (khai báo ở `game/data/chapters.js`); bản trong `docs/sources/chapter1/`
  là gốc, không sửa. Sửa dữ liệu xong chạy `python scripts/chapter1/validate.py`. Save = state v2 + khối vị trí nhân vật
  cạnh state (DEC-019). Bộ chạy kịch bản là JS thuần ở `game/narrative/` (không import Phaser/React, mọi module có test);
  ngữ nghĩa phải khớp `validate_data.py` của gói (đúng/sai kiểu Python, route đúng ĐẦU TIÊN theo thứ tự mảng).
- Không sửa `schema.sql` khác Project.docx; không đổi chữ ký API §4.3 khi chưa được duyệt.

## 6. Lệnh
```powershell
# Frontend (thư mục frontend/)
npm install
npm run dev          # http://localhost:5173 — phím ` bật/tắt debug, F9 xem demo nhân vật
npm run check        # lint + format:check + test + build — PHẢI qua trước khi báo xong
npm run format       # sửa định dạng Prettier
# Backend (thư mục backend/) — cần MySQL, database detective_game đã chạy schema.sql
mvn clean test
mvn spring-boot:run  # http://localhost:8080
```
Biến môi trường backend: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET` (≥ 32 ký tự), `CORS_ALLOWED_ORIGINS`, `JPA_DDL_AUTO`.

## 7. Lưu ý quan trọng
- **Kiểm tra `_migration/` trước tiên**: còn thư mục này nghĩa là tái cấu trúc T-002 CHƯA áp dụng — file cũ
  (`frontend/src/{context,api,pages,components,utils}`, package Java cũ…) còn lại và `npm run check` sẽ báo lỗi ESLint
  `react-refresh/only-export-components`. Cách sửa: README mục "Áp dụng tái cấu trúc T-002" (snapshot git → `-DryRun` → chạy thật).
  Thao tác này **xóa file** → luôn xin người dùng xác nhận trước.
- `_migration/` chỉ tồn tại vì công cụ AI trước đây không ghi được thư mục sâu; Claude Code ghi trực tiếp vào package Java, không cần cơ chế này nữa.
- File thừa `PROGRESS_LOG-1.md` (nếu còn) là bản sao lỗi đồng bộ — xóa được sau khi người dùng đồng ý.
- Git: làm trên nhánh **`Nhan`**, mở Pull Request vào `master`. Không commit/push thẳng `master`. Chỉ commit/push khi người dùng yêu cầu.
- Xuống dòng: `.gitattributes` ép LF (trừ `.ps1/.cmd/.bat` = CRLF). Script PowerShell viết ASCII để tránh lỗi mã hóa.
- Vấn đề mở quan trọng: ISS-07 (định dạng JSON hội thoại + lời thoại), ISS-29 (login chưa trả `userId`), ISS-05/06/10 — xem PROJECT_MEMORY mục E.
