# TODO — The Unspoken (bảng việc sống)

> Cập nhật **10/11/2026 (T-050)** — Phase 1 hướng dẫn vào phòng 204 quan sát Tùng trước khi lấy lời khai. Hộp thoại hiện lời nói, chân dung Linh, Minh và Hào dùng bảng thiết kế nhóm gửi.

> Cập nhật: **03/11/2026 (T-042)** — DEC-021: quay về nhân vật thám tử cũ, thiết kế mới V6c cất lại (TD-47/48/59/61). Trước đó (T-034) — Q3 (DEC-016), Q4/Q5/N-Q1 (DEC-017), N-Q2 (DEC-018: NPC trên map, tới gần nhấn E), N-Q3 (DEC-019: lưu vị trí nhân vật — cách B) đã chốt; TD-16 (N0) ✅; TD-17: N1 ✅ (T-035); N2 xong phần AI (T-036), chờ `npm run check` + trả lời N2-Q1/Q2. Trước đó (T-028) — nhóm chốt thứ tự đầu tiên: TD-01 → TD-02 → TD-46 → TD-03. Đây là danh sách việc DUY NHẤT cần theo dõi; `docs/PROJECT_PLAN.md` mục 2a là bản chụp ngày 27/10.
> Mã `TD-xx` giữ nguyên số của PROJECT_PLAN 2a; việc mới từ TD-46 trở đi.
> Cột **Thứ tự (chốt)**: để trống — nhóm điền sau khi thống nhất làm việc nào trước. Cột **Đề xuất** là gợi ý của AI (chờ duyệt).

**Ký hiệu**
- Trạng thái: ⬜ chưa làm · 🔄 đang làm · ⏸ chờ (bị chặn) · ✅ xong · ❓ chưa rõ (cần người dùng báo)
- Ưu tiên: **P0** chặn việc khác / bảo mật · **P1** cần cho Capstone 1 · **P2** nên có · **P3** để sau
- Cỡ: S ≈ 1 phiên ngắn · M ≈ 2–3 phiên · L ≥ 4 phiên
- Ai: **Bạn** = người dùng/nhóm (quyết định, asset, nội dung, thao tác trên máy) · **AI** = Claude

---

## A. Dọn nền & đồng bộ (làm trước khi viết code mới)

| Mã | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Trạng thái | Đề xuất | Thứ tự (chốt) |
|---|---|---|---|---|---|---|---|---|
| TD-01 | Đổi mật khẩu MySQL `root` (đã lộ trong commit `b744ce7` trên `master`), cập nhật biến môi trường `DB_PASSWORD` | Bạn | **P0** | S | — | 🔄 03/11: máy `dangthenhan` dùng mật khẩu riêng (không bị lộ) → không cần đổi; còn MÁY DESKTOP (MySQL dùng mật khẩu đã lộ) | 1 | 1 |
| TD-02 | Trả `backend/src/main/resources/application.yml` về `${DB_PASSWORD:}` (không giá trị mặc định); commit qua nhánh + PR | AI soạn / Bạn đẩy | **P0** | S | — | ✅ 03/11: đã sửa + push nhánh `Nhan` (commit `08db59a`); chờ PR merge vào `master` | 1 | 2 |
| TD-46 | **Đồng bộ hai máy**: máy Desktop có T-025 (PROJECT_PLAN/PROGRESS_LOG/PROJECT_MEMORY) chưa commit; máy `C:\The-Unspoken…` có commit phòng 204 + hoạt ảnh 6 khung (chưa chắc đã commit). Chọn 1 máy làm chính, commit/push, máy kia pull | Bạn | **P0** | S | — | 🔄 03/11: máy `dangthenhan` đã commit + merge `upstream/master` + push; chờ PR merge, rồi máy Desktop `git restore` 3 file tài liệu + `git pull` | 1 | 3 |
| TD-03 | Chạy `cd frontend; npm run check` và `cd backend; mvn clean test`, gửi log lỗi (nếu có) — code T-020 → T-026 chưa qua kiểm tra thật | Bạn → AI sửa | **P0** | S | TD-46 | ✅ 03/11 (T-029) | 2 | 4 |
| TD-04 | Sửa xuống dòng CRLF của `frontend/index.html` (Prettier báo lỗi) | AI / Bạn | P1 | S | — | ✅ 03/11 (T-029: file đã LF, `format:check` qua) | 2 | |
| TD-05 | Xóa `package-lock.json` rỗng ở gốc (+ `node_modules/` gốc nếu còn), `git rm package-lock.json` | Bạn đồng ý → AI | P2 | S | Bạn đồng ý | ⬜ | | |
| TD-06 | Thống nhất phiên bản Node/npm cả nhóm để `frontend/package-lock.json` không đổi qua lại | Bạn | P2 | S | — | ⬜ | | |
| TD-07 | Quy trình git: mỗi việc 1 nhánh, PR vào `master`, không đẩy thẳng `master` | Nhóm | P1 | — | — | 🔄 | | |
| TD-64 | `npm audit` báo 10 lỗ hổng (8 moderate, 2 high) sau `npm install` (T-029) — xem gói nào, có bản vá không phá vỡ (không tự `npm audit fix --force`) | AI xem / Bạn duyệt | P2 | S | — | ⬜ | | |

