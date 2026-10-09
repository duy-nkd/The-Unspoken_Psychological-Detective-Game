# PROJECT_MEMORY.md — The Unspoken: Psychological Detective Game

> **Đọc file này trước MỌI tác vụ** (kể cả khi tiếp tục sau gián đoạn). Sau đó đọc `PROGRESS_LOG.md` → mục "ĐIỂM KHÔI PHỤC".
> File ghi nhớ **không thay thế** tài liệu gốc. Nếu phát hiện trích xuất sai: báo sai lệch, hỏi người dùng trước khi sửa.

- Phiên bản file: v1.1 — tạo 08/10/2026; cập nhật 08/10/2026 sau T-002 (DEC-005..008, ISS-29, ISS-30)
- Người tạo: AI (Claude), theo yêu cầu người dùng
- Quy ước ký hiệu trạng thái thông tin:
  - **[NGUỒN]** = tài liệu quy định
  - **[THIẾU/MÂU THUẪN]** = thông tin thiếu hoặc mâu thuẫn (xem mục E)
  - **[ĐỀ XUẤT]** = đề xuất đang chờ người dùng duyệt
  - **[ĐÃ DUYỆT]** = quyết định người dùng đã duyệt (xem mục F)
- Câu chuẩn khi thiếu dữ liệu: **"Tài liệu chưa cung cấp thông tin này — cần người dùng xác nhận."**

---

## MỤC LỤC
- A. Quy tắc làm việc
- B. Danh mục nguồn
- C. Danh sách yêu cầu (REQ-xxx kỹ thuật, STORY-xxx cốt truyện)
- D. Chi tiết kỹ thuật phải giữ nguyên (trích nguyên văn)
- E. Nội dung thiếu, mâu thuẫn hoặc cần xác nhận (ISS-xx)
- F. Các quyết định đã duyệt (DEC-xxx)
- G. Tiến độ và kiểm tra + Hiện trạng repo
- H. Lộ trình thực thi theo gói việc **[ĐỀ XUẤT — chờ duyệt]**

---

## A. QUY TẮC LÀM VIỆC

### A1. Quy tắc cốt lõi (nguồn: prompt quy trình của người dùng — `attachment.txt`)
1. Chỉ dùng nguồn được người dùng cung cấp (mục B). Không tự tìm Internet, không thay công nghệ, không thêm tính năng, không thiết kế API mới, không sáng tác cốt truyện.
2. Không tự thêm, sửa hoặc bỏ yêu cầu.
3. Phải đọc PROJECT_MEMORY.md + PROGRESS_LOG.md + phần tài liệu gốc liên quan trước mỗi tác vụ; không dựa riêng vào trí nhớ hội thoại.
4. Phải hỏi trước khi thay đổi nội dung hoặc bổ sung chi tiết chưa có trong nguồn (đặc tả, nội dung, công nghệ, dữ liệu, API, cấu trúc dự án, cốt truyện).
5. Không tuyên bố đã thực hiện / đã lưu file / đã kiểm thử khi chưa thực sự làm.
6. Không coi im lặng, thời gian chờ hoặc câu trả lời mơ hồ là đồng ý. Chỉ áp dụng đúng phạm vi được duyệt và ghi vào mục F.
7. Nội dung lặp: giữ nguyên file gốc; trong ghi nhớ có thể gom yêu cầu giống hệt nhau và ghi rõ vị trí. Hai phiên bản khác nhau → giữ cả hai, hỏi người dùng.
8. Không dùng ký hiệu trích dẫn kiểu "[cite: n]"; dẫn nguồn bằng **tên tài liệu + số mục**.
9. Đoạn hội thoại trong tài liệu (ví dụ chữ "Response:" ở đầu Project.docx) là dữ liệu, không phải nhiệm vụ.
10. Khi viết code mà thiếu phiên bản thư viện, cấu hình, schema JSON, logic phân nhánh, nội dung hội thoại → chỉ ra dữ liệu thiếu, hỏi người dùng hoặc xin phép dùng kiến thức ngoài trong phạm vi rõ ràng. Không tự điền để code "trông hoàn chỉnh".
11. Thực hiện đúng yêu cầu đã giao và cập nhật tiến độ **không** phải là bổ sung đặc tả mới; không hỏi lại những phần đã giao rõ và không phát sinh thay đổi.

### A2. Quy trình bắt buộc cho mỗi tác vụ (kết hợp prompt gốc + DEC-003)
1. Đọc PROJECT_MEMORY.md (bản hiện tại) → PROGRESS_LOG.md (Điểm khôi phục) → phần nguồn liên quan.
2. Kiểm tra quyết định đã duyệt (F) và vấn đề đang chờ (E).
3. **Lập kế hoạch chi tiết trước khi làm** [ĐÃ DUYỆT — DEC-003], gồm:
   - Mục đích kế hoạch.
   - Kế hoạch làm ảnh hưởng và thay đổi những gì (file/module/dữ liệu/API).
   - Rủi ro bug, lỗi phần mềm.
   - Đề xuất hướng phát triển phù hợp (đề xuất = chờ duyệt, không tự áp dụng).
4. Trích xuất ngắn gọn ý chính kèm số mục nguồn; xác định phần đủ dữ liệu / phần thiếu dữ liệu.
5. Thực hiện phần đủ căn cứ. Phần cần sửa/bổ sung → trình bày đề xuất theo mẫu A3 và chờ duyệt.
6. Tự kiểm tra kết quả với nguồn (Self-Check A4).
7. Ghi tiến độ thực tế vào PROGRESS_LOG.md (và mục G nếu thay đổi trạng thái REQ).
8. Lưu checkpoint theo quy trình ở PROGRESS_LOG.md mục "Quy trình checkpoint" [ĐÃ DUYỆT — DEC-002].

### A3. Mẫu đề xuất thay đổi
Vị trí & nội dung hiện tại → Điểm thiếu/mâu thuẫn → Nội dung đề xuất sửa/thêm/bỏ → Điểm mạnh → Điểm yếu/đánh đổi → Thành phần bị ảnh hưởng → Căn cứ trong tài liệu → Câu hỏi: **"Bạn có đồng ý áp dụng thay đổi này không?"**
Nếu tài liệu không đủ căn cứ đánh giá điểm mạnh/yếu → ghi rõ và hỏi có cho phép phân tích bằng kiến thức bên ngoài không.

### A4. Self-Check trước khi trả lời
- Đã đọc PROJECT_MEMORY.md và phần tài liệu liên quan chưa?
- Mỗi thông tin dự án có nguồn hoặc quyết định được duyệt không?
- Có tự suy đoán, dùng kiến thức ngoài hoặc bỏ sót yêu cầu không?
- Tên công nghệ, bảng, trường, lớp, scene, endpoint có đúng không?
- Công thức, thông số, chương game, mốc thời gian, phân công có giữ đúng không?
- Điểm thiếu/mâu thuẫn đã công khai chưa?
- Có thay đổi nào chưa được duyệt không?
- Trạng thái file, triển khai, kiểm thử có phản ánh đúng việc đã làm không?

### A5. Định dạng phản hồi
Tiếng Việt, rõ ràng. Mỗi phản hồi làm việc gồm: (1) Ý chính & căn cứ nguồn, (2) Kết quả thực hiện, (3) Điểm cần xác nhận, (4) Tự kiểm tra & trạng thái tiến độ. Không trình bày suy nghĩ nội bộ.

### A6. Thứ tự chia nhỏ khi nội dung dài (prompt gốc)
1 Tổng quan & kiến trúc → 2 CSDL → 3 Frontend & gameplay → 4 Backend & bảo mật → 5 Dashboard & kiểm thử → 6 Lộ trình, phân công, rủi ro → 7 Đối chiếu tổng thể. Sau mỗi phần: ghi phần đã xong, REQ đã xử lý, điểm còn thiếu, lưu tiến độ; không kết luận toàn dự án hoàn thành.

---

## B. DANH MỤC NGUỒN

| Mã | Tài liệu | Thời điểm nhận / phiên bản | Trạng thái đọc | Ghi chú |
|---|---|---|---|---|
| SRC-1 | **Project.docx** — "Báo cáo kỹ thuật hệ thống: Đồ án tốt nghiệp Capstone Project (Full-stack Technical Master Report)" | Nhận 08/10/2026. Metadata: tác giả "Duy Nguyen", tạo 07/10/2026, sửa 08/10/2026 | **Đã đọc toàn bộ** (98 đoạn, 0 bảng, 0 hình ảnh nhúng). Các mục có trong file: 1.1, 1.2, 2.1, 2.2, 3.2, 3.3, 4.2, 4.3, 5.1, 5.2, 6.1, 6.2, 6.3 | **Không tồn tại** trong file: 3.1, 4.1 (xem ISS-01). Đầu file có chữ "Response:" — dấu vết hội thoại, không phải nhiệm vụ |
| SRC-2 | **Story.txt** (`Story (1).txt`) — cốt truyện: Bối cảnh nhân vật chính + Chương 1–5 | Nhận 08/10/2026 | **Đã đọc toàn bộ** | Nguồn cốt truyện chính thức [ĐÃ DUYỆT — DEC-001] |
| SRC-3 | **attachment.txt** — Prompt quy trình làm việc của người dùng | Nhận 08/10/2026 | **Đã đọc toàn bộ** | Là quy tắc làm việc (mục A), không phải đặc tả sản phẩm. Checklist trong prompt có nhắc "mục 3.1" và "Redux" — không có trong SRC-1 (ISS-01) |
| SRC-4 | Repo `C:\The-Unspoken_Psychological-Detective-Game` (máy người dùng) | Khảo sát 08/10/2026 | Đã đọc: README, .gitignore, package.json (root, frontend), pom.xml, application.yml, data.sql, DetectiveGameApplication.java, toàn bộ frontend/src và public/assets. **Chưa đọc được**: các file Java trong `config/ controller/ dto/ model/ repository/ service/` (giới hạn độ sâu thư mục — ISS-26) | Repo là **hiện trạng code**, KHÔNG phải nguồn đặc tả. Lệch với SRC-1 ghi ở ISS-25 |

**Quyết định của người dùng được xác nhận sau này:** xem mục F.

---

## C. DANH SÁCH YÊU CẦU

Trạng thái: `chưa thực hiện` / `đang thực hiện` / `đã thực hiện` / `cần xác nhận`.
"Hiện trạng repo" chỉ là quan sát; trạng thái chỉ chuyển "đã thực hiện" khi đã đối chiếu tiêu chí và kiểm thử thật.

### C1. Tổng quan & kiến trúc

