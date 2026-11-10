# KẾ HOẠCH DỰ ÁN — The Unspoken (cập nhật 27/10/2026, T-025)

> Trạng thái: mục 1 là **hiện trạng đã kiểm tra trên máy** (27/10, commit `b744ce7` trên `master`). Mục 2–2b là **[ĐỀ XUẤT — chờ duyệt]** (thứ tự, cách chia việc); việc nào đụng đặc tả/cốt truyện/API/dữ liệu lưu vẫn phải hỏi trước khi làm.
> Mục 3 (Menu & Cài đặt, T-019/T-020) giữ lại làm lịch sử — **ĐÃ CHỐT DEC-012**.
> Căn cứ: Project.docx (§3.2, §3.3, §4.2–4.3, §5.1–5.2, §6.1–6.3), Story.txt, gói Chương 1 (`docs/chapter1/CHAPTER1_MEMORY.md`, `CHAPTER1_PLAN.md`), PROJECT_MEMORY (DEC-000..015, ISS-xx), PROGRESS_LOG đến T-024.
> Mốc tuần (§6.1) chỉ để tham khảo (DEC-004). Ước tính lịch nếu coi Tuần 1 bắt đầu 07/10/2026 (ngày tạo khung repo): Tuần 6 ≈ 11–17/11 · Tuần 8 ≈ 25/11–01/12 · Tuần 12 ≈ 23–29/12 — **cần nhóm xác nhận ngày bắt đầu thật**.

---

## 1. Hiện trạng (kiểm tra 27/10/2026)

| Khu vực | Đã có, chạy được | Còn thiếu / ghi chú |
|---|---|---|
| Nền full-stack | React 19 + Vite + Phaser 4.2.1, router, AuthContext; Spring Boot: register/login JWT, `/api/game/save`, `/api/game/load/{userId}`, `/api/reports/bug`, SecurityConfig, MySQL schema §2.1 (T-009..T-011 chạy thật) | Login không trả `userId` (ISS-29) → lưu server chưa dùng được; backend mới có 1 test (`JwtTokenProviderTest`) |
| Menu & Cài đặt | Menu chính (Ván mới / Tiếp tục / Cài đặt / nút loa), Cài đặt 2 tab, VI/EN giao diện (DEC-012) | "Tiếp tục điều tra" chỉ phát sự kiện, chưa tải được (ISS-05/29); thiếu font Playfair Display + Be Vietnam Pro |
| Phòng 201 | Nền thật, đi phím/chuột, A*, không xuyên tường, phối cảnh DEC-014, tutorial 4 bước, 5 điểm xem, lưu trong Sổ tay (DEC-013/014) | Lời xem đồ vật trống; thiếu ảnh đi lên/xuống (Q-R5), WC (Q-R7), intro |
| Hành lang tầng 2 | Nền thật, vùng đi chữ U, lan can/chậu cây che đúng chiều sâu, cửa 201 ⇄ A201, 5 điểm xem (DEC-015) | A204 → phòng 204, cầu thang, giấy khen, lưu vị trí phòng — chờ xác nhận |
| Hội thoại | DialogueBox (typewriter, nhép miệng), CharacterStage nửa thân (Hòa 3 biểu cảm) | Đang dùng định dạng tạm + `chapter-1.json` demo; **chưa nối gói Chương 1** (Q3, Q4) |
| Sổ tay / Uy tín / Bad Ending / Deduction | Khung: Notebook 4 tab (cấu trúc cũ), `credibility` max(0, c−ΔP) có test, BadEndingScene, DeductionScene khung | Chưa có Press/Present, Final Deduction 8 ô, checkpoint thật — nằm trong WP-C2/C5/C6/C7 |
| Chương 1 (gói SRC-5) | Dữ liệu 1257 node, Data Contract 2.0, validator PASS — lưu ở `docs/sources/chapter1/` | **Chưa tích hợp** — chờ Q3 (định dạng chính thức), Q4 (duyệt văn bản P2–P4), Q5 (asset) |
| Admin Dashboard | Trang khung 3 ô | Chưa có API admin, ROLE_ADMIN, định nghĩa chỉ số, công nghệ "thời gian thực" (ISS-10/11/12) |
| Asset | Nền room201, hallway; thám tử (atlas đi ngang + đứng 4 hướng); Hòa 3 biểu cảm | Phòng 204, NPC Linh/Hào/Minh/Cảnh sát, ảnh 12 vật chứng, âm thanh (`audio/bgm`, `audio/sfx` trống). `characters/main1–3.png` (937×1678, 5,2 MB, từ 09/10) chưa được code nào dùng |
| Kiểm thử | 20 file test frontend / 110 ca (bộ chạy thay thế của AI); ESLint của dự án sạch trên máy | **`npm run check` thật chưa chạy cho T-020 → T-024**; `mvn test` chưa chạy lại; chưa có E2E |
| Repo / bảo mật | `master` = `origin/master` = `b744ce7` | ⚠ `b744ce7` đưa lên `application.yml` có **mật khẩu MySQL ghi cứng** làm giá trị mặc định; commit đẩy thẳng `master` (quy ước: nhánh + PR); `frontend/package-lock.json` bị đổi do khác phiên bản npm; file thừa ở gốc (`package-lock.json` rỗng, `node_modules/` 114 MB); `frontend/index.html` xuống dòng CRLF làm Prettier báo lỗi |