## B. Quyết định cần chốt (gỡ chặn)

| Mã | Câu hỏi | Mở khóa | Ưu tiên | Trạng thái | Đề xuất | Thứ tự (chốt) |
|---|---|---|---|---|---|---|
| TD-08 | **Q3** — Dùng Data Contract 2.0 + `chapter1.json` của gói Chương 1 làm định dạng kịch bản chính thức (đóng ISS-07, bỏ định dạng tạm)? | C, D, E | **P0** | ✅ 03/11: DEC-016 — làm theo Data Contract 2.0 | 1 | |
| TD-09 | **Q4** — Văn bản Phase 2 / 3 / Final / 4 trong gói được đưa vào game nguyên văn? (chưa duyệt → chỉ làm Phase 1) | D | **P0** | ✅ tạm 03/11 (DEC-017): dùng văn bản hiện có, nhóm báo nếu đổi | 1 | |
| TD-10 | **Q5** — Asset NPC/vật chứng: nhóm gửi, hay cho phép ảnh tạm có ghi nhãn "PLACEHOLDER" trong lúc chờ? | C, D | P1 | ✅ 03/11 (DEC-017): không ảnh tạm, chỉ nhãn tên | 2 | |
| TD-47 | **Tốc độ đi lên/xuống** 88 px/giây (= 0,4 × đi ngang) — hoạt ảnh 4 hướng mới tính theo số này | F | P1 | ⏸ gác (DEC-021: dùng lại nhân vật cũ — 220 px/giây mọi hướng) | 2 | |
| TD-48 | **Thiết kế thám tử**: đổi hẳn sang bản mới (tóc rối, sổ tay, túi ô liu) cho hoạt ảnh, tư thế đứng và chân dung hội thoại? | F, G | P1 | ✅ DEC-021: GIỮ THIẾT KẾ CŨ (DEC-020 gác; thiết kế mới cất trong art-source) | 2 | |
| TD-14 | **Hành lang / phòng 204**: cửa A204 dẫn vào phòng 204 (đi tự do hay chỉ theo kịch bản P2)? cầu thang đi đâu? giấy khen đặt ở đâu? có lưu vị trí phòng vào file lưu? điểm xem bảng Nội quy/Thông báo? | C, E | P1 | ⏸ chờ Bạn | 3 | |
| TD-49 | **Thi thể Tùng** ở phòng 204 | C | P2 | ✅ T-048 dùng nền đã ghép của PR #8 làm biến thể cho cảnh khám hiện trường | 3 | |
| TD-11 | **ISS-29** — Cách lấy `userId` khi login chỉ trả `{token,type,username,role}` (đụng API §4.3) | E | P1 | ⏸ | 4 | |
| TD-12 | **ISS-05** — Mỗi user 1 bản lưu (ghi đè) hay nhiều bản (lịch sử/checkpoint)? | E | P1 | ⏸ | 4 | |
| TD-13 | **ISS-10/11/12** — API admin, ROLE_ADMIN, định nghĩa "tài khoản hoạt động" & "% hoàn thành chương", công nghệ "thời gian thực" | H | P1 (trước Tuần 8) | ⏸ | 5 | |
| TD-15 | Ngày bắt đầu Tuần 1 Capstone 1 (đang tạm tính 07/10 → Tuần 6 ≈ 11–17/11, Tuần 8 ≈ 25/11–01/12, Tuần 12 ≈ 23–29/12) + phân công TV1/TV2/TV3 | lịch | P2 | ⏸ | | |