| Mã | Yêu cầu | Nguồn | Chi tiết phải giữ nguyên | Tiêu chí đối chiếu (từ tài liệu) | Trạng thái |
|---|---|---|---|---|---|
| REQ-001 | Đề tài, kịch bản, quy mô | SRC-1 phần mở đầu | Đề tài **"2D Detective Visual Novel & Investigation Puzzle System"**; kịch bản trọng tâm **"Mạng lưới K-Estate & Sức ám ảnh 15 năm"**; 3 kỳ **Capstone 1, Capstone 2, Capstone 3**; **nhóm 3 sinh viên Kỹ thuật Phần mềm** | Sản phẩm/hồ sơ dùng đúng tên đề tài, kịch bản | đang thực hiện |
| REQ-002 | Kiến trúc Client-Server phân rã (Hybrid Layered Architecture) | SRC-1 §1.1 | Ranh giới tách biệt: Frontend Client (hiển thị/tương tác game trên trình duyệt) ↔ Backend Server (nghiệp vụ trung tâm, lưu trữ CSDL) | Frontend và Backend là 2 khối tách biệt giao tiếp qua RESTful API | đang thực hiện (skeleton) |
| REQ-003 | ReactJS quản lý SPA | SRC-1 §1.1 | Cấu trúc giao diện SPA, **Routing**, quản lý trạng thái xác thực, **Admin Dashboard** | Có routing, auth state, trang Admin | chưa thực hiện |
| REQ-004 | Phaser 3 Engine trên HTML5 Canvas | SRC-1 §1.1 | Render 2D/2.5D, quản lý Scene, Typewriter effect, hệ thống âm thanh; game loop 60 FPS; tận dụng state của React | Game chạy trong canvas, các scene ở §3.2 | cần xác nhận (repo dùng Phaser 4 — ISS-25) |
| REQ-005 | Backend Spring Boot | SRC-1 §1.1, §6.2 | Đóng gói business logic, kiểm tra toàn vẹn dữ liệu, quản lý tiến trình qua RESTful APIs, bảo vệ trước tấn công | API ở §4.3 hoạt động | cần xác nhận (ngôn ngữ — ISS-02) |
| REQ-006 | MySQL | SRC-1 §1.1, §2.2 | Chuẩn ACID, ràng buộc khóa ngoại chặt chẽ; quản lý tài khoản, tiến trình, danh mục chứng cứ, báo cáo lỗi | Schema §2.1 tạo được trên MySQL | chưa thực hiện |
| REQ-007 | Luồng dữ liệu 5 bước | SRC-1 §1.2 | Giữ nguyên thứ tự & nội dung (trích nguyên văn ở D3) | Luồng request thực tế đi qua đúng các thành phần nêu | cần xác nhận (thứ tự bước 2/3 — ISS-03) |

### C2. Cơ sở dữ liệu

| Mã | Yêu cầu | Nguồn | Chi tiết phải giữ nguyên | Tiêu chí đối chiếu | Trạng thái |
|---|---|---|---|---|---|
| REQ-010 | Bảng `users` | SRC-1 §2.1 | SQL nguyên văn D4.1 | Bảng tạo đúng tên trường, kiểu, NOT NULL, UNIQUE, DEFAULT `'ROLE_PLAYER'`, `created_at` | chưa thực hiện |
| REQ-011 | Bảng `game_saves` | SRC-1 §2.1 | SQL nguyên văn D4.2; `save_data_json LONGTEXT NOT NULL`; `fk_game_saves_user` **ON DELETE CASCADE**; `updated_at ... ON UPDATE CURRENT_TIMESTAMP` | Đúng như SQL | chưa thực hiện |
| REQ-012 | Bảng `evidence_master` | SRC-1 §2.1 | SQL nguyên văn D4.3; `evidence_code VARCHAR(50) NOT NULL UNIQUE` | Đúng như SQL | chưa thực hiện |
| REQ-013 | Bảng `bug_reports` | SRC-1 §2.1 | SQL nguyên văn D4.4; `user_id BIGINT` (cho phép NULL); status DEFAULT `'PENDING'`; `fk_bug_reports_user` **ON DELETE SET NULL** | Đúng như SQL | chưa thực hiện |
| REQ-014 | Index | SRC-1 §2.2 | `idx_users_username`, `idx_game_saves_user_id`, `idx_evidence_master_code` (D4.5) | 3 index tồn tại | chưa thực hiện |
| REQ-015 | Trạng thái game serialize JSON | SRC-1 §2.1 (ghi chú kiến trúc) | Toàn bộ trạng thái **Notebook**, danh sách **vật chứng đã nhặt**, **dòng thời gian**, **trạng thái mở khóa lời khai** → 1 chuỗi JSON lưu vào trường "LONGTEXT hoặc JSON"; SQL cụ thể dùng **LONGTEXT** | Lưu/tải được JSON không bị cắt cụt/sai định dạng (§5.2) | cần xác nhận (schema JSON — ISS-06; kiểu — ISS-04) |

### C3. Frontend & gameplay

| Mã | Yêu cầu | Nguồn | Chi tiết phải giữ nguyên | Tiêu chí đối chiếu | Trạng thái |
|---|---|---|---|---|---|
| REQ-020 | MainMenuScene | SRC-1 §3.2 | Sảnh chờ: **New Game**, **Load Game** (tải tiến trình từ CSDL), **bảng điều khiển âm thanh** | Có đủ 3 tùy chọn | đang thực hiện (skeleton chỉ hiển thị tiêu đề) |
| REQ-021 | DialogueScene (Visual Novel Engine) | SRC-1 §3.2 | Khung hội thoại, **tên nhân vật**, **khung chân dung biểu cảm**, **Typewriter** bằng **`time.addEvent`**; dữ liệu nạp **bất đồng bộ** từ JSON kịch bản chuẩn hóa trong **`public/assets/dialogues/`** | Chữ chạy từng ký tự; nạp JSON từ đúng thư mục | đang thực hiện (skeleton); cần xác nhận schema JSON (ISS-07) |
| REQ-022 | RoomInvestigationScene (2.5D Point-and-Click) | SRC-1 §3.2 | Không gian 2.5D, **Background Layer** phối cảnh sâu; điều khiển nhân vật **hoặc** trỏ chuột tương tác **Hotspots** để thu thập vật chứng | Click hotspot → nhận vật chứng | đang thực hiện (skeleton) |
| REQ-023 | Flashback Tương tác (Chương 5) | SRC-1 §3.2; SRC-2 Ch5 | Phím chuyển đổi mượt giữa **Hiện tại** và **Quá khứ** trên **cùng tọa độ canvas**; đối chiếu dấu vết thật với báo cáo giả mạo | Chuyển đổi 2 trạng thái tại cùng vị trí | chưa thực hiện (Capstone 3) |
| REQ-024 | NotebookScene — đúng **4 tab** | SRC-1 §3.2 | **Evidence** (vật phẩm + hình ảnh + mô tả), **People** (lý lịch, quan hệ nghi phạm), **Timeline** (mốc sự kiện để phát hiện lỗ hổng logic), **Statements** (phát biểu cốt lõi của NPC phục vụ đối chất) | Đúng 4 tab, không thêm/bớt | đang thực hiện (skeleton) |
| REQ-025 | DeductionScene & Bàn ráp chứng cứ vật lý | SRC-1 §3.2; SRC-2 Ch5 | Kéo thả (Drag-and-Drop), **phóng to**, **xoay góc**, **so khớp nét khuyên tròn** chữ ký Chủ tịch Khang (các chương trước) với **mảnh chữ ký cháy xém** | Thực hiện được 4 thao tác trên | đang thực hiện (skeleton); cần xác nhận phạm vi Ch1 (ISS-16) |
| REQ-026 | Thanh Uy Tín (Credibility Meter) | SRC-1 §3.3 | Biến nguyên `credibility`, **khởi điểm 100**; công thức **`credibility = max(0, credibility − ΔP)`**; ΔP tùy độ khó, **"thường từ 15 đến 30 điểm"** — không tự gán ΔP cho từng câu; kèm **hội thoại phản bác từ NPC** khi sai | Sai → trừ đúng công thức, không âm | chưa thực hiện; ΔP cụ thể cần xác nhận (ISS-15) |
| REQ-027 | Bad Ending khi uy tín = 0 | SRC-1 §3.3 | `credibility = 0` → **lập tức** màn **Bad Ending ngắn** + tùy chọn **tải lại checkpoint gần nhất** | Về 0 → Bad Ending → reload checkpoint | chưa thực hiện; định nghĩa checkpoint cần xác nhận (ISS-05, ISS-15) |
| REQ-028 | Press (Ép cung) | SRC-1 §3.3 | Tác động vào một dòng lời khai → nghi phạm khai chi tiết mới → **xuất hiện thêm một nhánh statement trong Sổ tay** | Press mở thêm statement | chưa thực hiện |
| REQ-029 | Present (Trình bày bằng chứng) | SRC-1 §3.3 | Mở Sổ tay, chọn **vật chứng hoặc lời khai** tương thích để đối chiếu; **đúng → cốt truyện tiếp diễn; sai → trừ uy tín** | Đúng/sai xử lý đúng | chưa thực hiện |
| REQ-030 | Lưu game thủ công + tự động | SRC-1 §5.2 | User **save thủ công bất kỳ lúc nào**; **auto save mỗi 5 phút** hoặc **sự kiện quan trọng** (ví dụ tìm được bằng chứng) | Có nút lưu; autosave theo 2 điều kiện | chưa thực hiện |

### C4. Backend & bảo mật