## 2. Lộ trình triển khai (đề xuất thứ tự)

| Giai đoạn | Mục tiêu | Gồm việc (mục 2a) | Bị chặn bởi | Mốc §6.1 |
|---|---|---|---|---|
| **0 — Ổn định repo** (ngay) | Repo sạch, an toàn, kiểm tra xanh trước khi làm tiếp | TD-01..TD-07 | Không (chỉ cần người dùng thao tác) | — |
| **1 — Chốt quyết định** (song song GĐ 0) | Gỡ chặn tích hợp Chương 1 | TD-08..TD-15 | Người dùng trả lời | Tuần đầu C1 (§6.3) |
| **2 — Bộ chạy kịch bản (engine)** | Chạy được graph `chapter1.json` bằng JS thuần, test vàng khớp validator | TD-16..TD-18 (WP-C1, C2) | Q3 | Nền cho Tuần 6 |
| **3 — Phase 1 chơi được** | Mở 201 lúc 21:35 → hành lang → hỏi Hòa/Linh/Hào/Minh → cảnh sát tới | TD-19..TD-21 (WP-C3) | Q3; ảnh NPC (dùng placeholder có nhãn nếu Q5 cho phép) | Simple Demo / Tuần 6 |
| **4 — Phase 2–4 + Final** | Khám 204, Press/Present + Sổ tay state v2, Final Deduction, P4, Bad Ending, dừng CH2_ENTRY | TD-22..TD-27 (WP-C4..C7) | Q4; nền phòng 204 | **Tuần 6** (Notebook & Deduction) |
| **5 — Lưu/tải thật** | Save = state v2, Load Game, autosave, offline, server | TD-28..TD-31 (WP-C8) | ISS-29, ISS-05, ISS-18 | REQ-030, REQ-064 |
| **6 — Admin Dashboard** | 3 chỉ số §5.1 thao tác trên DB thật | TD-32..TD-35 | ISS-10, 11, 12 | **Tuần 8** |
| **7 — Kiểm thử & hồ sơ GĐ1** | E2E §5.2 có biên bản, playtest 12 mục, đối chiếu REQ | TD-36..TD-40 | GĐ 4–6 | **Tuần 12** |
| 8 — Capstone 2/3 | Ch2–5, Complex Deduction Trees, Flashback, bàn ráp chữ ký, BGM/SFX, Closed Beta | WP-17..WP-19 (PROJECT_MEMORY H2) | Nội dung + đặc tả mới | C2, C3 |

Giai đoạn 2 **không cần asset** nên làm được ngay khi Q3 được chốt; giai đoạn 3 dùng lại phòng 201 + hành lang đã có.

## 2a. Bảng việc cần làm (TODO)

> **Bảng sống từ 03/11/2026: `docs/TODO.md`** (có thêm TD-46…TD-63, trạng thái và cột chốt thứ tự). Bảng dưới đây là bản chụp ngày 27/10, giữ để đối chiếu.

Ưu tiên: **P0** chặn mọi thứ / rủi ro bảo mật · **P1** cần cho Capstone 1 · **P2** nên có · **P3** sau. Cỡ: S ≈ 1 phiên ngắn · M ≈ 2–3 phiên · L ≥ 4 phiên.
"Ai": **Bạn** = người dùng/nhóm (quyết định, asset, nội dung, thao tác trên máy) · **AI** = Claude làm code/tài liệu sau khi được giao.

### 2a.1 Giai đoạn 0 — Ổn định repo

| # | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Xong khi |
|---|---|---|---|---|---|---|
| TD-01 | Đổi mật khẩu MySQL `root` (đã lộ trong `b744ce7`), cập nhật biến môi trường `DB_PASSWORD` | Bạn | **P0** | S | — | Mật khẩu cũ hết hiệu lực |
| TD-02 | Trả `application.yml` về `${DB_PASSWORD:}` (không giá trị mặc định), commit qua nhánh + PR | AI soạn / Bạn đẩy | **P0** | S | — | Không còn mật khẩu trong file đang theo dõi |
| TD-03 | Chạy `cd frontend; npm run check` và `cd backend; mvn clean test` trên máy, gửi log lỗi (nếu có) | Bạn | **P0** | S | — | Cả hai xanh (AI sửa lỗi phát sinh) |
| TD-04 | Sửa xuống dòng `frontend/index.html` (`npx prettier --write index.html`) | AI / Bạn | P1 | S | — | `format:check` không còn cảnh báo |
| TD-05 | Xóa `package-lock.json` rỗng + `node_modules/` ở thư mục gốc; `git rm package-lock.json` | Bạn đồng ý → AI | P2 | S | Bạn đồng ý xóa | Gốc repo không còn file thừa |
| TD-06 | Thống nhất phiên bản Node/npm cả nhóm để `package-lock.json` không đổi qua lại (đề xuất ghi trong README) | Bạn chốt | P2 | S | Bạn chốt phiên bản | `npm install` không làm đổi lock |
| TD-07 | Quy trình git: mỗi việc một nhánh (`Nhan`…), PR vào `master`; không đẩy thẳng `master` | Nhóm | P1 | — | — | Lịch sử chỉ có merge PR |