## C. Map & phòng 2.5D

| Mã | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Trạng thái | Đề xuất | Thứ tự (chốt) |
|---|---|---|---|---|---|---|---|---|
| TD-50 | Ảnh nền phòng 204 (`art-source/room204/room204.png`, `backgrounds/room204.webp`) | Bạn + AI | P1 | — | — | ✅ 31/10 | | |
| TD-51 | Sửa chi tiết ảnh 204 cho khớp gói Chương 1: tờ khảo sát (bỏ chữ + dấu X to → vài dòng gạch đỏ), gạt tàn bỏ khói, 1 tờ biên nhận dưới mép gạt tàn, hộp thuốc nhỏ NẰM TRONG thùng rác, vòng sạch trên bụi mặt tủ | AI (sửa ảnh) hoặc Bạn (vẽ lại) | P2 | S | — | ⬜ | | |
| TD-52 | **Map phòng 204** gồm vùng đi, vật cản và 9 hotspot. Nội dung xem đồ lấy từ graph | AI | P1 | M | — | ✅ T-046 rà vùng bấm. T-048 căn lại vùng cổ và vùng đi quanh thi thể | 3 | |
| TD-53 | Cửa A204 ⇄ phòng 204 (theo TD-14) | AI | P1 | S | TD-14 | ⏸ | | |
| TD-54 | Ảnh Tùng trong phòng 204 và ảnh cận vùng cổ | Bạn (ảnh) → AI | P2 | S | — | ✅ T-048 | | |
| TD-55 | Giấy khen chữ ký Khang trên tường hành lang (hotspot phụ cho `EV_KhangCertificate`) | Bạn (ảnh) → AI | P2 | S | TD-14 | ⏸ | | |
| TD-27 | Điền lời xem đồ vật: `room201-inspect.json`, `hallway-inspect.json` | Bạn | P2 | S | — | ⬜ | | |

## D. Tích hợp Chương 1 (kế hoạch chi tiết theo phase N0–N17: `docs/NARRATIVE_ENGINE_PLAN.md`)

> Ánh xạ: TD-16 = N0 · TD-17 = N1–N4 · TD-18 = N5 · TD-19 = N7 · TD-20 = N8 · TD-22 = N10 · TD-24 = N11 · TD-23 = N12 · TD-25 = N13 · TD-26 = N14 · TD-28..30 = N6 + N15 · TD-36/38 = N9 + N16.

| Mã | Việc | WP | Ai | Ưu tiên | Cỡ | Chặn bởi | Trạng thái | Đề xuất | Thứ tự (chốt) |
|---|---|---|---|---|---|---|---|---|---|
| TD-16 | Nhập 5 file dữ liệu vào `public/assets/chapters/chapter1/` + kiểm SHA-256 + đưa validator vào repo | C1 | AI | P1 | S | TD-08 | ✅ T-034 (validator, `npm run check`, Vite JSON qua trên máy 03/11) | 3 | |
| TD-17 | Narrative engine thuần `game/narrative/` (điều kiện, effect, storyRunner, Press/Present, deduction, checkpoint) | C2 | AI | P1 | L | TD-08 | ✅ N1–N4 (T-044) | 3 | |
| TD-18 | Test vàng: port 2 lượt chơi trọn chương của `validate_data.py` sang Vitest | C2 | AI | P1 | M | TD-17 | ✅ T-044 | 3 | |
| TD-19 | Bảng ánh xạ speaker/expression → ảnh, DialogueBox 4 kiểu node, ChoiceMenu | C3 | AI | P1 | M | TD-17 | ✅ T-044, nhân vật chưa có ảnh hiện tên | 4 | |
| TD-20 | Phase 1 chơi được: phòng 201 lúc 21:35 → hành lang → hỏi Hòa/Linh/Hào/Minh → cảnh sát tới | C3 | AI | P1 | M | TD-19, TD-10 | ✅ T-044 | 4 | |
| TD-21 | Ảnh tạm có nhãn cho NPC chưa có ảnh | C3/C9 | AI | P2 | S | TD-10 | ❌ bỏ (DEC-017: không tạo ảnh tạm, chỉ nhãn tên) | | |
| TD-22 | Phase 2: khám phòng 204 (9 hotspot và đường thoát qua điều kiện 5 vật chứng chính) | C4 | AI | P1 | L | TD-52 | ✅ Luồng khám và thoát qua Playwright T-046 | 5 | |
| TD-23 | Đối chất Press/Present + chọn vật chứng. Trừ −15 đúng một lần, blocked không phạt | C5 | AI | P1 | M | TD-17 | ✅ T-044 | 5 | |
| TD-24 | Sổ tay 4 tab đọc state v2, Lời khai sửa và Lịch sử trò chuyện | C5 | AI | P1 | M | — | ✅ T-044/T-045, gồm nhãn nguồn N2-Q2 | 5 | |
| TD-25 | Final Deduction 8 ô + tái dựng RECON_01–06 | C6 | AI | P1 | M | TD-17, TD-09 | ✅ Playwright T-046 qua nộp thiếu, sai và đúng | 6 | |
| TD-26 | Phase 4 + fallback xu/khảo sát/giấy khen. Bad Ending → load checkpoint. Kết chương tại CH2_ENTRY | C7 | AI | P1 | M | TD-25 | ✅ Hai lượt Playwright T-046 qua | 6 | |