| Mã | Yêu cầu | Nguồn | Chi tiết phải giữ nguyên | Tiêu chí đối chiếu | Trạng thái |
|---|---|---|---|---|---|
| REQ-040 | SecurityConfig | SRC-1 §4.2 | **Tắt CSRF** (REST Stateless, không session cookie); **CORS** cho Frontend React; `/api/auth/**` → **Permit All**; `/api/game/**` và `/api/admin/**` → **bắt buộc token hợp lệ** | Gọi không token vào /api/game → bị từ chối | đang thực hiện (file tồn tại, chưa đọc được nội dung — ISS-26) |
| REQ-041 | JwtAuthenticationFilter | SRC-1 §4.2, §1.2 | Kế thừa **`OncePerRequestFilter`**; lấy token từ header **`Authorization`** (`Bearer <token>`); kiểm tra chữ ký bằng **JJWT** với **Secret Key cấu hình trong `application.yml`**; kiểm tra hạn; hợp lệ → tạo **`UsernamePasswordAuthenticationToken`** gán vào **`SecurityContextHolder`** | Token sai/hết hạn bị chặn; đúng thì vào Controller | đang thực hiện (chưa đọc được) |
| REQ-042 | `POST /api/auth/register` | SRC-1 §4.3 | Payload & response nguyên văn D5 | 201 Created | đang thực hiện (chưa đọc được AuthController) |
| REQ-043 | `POST /api/auth/login` | SRC-1 §4.3 | Payload `username` + `password`; response 200 `{token, type:"Bearer", username, role}` | Đúng format | đang thực hiện (chưa đọc được); frontend đang dùng email — ISS-25 |
| REQ-044 | `POST /api/game/save` | SRC-1 §4.3 | Payload `{userId, currentChapter, credibilityScore, saveDataJson}`; 200 `{message:"Game progress saved successfully", updatedAt}` | Đúng format, ghi vào `game_saves` | đang thực hiện; frontend đang gọi `PUT /game-progress` — ISS-25 |
| REQ-045 | `GET /api/game/load/{userId}` | SRC-1 §4.3 | 200: toàn bộ trạng thái hiện tại (chapter, credibility, save_data_json) | Trả đúng bản gần nhất | đang thực hiện; frontend đang gọi `GET /game-progress` — ISS-25 |
| REQ-046 | `POST /api/reports/bug` | SRC-1 §4.3 | Payload `{userId, reportContent}`; 201 Created | Ghi vào `bug_reports` | đang thực hiện; frontend đang gọi `/bug-reports` — ISS-25; quyền truy cập — ISS-09 |
| REQ-047 | Phân tầng Controller → DTO → Service → Repository (Spring Data JPA) | SRC-1 §1.2 | Tên Controller: **AuthController, GameProgressController, BugReportController**; DTO; Service Layer (tính uy tín, xử lý JSON Notebook); Repository Spring Data JPA | Code đúng tầng | đang thực hiện (thư mục & file tồn tại) |

### C5. Admin Dashboard & kiểm thử

| Mã | Yêu cầu | Nguồn | Chi tiết phải giữ nguyên | Tiêu chí đối chiếu | Trạng thái |
|---|---|---|---|---|---|
| REQ-050 | Admin Dashboard | SRC-1 §5.1 | **ReactJS + Tailwind CSS**; dành cho giảng viên & đội vận hành | Trang admin dùng Tailwind | đang thực hiện (AdminDashboard.jsx skeleton, chưa có Tailwind) |
| REQ-051 | Số lượng tài khoản hoạt động | SRC-1 §5.1 | "số lượng tài khoản người dùng hoạt động" | Hiển thị số | cần xác nhận (định nghĩa "hoạt động", API — ISS-10, ISS-11) |
| REQ-052 | Biểu đồ % hoàn thành **Chương 1 → Chương 5** | SRC-1 §5.1 | Tỷ lệ phần trăm người chơi hoàn thành từng chương | Biểu đồ 5 chương | cần xác nhận (cách tính, thư viện — ISS-11, ISS-28) |
| REQ-053 | Danh sách báo cáo lỗi "thời gian thực" | SRC-1 §5.1 | Bảng dữ liệu thời gian thực hiển thị phản hồi lỗi | Báo cáo mới hiện trên bảng | cần xác nhận (công nghệ real-time — ISS-12; không tự chọn) |
| REQ-054 | Chuyển trạng thái **PENDING → RESOLVED** | SRC-1 §5.1 | Thao tác trực tiếp trên giao diện | Trạng thái đổi trong DB | cần xác nhận (API chưa đặc tả — ISS-10) |
| REQ-055 | Kịch bản End-to-End | SRC-1 §5.2 | Khám phá hiện trường, thu thập bằng chứng, bấm "Lưu game" (thủ công / auto 5 phút / sự kiện) → `POST /api/game/save` kèm JWT → Spring Boot xác thực, ghi `game_saves` MySQL → kiểm chứng chuỗi JSON Sổ tay không cắt cụt/sai định dạng → đăng nhập Admin Dashboard kiểm tra số liệu đồng bộ thời gian thực | Chạy đủ chuỗi, có biên bản kết quả thật | chưa thực hiện |

### C6. Lộ trình, phân công, rủi ro

| Mã | Yêu cầu | Nguồn | Chi tiết phải giữ nguyên | Trạng thái |
|---|---|---|---|---|
| REQ-060 | Capstone 1: Core Vertical Slice & Chapter 1 | SRC-1 §6.1 | Nền móng Full-stack; Chương 1 *Án mạng trong phòng trọ* chạy thông suốt Phaser → Spring Boot → MySQL. Mốc: **Simple Demo (Tuần 2)**, **Notebook & Deduction Scene (Tuần 6)**, **Admin Dashboard (Tuần 8)**, **bảo vệ giai đoạn 1 (Tuần 12)** | đang thực hiện |
| REQ-061 | Capstone 2: Content Expansion & Advanced Mechanics | SRC-1 §6.1 | Ch2 *Quán bar & mã MG-07*; Ch3 *Phòng làm việc ông Đạt & trâm gỗ*; Ch4 *Kho lưu trữ & vi phim*; Backend lưu **Complex Deduction Trees**; Dashboard → công cụ **phân tích hành vi người chơi** | chưa thực hiện |
| REQ-062 | Capstone 3: Climax, Polish & Graduation Release | SRC-1 §6.1 | Ch5 *Bằng chứng thép*; Flashback hiện tại/quá khứ; Bàn ráp so khớp chữ ký; **phân nhánh cốt truyện mở (Moral ambiguity) về người em gái**; **BGM/SFX**; **Closed Beta**; fix bug toàn diện; hồ sơ bảo vệ trước Hội đồng Khoa học Khoa CNTT | chưa thực hiện |
| REQ-063 | Phân công 3 thành viên | SRC-1 §6.2 | TV1 Frontend & Game Client (React + Phaser); TV2 Backend & Database (Spring Boot + Java + MySQL); TV3 System Integration & Admin Dashboard (React + Spring Boot Integration) + E2E Testing | — (thông tin tổ chức) |
| REQ-064 | Hybrid Storage + offline | SRC-1 §6.3 (rủi ro 1) | Đồng bộ MySQL qua API **+** tự sao lưu trạng thái mới nhất vào **localStorage**; mất mạng → **tự chuyển offline cục bộ**, không crash, không mất tiến trình | chưa thực hiện; cơ chế đồng bộ ngược — ISS-18 |
| REQ-065 | API Contract + định dạng kịch bản JSON từ tuần đầu C1; Mock Data | SRC-1 §6.3 (rủi ro 2) | Thống nhất path, method, Request/Response JSON, định dạng file kịch bản JSON; Frontend dùng Mock Data để làm song song. **Không tự sáng tác mock có nội dung nghiệp vụ/cốt truyện chưa cung cấp** (SRC-3) | cần xác nhận (ISS-06, ISS-07, ISS-10) |

### C7. Cốt truyện (SRC-2 Story.txt) — nội dung phải giữ nguyên, không tự sáng tác thêm