### 2a.2 Giai đoạn 1 — Quyết định cần chốt

| # | Câu hỏi | Mở khóa | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| TD-08 | **Q3** — Dùng Data Contract 2.0 + `chapter1.json` làm định dạng kịch bản chính thức (đóng ISS-07, bỏ định dạng tạm)? | GĐ 2–4 | **P0** | Nếu đồng ý thì ISS-06 (schema save = state v2), ISS-15 (−15/−20), ISS-16 (Final 8 ô) cũng được giải theo gói |
| TD-09 | **Q4** — Văn bản Phase 2/3/Final/4 trong gói được đưa vào game nguyên văn? | GĐ 4 | **P0** | Chưa duyệt thì chỉ tích hợp Phase 1 |
| TD-10 | **Q5** — Asset: gửi nền phòng 204 + sprite Linh/Hào/Minh/Cảnh sát + ảnh 12 vật chứng, hay cho phép placeholder có nhãn trong lúc chờ? | GĐ 3–4 | P1 | `main1–3.png` có phải chân dung thám tử không? |
| TD-11 | **ISS-29** — Cách lấy `userId` khi login chỉ trả `{token,type,username,role}` (đụng API §4.3) | GĐ 5 | P1 | AI sẽ đề xuất các phương án theo mẫu khi tới bước này |
| TD-12 | **ISS-05** — Mỗi user 1 bản lưu (ghi đè) hay nhiều bản (lịch sử/checkpoint)? | GĐ 5 | P1 | |
| TD-13 | **ISS-10/11/12** — API admin, ROLE_ADMIN, định nghĩa "tài khoản hoạt động" & "% hoàn thành chương", công nghệ "thời gian thực" | GĐ 6 | P1 (trước Tuần 8) | |
| TD-14 | **T-024** — A204 → phòng 204? cầu thang đi đâu? giấy khen đặt ở đâu? lưu vị trí phòng vào file lưu? điểm xem bảng Nội quy/Thông báo? | GĐ 3–5 | P1 | Lưu vị trí phòng = đổi dữ liệu lưu → cần duyệt |
| TD-15 | Ngày bắt đầu Tuần 1 của Capstone 1 + ai trong nhóm nhận giai đoạn nào (TV1/TV2/TV3, §6.2) | Lịch | P2 | Để chia việc song song frontend/backend/admin |

### 2a.3 Giai đoạn 2–4 — Tích hợp Chương 1 (chi tiết: `docs/chapter1/CHAPTER1_PLAN.md`)

| # | Việc | WP | Ai | Ưu tiên | Cỡ | Chặn bởi | Xong khi |
|---|---|---|---|---|---|---|---|
| TD-16 | Nhập 5 file dữ liệu vào `public/assets/chapters/chapter1/` + kiểm SHA-256 theo MANIFEST + đưa validator vào repo | C1 | AI | P1 | S | TD-08 | Validator PASS trên bản trong repo |
| TD-17 | Narrative engine thuần `game/narrative/` (expr, statePath, effects, storyRunner, crossExam, deduction, checkpoints, saveMigration) | C2 | AI | P1 | L | TD-08 | Test đơn vị từng module xanh |
| TD-18 | Test vàng: port 2 lượt chơi trọn chương + ca chấm điểm của `validate_data.py` sang Vitest | C2 | AI | P1 | M | TD-17 | Kết quả từng bước khớp bản Python |
| TD-19 | Bảng ánh xạ speaker/expression → sprite (`speakers.js`), DialogueBox 4 kiểu node, ChoiceMenu | C3 | AI | P1 | M | TD-17 | Hiển thị đúng dialogue/narration/action/ui + lựa chọn |
| TD-20 | Nối phòng 201 + hành lang với node Phase 1 (bắt đầu 21:35, nhìn 204 từ bậu cửa, HUB hỏi NPC) | C3 | AI | P1 | M | TD-19, TD-14 | Chơi trọn Phase 1, đủ 4 lời khai, cảnh sát tới |
| TD-21 | Placeholder có nhãn cho NPC chưa có ảnh (nếu Q5 cho phép) | C3/C9 | AI | P2 | S | TD-10 | Không lẫn placeholder vào bản nộp |
| TD-22 | Phòng 204: dữ liệu phòng 2.5D + 9 hotspot + InspectModal; nút "Trở ra hỏi chuyện" khi đủ 5 core | C4 | AI (+ Bạn gửi nền) | P1 | L | TD-09, nền 204 | 5 core nhiều thứ tự → P3 |
| TD-23 | Overlay đối chất Press/Present + PresentPicker; trừ −15 đúng một lần, blocked miễn phạt | C5 | AI | P1 | M | TD-17 | Double click không trừ 2 lần |
| TD-24 | NotebookScene 4 tab đọc state v2 (nguồn, phase thu, revision, Unknown) | C5 | AI | P1 | M | TD-17 | Đúng 4 tab REQ-024, không hồi tố |
| TD-25 | Final Deduction 8 ô + tái dựng RECON_01–06 | C6 | AI | P1 | M | TD-17, TD-09 | Thiếu 0 / sai −20 / đúng → P4 |
| TD-26 | Phase 4 + fallback xu/khảo sát/giấy khen; Bad Ending → load checkpoint thật; title Chương 2 → dừng CH2_ENTRY | C7 | AI | P1 | M | TD-25 | Đi hết chương không crash |
| TD-27 | Điền lời xem đồ vật `room201-inspect.json`, `hallway-inspect.json` | — | Bạn | P2 | S | — | Không còn "[Chờ nội dung]" |