## E. Lưu / tải

| Mã | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Trạng thái | Thứ tự (chốt) |
|---|---|---|---|---|---|---|---|
| TD-28 | Save state v2 và vị trí nhân vật (DEC-019) | AI | P1 | M | TD-11 cho server | 🔄 Lưu cục bộ đã có | |
| TD-29 | "Tiếp tục điều tra" tải đúng node | AI | P1 | M | TD-12 cho server | 🔄 Tải cục bộ đã có | |
| TD-30 | Autosave 5 phút + sự kiện quan trọng (DEC-010) | AI | P1 | S | TD-28 | ✅ Cục bộ | |
| TD-31 | Hybrid Storage/offline (REQ-064) | AI | P2 | M | ISS-18 | ⏸ | |

## F. Nhân vật & hoạt ảnh

| Mã | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Trạng thái | Thứ tự (chốt) |
|---|---|---|---|---|---|---|---|
| TD-56 | Hoạt ảnh đi ngang 6 khung (thiết kế cũ) đưa vào game, 8 hình/giây | AI | P1 | — | — | ✅ đang dùng lại (DEC-021, 03/11) | |
| TD-57 | Bộ đi 4 hướng thiết kế mới: GPT làm V6b (giữ khung xương V5 + thân trên chuyển động + vẽ lại thân dưới hướng lên/xuống) | Bạn (GPT) | P1 | M | — | ✅ V6c nhận 03/11 13:53 — AI đo lại (T-038): ĐẠT cả 4 hướng | |
| TD-58 | AI đo lại V6b trên ảnh xuất (trượt chân, tay chân thừa, nhấp nhô, chỗ nối hông, thứ tự tư thế) + GIF so sánh | AI | P1 | S | TD-57 | ✅ T-037 (03/11) | |
| TD-59 | Tích hợp 4 hướng: ô 448×720, 4 ảnh riêng (bỏ lật gương), tư thế đứng mới, tốc độ lật hình theo hướng, tốc độ dọc; chạy thử 201 + hành lang | AI | P1 | M | TD-48 (DEC-021 chọn thiết kế cũ) · lịch sử: T-039 tích hợp, T-040 sửa giật, T-041 AI sửa hình | ⏸ gác (DEC-021) — code + atlas cất ở `art-source/characters/detective/walk-4dir-v6c-t041/integration/` | |
| TD-60 | Phương án dự phòng: nếu V6b không đạt → đưa V5 vào game tạm, sửa hoạt ảnh sau | Bạn quyết | P2 | S | TD-58 | ⏸ | |
| TD-61 | Chân dung hội thoại thám tử theo thiết kế mới (6 biểu cảm dùng trong Chương 1: Attentive, Calm, Gentle, Neutral, Quiet, Thoughtful) | Bạn (ảnh) → AI | P1 | M | TD-48 | ⏸ gác (DEC-021) | |
| TD-62 | Chân dung hội thoại NPC | Bạn (ảnh) → AI | P1 | L | TD-10 | 🔄 T-050 đã nối Linh, Minh và Hào từ bảng thiết kế. Còn ảnh Cảnh sát | |
| TD-45 | Quyết định dùng/bỏ `characters/main1–3.png` (5,2 MB, không code nào dùng) | Bạn | P3 | S | — | ⬜ | |