| Mã | Nội dung | Nguồn | Chi tiết phải giữ nguyên | Trạng thái |
|---|---|---|---|---|
| STORY-000 | Bối cảnh nhân vật chính | SRC-2 "Bối cảnh Nhân vật Chính" | Thám tử tư sống ẩn dật ở **khu trọ xập xệ**, sống bằng theo dõi ngoại tình / tìm đồ thất lạc. Thảm kịch: **bố mẹ và em gái duy nhất** bị sát hại; cảnh sát khép hồ sơ vì thiếu chứng cứ; ký ức về em gái là mỏ neo cảm xúc | chưa thực hiện |
| STORY-100 | **Chương 1 — "Án mạng trong phòng trọ"** | SRC-2 Ch1; SRC-1 §6.1 | • Khu trọ thuộc vùng quy hoạch **K-Estate**. Trên tường: **bài báo phỏng vấn Chủ tịch Khang** (từng là **trắc địa viên nghèo**) — color-text, không nhấn mạnh; **giấy khen chữ ký Khang** tặng quỹ hỗ trợ khu trọ — chi tiết môi trường, không nhấn mạnh.<br>• Nạn nhân **Tùng** (phòng bên) chết gục trên bàn, **cuống họng bị cào nát**. Kết luận cảnh sát: đột nhập trộm cắp → lên cơn hen.<br>• Tùng làm "khảo sát dân cư" giả danh nhân viên tiện ích, thu thập thông tin ai nợ nần / dễ bị ép bán phòng, báo cáo cho đường dây cho vay; được trả bằng xóa nợ + **đồng xu** (thẻ nhận diện nội bộ).<br>• Tùng áy náy, cảnh báo người thuê **đừng ký giấy tờ**.<br>• **Hung thủ: gã bạn thân** của Tùng — mắc nợ cùng đường dây, **con gái bị bắt cóc làm con tin**, bị ép "xử lý" Tùng: **tráo hóa chất vào ống xịt hen** (hóa chất từ công ty vệ sinh công trình do đường dây đứng sau), dàn dựng tai nạn.<br>• Nói dối nhưng vô tội: **ông chủ trọ** (lén trộm vặt), **cô hàng xóm** (lấy cắp đồng hồ).<br>• Nghi phạm thứ ba: **gã lạ mặt** lảng vảng đêm đó — người của **Vũ** đến đòi nợ phòng khác; **thời gian không khớp** → loại trừ.<br>• **Hint ẩn:** đồng xu khắc **hình mốc giới** dưới nệm Tùng = "thẻ nội bộ"; giống hệt **vết máu trên tường nhà thám tử 15 năm trước** | chưa thực hiện |
| STORY-200 | **Chương 2 — "Con hẻm nơi quán bar"** | SRC-2 Ch2; SRC-1 §6.1 | • Nạn nhân **Lâm** — tay buôn tin (thu thập bí mật để bán/tống tiền), chết trong **hẻm sau quán bar ngầm**, dàn dựng như vụ cướp.<br>• Sổ tay Lâm: nhiều manh mối rời rạc; một trang ghi vội **"MG-07"** (nhặt từ người giao hàng nội bộ từng mua chuộc) — **không phải lý do bị giết**.<br>• Người chơi có thể nghi MG-07 (giả thuyết hợp lý) nhưng bằng chứng vật lý — **vết máu bị lau vội ở phòng VIP**, **biên nhận cầm đồ giấu trong lớp lót áo** — cùng timeline dẫn về động cơ thật.<br>• **Hung thủ: chủ quán** — giết Lâm để bảo vệ **con gái đang trốn truy nã** mà Lâm định tống tiền.<br>• **Tay bảo kê** nói dối bảo vệ ông chủ — vô tội với tội giết người.<br>• **Tay buôn tin đối thủ** — có động cơ & cơ hội nhưng bị bằng chứng loại trừ.<br>• **Vũ**: khách quen dùng phòng riêng "nói chuyện làm ăn" — không liên quan vụ án.<br>• **Hint ẩn:** trang "MG-07" + vài dòng phác thảo **khu vực giải tỏa** → hệ thống vận hành diện rộng | chưa thực hiện (Capstone 2) |
| STORY-300 | **Chương 3 — "Phản bội"** | SRC-2 Ch3; SRC-1 §6.1 | • Nạn nhân **ông Đạt** — doanh nhân BĐS, **chết nghẹt trong phòng làm việc khóa kín**; đối tác tài chính đầu của Khang; giúp hợp thức hóa phi vụ thu gom đất 15 năm trước (gồm **đất nhà thám tử**); giữ **hồ sơ bảo hiểm riêng** để phòng thân.<br>• **Người vợ** nói dối đọc sách ở phòng khách (thực tế tắt điện ra gặp nhân tình) → kẽ hở thời gian.<br>• **Hung thủ: gã đối tác làm ăn** — phát hiện ông Đạt định biến mình thành vật tế cho vụ gian lận sổ sách, **siết cổ** trong hoảng loạn.<br>• **Kế toán trưởng** — bị nghi, có **ngoại phạm vững chắc**.<br>• **Vũ** xuất hiện qua **đoạn ghi hình an ninh cũ** gặp riêng ông Đạt vài tuần trước, căng thẳng — không liên quan trực tiếp.<br>• **Hint ẩn:** trong **két sắt**, cùng hồ sơ đất 15 năm trước, có **trâm gỗ** — "bằng chứng đã hoàn thành nhiệm vụ" (đội thực thi nộp vật cá nhân của mục tiêu). Thám tử tự đẽo tặng em gái năm **7 tuổi** → hàm ý **em gái không chết tại chỗ, bị mang đi** | chưa thực hiện (Capstone 2) |
| STORY-400 | **Chương 4 — "Mối đe dọa"** | SRC-2 Ch4; SRC-1 §6.1 | • Nạn nhân **ông Tư** — cựu cảnh sát từng bị "khuyên" ngừng đào lại vụ án 15 năm trước — **chết cháy trong kho lưu trữ**. Giữ **đoạn vi phim** do một cựu **kiểm toán nội bộ K-Estate** (ăn năn, sợ hãi) gửi rồi biến mất.<br>• **Pháp y hiện trường 2.5D**: **hộp sọ bị đập vỡ trước khi lửa cháy** — không phải chập điện.<br>• **Hung thủ: gã thủ thư nhút nhát** — bị ép vì **vợ cần ghép thận**, được hứa ca hiến tạng "thu xếp" từ mạng lưới. Lời khai bản lề: người ra lệnh **không phải Vũ** mà là **"một người mà ngay cả Vũ cũng phải xin phép."**<br>• **Cảnh sát trực ban** ký kết luận "chập điện" quá nhanh — bị nghi nhận hối lộ, thực ra chỉ **lười biếng/áp lực khép hồ sơ** (chủ đề "cả hệ thống dung túng", không thêm phản diện).<br>• **Hint ẩn:** vi phim cháy xém còn **một chữ ký ở góc**, nét bút có **khuyên tròn nhỏ bất thường ở cuối chữ**. Game **không ép** nhận ra ngay; nếu chưa, Ch5 cho cơ hội thứ hai | chưa thực hiện (Capstone 2) |
| STORY-500 | **Chương 5 — "Bằng chứng thép"** | SRC-2 Ch5; SRC-1 §3.2, §6.1 | • **Không có hiện trường án mạng mới.** Theo **tọa độ từ cuộn băng cassette** về nền đất cũ của gia đình; **Flashback Tương tác** Hiện tại/Quá khứ trên cùng không gian 2.5D, đối chiếu dấu vết thật với báo cáo giả mạo.<br>• **Bàn ráp chứng cứ vật lý** (hành động của người chơi, không phải lời kể NPC): đặt cạnh **mảnh chữ ký cháy xém (Ch4)** với chữ ký Khang thu từ Ch1–3 (**giấy khen, ảnh báo, hóa đơn tài trợ**) — phóng to, xoay, so khớp nét khuyên tròn.<br>• Ráp song song: **Mốc giới (Ch1)** + **MG-07 (Ch2)** + **hồ sơ đất + trâm gỗ (Ch3)** + **lời khai "người trên cả Vũ" (Ch4)** + kết quả đối chiếu chữ ký → người chơi tự đưa ra theory buộc tội **Khang**.<br>• Cao trào: Khang xuất hiện cùng **Vũ**; phản ứng của Vũ (sững sờ, tay run) cho thấy hắn cũng không biết toàn bộ. Khang thách thức: chứng minh ông ta **trực tiếp có mặt đêm đó** thì sẽ nói sự thật về em gái. **Cross-Examination cuối cùng**, đối chiếu mâu thuẫn tích lũy 4 chương.<br>• Kết thúc: Khang bị bắt nhờ **báo động ông Tư cài sẵn trước khi chết**. Câu thoại giữ nguyên: **"Con bé không hề bị bắt cóc. Nó lớn lên tin rằng tao đã cứu nó. Đường dây ở Chương 1 — nó có liên quan, nhiều hơn con nghĩ."** Game **không xác nhận** em gái biết bao nhiêu/đồng lõa đến đâu/có chống Khang từ bên trong không — **câu hỏi mở** | chưa thực hiện (Capstone 3) |
| STORY-900 | Chuỗi manh mối xuyên chương (dùng cho thiết kế dữ liệu vật chứng) | SRC-2 Ch1–5 | Ch1: đồng xu mốc giới + giấy khen chữ ký Khang + bài báo "trắc địa viên" → Ch2: MG-07 + phác thảo khu giải tỏa (+ chữ ký Khang dạng ảnh báo/hóa đơn — ISS-22) → Ch3: hồ sơ đất + trâm gỗ (+ chữ ký — ISS-22) → Ch4: vi phim chữ ký cháy xém + lời khai "người trên cả Vũ" → Ch5: bàn ráp + Cross-Examination | chưa thực hiện |

---

## D. CHI TIẾT KỸ THUẬT PHẢI GIỮ NGUYÊN (trích nguyên văn SRC-1)

### D1. Công nghệ [NGUỒN]
- Frontend: **ReactJS** (SPA, Routing, auth state, Admin Dashboard) + **Phaser 3 Engine** (HTML5 Canvas) — §1.1 → **[ĐÃ DUYỆT — DEC-005] dùng Phaser 4.2.1**
- Ngôn ngữ: **[ĐÃ DUYỆT — DEC-006]** frontend JavaScript (không TypeScript); backend Spring Boot (Java 17 — xem ghi chú DEC-006)
- Thư viện bổ sung **[ĐÃ DUYỆT — DEC-008]**: react-router-dom (Routing §1.1), Tailwind CSS (§5.1), Vitest, Prettier
- HTTP client: **Axios** — §1.2 Bước 1
- Backend: **Spring Boot** + "**Javascript**" (§1.1) / "**Java**" (§6.2) → mâu thuẫn ISS-02
- Bảo mật: **Spring Security**, **JwtAuthenticationFilter** (OncePerRequestFilter), thư viện **JJWT**, Secret Key trong **application.yml** — §4.2
- ORM: **Spring Data JPA** — §1.2 Bước 4
- Database: **MySQL** — §1.1
- Admin UI: **ReactJS + Tailwind CSS** — §5.1
- Lưu trữ client: **localStorage** (Hybrid Storage) — §6.3
- **Redux**: chỉ xuất hiện trong prompt SRC-3 ("Axios và Redux theo cấu trúc tài liệu"), **không có trong SRC-1** → ISS-01
- Phiên bản thư viện: **Tài liệu chưa cung cấp thông tin này — cần người dùng xác nhận.** (ISS-28)

### D2. Cấu trúc thư mục, tên lớp, tên scene [NGUỒN]
- Cấu trúc thư mục frontend (mục 3.1): **không có trong Project.docx** — ISS-01. Cấu trúc hiện hành do T-002 dựng theo DEC-007: xem **`docs/ARCHITECTURE.md`**.
- Đường dẫn được nêu: `public/assets/dialogues/` (file JSON kịch bản) — §3.2
- Scene: `MainMenuScene`, `DialogueScene`, `RoomInvestigationScene`, `NotebookScene`, `DeductionScene` — §3.2
- Lớp backend: `AuthController`, `GameProgressController`, `BugReportController` (§1.2); `SecurityConfig`, `JwtAuthenticationFilter` (§4.2); `OncePerRequestFilter`, `UsernamePasswordAuthenticationToken`, `SecurityContextHolder` (§4.2, §1.2); DTO, Service Layer, Repository Layer (§1.2)
- File cấu hình: `application.yml` (§4.2)
- Biến: `credibility` (§3.3)

### D3. Luồng dữ liệu 5 bước — nguyên văn §1.2 (không tự sửa thứ tự)
1. **Bước 1 (Client Request):** Người chơi thực hiện thao tác tương tác trên giao diện Phaser hoặc trang quản trị React (ví dụ: thực hiện đăng nhập, bấm lưu tiến trình chơi, hoặc gửi báo cáo lỗi). Client đóng gói payload thành định dạng JSON và khởi tạo HTTP Request thông qua Axios Client, trong đó bắt buộc đính kèm JWT Token vào Header theo chuẩn `Authorization: Bearer <token>`.
2. **Bước 2 (API Gateway / Spring Controller):** HTTP Request đi đến Spring Boot Server, được tiếp nhận bởi tầng Controller tương ứng (như AuthController, GameProgressController, BugReportController). Controller thực hiện việc ánh xạ dữ liệu request thông qua các lớp DTO (Data Transfer Object).
3. **Bước 3 (Security & JwtAuthenticationFilter):** Trước khi đi vào tầng logic, Spring Security cùng JwtAuthenticationFilter chặn request lại để trích xuất JWT Token từ Header. Bộ lọc thực hiện giải mã, kiểm tra chữ ký số (Secret Key) và thời hạn hiệu lực của token. Nếu hợp lệ, thông tin định danh được nạp vào SecurityContextHolder.
4. **Bước 4 (Service Layer & Repository Layer):** Request tiếp tục được chuyển giao xuống Service Layer để thực thi toàn bộ business logic (ví dụ: tính toán điểm uy tín, xử lý chuỗi JSON của sổ tay Notebook). Sau đó, Service gọi đến Repository Layer (Spring Data JPA) để thực thi các câu lệnh truy vấn cấu trúc SQL xuống cơ sở dữ liệu MySQL.
5. **Bước 5 (Database Response & HTTP Response):** Cơ sở dữ liệu trả kết quả về cho Repository → Service → Controller. Controller đóng gói dữ liệu phản hồi thành định dạng JSON với mã trạng thái HTTP tương ứng (ví dụ: 200 OK, 201 Created, 401 Unauthorized) và gửi trả về cho Client hiển thị lên màn hình giao diện.