### 2a.4 Giai đoạn 5 — Lưu/tải

| # | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Xong khi |
|---|---|---|---|---|---|---|
| TD-28 | Save = snapshot state v2 vào localStorage + `POST /api/game/save` (`saveDataJson`) | AI | P1 | M | TD-17, TD-11 | JSON lưu/tải không cắt cụt (§5.2) |
| TD-29 | "Tiếp tục điều tra" tải thật, resume đúng node (không phát lại effect) | AI | P1 | M | TD-28, TD-12 | Tải ở REPORT/RECOVER/RECON đúng |
| TD-30 | Autosave 5 phút + sự kiện (collect_evidence, save_checkpoint) — DEC-010 | AI | P1 | S | TD-28 | Có test |
| TD-31 | Hybrid Storage/offline (REQ-064): mất mạng không crash, đồng bộ lại | AI | P2 | M | ISS-18 | Rút mạng vẫn chơi, không mất tiến trình |

### 2a.5 Giai đoạn 6 — Admin Dashboard (Tuần 8)

| # | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Xong khi |
|---|---|---|---|---|---|---|
| TD-32 | API Contract admin (văn bản) + ROLE_ADMIN | AI soạn / Bạn duyệt | P1 | S | TD-13 | Được duyệt |
| TD-33 | Backend: thống kê tài khoản hoạt động, % hoàn thành Ch1–5, danh sách bug, PENDING → RESOLVED | AI (TV2) | P1 | M | TD-32 | Test controller/service |
| TD-34 | Frontend Admin (Tailwind): 3 khối §5.1 + biểu đồ (thư viện cần chốt — ISS-28) | AI (TV3) | P1 | M | TD-33 | Thao tác thật trên DB |
| TD-35 | Seed `evidence_master` 12 dòng Ch1 từ `evidence.json` (WP-H) | AI | P3 | S | TD-16 | Đúng schema §2.1 |

### 2a.6 Giai đoạn 7 — Kiểm thử & hồ sơ

| # | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Xong khi |
|---|---|---|---|---|---|---|
| TD-36 | Playwright tự đi 2 lượt chơi Chương 1 trong trình duyệt | AI | P1 | M | GĐ 4 | Chạy xanh |
| TD-37 | E2E §5.2: lưu → JWT → MySQL → kiểm JSON → Admin thấy số liệu; biên bản có log thật | AI + Bạn | P1 | M | GĐ 5–6 | Biên bản ký |
| TD-38 | Playtest tay 12 mục `PLAYTEST_CHECKLIST.md` + font tiếng Việt + kích thước hộp thoại | Bạn | P1 | M | GĐ 4 | Checklist đủ |
| TD-39 | Cập nhật trạng thái REQ trong PROJECT_MEMORY mục C (nhiều dòng còn ghi trạng thái từ 08/10) + bảng đối chiếu REQ ↔ code ↔ test | AI | P2 | M | — | Bảng đối chiếu cho hồ sơ |
| TD-40 | Thêm test backend (Auth/GameProgress/BugReport controller + repository) | AI | P2 | M | — | `mvn test` có test cho 5 endpoint §4.3 |

### 2a.7 Việc nhỏ / chờ asset (làm khi có)

| # | Việc | Ai | Ưu tiên | Chặn bởi |
|---|---|---|---|---|
| TD-41 | Ảnh đi lên/xuống của thám tử → bỏ "nhún" tạm (Q-R5) | Bạn gửi → AI | P2 | Asset |
| TD-42 | WC trong phòng 201 (Q-R7), intro trước phòng 201 | Bạn gửi → AI | P2 | Nội dung |
| TD-43 | Thêm font Playfair Display + Be Vietnam Pro (OFL) vào `public/assets/fonts/` | Bạn | P2 | — |
| TD-44 | BGM/SFX (mưa, gõ cửa, bước chân…) nối với âm lượng trong Cài đặt | Bạn gửi → AI | P3 | Asset |
| TD-45 | Quyết định dùng/bỏ `characters/main1–3.png` (5,2 MB nằm trong bản build) | Bạn | P3 | TD-10 |

## 2b. Rủi ro chính

| Rủi ro | Mức | Cách phòng |
|---|---|---|
| Q3/Q4 chưa chốt → GĐ 2–4 đứng, dồn việc sát Tuần 6 | Cao | Chốt TD-08/TD-09 trước; engine (TD-17) không cần asset nên làm ngay sau Q3 |
| Code T-020 → T-024 chưa qua `npm run check` thật → lỗi tích lũy | Cao | TD-03 trước mọi việc code mới |
| Mật khẩu trong lịch sử git | Cao | TD-01 (đổi mật khẩu là đủ; xóa khỏi lịch sử chỉ khi nhóm muốn — viết lại lịch sử ảnh hưởng cả nhóm) |
| Engine hiểu sai hợp đồng (thứ tự route, trừ điểm 2 lần, phát lại effect khi tải) | Cao | Test vàng TD-18, event token + `committed_events` |
| Thiếu nền phòng 204 / sprite NPC | TB | Placeholder có nhãn (nếu Q5 cho phép), đo hotspot lại khi có ảnh |
| `package-lock.json` đổi qua lại giữa máy các thành viên | TB | TD-06 |

