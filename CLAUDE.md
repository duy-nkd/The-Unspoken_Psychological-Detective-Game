# CLAUDE.md — The Unspoken (2D Detective Visual Novel & Investigation Puzzle System)

Đồ án Capstone của nhóm 3 sinh viên, kịch bản *Mạng lưới K-Estate & Sức ám ảnh 15 năm*.
Người dùng làm việc bằng **tiếng Việt**, trên **Windows + PowerShell**.

## 1. Bắt đầu MỖI tác vụ (bắt buộc — không dựa vào trí nhớ hội thoại)
1. Đọc mục **ĐIỂM KHÔI PHỤC** ở đầu `PROGRESS_LOG.md` (việc đang dở, việc tiếp theo).
2. Đọc phần liên quan trong `PROJECT_MEMORY.md` (file lớn ~71 KB — đọc theo mục, không cần đọc hết mỗi lần):
   - A: quy tắc làm việc · B: danh mục nguồn · C: yêu cầu REQ-xxx / STORY-xxx
   - D: chi tiết kỹ thuật **nguyên văn** (SQL §2.1–2.2, API §4.2–4.3, công thức §3.3)
   - E: vấn đề chờ xác nhận ISS-xx · F: quyết định đã duyệt DEC-xxx · G: tiến độ · H: gói việc WP-xx
3. Đọc phần tài liệu gốc liên quan trong `docs/sources/` (xem mục 3).
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