> Điểm cần xác nhận: ISS-03 (Bước 2 Controller đứng trước Bước 3 Filter), ISS-09 (Bước 1 nói "bắt buộc đính kèm JWT" kể cả đăng nhập/báo cáo lỗi).

### D4. SQL — nguyên văn §2.1, §2.2

#### D4.1 users
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_PLAYER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### D4.2 game_saves
Ghi chú kiến trúc (nguyên văn ý): để tránh phân rã thành hàng chục bảng quan hệ cho từng vật chứng, lời khai, tab sổ tay (gây suy giảm hiệu năng truy vấn khi game chạy thời gian thực), toàn bộ trạng thái Sổ tay (Notebook), danh sách vật chứng đã nhặt, dòng thời gian và trạng thái mở khóa lời khai được serialize thành chuỗi **JSON** và lưu trực tiếp vào trường kiểu **LONGTEXT hoặc JSON**.
```sql
CREATE TABLE game_saves (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    current_chapter INT NOT NULL DEFAULT 1,
    credibility_score INT NOT NULL DEFAULT 100,
    save_data_json LONGTEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_game_saves_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### D4.3 evidence_master
```sql
CREATE TABLE evidence_master (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT NOT NULL,
    evidence_code VARCHAR(50) NOT NULL UNIQUE,
    evidence_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);
```

#### D4.4 bug_reports
```sql
CREATE TABLE bug_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    report_content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bug_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

#### D4.5 Index (§2.2)
```sql
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_game_saves_user_id ON game_saves(user_id);
CREATE INDEX idx_evidence_master_code ON evidence_master(evidence_code);
```

#### D4.6 Ràng buộc (§2.2)
- `fk_game_saves_user`: game_saves.user_id → users.id **ON DELETE CASCADE**
- `fk_bug_reports_user`: bug_reports.user_id → users.id **ON DELETE SET NULL**
- Mục đích: toàn vẹn tham chiếu theo ACID khi xóa tài khoản hoặc cập nhật tiến trình.
- `evidence_master.chapter_id`: **không có khóa ngoại** trong tài liệu (ISS-19).

#### D4.7 Bảng tóm tắt trường
| Bảng | Trường | Kiểu | Ràng buộc / mặc định |
|---|---|---|---|
| users | id | BIGINT | AUTO_INCREMENT, PRIMARY KEY |
| users | username | VARCHAR(50) | NOT NULL, UNIQUE |
| users | email | VARCHAR(100) | NOT NULL, UNIQUE |
| users | password_hash | VARCHAR(255) | NOT NULL |
| users | role | VARCHAR(20) | NOT NULL, DEFAULT 'ROLE_PLAYER' |
| users | created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| game_saves | id | BIGINT | AUTO_INCREMENT, PRIMARY KEY |
| game_saves | user_id | BIGINT | NOT NULL, FK → users(id) ON DELETE CASCADE |
| game_saves | current_chapter | INT | NOT NULL, DEFAULT 1 |
| game_saves | credibility_score | INT | NOT NULL, DEFAULT 100 |
| game_saves | save_data_json | LONGTEXT | NOT NULL |
| game_saves | updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |
| evidence_master | id | BIGINT | AUTO_INCREMENT, PRIMARY KEY |
| evidence_master | chapter_id | INT | NOT NULL |
| evidence_master | evidence_code | VARCHAR(50) | NOT NULL, UNIQUE |
| evidence_master | evidence_name | VARCHAR(100) | NOT NULL |
| evidence_master | description | TEXT | NOT NULL |
| bug_reports | id | BIGINT | AUTO_INCREMENT, PRIMARY KEY |
| bug_reports | user_id | BIGINT | (nullable), FK → users(id) ON DELETE SET NULL |
| bug_reports | report_content | TEXT | NOT NULL |
| bug_reports | status | VARCHAR(20) | NOT NULL, DEFAULT 'PENDING' |
| bug_reports | created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### D5. REST API — nguyên văn §4.2, §4.3

#### D5.1 Phân quyền đường dẫn (§4.2)
| Pattern | Quyền |
|---|---|
| `/api/auth/**` | Permit All (đăng nhập, đăng ký) |
| `/api/game/**` | Bắt buộc token hợp lệ |
| `/api/admin/**` | Bắt buộc token hợp lệ |
| `/api/reports/**` | **Tài liệu chưa cung cấp thông tin này — cần người dùng xác nhận.** (ISS-09) |

Cấu hình khác: tắt CSRF; CORS cho phép nguồn Frontend React (origin cụ thể: chưa cung cấp — ISS-13).

#### D5.2 Authentication API
| Method | Path | Request payload | Response |
|---|---|---|---|
| POST | `/api/auth/register` | `{"username": "string", "email": "string", "password": "string"}` | **201 Created** kèm thông báo thành công (nội dung body chưa đặc tả — ISS-13) |
| POST | `/api/auth/login` | `{"username": "string", "password": "string"}` | **200 OK**: `{"token": "eyJhbGciOi...", "type": "Bearer", "username": "string", "role": "ROLE_PLAYER"}` |

#### D5.3 Game Progress API
| Method | Path | Request payload | Response |
|---|---|---|---|
| POST | `/api/game/save` | `{"userId": 1, "currentChapter": 2, "credibilityScore": 85, "saveDataJson": "{...}"}` — lưu hoặc cập nhật tiến trình hiện tại | **200 OK**: `{"message": "Game progress saved successfully", "updatedAt": "2026-10-07T..."}` |
| GET | `/api/game/load/{userId}` | — | **200 OK**: toàn bộ cấu trúc trạng thái hiện tại (chapter, credibility, save_data_json) — tên trường JSON chưa đặc tả (ISS-14) |

#### D5.4 Bug Report API
| Method | Path | Request payload | Response |
|---|---|---|---|
| POST | `/api/reports/bug` | `{"userId": 1, "reportContent": "Bug description..."}` | **201 Created**: xác nhận ghi nhận báo cáo |

#### D5.5 Mã trạng thái được nêu
200 OK, 201 Created, 401 Unauthorized (§1.2 Bước 5). Các mã khác: chưa đặc tả (ISS-13).

#### D5.6 API Admin
Đổi trạng thái báo cáo, danh sách báo cáo, thống kê: **Tài liệu chưa cung cấp thông tin này — cần người dùng xác nhận.** (ISS-10)

### D6. Công thức & thông số gameplay (§3.3, §5.2)
| Thông số | Giá trị | Nguồn |
|---|---|---|
| credibility khởi điểm | **100** | §3.3; `credibility_score DEFAULT 100` §2.1 |
| Công thức trừ | `credibility = max(0, credibility − ΔP)` | §3.3 |
| ΔP | tùy độ khó câu hỏi, **thường từ 15 đến 30 điểm** (không tự gán) | §3.3 |
| Khi trừ | kích hoạt hội thoại phản bác từ NPC | §3.3 |
| credibility = 0 | Bad Ending ngắn + tùy chọn tải checkpoint gần nhất | §3.3 |
| Autosave | mỗi **5 phút** hoặc sự kiện quan trọng (vd tìm được bằng chứng) | §5.2 |
| Save thủ công | bất kỳ lúc nào | §5.2 |
| Game loop | 60 FPS (nêu trong lý do chọn Phaser) | §1.1 |

### D7. Lộ trình & phân công gốc (§6.1, §6.2) — mốc đối chiếu, không tự sửa
| Giai đoạn | Nội dung | Mốc |
|---|---|---|
| Capstone 1 (Kỳ 1) — Core Vertical Slice & Chapter 1 | Nền móng Full-stack; Chương 1 chạy thông suốt Phaser → Spring Boot → MySQL | Tuần 2: Simple Demo · Tuần 6: Notebook & Deduction Scene · Tuần 8: Admin Dashboard · Tuần 12: Bảo vệ GĐ1 |
| Capstone 2 (Kỳ 2) — Content Expansion & Advanced Mechanics | Ch2 (Quán bar & MG-07), Ch3 (Phòng làm việc ông Đạt & trâm gỗ), Ch4 (Kho lưu trữ & vi phim); Complex Deduction Trees; Dashboard phân tích hành vi | Chưa có mốc tuần (ISS-17) |
| Capstone 3 (Kỳ 3) — Climax, Polish & Graduation Release | Ch5; Flashback; bàn ráp chữ ký; phân nhánh mở về em gái; BGM/SFX; Closed Beta; fix bug; hồ sơ bảo vệ | Chưa có mốc tuần (ISS-17) |

| Thành viên | Vai trò | Phạm vi |
|---|---|---|
| TV1 | Frontend & Game Client Engineer (React + Phaser) | Web React; Phaser: Visual Novel Engine, điều tra 2.5D, Notebook 4 tab, suy luận, bàn ráp chữ ký |
| TV2 | Backend & Database Architect (Spring Boot + Java + MySQL) | RESTful API, CSDL tối ưu lưu JSON tiến trình, danh mục chứng cứ, JWT |
| TV3 | System Integration & Admin Dashboard Engineer (React + Spring Boot Integration) | Admin Dashboard (thống kê, báo cáo lỗi real-time), chủ trì E2E Testing |

### D8. Rủi ro gốc (§6.3)
1. Mất mạng / API lỗi khi Live Demo → **Hybrid Storage** (MySQL qua API + localStorage), tự chuyển offline, không crash, không mất tiến trình.
2. Lệch tiến độ Game Client ↔ Backend → **API Contract** (path, method, Request/Response JSON) + **định dạng file kịch bản JSON** chốt ngay **tuần đầu Capstone 1**; Frontend dùng **Mock Data**.

---

## E. NỘI DUNG THIẾU, MÂU THUẪN HOẶC CẦN XÁC NHẬN

Trạng thái xử lý: `mở` / `đã hỏi` / `đã giải quyết (DEC-xxx)`.
Mức ưu tiên: **P0** = chặn công việc ngay · P1 = chặn trước mốc kế tiếp · P2 = cần trước Capstone 2/3.