---

## 3. (Lịch sử — đã xong T-020, DEC-012) Menu chính & Cài đặt

### 3.1 Mục đích
- Menu chính có "gu", hợp không khí trinh thám noir của khu trọ Chương 1; ít nút, dễ hiểu, không rối. [YÊU CẦU 20/10]
- Thêm màn **Cài đặt**: đồ họa, độ phân giải, âm thanh, ngôn ngữ (Tiếng Việt / English) và vài tùy chỉnh khác. [YÊU CẦU 20/10]
- Giữ đúng §3.2: MainMenuScene có **New Game**, **Load Game** (tải tiến trình từ CSDL), **bảng điều khiển âm thanh**. [NGUỒN]

### 3.2 Phân loại căn cứ
| Nội dung | Loại |
|---|---|
| New Game, Load Game, điều khiển âm thanh trong MainMenuScene | [NGUỒN] Project.docx §3.2 |
| Màn Cài đặt; tùy chỉnh đồ họa, độ phân giải, âm thanh, ngôn ngữ VI/EN | [YÊU CẦU 20/10] |
| Bố cục, màu, font, danh sách tùy chọn cụ thể, giá trị mặc định, menu tạm dừng | [ĐỀ XUẤT] |
| Bản tiếng Anh của lời thoại/kịch bản | [THIẾU] — nguồn chỉ có tiếng Việt (câu hỏi Q-M1) |
| Ảnh nền thật cho menu | [THIẾU] — ISS-27; ảnh xem trước dùng hình minh họa tạm |

### 3.3 Thiết kế — ĐÃ CHỐT (DEC-012)

**Định hướng hình ảnh — "21:35, đêm mưa ở khu trọ"**
- Lấy đúng không khí mở cảnh Chương 1 (Story.txt, P1_001–002): mưa, cửa sổ hở, bóng huỳnh quang chập chờn, hành lang tối, cửa 204 hé sáng. **Không** đặt đồng xu, chữ ký Khang hay chi tiết bí ẩn lên menu (tránh lộ manh mối).
- Bảng màu giữ theo `game/ui/theme.js` đã có: nền `#17151b`, khung `#241f2b`, viền `#5c5266`, nhấn hổ phách `#f2b84b`, chữ `#f4efe6`, chữ phụ `#a89f94`.
- Chữ: tiêu đề serif cổ điển, thân chữ không chân, nhãn nhỏ kiểu đánh máy — **cả ba phải có đủ dấu tiếng Việt** (đề xuất Playfair Display / Be Vietnam Pro / JetBrains Mono, giấy phép OFL, đóng gói trong `public/assets/fonts/`).

**Menu chính** — một cột bên trái, tối đa 4 mục, bên phải là khung cảnh:
| Mục | Hành vi |
|---|---|
| Ván mới | Bắt đầu chương 1. Nếu đã có bản lưu → hộp xác nhận "Bắt đầu lại sẽ thay bản lưu hiện tại" |
| Tiếp tục điều tra (Load Game) | Mở bản lưu gần nhất; mờ đi khi chưa có bản lưu. Tải từ server chờ ISS-29/ISS-05 |
| Cài đặt | Mở màn Cài đặt (chứa phần âm thanh của §3.2) |
| Nút loa nhỏ góc trên | Tắt/bật tiếng nhanh (giữ chức năng hiện có) |

Hover: chữ chuyển hổ phách + vạch nhỏ bên trái; điều khiển được bằng chuột và phím (↑ ↓ Enter, Esc để quay lại). Dòng nhỏ dưới cùng: "Chương 1 — Án mạng trong phòng trọ" và phiên bản.

**Màn Cài đặt** — một bảng giữa màn hình, **2 tab** (tab Hiển thị đã bỏ theo DEC-012 — game chạy trên web, trình duyệt tự lo cửa sổ/độ phân giải), mỗi tab ≤ 4 dòng:

| Tab | Tùy chọn | Kiểu | Mặc định |
|---|---|---|---|
| ~~Hiển thị~~ | ~~Chế độ hiển thị, độ phân giải, chất lượng đồ họa, FPS, giảm nhấp nháy~~ — **BỎ (DEC-012)**. Đèn chập chờn ở menu tự tắt khi hệ điều hành bật "giảm chuyển động" (`prefers-reduced-motion`) | — | — |
| Âm thanh | Âm lượng tổng / Nhạc nền / Hiệu ứng | Thanh trượt 0–100 | 80 / 70 / 80 |
| | Tắt toàn bộ âm thanh | Bật/Tắt | Tắt |
| Trò chơi | Ngôn ngữ: Tiếng Việt / English | Chọn 1 | Tiếng Việt |
| | Tốc độ chữ: Chậm / Vừa / Nhanh / Hiện ngay | Chọn 1 | Vừa (= 30 ms/ký tự hiện tại) |
| | Tự động chuyển thoại | Bật/Tắt | Tắt |
| | Cỡ chữ hội thoại: Vừa / Lớn | Chọn 1 | Vừa |