## G. Asset khác & âm thanh

| Mã | Việc | Ai | Ưu tiên | Chặn bởi | Trạng thái | Thứ tự (chốt) |
|---|---|---|---|---|---|---|
| TD-63 | Ảnh xem cận 12 vật chứng Chương 1 (+ ảnh đối chiếu mảnh hộp, báo cáo phân tích, tờ khảo sát, ảnh đồng xu, giấy khen) | Bạn → AI | P1 | TD-10 | ⏸ | |
| TD-42 | WC phòng 201 (Q-R7), intro trước phòng 201 | Bạn → AI | P2 | nội dung | ⏸ | |
| TD-43 | Font Playfair Display + Be Vietnam Pro (OFL) vào `public/assets/fonts/` | Bạn | P2 | — | ⬜ | |
| TD-44 | BGM/SFX (mưa, gõ cửa, bước chân, bật lửa, còi, bộ đàm) nối với âm lượng trong Cài đặt | Bạn → AI | P3 | asset | ⏸ | |

## H. Admin Dashboard (mốc Tuần 8)

| Mã | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Trạng thái | Thứ tự (chốt) |
|---|---|---|---|---|---|---|---|
| TD-32 | API Contract admin (văn bản) + ROLE_ADMIN | AI soạn / Bạn duyệt | P1 | S | TD-13 | ⏸ | |
| TD-33 | Backend: thống kê tài khoản hoạt động, % hoàn thành Ch1–5, danh sách bug, PENDING → RESOLVED | AI | P1 | M | TD-32 | ⏸ | |
| TD-34 | Frontend Admin (Tailwind): 3 khối §5.1 + biểu đồ (thư viện cần chốt — ISS-28) | AI | P1 | M | TD-33 | ⏸ | |
| TD-35 | Seed `evidence_master` 12 dòng Ch1 từ `evidence.json` | AI | P3 | S | TD-16 | ⏸ | |

## I. Kiểm thử & hồ sơ (mốc Tuần 12)

| Mã | Việc | Ai | Ưu tiên | Cỡ | Chặn bởi | Trạng thái | Thứ tự (chốt) |
|---|---|---|---|---|---|---|---|
| TD-36 | Playwright tự đi 2 lượt chơi Chương 1 trong trình duyệt | AI | P1 | M | — | ✅ T-046, `npm run test:e2e` | |
| TD-37 | E2E §5.2: lưu → JWT → MySQL → kiểm JSON → Admin thấy số liệu; biên bản có log thật | AI + Bạn | P1 | M | E, H | ⏸ | |
| TD-38 | Playtest tay 12 mục `PLAYTEST_CHECKLIST.md` + font tiếng Việt + cỡ hộp thoại | Bạn | P1 | M | — | ⬜ Chờ nhóm chơi thử | |
| TD-39 | Cập nhật trạng thái REQ (PROJECT_MEMORY mục C) + bảng đối chiếu REQ ↔ code ↔ test | AI | P2 | M | — | ⬜ | |
| TD-40 | Test backend cho 5 endpoint §4.3 (controller + repository) | AI | P2 | M | — | ⬜ | |

---

## Gợi ý thứ tự (chờ nhóm thống nhất)

1. **Dọn nền:** TD-01, TD-02, TD-46 → TD-03, TD-04.
2. **Chốt quyết định:** TD-08 (Q3), TD-09 (Q4) trước tiên; rồi TD-10, TD-47, TD-48, TD-14, TD-49.
3. **Việc AI làm được ngay, không cần chờ asset:** TD-52 (map phòng 204) và — khi có Q3 — TD-16 → TD-17 → TD-18.
4. **Phase 1 chơi được:** TD-19 → TD-20 (dùng phòng 201 + hành lang đã có).
5. **Mốc Tuần 6:** TD-22 → TD-23, TD-24 → TD-25 → TD-26.
6. **Song song phía nhóm:** TD-57 (hoạt ảnh V6b), TD-61/62/63 (ảnh), TD-27 (lời xem đồ vật), TD-11/12 (backend).
7. **Sau đó:** E (lưu/tải) → H (Admin, Tuần 8) → I (kiểm thử, Tuần 12).

Ghi chú: các mốc tuần tính tạm từ Tuần 1 = 07/10/2026 (TD-15). Theo DEC-004, mốc tuần chỉ để tham khảo.