| Mã | Ưu tiên | Vị trí | Nội dung | Ảnh hưởng trực tiếp | Câu hỏi cho người dùng | Trạng thái |
|---|---|---|---|---|---|---|
| ISS-01 | P1 | SRC-1 (đánh số nhảy 2.2→3.2, 3.3→4.2); SRC-3 checklist mục 3 | Thiếu mục **3.1** (cấu trúc thư mục frontend) và **4.1**; prompt nhắc "Redux" nhưng SRC-1 không có | Không đối chiếu được cấu trúc frontend; không biết có dùng Redux hay không (repo đang dùng React Context) | Bạn có bản Project.docx đầy đủ mục 3.1/4.1 không? Có dùng Redux không? | mở |
| ISS-02 | P1 | SRC-1 §1.1 vs §6.2 | §1.1: "Spring Boot & **Javascript**"; §6.2: "Spring Boot + **Java**"; repo: Java 17 | Ngôn ngữ backend | Người dùng trả lời (08/10): "JavaScript cho cả front và back, backend dùng Spring Boot". Spring Boot không viết bằng JavaScript được → AI giữ Java 17. **Xin xác nhận lại: backend = Spring Boot + Java?** | đã hỏi — tạm áp dụng Java (DEC-006) |
| ISS-03 | P2 | SRC-1 §1.2 Bước 2–3 | Bước 2 Controller tiếp nhận trước, Bước 3 Filter "trước khi đi vào tầng logic" chặn request | Mô tả trong báo cáo/sơ đồ; không ảnh hưởng code (Filter luôn chạy trước Controller trong Spring) | Giữ nguyên thứ tự trong tài liệu, hay cho phép đề xuất sửa văn bản báo cáo? | mở |
| ISS-04 | P1 | SRC-1 §2.1 ghi chú vs SQL | "LONGTEXT hoặc JSON" vs SQL dùng LONGTEXT | Kiểu cột `save_data_json` | Giữ **LONGTEXT** theo SQL? | mở |
| ISS-05 | P0 | SRC-1 §2.1, §3.3, §4.3 | `game_saves` không có UNIQUE(user_id): mỗi user 1 bản ghi (save = upsert) hay nhiều bản ghi (lịch sử/checkpoint)? "load gần nhất", "checkpoint gần nhất" chưa định nghĩa | Logic save/load, Bad Ending reload | Mỗi user có 1 hay nhiều bản lưu? "Checkpoint" là gì (bản lưu cuối trên server, localStorage, hay mốc trong chương)? | mở |
| ISS-06 | P0 | SRC-1 §2.1, §6.3 | **Schema của `save_data_json`** (cấu trúc Notebook 4 tab, vật chứng, timeline, statements) chưa có | Chặn Notebook, save/load, E2E | Cung cấp schema, hoặc cho phép tôi đề xuất để bạn duyệt? | mở |
| ISS-07 | P0 | SRC-1 §3.2, §6.3 | **Định dạng JSON kịch bản hội thoại** chưa có; Story.txt chỉ là dàn ý — **chưa có lời thoại** | Chặn DialogueScene thật, nội dung Ch1 | Cung cấp format + lời thoại Ch1, hoặc cho phép đề xuất format (nội dung thoại vẫn do bạn viết/duyệt)? | mở |
| ISS-08 | P1 | SRC-1 §4.3 | Payload save chứa `userId`; load theo `{userId}` — chưa quy định user có được đọc/ghi save của user khác không | Lỗ hổng truy cập chéo (IDOR) | Có yêu cầu kiểm tra `userId` khớp với user trong token không? | mở |
| ISS-09 | P1 | SRC-1 §4.2 vs §4.3, §1.2 B1 | `/api/reports/bug` không nằm trong `/api/auth/**`, `/api/game/**`, `/api/admin/**`; `bug_reports.user_id` nullable gợi ý cho phép ẩn danh; Bước 1 nói "bắt buộc JWT" | Quyền gọi API báo lỗi | Báo lỗi cần đăng nhập hay cho phép ẩn danh? | mở |
| ISS-10 | P0 (trước mốc Dashboard) | SRC-1 §5.1, §4.2 | Chưa đặc tả API admin: danh sách bug, đổi PENDING→RESOLVED, thống kê; chưa có **ROLE_ADMIN** (chỉ có default ROLE_PLAYER); `/api/admin/**` chỉ yêu cầu "token hợp lệ", không yêu cầu vai trò | Chặn Admin Dashboard | Cung cấp API Contract admin + quy tắc phân quyền vai trò, hoặc cho phép đề xuất? | mở |
| ISS-11 | P1 | SRC-1 §5.1 | Định nghĩa "tài khoản hoạt động"; cách tính "% hoàn thành chương" (chỉ có `current_chapter`) | Số liệu Dashboard | Định nghĩa 2 chỉ số này? | mở |
| ISS-12 | P1 | SRC-1 §5.1, §5.2 | "Thời gian thực" nhưng không chỉ định công nghệ (không tự chọn — SRC-3) | Dashboard bug list, E2E bước cuối | Dùng công nghệ gì (hoặc làm mới thủ công/định kỳ)? | mở |
| ISS-13 | P1 | SRC-1 §4.2, §4.3 | Chưa có: body register, mã lỗi (trùng username/email, sai mật khẩu, validate), thời hạn JWT, thuật toán băm mật khẩu, origin CORS | Auth API, test | Cung cấp hoặc cho phép đề xuất? | mở |
| ISS-14 | P1 | SRC-1 §4.3 | Response load liệt kê "chapter, credibility, save_data_json" — tên trường JSON (camelCase như payload save hay snake_case) chưa rõ; response khi chưa có save chưa rõ | Hợp đồng FE–BE | Chốt tên trường & trường hợp chưa có save? | mở |
| ISS-15 | P1 | SRC-1 §3.3 | ΔP từng câu; uy tín tính theo chương hay toàn game; giá trị uy tín sau khi tải checkpoint; nội dung Bad Ending | Gameplay Ch1 | Cung cấp bảng ΔP và quy tắc reset? | mở |
| ISS-16 | P1 | SRC-1 §3.2 vs §6.1 | DeductionScene mô tả là "màn giải đố ở **chương cuối**" (bàn ráp chữ ký là Ch5), nhưng mốc **Tuần 6 Capstone 1** yêu cầu Deduction Scene | Phạm vi Deduction ở Ch1 | Ở Ch1, DeductionScene gồm những gì (bàn ráp chữ ký chỉ có ở Ch5)? | mở |
| ISS-17 | P1 | SRC-1 §6.1 | Nội dung "Simple Demo" Tuần 2 chưa định nghĩa; Capstone 2–3 không có mốc tuần | Tiêu chí hoàn thành mốc | Simple Demo cần những gì? | mở |
| ISS-18 | P1 | SRC-1 §6.3 | Hybrid Storage: chưa quy định đồng bộ ngược khi có mạng lại, xung đột localStorage vs server (bản nào thắng), key lưu | Logic offline | Quy tắc đồng bộ? | mở |
| ISS-19 | P2 | SRC-1 §2.1 | `evidence_master`: chưa có API đọc, chưa có dữ liệu seed, `chapter_id` không FK; repo có `EvidenceController` + frontend gọi `GET /evidence?chapter=` (ngoài tài liệu) | Danh mục vật chứng | Có API đọc evidence không? Dữ liệu vật chứng Ch1 do ai cung cấp? | mở |
| ISS-20 | P2 | SRC-1 §2.2 | `idx_users_username`, `idx_evidence_master_code` trùng với index ngầm của UNIQUE | Không lỗi, chỉ dư index | Giữ nguyên như tài liệu? (mặc định giữ) | mở |
| ISS-21 | P2 | SRC-2 Ch5 | "Tọa độ từ **cuộn băng cassette**" — vật phẩm chưa xuất hiện ở Ch1–4 | Logic cốt truyện Ch5 | Cassette xuất hiện ở đâu? | mở |
| ISS-22 | P2 | SRC-2 Ch4 hint, Ch5 | Chữ ký Khang "rải rác ở Ch2-3 dưới dạng ảnh báo, hóa đơn tài trợ" — phần thân Ch2, Ch3 không mô tả vị trí | Dữ liệu vật chứng Ch2–3 | Vị trí cụ thể các chữ ký trong Ch2, Ch3? | mở |
| ISS-23 | P2 | SRC-1 §6.1 C3 vs SRC-2 Ch5 | SRC-1: "**phân nhánh** cốt truyện mang tính mở về người em gái"; SRC-2: một kết thúc mở duy nhất, game không xác nhận | Có cần nhiều nhánh kết thúc không | "Phân nhánh" là nhiều ending hay một ending mở? | mở |
| ISS-24 | P2 | SRC-2 Ch4, Ch5 | "Pháp y hiện trường 2.5D" (Ch4) và "Cross-Examination cuối cùng" (Ch5) — chưa rõ là cơ chế mới hay dùng RoomInvestigation/Press-Present | Phạm vi cơ chế C2–C3 | Đây là cơ chế riêng hay tái dùng? | mở |
| ISS-25 | P0 | SRC-4 vs SRC-1 | Repo lệch tài liệu: (a) `phaser ^4.2.1` (tài liệu: Phaser 3); (b) root `package.json` cũng khai báo phaser (trùng); (c) `gameApi.js`: `GET /game-progress`, `PUT /game-progress` (tài liệu: `POST /api/game/save`, `GET /api/game/load/{userId}`); (d) `adminApi.js`: `/bug-reports` (tài liệu: `POST /api/reports/bug`); (e) `LoginPage` gửi `email`+`password` (tài liệu: `username`+`password`); (f) `GameProgressContext` credibility khởi tạo **0** (tài liệu: 100); (g) chưa có router, Tailwind; (h) model `EvidenceItem` vs bảng `evidence_master` (chưa đọc được nội dung); (i) `ddl-auto: update` (Hibernate tự sinh bảng — có thể lệch SQL §2.1); (j) `data.sql` trống | Code hiện tại sẽ không khớp backend/tài liệu | Cho phép tôi **căn chỉnh repo theo tài liệu** (a→j) không? Riêng (a): hạ về Phaser 3 hay xác nhận Phaser 4? | **đã giải quyết (DEC-005, DEC-007) bởi T-002**: (a) giữ & ghim 4.2.1; (b) script xóa package.json gốc; (c)(d) API theo §4.3; (e) login username; (f) uy tín 100; (g) thêm router + Tailwind; (h) entity `EvidenceMaster` ↔ `evidence_master`, bỏ `EvidenceController` ngoài tài liệu; (i) `ddl-auto=validate` + `db/schema.sql` nguyên văn; (j) `data.sql` giữ nguyên |
| ISS-26 | P0 | Giới hạn công cụ | Công cụ hiện tại của AI **không đọc/ghi được file nằm sâu > 7 cấp** dưới thư mục đã kết nối → toàn bộ file trong `backend/src/main/java/com/capstone/detectivegame/<pkg>/` | Chặn mọi tác vụ backend Java | Bạn kết nối thêm thư mục `...\backend\src\main\java\com\capstone\detectivegame` cho phiên làm việc (hoặc bật quyền shell trên máy) được không? | **có cách vòng (T-002)**: AI ghi Java vào `_migration/`, người dùng chạy `scripts/apply-restructure.ps1` để chuyển vào package. Vẫn cần giải pháp lâu dài cho các lần sửa Java sau |
| ISS-27 | P1 | SRC-1, SRC-2 | Chưa có tài nguyên hình ảnh (background, chân dung biểu cảm, vật chứng), âm thanh | Scene chỉ chạy được với placeholder | Nguồn asset? Cho phép dùng placeholder hình khối/chữ không? | mở |
| ISS-28 | P1 | SRC-1 | Không quy định phiên bản thư viện, router, thư viện biểu đồ dashboard, công cụ test | Code/cấu hình | Thư viện biểu đồ cho Dashboard dùng gì? | một phần đã giải quyết (DEC-008: router, Tailwind, Vitest, Prettier — phiên bản theo dải `^` trong package.json); còn thư viện biểu đồ |
| ISS-29 | P0 | SRC-1 §4.3 | Response `POST /api/auth/login` chỉ có `{token, type, username, role}` — **không có `userId`**, nhưng `POST /api/game/save` (payload `userId`) và `GET /api/game/load/{userId}` cần userId | Frontend chưa gọi được API save/load → hiện chỉ lưu localStorage | Thêm `userId` vào response login, hay đổi save/load lấy user từ token? | mở (phát hiện ở T-002) |
| ISS-30 | P2 | T-002 | Các giá trị kỹ thuật tạm do AI đặt (tài liệu không quy định): tốc độ typewriter 30ms/ký tự; định dạng JSON lỗi `{status,error,message,path,timestamp}`; mã lỗi 400/401/404/409; băm mật khẩu bằng DelegatingPasswordEncoder (bcrypt) của Spring Security; phím N (sổ tay), S (lưu), \` (debug); `/api/reports/**` tạm yêu cầu JWT | Hành vi game/API | Duyệt hoặc thay các giá trị này? Tất cả được liệt kê tại đây; phần lớn có comment `PENDING(ISS-…)`/"TẠM" ngay trong code | mở |

---

## F. CÁC QUYẾT ĐỊNH ĐÃ DUYỆT

| Mã | Ngày | Thay đổi được duyệt | Nội dung xác nhận của người dùng (tóm tắt trung thực) | Phạm vi áp dụng | Yêu cầu gốc bị ảnh hưởng |
|---|---|---|---|---|---|
| DEC-000 | 08/10/2026 | Áp dụng prompt quy trình (SRC-3) làm quy tắc làm việc | "tuân thủ theo promt tôi cung cấp" | Toàn dự án | Mục A |
| DEC-001 | 08/10/2026 | Story.txt là nguồn chính thức | "dựa vào file được cung cấp bao gồm story.txt và project.docx" | Nội dung cốt truyện, vật chứng, nhân vật | C7 (STORY-xxx) |
| DEC-002 | 08/10/2026 | Tạo file lưu tiến trình sau mỗi công việc được giao, gồm cả lưu điểm kết thúc trước khi chạm ngưỡng limit token | "tôi cần một file để lưu lại tiến trình mỗi khi xong công việc nhất định ... khi hết token bạn cần phải lưu lại điểm kết thúc" | Mọi tác vụ | Mục G; file `PROGRESS_LOG.md` |
| DEC-003 | 08/10/2026 | Trước mọi nhiệm vụ: lập kế hoạch chi tiết gồm mục đích, ảnh hưởng/thay đổi, rủi ro bug/lỗi, đề xuất hướng phát triển | "Trước khi thực hiện bất kỳ nhiệm gì được giao hãy lập một bản kế hoạch chi tiết..." | Mọi tác vụ | Mục A2 |
| DEC-005 | 08/10/2026 21:33 | **Phaser 4.2.1** thay cho "Phaser 3" ghi ở §1.1 | "dùng phaser 4.2.1, react và javascript" | Toàn bộ game client | REQ-004; đóng ISS-25(a) |
| DEC-006 | 08/10/2026 21:33 | Ngôn ngữ: **JavaScript** cho frontend (React, không TypeScript); backend **Spring Boot** | Trả lời: "áp dụng cho cả front và back của dự án, lưu ý: backend dùng Spring Boot. Frontend dùng React". **Ghi chú kỹ thuật:** Spring Boot chỉ chạy trên JVM, không viết bằng JavaScript được → AI giữ **Java 17** cho backend (khớp §6.2 và repo). **Cần người dùng xác nhận lại cách hiểu này** (ISS-02 chuyển "đã hỏi") | Frontend: JS thuần. Backend: Java | REQ-005; ISS-02 |
| DEC-007 | 08/10/2026 21:33 | Tái cấu trúc dự án theo chuẩn studio nhỏ (clean code, dễ debug/sửa/cập nhật), đồng bộ repo theo tài liệu (ISS-25 c–j) | "hãy tối ưu lại cho tôi structure của project theo hướng thật chuyên nghiệp ... đồng bộ lại tài liệu được nạp" | Toàn bộ cấu trúc repo; chi tiết ở `docs/ARCHITECTURE.md` | REQ-002..047 (vị trí code), ISS-25 |
| DEC-008 | 08/10/2026 21:33 | Cho phép thêm thư viện: **react-router-dom**, **Tailwind CSS**, **Vitest**, **Prettier** | Chọn cả 4 trong câu hỏi về thư viện | Frontend | REQ-003 (Routing), REQ-050 (Tailwind); ISS-28 (một phần) |
| DEC-004 | 08/10/2026 | Timeline trong tài liệu chỉ dùng tham khảo; tối ưu lộ trình thực thi để tận dụng hết token trong ngày, không dừng khi xong việc tuần đầu | "Timeline của kế hoạch được dùng để tham khảo, tôi muốn bạn tối ưu lại cả timeline ... không nhất thiết phải dừng lại khi xong việc của tuần đầu tiên" | **Thứ tự & nhịp thực thi công việc của AI**. Các mốc nội dung của §6.1 (Simple Demo, Notebook & Deduction, Dashboard, bảo vệ) vẫn là mốc đối chiếu. Chi tiết lộ trình mới ở mục H = **[ĐỀ XUẤT — chờ duyệt]** | REQ-060..062 (thứ tự thực hiện) |

---

## G. TIẾN ĐỘ VÀ KIỂM TRA

> Nhật ký chi tiết từng tác vụ & điểm khôi phục: xem **PROGRESS_LOG.md**. Mục này chỉ giữ bản tổng hợp.

### G1. Việc đã thực sự hoàn thành
| Ngày | Việc | File tạo/sửa | Kiểm tra đã chạy | Kết quả |
|---|---|---|---|---|
| 08/10/2026 | T-001: Đọc SRC-1, SRC-2, SRC-3; khảo sát repo SRC-4; tạo PROJECT_MEMORY.md + PROGRESS_LOG.md | Tạo mới: `PROJECT_MEMORY.md`, `PROGRESS_LOG.md` (thư mục gốc repo) | Chuyển Project.docx sang text (pandoc) và đối chiếu từng mục; đếm 98 đoạn/0 bảng/0 ảnh (python-docx); đọc lại file sau khi ghi | Xem PROGRESS_LOG T-001 |
| 08/10/2026 | T-002: Tái cấu trúc repo theo chuẩn studio (DEC-005..008) | Frontend `src/` viết lại; backend package-by-feature (qua `_migration/`); `db/schema.sql`; `application.yml`; `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`; `scripts/apply-restructure.ps1`; README, .gitignore, .editorconfig, .gitattributes | Prettier OK; ESLint lõi 0 lỗi; 21/21 unit test (Node + shim Vitest); smoke test Phaser 4.2.1 trong Chromium; `javac` backend 0 lỗi với jar thật của người dùng; JWT test 4/4. **Chưa chạy:** `npm install`/Vitest/Vite build thật, `mvn test`, khởi động Spring + MySQL, script PowerShell | Xem PROGRESS_LOG T-002 |

### G2a. Hiện trạng repo SAU T-002
Cấu trúc chi tiết, luồng dữ liệu và bản đồ REQ → file: **`docs/ARCHITECTURE.md`**. Quy ước: **`docs/CONVENTIONS.md`**.
Lưu ý: file cũ chỉ bị xóa và Java chỉ vào đúng package **sau khi người dùng chạy** `scripts/apply-restructure.ps1` (xem PROGRESS_LOG T-002).

### G2. Hiện trạng repo TRƯỚC T-002 (quan sát 08/10/2026 — lưu để đối chiếu)
- **Frontend** (`frontend/`): Vite + React 19 + Phaser **4.2.1** + Axios. Có `src/api/{axiosClient,authApi,gameApi,adminApi}.js`, `src/context/{AuthContext,GameProgressContext}.jsx`, `src/pages/{LoginPage,RegisterPage,GamePlayPage,AdminDashboard}.jsx`, `src/game/config.js` (1280×720, FIT), `src/game/scenes/{MainMenu,Dialogue,RoomInvestigation,Notebook,Deduction}Scene.js` (skeleton chỉ vẽ chữ), thư mục rỗng `components/common`, `components/layout`, `game/entities`, `game/managers`, `utils`. `public/assets/dialogues/chapter-1.json` = `{chapter:1, title:"Opening", dialogues:[]}`. `App.jsx` chỉ render LoginPage. Axios interceptor gắn `Bearer` từ `localStorage['auth_token']`, xóa token khi 401.
- **Backend** (`backend/`): Spring Boot **3.4.4**, Java **17**, starters web/security/data-jpa, mysql-connector-j, **jjwt 0.12.6**. Package `com.capstone.detectivegame` với `config/{JwtAuthenticationFilter,JwtTokenProvider,SecurityConfig}`, `controller/{Auth,BugReport,Evidence,GameProgress}Controller`, `dto/request/{LoginRequest,SaveProgressRequest}`, `dto/response/{GameProgressResponse,JwtResponse}`, `model/{User,GameSave,EvidenceItem,BugReport}`, `repository/*Repository`, `service/{Auth,BugReport,GameProgress}Service` — **nội dung chưa đọc được** (ISS-26); kích thước file 113–1650 byte → nhiều khả năng là skeleton. `application.yml`: port 8080, DB `detective_game`, `ddl-auto: update`, `app.jwt.secret` + `expiration-ms` 86400000 (giá trị mặc định trong repo, không phải tài liệu). `data.sql` chỉ có comment.
- Root: `.gitignore`, `README.md`, `package.json` (phaser ^4.2.1), `.git`.
- Lệch tài liệu: ISS-25.

### G3. Trạng thái tổng hợp REQ (sau T-002)
- Đã thực hiện (đủ kiểm thử thật end-to-end): 0
- Đang thực hiện — **đã có code theo tài liệu, chưa kiểm thử tích hợp**: REQ-002, 003, 004 (Phaser 4.2.1), 010–014 (schema.sql + entity), 020, 021, 024, 026, 030, 040–047, 064 (phần localStorage)
- Đang thực hiện — khung chờ dữ liệu/đặc tả: REQ-022 (hotspot, asset), 025 (ISS-16), 027 (checkpoint ISS-05), 028/029 (Press/Present chưa có dữ liệu thẩm vấn), 050 (ISS-10)
- Cần xác nhận: REQ-005 (ISS-02), 007, 015 (ISS-06), 051–054, 065
- Chưa thực hiện: REQ-023, 055, 061, 062, STORY-xxx (nội dung chương)

### G4. Bước tiếp theo
Xem PROGRESS_LOG.md → "ĐIỂM KHÔI PHỤC" và mục H.

---

## H. LỘ TRÌNH THỰC THI THEO GÓI VIỆC — [ĐỀ XUẤT — chờ duyệt] (theo DEC-004)

### H1. Nguyên tắc
1. **Không chia theo tuần.** Công việc chia thành **gói việc (WP)** có điều kiện đầu vào/đầu ra rõ ràng. Mỗi ngày làm liên tục các WP **không bị chặn** theo thứ tự ưu tiên cho tới khi gần hết token; xong WP thì sang WP kế tiếp, kể cả WP thuộc "tuần" sau trong §6.1.
2. Mốc §6.1 (Simple Demo → Notebook & Deduction → Admin Dashboard → bảo vệ GĐ1 → Capstone 2 → Capstone 3) giữ nguyên **thứ tự và nội dung**, chỉ bỏ ràng buộc lịch tuần cho phần việc của AI.
3. WP bị chặn bởi ISS (chưa có dữ liệu) → **bỏ qua, làm WP khác không bị chặn**, ghi lý do vào PROGRESS_LOG; không tự điền dữ liệu.
4. Mỗi WP chia thành bước con ≤ ~30–45 phút làm việc; **sau mỗi bước con lưu checkpoint** vào PROGRESS_LOG (để nếu bị ngắt do hết token vẫn tiếp tục được).
5. Mỗi WP bắt đầu bằng **Kế hoạch chi tiết (DEC-003)** và kết thúc bằng **Self-Check (A4)** + cập nhật mục G.
6. Song song hóa theo §6.3: backend và frontend làm xen kẽ nhờ API Contract + mock **chỉ chứa dữ liệu kỹ thuật** (không bịa cốt truyện).

### H2. Danh sách gói việc
Ký hiệu cỡ: S (≈1 phiên ngắn), M (≈2–3 phiên), L (≥4 phiên). "Chặn bởi" = ISS cần trả lời trước.

| WP | Nội dung | REQ | Chặn bởi | Cỡ | Đầu ra / tiêu chí xong | Mốc §6.1 |
|---|---|---|---|---|---|---|
| WP-00 | Khởi tạo bộ nhớ & nhật ký | — | — | S | PROJECT_MEMORY.md, PROGRESS_LOG.md | — ✅ (xem G1) |
| WP-01 | **Chốt quyết định P0**: ISS-02, 05, 06, 07, 10, 25, 26 | — | Người dùng trả lời | S | Ghi DEC mới vào F | Tuần đầu C1 (§6.3) |
| WP-02 | **API Contract v1** (văn bản): giữ nguyên 5 endpoint §4.3 + phần bổ sung được duyệt (admin, lỗi, tên trường) | REQ-042..046, 065 | ISS-08,09,10,13,14 | S | `docs/API_CONTRACT.md` được duyệt | Tuần đầu C1 |
| WP-03 | **Schema JSON v1**: `save_data_json` + kịch bản hội thoại | REQ-015, 021, 065 | ISS-06, 07 | S | `docs/SAVE_SCHEMA.md`, `docs/DIALOGUE_SCHEMA.md` được duyệt | Tuần đầu C1 |
| WP-04 | Backend DB: `schema.sql` đúng nguyên văn §2.1–2.2; Entity khớp bảng; xem xét `ddl-auto` | REQ-010..014 | ISS-25(h,i), 26 | M | Bảng tạo đúng trên MySQL; test repository | Simple Demo |
| WP-05 | Backend Auth: register/login, JwtAuthenticationFilter, SecurityConfig đúng §4.2 | REQ-040..043, 047 | ISS-13, 26 | M | Test: 201 register; 200 login đúng body; 401 khi thiếu token vào /api/game | Simple Demo |
| WP-06 | Backend Game Progress + Bug Report API | REQ-044..046 | ISS-05, 08, 09, 14, 26 | M | Test save/load/bug theo contract | Simple Demo |
| WP-07 | Frontend nền: Routing (Login/Register/GamePlay/Admin), AuthContext, căn API client theo contract, login bằng username; nhúng Phaser vào React an toàn | REQ-003, 004 | ISS-25(a,c,d,e,g), 28 | M | `npm run build` + `npm run lint` pass; đăng nhập thật với backend | Simple Demo |
| WP-08 | MainMenuScene (New/Load/Âm thanh) + DialogueScene (typewriter `time.addEvent`, nạp JSON async) + RoomInvestigationScene (background + hotspot thu vật chứng) | REQ-020..022 | ISS-07, 27 | L | Chơi được luồng: menu → thoại → điều tra → nhặt vật chứng | **Simple Demo** |
| WP-09 | Save/Load thủ công + autosave 5 phút/sự kiện + Hybrid Storage localStorage/offline | REQ-030, 064 | ISS-05, 18 | M | Rút mạng không crash, không mất tiến trình | Simple Demo → Tuần 6 |
| WP-10 | NotebookScene 4 tab | REQ-024 | ISS-06 | M | Đúng 4 tab, dữ liệu từ save JSON | **Tuần 6** |
| WP-11 | Credibility + Press/Present + Bad Ending/checkpoint | REQ-026..029 | ISS-15 | M | Công thức max(0, c−ΔP) có unit test; về 0 → Bad Ending → reload | **Tuần 6** |
| WP-12 | DeductionScene (phạm vi Ch1) | REQ-025 | ISS-16 | M | Theo định nghĩa được duyệt | **Tuần 6** |
| WP-13 | Admin Dashboard (Tailwind): số tài khoản hoạt động, biểu đồ Ch1–5, bảng bug, PENDING→RESOLVED; API admin | REQ-050..054 | ISS-10, 11, 12, 28 | L | Thao tác thật trên DB | **Tuần 8** |
| WP-14 | Nội dung Chương 1 (dữ liệu hội thoại, vật chứng, timeline, lời khai) — chỉ nhập liệu từ nội dung người dùng cung cấp | STORY-100 | ISS-07, 15, 27 | L | Ch1 chạy thông suốt Phaser → Spring Boot → MySQL | C1 tổng thể |
| WP-15 | E2E theo §5.2 + biên bản kết quả thật | REQ-055 | WP-06,09,13 | M | Biên bản test có log thực | Tuần 8–12 |
| WP-16 | Rà soát & hồ sơ bảo vệ GĐ1 (đối chiếu tổng thể REQ) | REQ-060 | — | M | Bảng đối chiếu REQ ↔ code ↔ test | **Tuần 12** |
| WP-17 | C2: Complex Deduction Trees (backend) + Dashboard phân tích hành vi | REQ-061 | Cần đặc tả mới | L | — | Capstone 2 |
| WP-18 | C2: Chương 2, 3, 4 (nội dung + cơ chế "pháp y 2.5D") | STORY-200..400 | ISS-22, 24 | L | — | Capstone 2 |
| WP-19 | C3: Ch5, Flashback, bàn ráp chữ ký, phân nhánh mở, BGM/SFX, Closed Beta, fix bug, hồ sơ | REQ-023, 062, STORY-500 | ISS-21, 23, 24, 27 | L | — | Capstone 3 |

### H3. Thứ tự chạy trong ngày (tối ưu dùng hết token)
1. Đầu ngày: đọc PROJECT_MEMORY → PROGRESS_LOG (điểm khôi phục) → tiếp tục bước con dở dang.
2. Chọn WP **không bị chặn** có ưu tiên cao nhất theo chuỗi: WP-01 → 02/03 → 04 → 05 → 06 ∥ 07 → 08 → 09 → 10 → 11 → 12 → 13 → 14 → 15 → 16 → 17… (∥ = làm xen kẽ).
3. Nếu WP hiện tại bị chặn → gửi câu hỏi cho người dùng **một lần**, chuyển sang WP không bị chặn kế tiếp.
4. Sau mỗi bước con: checkpoint. Sau mỗi WP: Self-Check + cập nhật G + PROGRESS_LOG.
5. Khi nhận thấy ngân sách token còn thấp (xem quy tắc ở PROGRESS_LOG) → dừng mở việc mới, ghi điểm khôi phục chi tiết.

### H4a. Cập nhật sau T-002 (08/10/2026)
- Phần khung của WP-04, 05, 06, 07, 08, 09 (localStorage), 10, 11 (công thức + Bad Ending) đã có code theo tài liệu — xem PROGRESS_LOG T-002 và `docs/ARCHITECTURE.md` mục 4.
- Thứ tự tiếp theo: (1) người dùng chạy `scripts/apply-restructure.ps1` + `npm run check` + `mvn test`; (2) trả lời ISS-29 (userId), ISS-05, ISS-06, ISS-07; (3) WP-02/03 API Contract + schema JSON; (4) WP-13 Admin (ISS-10).

### H4. Hiện trạng chặn (08/10/2026, trước T-002)
Hầu hết WP code đang bị chặn bởi **ISS-26** (không ghi được file Java) và các ISS P0 (02, 05, 06, 07, 10, 25). Việc làm được ngay khi chưa có trả lời: chỉ các WP văn bản (WP-02, WP-03 ở dạng **bản nháp đề xuất chờ duyệt**) — chỉ làm khi người dùng cho phép đề xuất.