Hai nút dưới bảng: **Khôi phục mặc định** · **Lưu** (Esc hoặc nút X = đóng không lưu). Âm lượng nghe thử ngay khi kéo; đóng không lưu thì trả về mức cũ. Chọn English thì nhãn trong bảng đổi ngay để xem trước; bấm Lưu mới áp dụng cho cả game.

**Menu tạm dừng trong game** [ĐỀ XUẤT, có thể làm sau]: phím Esc khi đang chơi → Tiếp tục / Cài đặt / Lưu / Về menu chính — dùng lại màn Cài đặt.

**Lưu thiết lập**: localStorage theo trình duyệt (khóa mới `theUnspoken.settings.v1`). Không thêm API hay bảng CSDL (§4.3 không có API cài đặt).

### 3.4 Ảnh hưởng dự kiến (bản trước DEC-012 — bản chốt từng file: mục 3.9)
| Khu vực | Thay đổi dự kiến |
|---|---|
| Scene | Làm lại `MainMenuScene`; thêm `SettingsScene` (lớp phủ); có thể thêm `PauseMenuScene`; cập nhật `sceneKeys`, `gameConfig` |
| Logic thuần (có test) | `systems/settings.js` (mặc định, kiểm tra hợp lệ, gộp bản cũ); bộ chuỗi ngôn ngữ VI/EN + test đủ khóa |
| UI dùng lại | Nút menu, thanh trượt, công tắc, nhóm lựa chọn, hộp xác nhận trong `game/ui/` |
| Áp dụng thiết lập | `DialogueBox` (tốc độ chữ, cỡ chữ), `sound` (âm lượng), Scale/renderer (độ phân giải, FPS, toàn màn hình) |
| Asset | Font (3 họ, OFL), ảnh nền menu (tạm: vẽ bằng code/placeholder có nhãn tới khi có ảnh thật) |
| Lưu trữ | `shared/storage/storageKeys.js` thêm khóa settings |
| Tài liệu | ARCHITECTURE, CONVENTIONS, CLAUDE.md, PROJECT_MEMORY (DEC mới) |
| **Không đổi** | Backend, API §4.3, CSDL, nội dung cốt truyện |

### 3.5 Rủi ro bug / lỗi phần mềm (bản trước DEC-012 — các dòng về độ phân giải/toàn màn hình/chất lượng không còn áp dụng; bản chốt: mục 3.9)
| Rủi ro | Mức | Cách phòng |
|---|---|---|
| Đổi độ phân giải khi đang chạy làm lệch bố cục: code hiện đặt cứng nhiều số (khung thoại cao 220, nhân vật cao 660, cỡ chữ px) | Cao | Đề xuất giữ **khung logic 1280×720**, độ phân giải chỉ đổi độ nét khi render (xem Q-M2); nếu muốn đổi thật thì phải sửa toàn bộ bố cục theo tỉ lệ |
| Font chưa tải xong khi Phaser vẽ chữ → hiện font dự phòng, dấu tiếng Việt lệch/cắt | TB | Chờ `document.fonts.load` ở Preload; thêm khoảng đệm trên/dưới cho Text |
| Toàn màn hình bị trình duyệt chặn nếu không do người bấm | TB | Chỉ gọi trong sự kiện click; báo lỗi nhẹ nếu bị từ chối |
| Thanh âm lượng chưa có gì để nghe (chưa có file âm thanh) | Thấp | Ghi rõ trong UI dev; nối sẵn để khi có asset là chạy |
| Thiếu khóa dịch → hiện mã chuỗi | TB | Test bắt buộc hai ngôn ngữ cùng bộ khóa |
| localStorage bị chặn/xóa → mất thiết lập | Thấp | Dùng `storage` an toàn có sẵn, rơi về mặc định |
| Menu quá nhiều hiệu ứng làm nặng máy yếu | TB | Chất lượng "Thấp" tắt mưa/hạt phim; FPS 30 |
| Nhấp nháy đèn gây khó chịu | Thấp | Tùy chọn "Giảm hiệu ứng nhấp nháy" |

### 3.6 Đề xuất hướng phát triển (chờ duyệt)
- Dùng chung bộ ngôn ngữ cho cả trang web React (đăng nhập, đăng ký, nút Đăng xuất) để đổi ngôn ngữ là đổi toàn bộ, không chỉ trong khung game.
- Lần đầu vào game hiện hộp chọn ngôn ngữ một lần.
- Tiếng "gõ máy chữ" nhỏ khi chữ chạy (bật/tắt trong Âm thanh) — chỉ khi có file âm thanh được duyệt.
- Về sau: đồng bộ thiết lập lên tài khoản — cần API mới, chưa đề xuất làm bây giờ.

### 3.7 Câu hỏi — trạng thái sau DEC-012
| # | Câu hỏi | Mục đích | Ảnh hưởng | Rủi ro nếu chưa chốt |
|---|---|---|---|---|
| Q-M1 | **Tiếng Anh áp dụng tới đâu?** (a) chỉ giao diện: menu, cài đặt, HUD, Sổ tay, thông báo; lời thoại vẫn tiếng Việt · (b) cả lời thoại — nhóm cung cấp bản dịch · (c) cả lời thoại — cho phép AI dịch nháp để nhóm duyệt | Phạm vi công việc | (b)/(c): thêm bản dịch cho 1257 node Chương 1 (~44 000 ký tự), phải giữ đúng ID và điều kiện | Làm (c) khi chưa duyệt = tự tạo nội dung ngoài nguồn |
| Q-M2 | **"Độ phân giải" hiểu theo cách nào?** (a) giữ khung 1280×720, chỉ tăng độ nét khi render (ít rủi ro) · (b) đổi kích thước khung game thật, sửa toàn bộ bố cục theo tỉ lệ | Chọn cách làm | (b) đụng mọi scene/UI hiện có; ảnh nhân vật 783×990 vẫn đủ nét tới 1080p | (b) dễ lệch bố cục, tốn công |
| Q-M3 | Danh sách tùy chọn mục 3.3 có cần thêm/bớt gì? | Chốt phạm vi | Số dòng trong 3 tab | Thêm dần làm menu rối |
| Q-M4 | Cho phép đóng gói 3 font OFL (Playfair Display, Be Vietnam Pro, JetBrains Mono) vào game? | Chữ đẹp, đủ dấu | Thêm vài trăm KB asset (ước tính, đo lại khi chọn đúng các nét chữ cần dùng) | Không duyệt → dùng font hệ thống như hiện tại |
| Q-M5 | Tên hiển thị: giữ "Ván mới / Tiếp tục điều tra / Cài đặt" hay dùng "New Game / Load Game / Settings" như §3.2 cho bản tiếng Việt? | Văn phong | Chuỗi giao diện | — |

**Trả lời theo DEC-012** ("chốt thiết kế hiện tại … giữ nguyên các phần còn lại"):
- Q-M1 → AI hiểu là **(a) chỉ giao diện** — bản thiết kế đã chốt chỉ có nhãn giao diện tiếng Anh; lời thoại giữ tiếng Việt (không có nguồn tiếng Anh). *Cần người dùng xác nhận lại nếu muốn (b)/(c).*
- Q-M2 → **không còn** (tab Hiển thị đã bỏ). Khung game giữ 1280×720 + `Scale.FIT` như cũ.
- Q-M3 → bỏ tab Hiển thị; giữ nguyên các tùy chọn còn lại.
- Q-M4 → dùng 3 font như bản thiết kế. JetBrains Mono đóng gói ngay (có sẵn, OFL). Playfair Display + Be Vietnam Pro: môi trường AI không tải được → người dùng tải về `public/assets/fonts/` (hướng dẫn trong `public/assets/fonts/README.md`); thiếu file thì tự dùng font dự phòng (Georgia / system-ui).
- Q-M5 → nhãn tiếng Việt như bản thiết kế: Ván mới / Tiếp tục điều tra / Cài đặt.

### 3.8 Các bước
| Bước | Nội dung | Đầu ra | Trạng thái |
|---|---|---|---|
| M1 | Ảnh xem trước Menu + Cài đặt | Bản thiết kế "Menu The Unspoken" | Xong (T-019), đã chốt (DEC-012) |
| M2 | Kế hoạch code chi tiết | Mục 3.9 | Xong (T-020) |
| M3 | Viết code theo mục 3.9 | Menu + Cài đặt chạy trong game | T-020 |
| M4 | Kiểm tra: test logic, Prettier, chạy thử trình duyệt (chuột/phím, VI/EN, lưu thiết lập); người dùng chạy `npm run check` trên máy | Biên bản kiểm tra | T-020 |

### 3.9 Kế hoạch code (M2) — DEC-003

**Mục đích:** thay menu chữ đơn giản bằng menu đã chốt; thêm màn Cài đặt 2 tab; thiết lập được lưu và áp dụng thật vào âm thanh, hội thoại, ngôn ngữ giao diện.

**File mới**
| File | Vai trò |
|---|---|
| `game/systems/settings.js` + test | Danh sách thiết lập, mặc định, `normalizeSettings` (bỏ khóa lạ, giá trị sai → mặc định, kẹp 0–100 theo bước 5), `applyChange`, quy đổi: âm lượng → `sound.volume/mute`, tốc độ chữ → ms/ký tự, cỡ chữ → px |
| `game/systems/i18n.js` + test | `translate(lang, key, params)`: thay `{tham số}`, thiếu khóa → rơi về tiếng Việt → trả về khóa |
| `game/systems/menuNavigation.js` + test | Chọn mục kế/trước bằng ↑ ↓, bỏ qua mục bị khóa, vòng tròn |
| `game/data/uiText.js` | Chuỗi giao diện VI/EN (menu, cài đặt, hộp xác nhận, HUD, Sổ tay, Bad Ending, màn tải). Test bắt buộc 2 ngôn ngữ cùng bộ khóa |
| `game/core/settingsStore.js` + test | Đọc/ghi `localStorage['theUnspoken.settings.v1']` an toàn (không ném lỗi), phát `settings:changed` |
| `game/core/fonts.js` | Chờ font tải xong (tối đa 3 giây) trước khi vẽ menu |
| `game/scenes/SettingsScene.js` | Lớp phủ Cài đặt, làm trên bản nháp; Lưu / Khôi phục mặc định / Esc |
| `game/ui/MenuItem.js`, `IconButton.js`, `PanelButton.js`, `SegmentedControl.js`, `Slider.js`, `Toggle.js`, `ConfirmDialog.js`, `MenuBackdrop.js` | Thành phần giao diện dùng lại; `MenuBackdrop` = cảnh hành lang mưa vẽ bằng code (**tạm**, có nhãn, thay bằng ảnh khi có asset — ISS-27) |
| `public/assets/fonts/` | `JetBrainsMono-*.woff` + `OFL.txt`; `README.md` hướng dẫn thêm 2 font còn lại |

**File sửa**
| File | Thay đổi |
|---|---|
| `game/scenes/MainMenuScene.js` | Làm lại theo thiết kế: 3 mục + loa + chân trang, chuột + phím ↑ ↓ Enter, hộp xác nhận khi đã có bản lưu, "Tiếp tục điều tra" mờ khi chưa có bản lưu |
| `game/core/runtime.js` | Thêm `settings` (kho thiết lập) và `saveAvailable` (React báo qua EventBus) |
| `game/constants/gameEvents.js` | Thêm `SETTINGS_CHANGED` (nội bộ Phaser), `SAVE_AVAILABILITY` (React → Phaser, payload `{ hasSave }`) |
| `game/constants/sceneKeys.js`, `game/config/gameConfig.js` | Đăng ký `SettingsScene` |
| `game/constants/gameplay.js` | Thông số TẠM: tốc độ chữ Chậm 50 / Vừa 30 / Nhanh 15 / Hiện ngay 0 ms; tự chuyển thoại sau 1500 ms; cỡ chữ Vừa 22 / Lớn 26 px |
| `game/ui/theme.js` | Thêm họ font (tiêu đề / thân / đánh máy) + màu phụ dùng trong thiết kế |
| `game/ui/DialogueBox.js`, `game/scenes/DialogueScene.js` | Tốc độ chữ, cỡ chữ, tự động chuyển thoại |
| `game/index.js`, `game/scenes/BootScene.js` | Áp dụng âm lượng khi khởi động và mỗi khi thiết lập đổi |
| `PreloadScene`, `RoomInvestigationScene`, `NotebookScene`, `BadEndingScene` | Chuỗi giao diện qua i18n (không đổi nội dung cốt truyện; tên tab Sổ tay giữ đúng §3.2) |
| `features/play/hooks/useGameBridge.js` | Báo `save:availability` cho Phaser lúc mở trang và sau mỗi lần lưu (dựa trên bản sao lưu localStorage hiện có) |
| `shared/storage/storageKeys.js` | Ghi chú khóa settings (khóa khai báo trong `game/core/settingsStore.js` vì `game/` không được import `shared/storage` — ARCHITECTURE mục 2) |
| `src/styles/index.css` | `@font-face` 3 font |
| Tài liệu | ARCHITECTURE (cây thư mục + sửa dòng 61 còn `features/game/`), CLAUDE.md, PROJECT_MEMORY (DEC-012), PROGRESS_LOG |

**Không đổi:** backend, API §4.3, CSDL, nội dung cốt truyện, thư viện (không thêm package).

**Rủi ro bug và cách phòng**
| Rủi ro | Cách phòng |
|---|---|
| Font chưa tải → chữ vẽ bằng font dự phòng rồi không đổi lại | Preload chờ `document.fonts.load` (tối đa 3 s) rồi mới vào menu |
| Thiếu file font Playfair/Be Vietnam → lỗi 404 trong console | Không làm hỏng game (font dự phòng); hết khi thêm file |
| Scene Cài đặt chồng lên menu nhận phím 2 lần | Menu bị `pause` khi Cài đặt mở; Cài đặt tự gỡ phím khi đóng |
| Kéo thanh trượt ra ngoài thanh | Kẹp giá trị trong `normalizeSettings` + tính theo vị trí con trỏ |
| Hiện ngay (0 ms) gây vòng lặp `repeat = -1` | Nhánh riêng: hiện đủ câu, không tạo timer |
| Tự chuyển thoại chạy chồng với bấm tay | Hủy hẹn giờ mỗi lần chuyển câu / rời scene |
| localStorage bị chặn | Kho thiết lập bắt lỗi, dùng mặc định trong bộ nhớ |
| Thiếu khóa dịch | Test so khớp bộ khóa VI/EN + rơi về tiếng Việt |
| Giới hạn kiểm tra: máy AI không cài được package (mạng chặn npm) | AI chạy test logic bằng bộ chạy thay thế + chạy Phaser thật trong trình duyệt; **người dùng chạy `npm run check` trên máy để xác nhận cuối** |

**Thứ tự:** systems + test → kho thiết lập/i18n → UI component → MainMenu → Settings → áp dụng vào hội thoại/âm thanh → i18n các scene → React bridge → font → tài liệu → kiểm tra.

**Đề xuất hướng phát triển (chờ duyệt):** menu tạm dừng (Esc) để mở Cài đặt khi đang chơi; dùng chung bộ ngôn ngữ cho trang React; cho `game/` dùng `shared/storage` (đổi quy tắc import ở ARCHITECTURE mục 2) để bỏ trùng code đọc/ghi localStorage.
