# PROGRESS_LOG.md — Nhật ký tiến trình & Điểm khôi phục

> Thứ tự đọc khi bắt đầu/tiếp tục: **PROJECT_MEMORY.md → mục "ĐIỂM KHÔI PHỤC" bên dưới → mục nhật ký của tác vụ đang dở.**
> File này do AI cập nhật sau **mỗi bước con** và **mỗi tác vụ** (DEC-002). Chỉ ghi việc đã thực sự làm.

---

## ĐIỂM KHÔI PHỤC (RESUME POINT) — luôn cập nhật mục này trước tiên

> **T-082 hoàn tất (19/11/2026):** mở màn cận cảnh từ Sổ tay → Vật chứng sau khi thu. Bản cuối qua `npm run check`, validator và Chrome 6/6, gồm hai lượt Chương 1 và ca đóng Sổ tay/đăng xuất của T-079. Công việc QA/ghi quyết định còn lại của T-079 xem mục bên dưới.

> **T-081 hoàn tất (19/11/2026):** đã đối chiếu repo The Unspoken với skill và tài liệu CLI Phaser AE. Tài liệu mô tả luồng tạo game AE riêng và không nêu lệnh nhập repo Phaser sẵn có. Hướng dẫn phát triển trực tiếp trong repo hoặc thử prototype độc lập. Công việc dự án đang dở xem T-079 bên dưới.

> **T-080 hoàn tất (19/11/2026):** Node.js v24.18.0 và npx 11.16.0 đạt yêu cầu. CLI xác nhận đăng nhập, skill Codex đã được kiểm tra và trang tạo game đã được mở trong trình duyệt mặc định. Khi quay lại công việc của dự án, xem điểm khôi phục T-079 bên dưới.

> **T-079 đang làm màn Quan sát Tùng** theo yêu cầu: ảnh2/3trên, mô tả1/3dưới, rung ảnh ngắn và giữ tỷ lệ/cắt tràn. Đã đọc nguồn/xem asset, kế hoạch `docs/TUNG_OBSERVATION_PLAN.md`. Giữ graph/effect/API/save; branch revert-9-Nhan, HEAD1ec33b7.

| Trường | Giá trị |
|---|---|
| Cập nhật lần cuối | 17/11/2026 — T-079 khảo sát và kế hoạch preview Tùng |
| Tác vụ đang làm | T-079: màn xem ảnh Tùng + mô tả tách vùng + rung ngắn khi tương tác P1 |
| Đã xong gần nhất | Preview2/3 +1/3/rung350ms; check cuối254/39file + lint/format/build và validator6290 qua, Chrome preview3/3 trước bổ sung Large/logout qua |
| Trạng thái dở dang | Đang chạy Chrome6ca preview + chapter1 (session32728), chưa thu đủ kết quả. Đã xem desktop/tablet/mobile; code/ảnh/graph/API/save scope audit sạch |
| Việc tiếp theo | Thu Chrome6ca gồm Large/English/logout và hai lượt tớiCH2_ENTRY, ghi QA/DEC-038 và checkpoint cuối; không đổi code hoặc build khi browser chạy |
| Đang bị chặn bởi | Không. DB, file ignored/config local không đụng tới |
| Lệnh/kiểm tra cần chạy lại khi tiếp tục | Check cuối session42588 qua254/39file + lint/format/build; validator6290 qua. Chrome session32728 đang chạy6ca; chưa kết luận6/6 trước khi có output |
| Ghi chú cho phiên sau | Không cần mở lại zip: đọc `docs/chapter1/CHAPTER1_MEMORY.md`. "Ông chủ trọ" có ảnh `landlord-*` = **HÒA** trong dữ liệu. Present: lấy route khớp **đầu tiên theo thứ tự mảng** (đúng validator). Máy: Java 21, Maven 3.10.0, MySQL 8.0.46 (`C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe`), `DB_PASSWORD` ở biến môi trường User |

---

## QUY TRÌNH CHECKPOINT (DEC-002)

### Khi nào lưu
1. **Sau mỗi bước con** của tác vụ (không đợi hết tác vụ).
2. **Trước** mọi thao tác dài/rủi ro (chạy build, cài thư viện, sửa nhiều file, migrate DB).
3. **Khi ngân sách token còn thấp**: AI không đo được chính xác thời điểm chạm giới hạn, nên áp dụng ngưỡng an toàn: khi ngân sách còn lại hiển thị cho AI xuống dưới **~10%**, hoặc hội thoại đã rất dài → **ngừng mở việc mới**, ghi điểm khôi phục đầy đủ rồi mới làm tiếp phần nhỏ còn lại.
4. Khi bị chặn, chờ người dùng trả lời.

> Giới hạn trung thực: nếu phiên bị cắt đột ngột giữa một bước con, phần việc của bước đó có thể mất; điểm khôi phục sẽ là bước con gần nhất đã lưu.

### Lưu những gì
- Cập nhật bảng **ĐIỂM KHÔI PHỤC**.
- Thêm/cập nhật mục nhật ký của tác vụ theo **Mẫu nhật ký** (bên dưới).
- Nếu trạng thái REQ/ISS/DEC thay đổi → cập nhật PROJECT_MEMORY.md mục C/E/F/G.

### Cách tiếp tục sau gián đoạn
1. Đọc PROJECT_MEMORY.md (bản hiện tại).
2. Đọc ĐIỂM KHÔI PHỤC → mở nhật ký tác vụ tương ứng.
3. Kiểm tra lại các file trong "File đã tạo/sửa" của bước con cuối có đúng như ghi không (file có thể đã bị người dùng sửa).
4. Trình bày ngắn yêu cầu liên quan rồi làm tiếp từ "Việc tiếp theo".

---

## MẪU NHẬT KÝ TÁC VỤ (sao chép cho mỗi tác vụ mới)

```
### T-xxx — <tên tác vụ>
- Ngày giao / người giao:
- Yêu cầu gốc (trích ngắn):
- REQ / WP / ISS liên quan:

#### Kế hoạch (DEC-003)
- Mục đích:
- Ảnh hưởng & thay đổi (file/module/dữ liệu/API):
- Rủi ro bug / lỗi phần mềm:
- Đề xuất hướng phát triển (chờ duyệt):

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|

#### Kết quả
- Đã hoàn thành:
- Chưa hoàn thành:
- Điểm cần xác nhận:
- Self-Check (A4): đạt / chưa đạt (lý do)
- Bước tiếp theo:
```

---

## NHẬT KÝ

### T-001 — Khởi tạo PROJECT_MEMORY.md, file tiến trình, tối ưu lộ trình thực thi
- Ngày giao: 08/10/2026 (21:18, Asia/Saigon) — người dùng
- Yêu cầu gốc (trích ngắn): dựa vào Story.txt và Project.docx, tuân thủ prompt → tối ưu PROJECT_MEMORY.md; tạo file lưu tiến trình sau mỗi công việc, kể cả lưu điểm kết thúc trước khi chạm ngưỡng token; tối ưu timeline để tận dụng hết token trong ngày, không dừng sau tuần đầu; trước mọi nhiệm vụ phải lập kế hoạch chi tiết (mục đích, ảnh hưởng/thay đổi, rủi ro bug, đề xuất hướng phát triển).
- REQ / WP liên quan: toàn bộ; WP-00

#### Kế hoạch (DEC-003)
- **Mục đích:** có một bộ nhớ dự án đầy đủ, đúng cấu trúc A–G của prompt, trích nguyên văn SQL/API; có cơ chế ghi tiến trình & khôi phục; có lộ trình thực thi theo gói việc.
- **Ảnh hưởng & thay đổi:** chỉ thêm 2 file mới ở thư mục gốc repo (`PROJECT_MEMORY.md`, `PROGRESS_LOG.md`). Không sửa code, README, Project.docx; không commit git.
- **Rủi ro bug / lỗi:** trích xuất sai/thiếu từ docx (giảm thiểu: chuyển docx → text, đối chiếu từng mục, kiểm tra không có bảng/ảnh); repo lệch tài liệu (ghi ISS-25); không đọc được file Java do giới hạn độ sâu (ISS-26); AI không đo chính xác thời điểm hết token (giảm thiểu: checkpoint mỗi bước con).
- **Đề xuất hướng phát triển (chờ duyệt):** lộ trình gói việc ở PROJECT_MEMORY mục H; chốt API Contract + schema JSON trước khi code; căn chỉnh repo theo tài liệu (ISS-25).

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|
| B1 | Đọc Story.txt, attachment.txt (prompt) | Xong | — | Đọc toàn văn |
| B2 | Đọc Project.docx | Xong | — | pandoc → markdown (22.867 ký tự), đọc toàn bộ; python-docx: 98 đoạn, 0 bảng, 0 ảnh. Phát hiện thiếu mục 3.1, 4.1 |
| B3 | Khảo sát repo trên máy người dùng | Xong (một phần) | — | Liệt kê thư mục; đọc 20 file cấu hình/frontend. 14 file Java **không đọc được** (độ sâu > 7 cấp) |
| B4 | Soạn PROJECT_MEMORY.md (A–H) | Xong | `PROJECT_MEMORY.md` (mới) | Đối chiếu SQL/API với văn bản trích từ docx |
| B5 | Soạn PROGRESS_LOG.md | Xong | `PROGRESS_LOG.md` (mới) | — |
| B6 | Ghi 2 file vào thư mục gốc repo trên máy người dùng, đọc lại để kiểm tra | Xong | 2 file trên | Đọc lại bản trên máy; so khớp SQL với nguồn bằng script |

#### Kết quả
- **Đã hoàn thành:** B1–B6.
- **Chưa hoàn thành:** đọc nội dung 14 file Java (ISS-26); lộ trình mục H chưa được duyệt.
- **Điểm cần xác nhận:** ISS-01 → ISS-28 (ưu tiên P0: ISS-02, 05, 06, 07, 10, 25, 26).
- **Self-Check (A4):** đạt trong phạm vi tác vụ — không viết code, không sửa tài liệu, không thêm đặc tả; mọi điểm thiếu được ghi ở mục E; chưa có kiểm thử phần mềm nào được chạy (không tuyên bố kiểm thử).
- **Bước tiếp theo:** WP-01 — chờ người dùng trả lời câu hỏi P0 và duyệt mục H.

---

### T-002 — Tái cấu trúc dự án theo chuẩn studio nhỏ
- Ngày giao: 08/10/2026 21:33 — người dùng
- Yêu cầu gốc: "tối ưu lại structure của project theo hướng thật chuyên nghiệp cho việc làm game giống như một studio nhỏ, đảm bảo clean code, dễ debug, dễ fix, dễ update, đồng bộ lại tài liệu được nạp, dùng phaser 4.2.1, react và javascript."
- Quyết định kèm theo: DEC-005, DEC-006, DEC-007, DEC-008
- REQ / ISS liên quan: REQ-002..047, ISS-02, ISS-25, ISS-26, ISS-28

#### Kế hoạch (DEC-003)
- **Mục đích:** cấu trúc theo feature + layer; tách React web / Phaser game / logic thuần; mỗi API path, scene key, event name khai báo một chỗ.
- **Ảnh hưởng:** viết lại `frontend/src`, cấu hình frontend, backend Java theo package tính năng, thêm `docs/`, `scripts/apply-restructure.ps1`; cập nhật README, PROJECT_MEMORY, PROGRESS_LOG.
- **Rủi ro:** AI không xóa/di chuyển được file trên máy và không ghi được file Java sâu > 7 cấp → dùng script do người dùng chạy; React StrictMode tạo 2 game Phaser; khác biệt API Phaser 4; lockfile tạo trên Linux có thể lệch Windows (→ không ghi đè lockfile, để `npm install` trên máy tự cập nhật).
- **Đề xuất (chờ duyệt):** sau cấu trúc, làm WP-02/03.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra |
|---|---|---|---|---|
| B1 | Ghi DEC-005..008, mở T-002 | Xong | PROJECT_MEMORY.md, PROGRESS_LOG.md | — |
| B2 | Dựng frontend mới trong môi trường AI (`/home/claude/repo/frontend`, chưa ghi lên máy) | Xong | ~45 file trong `frontend/src`, config | Prettier check OK; ESLint (luật lõi) 0 lỗi; 130 import nội bộ đều resolve; 21/21 unit test pass (Node test runner + shim tương thích Vitest — **Vitest thật chưa chạy** vì registry npm bị chặn); smoke test Phaser **v4.2.1 WebGL** trong Chromium: Menu → New Game → Dialogue → Investigation → Notebook (N/Esc) → BadEnding → Menu, destroy sạch canvas, 0 lỗi runtime |
| B3 | Dựng backend Spring Boot theo package-by-feature (common, security, user, auth, game, report, evidence) + `db/schema.sql` nguyên văn §2.1–2.2 + application.yml | Xong | 31 file Java (main) + 1 test | `javac --release 17` với đúng jar trong `~/.m2` của người dùng (Spring Boot 3.4.4, Security 6.4.4, JJWT 0.12.6): **0 lỗi, 0 cảnh báo**; JwtTokenProviderTest **4/4 pass** (chạy bằng reflection harness, không qua Maven Surefire). **Chưa chạy**: khởi động Spring context, kết nối MySQL, ddl-auto=validate |
| B4 | Tài liệu + công cụ: `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, README, `.gitignore`, `.editorconfig`, `.gitattributes`, `scripts/apply-restructure.ps1` (ASCII, CRLF, PS 5.1); cập nhật PROJECT_MEMORY (D1, E: ISS-02/25/26/28 + ISS-29/30 mới, F: DEC-005..008, G, H4a) | Xong | như cột Nội dung | Script **chưa chạy thử** (môi trường AI không có PowerShell) — đã rà soát thủ công, không có ký tự ngoài ASCII |
| B5 | Ghi lên máy người dùng | Xong | 115 file (frontend 71, `_migration` 33, backend resources 2, docs 2, script 1, gốc repo 6) | device_commit: 115/115 written, 0 rejected; đối chiếu kích thước bằng liệt kê thư mục: khớp |
| B6 | Chạy script + kiểm thử thật | **Xong (09/10, T-009)** | xem T-009 | `npm run check` 30/30 + build OK; `mvn clean test` 4/4. Chưa chạy MySQL/Spring context |

#### Kết quả
- **Đã hoàn thành:** B1–B5.
- **Chưa hoàn thành:** B6 (phía người dùng). Chưa chạy thật: `npm install`, Vitest, `vite build`, ESLint với plugin React, `mvn test`, khởi động Spring + MySQL, script PowerShell.
- **Rủi ro còn lại:** (1) dải phiên bản `@tailwindcss/vite`/`vitest`/`react-router-dom` có thể xung đột peer với Vite 8 → script gợi ý `--legacy-peer-deps`; (2) `ddl-auto=validate` sẽ dừng backend nếu DB cũ lệch schema → README hướng dẫn; (3) `.gitattributes` mới → cần `git add --renormalize .`.
- **Điểm cần xác nhận:** ISS-02 (Java), ISS-29 (userId), ISS-30 (giá trị tạm), cùng các ISS P0 cũ.
- **Self-Check (A4):** tên scene §3.2, endpoint/payload §4.3, SQL §2.1–2.2 (nguyên văn trong schema.sql), công thức §3.3, autosave §5.2, 4 tab §3.2 đã đối chiếu; không thêm tính năng gameplay hay nội dung cốt truyện; mọi giá trị tự đặt được liệt kê ở ISS-30; trạng thái kiểm thử ghi đúng phạm vi đã chạy.
- **Bước tiếp theo:** B6 → WP-02/03.

---

### T-003 — Thêm hướng dẫn Bước 6 (áp dụng tái cấu trúc) vào README
- Ngày giao: 08/10/2026 22:20 — người dùng: "thêm phần này vào readme giúp tôi"
- **Kế hoạch:** mục đích — người dùng/nhóm có hướng dẫn B6 ngay trong repo; ảnh hưởng — chỉ sửa `README.md` (thêm mục "Áp dụng tái cấu trúc T-002"); rủi ro — trùng nội dung với mục "Khởi tạo CSDL" (chấp nhận, mục mới chỉ dùng một lần); đề xuất — xóa mục này khỏi README sau khi cả nhóm đã áp dụng xong.
- **Bước con:** B1 đọc lại README trên máy (khớp bản AI đã ghi) → B2 chèn mục mới trước "Chạy frontend" → B3 ghi lên máy.
- **Ghi chú:** lần ghi PROGRESS_LOG trước đã sinh bản sao `PROGRESS_LOG-1.md` (lỗi đồng bộ); `PROGRESS_LOG.md` đã được khôi phục bản mới nhất; README Bước 1 có lệnh xóa bản sao.
- **Self-Check:** chỉ thêm hướng dẫn vận hành, không đổi đặc tả. Trạng thái: xong.

### T-005 — Thêm 3 ảnh nhân vật "ông chủ trọ" (Ch1)
- Ngày giao: 09/10/2026 — người dùng: "thêm 3 ảnh này vào project đây là nhân vật chủ trọ"
- **Kế hoạch:** mục đích — đưa asset nhân vật vào repo đúng thư mục chuẩn; ảnh hưởng — chỉ thêm 3 file PNG vào `frontend/public/assets/images/portraits/`, **không sửa code**; rủi ro — ảnh nặng (~7 MB/ảnh, 1536×2752) làm chậm tải game và phình git; nền kem đặc (không trong suốt); ảnh toàn thân, khung chân dung `DialogueBox` 160×160 sẽ bị méo nếu dùng thẳng; đề xuất — xác nhận tên biểu cảm, sau đó tối ưu ảnh (WebP/thu nhỏ, tách nền) và nạp trong `PreloadScene`.
- **Kết quả:** `landlord-smirk.png` (cười nhếch mép), `landlord-angry.png` (cau mày, đang nói), `landlord-talk.png` (đang nói, bình thường). Tên biểu cảm do AI đặt theo hình — chờ người dùng xác nhận. Đã kiểm tra trên máy: 3 file có mặt, kích thước khớp bản gốc.
- **Chưa làm (chờ xác nhận):** đăng ký texture key trong `PreloadScene`, mã nhân vật trong dữ liệu hội thoại (ISS-07), tối ưu ảnh.
- **Self-Check:** không đổi đặc tả/cốt truyện; chưa chạy game với ảnh mới. Trạng thái: xong phần thêm file.
- **Sửa (09/10, trong T-006):** đối chiếu lại khuôn mặt — tên ở T-005 bị lệch: `landlord-angry.png` thực ra là miệng **mở to** (nay gọi `talk`), `landlord-talk.png` thực ra là **cau mày, miệng hé** (nay gọi `stern`). Bản dùng trong game là `.webp` mới (tên đúng); 3 file `.png` trong `public/.../portraits/` cần người dùng xóa.

### T-006 — Hoạt ảnh nhép miệng cho ông chủ trọ (Phaser)
- Ngày giao: 09/10/2026 17:28 — người dùng: "được hãy giúp tôi" (đồng ý đề xuất: cắt/nén ảnh, sửa PreloadScene + DialogueBox, demo, test)
- **Kế hoạch:** mục đích — chân dung nhép miệng trong lúc chữ chạy; ảnh hưởng — thêm `data/characters.js`, `systems/lipSync.js`, `debug/demoDialogue.js` (+2 test); sửa `DialogueBox` (image→sprite, phát/dừng hoạt ảnh), `PreloadScene` (nạp ảnh + tạo hoạt ảnh), `dialogueData` (trường `talk`), `DialogueScene` (`data.lines`/`data.nextScene` cho debug), `DebugScene` (F9 demo, nhãn chuyển lên góc trên phải); docs + README; asset `.webp` mới; ảnh gốc chuyển vào `art-source/`. Rủi ro — trường `talk` là đề xuất trong lúc ISS-07 chưa chốt; tách nền tự động có thể sót viền ở chỗ khó; lời thoại demo chỉ là chữ `[DEMO]`, không phải kịch bản.
- **Bước con:** B1 đồng bộ code từ máy (khớp) → B2 tách nền + cắt chân dung 512×512 + toàn thân 518×900 (.webp ~42 KB / ~80 KB) → B3 sửa code → B4 kiểm tra → B5 ghi lên máy.
- **Kiểm tra đã chạy (container):** 27/27 unit test (Node shim cho Vitest), ESLint 0 lỗi, Prettier sạch; Chromium + Phaser 4.2.1 thật: 3 texture + 2 hoạt ảnh tồn tại, F9 mở demo, khung hình đổi smirk↔talk khi chữ chạy, dừng ở dấu phẩy, chữ xong/bấm bỏ qua → về ảnh đứng yên, hết demo về MainMenu; luồng New Game cũ không đổi, không có lỗi console. **Chưa chạy** `npm run check` thật (Vitest/Vite) trên máy người dùng.
- **Người dùng cần làm:** xóa `frontend/public/assets/images/portraits/landlord-{smirk,talk,angry}.png`; `cd frontend; npm run check`; `npm run dev` → bấm F9.
- **Self-Check:** không thêm lời thoại cốt truyện; tốc độ nhép miệng ghi TẠM. Trạng thái: xong phía AI.

### T-007 — Chủ trọ hiện nửa thân trên bên trái/phải màn hình (kiểu Visual Novel)
- Ngày giao: 09/10/2026 18:48 — người dùng: "khi trò chuyện, khung chat vẫn hiện ở dưới, còn ông chủ trọ đứng ở bên trái hoặc phải của màn hình, hiện nửa thân trên và nhép miệng, thay cho ô ảnh đại diện nhỏ"
- **Kế hoạch:** mục đích — thay ô chân dung 160×160 bằng nhân vật nửa thân đứng cạnh khung thoại; ảnh hưởng — ảnh `images/characters/*.webp` đổi từ toàn thân sang nửa thân 783×990; thêm `ui/CharacterStage.js`; viết lại `ui/DialogueBox.js` (nhép miệng chuyển sang CharacterStage, ô chân dung chỉ hiện khi câu dùng `portrait`); `data/characters.js` (key `char-<id>-<biểu cảm>`, `resolveStageLine`, `defaultSide`); `dialogueData` đọc `character/expression/talk/position`; `DialogueScene` tạo sân khấu; `theme.DEPTH.CHARACTER`; demo F9; docs/README. Rủi ro — định dạng câu thoại đổi so với T-006 (`talk` nay là tên kiểu nhép, không phải animation key) — vẫn chờ ISS-07; ảnh chân dung vuông trong `portraits/` hiện không nạp (giữ cho Sổ tay về sau).
- **Hành vi:** câu có `character` → nhân vật trượt vào ở bên `position` (mặc định phải), nhép miệng khi chữ chạy, dừng ở dấu câu; câu của người khác → nhân vật tối đi; đổi bên → trượt vào bên mới.
- **Kiểm tra đã chạy (container):** 30/30 unit test (Node shim), ESLint 0 lỗi, Prettier sạch; Chromium + Phaser 4.2.1: nửa thân 522×660 đứng phải (x≈995) / trái (x≈285), khung hình đổi smirk↔talk khi chữ chạy, câu người khác → tối, bấm bỏ qua → về ảnh đứng yên, không có ô chân dung, chữ dùng hết bề ngang; luồng New Game cũ không lỗi. **Chưa chạy** `npm run check` thật trên máy người dùng.
- **Self-Check:** không thêm lời thoại cốt truyện (chỉ câu `[DEMO]`); kích thước/vị trí/tốc độ ghi TẠM. Trạng thái: xong phía AI.

### T-008 — Chuẩn bị chuyển sang Claude Code: CLAUDE.md + docs/sources/
- Ngày giao: 09/10/2026 19:06 — người dùng: "hãy tạo claude.md và thư mục cùng với di chuyển các file vào thư mục giúp tôi trước"
- **Kế hoạch:** mục đích — Claude Code trên máy người dùng tự nạp quy tắc làm việc và tìm được tài liệu gốc; ảnh hưởng — thêm `CLAUDE.md` (gốc repo, ~100 dòng, không @import PROJECT_MEMORY để tránh tốn ngữ cảnh), thư mục `docs/sources/` (Project.docx, Project.md, Story.txt, working-rules.md), cập nhật README (bảng tài liệu) và PROJECT_MEMORY mục B; không đổi code. Rủi ro — `Project.md` là bản chuyển đổi tự động (đã ghi chú: bản .docx có giá trị cao nhất); tài liệu gốc vào git (≈ 90 KB, chấp nhận được).
- **Ghi chú:** tài liệu gốc trước đây chỉ là file đính kèm trong cuộc trò chuyện, chưa nằm trên máy người dùng → "di chuyển" thực hiện bằng cách chép bản đã nhận vào `docs/sources/`.
- **Self-Check:** nội dung CLAUDE.md lấy từ working-rules.md (SRC-3), DEC-000..008, README/docs hiện có; không thêm đặc tả mới. Trạng thái: xong phía AI.
- **Việc tiếp theo (trong Claude Code):** người dùng cài Claude Code → commit → chạy `claude` tại gốc repo → áp dụng tái cấu trúc T-002 (xóa file cũ gây lỗi ESLint `react-refresh/only-export-components`) → `npm run check`.

### T-009 — Áp dụng tái cấu trúc T-002 (bước B6) bằng Claude Code
- Ngày giao: 09/10/2026 — người dùng: "thực thi việc còn dang dở T-002 bước B6 nếu không ảnh hưởng hay có rủi ro gì thì thực thi … nhớ cập nhật tiến trình sau khi hoàn thành"
- REQ / WP / ISS liên quan: T-002, ISS-26, DEC-007

#### Kế hoạch (DEC-003)
- **Mục đích:** xóa file cũ, đưa Java từ `_migration/` vào package, kiểm thử thật frontend + backend.
- **Ảnh hưởng:** xóa `package.json`/`package-lock.json` gốc, `frontend/src/{App.jsx,index.css,api,context,pages,components,utils}`, `frontend/src/game/{config.js,entities,managers}`, package Java cũ `config/controller/dto/model/repository/service`, `backend/target`, `_migration/`; thêm 32 file Java main + 1 test vào package; `npm install` frontend.
- **Rủi ro & kiểm tra trước khi chạy:** mọi đường dẫn bị xóa đều đã được git theo dõi, không có sửa đổi chưa commit (HEAD `66b4c80` = điểm khôi phục, nên không tạo commit snapshot riêng); chỉ `backend/target/` là file chưa theo dõi (build output). Code mới không import đường dẫn cũ; `_migration` không tham chiếu package Java cũ; không có test backend cũ. Dry-run khớp README (không lỗi).
- **Không làm (chưa được đồng ý):** xóa `PROGRESS_LOG-1.md`, commit.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|
| B1 | Rà soát rủi ro + `apply-restructure.ps1 -DryRun` | Xong | — | 19 mục xóa, 33 file Java chép, không lỗi |
| B2 | Chạy thật (`-Force`, đã tự rà soát thay cho lời nhắc YES) | Xong | như Ảnh hưởng | `_migration` đã xóa; `npm install`: 0 lỗ hổng |
| B3 | `git add -A` + `git add --renormalize .` (chỉ stage) | Xong | — | 44 D, 32 R, 3 M — **chưa commit** |
| B4 | Sửa xuống dòng: 6 file trên máy là CRLF trong khi git yêu cầu LF (`frontend/index.html` làm `prettier --check` báo lỗi) → lấy lại từ index | Xong | `backend/pom.xml`, `backend/src/main/resources/data.sql`, `docs/sources/{Story.txt,working-rules.md}`, `frontend/index.html`, `frontend/public/assets/dialogues/chapter-1.json` (chỉ đổi CRLF→LF, nội dung giữ nguyên) | `git ls-files --eol`: chỉ còn `.ps1` là CRLF (đúng ý định) |
| B5 | `cd frontend; npm run check` | Xong | — | ESLint 0 lỗi (2 lỗi `react-refresh` cũ đã hết), Prettier sạch, Vitest **30/30**, Vite build OK |
| B6 | `cd backend; mvn clean test` (Java 21.0.12, Maven 3.10.0) | Xong | — | `Tests run: 4, Failures: 0` — **BUILD SUCCESS**; không còn tham chiếu package cũ |
| B7 | MySQL `schema.sql` + `spring-boot:run` + end-to-end (README Bước 5–7) | **Chưa làm** | — | Máy chưa có MySQL (không có lệnh `mysql`, không có service) |

#### Kết quả
- Đã hoàn thành: B1–B6. T-002 coi như xong phần cấu trúc; ISS-26 hết hiệu lực.
- Chưa hoàn thành: B7 (cần MySQL); commit (chờ người dùng).
- Điểm cần xác nhận: (1) **đề xuất** sửa `.gitattributes` — dòng `*.{ps1,cmd,bat} text eol=crlf` không có tác dụng vì gitattributes không hỗ trợ `{…}` (`git check-attr` cho `.ps1` ra `eol: lf`) → tách thành 3 dòng `*.ps1`, `*.cmd`, `*.bat`; (2) commit T-009; (3) xóa `PROGRESS_LOG-1.md` và 3 file `landlord-*.png` thừa.
- Self-Check (A4): đạt — không đổi đặc tả, code, API hay schema; chỉ áp dụng script đã duyệt ở T-002 và chuẩn hóa xuống dòng; kết quả kiểm thử ghi đúng phạm vi đã chạy.
- Bước tiếp theo: commit → MySQL + README Bước 5–7 → WP-02/03.


### T-010 — Sửa `.gitattributes`, dọn file thừa, commit T-009
- Ngày giao: 09/10/2026 — người dùng: "tôi xác nhận toàn bộ hãy làm đi" (đồng ý 4 điểm cần xác nhận của T-009)
- **Kế hoạch:** mục đích — đóng các điểm chờ của T-009; ảnh hưởng — `.gitattributes` (tách `*.{ps1,cmd,bat}` thành 3 dòng), xóa `PROGRESS_LOG-1.md`, `frontend/public/assets/images/portraits/landlord-{angry,smirk,talk}.png`, commit trên nhánh `Nhan`; rủi ro — xóa nhầm dữ liệu (đã kiểm tra: `PROGRESS_LOG-1.md` là bản cũ chỉ có T-001/T-002, đều có trong `PROGRESS_LOG.md`; 3 PNG không còn được tham chiếu và trùng MD5 với bản trong `art-source/characters/landlord/`).
- **Bước con:** B1 sửa `.gitattributes` → `git check-attr` cho `.ps1` = `eol: crlf` → B2 `git rm` 4 file → B3 `npm run check` lại: 30/30, build OK, exit 0 → B4 cập nhật log → B5 commit (chưa push).
- **Chưa làm:** cài MySQL — cần người dùng tự cài và đặt mật khẩu root (AI không tự đặt/nhập mật khẩu cho tài khoản quản trị CSDL); push/PR — chưa được yêu cầu.
- **Self-Check:** không đổi đặc tả, code, API, schema. Trạng thái: xong.

### T-011 — Tạo CSDL MySQL, chạy backend, thử end-to-end (README Bước 5–7)
- Ngày giao: 09/10/2026 — người dùng: "tôi đã cài đặt my sql rồi bây giờ bạn cần gì" → cung cấp mật khẩu root
- **Kế hoạch:** mục đích — hoàn tất kiểm thử thật còn thiếu của T-002/T-009; ảnh hưởng — tạo database `detective_game` trên MySQL cục bộ, đặt biến môi trường `DB_PASSWORD` (User), không sửa file mã nguồn; rủi ro — README dùng `DROP DATABASE` (đã kiểm tra: DB chưa tồn tại → chỉ `CREATE`); mật khẩu root đã xuất hiện trong chat → khuyên người dùng không dùng lại cho dịch vụ khác, không ghi vào repo.
- **Bước con & kiểm tra:**
  - B1 kết nối MySQL 8.0.46: OK; `detective_game` chưa có → `CREATE DATABASE` + chạy `db/schema.sql` → 4 bảng `bug_reports, evidence_master, game_saves, users`.
  - B2 `mvn spring-boot:run`: `Tomcat started on port 8080`, `ddl-auto=validate` qua (entity khớp schema), log không có WARN/ERROR.
  - B3 `npm run dev` (Vite 8.3.3) + trình duyệt tích hợp: Đăng ký (tài khoản test `e2e_tester01`, mật khẩu lưu ở scratchpad phiên, không ghi vào repo) → tự sang Đăng nhập → Đăng nhập → `/play` menu Phaser → New Game → hội thoại (câu hệ thống "chưa có lời thoại", đúng ISS-07) → InvestigationScene, Uy tín 100 → N: Sổ tay 4 tab (Evidence/People/Timeline/Statements) → Esc → S: "Đã lưu tạm trên trình duyệt (offline)" (đúng ISS-29) → F9: chủ trọ nửa thân bên phải nhép miệng, câu người khác → tối đi. Console: 0 lỗi suốt quá trình.
  - B4 DB: `users` có 1 dòng (`ROLE_PLAYER`, mật khẩu `{bcrypt}`); `game_saves` = 0 (đúng, save đang offline).
- **Kết quả:** README Bước 5–7 đạt. T-002 hoàn tất toàn bộ phần kiểm thử.
- **Điểm cần xác nhận:** commit/push/PR; tài khoản test `e2e_tester01` trong DB cục bộ có thể giữ để thử tiếp hoặc xóa.
- **Self-Check:** không sửa code, API, schema; kết quả ghi đúng phạm vi đã chạy. Trạng thái: xong.

### T-012 — Đọc gói `CHAPTER_1_COMPLETE`, lưu bộ nhớ, lập kế hoạch tích hợp Chương 1
- Ngày giao: 13/10/2026 — người dùng: "đọc hết tất cả các file có trong zip hiện tại, lưu lại toàn bộ nội dung để không cần đọc lại ở lần làm việc sau, từ những nội dung hãy tìm một hướng đi tối ưu nhất sau đó hãy lên 1 plan chi tiết từng phần cần hoàn thành. những nội dung trùng lặp không cần ghi lại vào bộ nhớ, nếu có gì xảy ra nằm ngoài yêu cầu hiện tại của tôi hãy hỏi lại tôi…"
- **Kế hoạch:** mục đích — nắm toàn bộ Chương 1, lưu để phiên sau không đọc lại, chọn hướng tích hợp; ảnh hưởng — chỉ thêm tài liệu (`docs/sources/chapter1/`, `docs/chapter1/CHAPTER1_MEMORY.md`, `CHAPTER1_PLAN.md`), cập nhật PROJECT_MEMORY (SRC-5, ISS-31, ghi chú ISS-02/06/07/15), CLAUDE.md (trỏ tới bộ nhớ Ch1), PROGRESS_LOG; **không sửa code**; rủi ro — tóm tắt sai so với gốc (giảm bằng cách giữ gói gốc trong repo, dẫn file/mục).
- **Bước con & kiểm tra:** B1 giải nén vào thư mục riêng, kiểm SHA-256 theo MANIFEST: 28/28 khớp · B2 chạy `validate_data.py` trên bản sao: PASS (1257 node, 43 ST, 12 EV, 6255 assertion) · B3 đọc README_FIRST, MANIFEST, INTEGRATION_PROMPT, DATA_CONTRACT, validation/* · B4 đọc Bible 1.3 (602 dòng), Project.docx mới (so diff với bản cũ), Phase.docx, MASTER_PROMPT, 2 hồ sơ lịch sử · B5 đọc 5 kịch bản; xác nhận ALL_SCRIPTS = ghép nguyên văn 5 file · B6 phân tích `chapter1.json` (loại node, 19 predicate, 38 statementRules, deduction, runtimePolicy), danh mục, state v2, source-map (runtimeText trùng text node), assets · B7 kiểm hiện trạng repo trên máy (T-009..T-011 của Claude Code) · B8 viết bộ nhớ + kế hoạch · B9 ghi lên máy.
- **Phát hiện chính:** (1) `reference/Project.docx` là **bản mới** của SRC-1 — Java (đóng ISS-02), thêm §3.1/§4.1 mâu thuẫn cấu trúc đã áp dụng, bỏ câu autosave → ISS-31; (2) gói cung cấp đủ định dạng + lời thoại → giải ISS-07/ISS-06; ΔP −15/−20 → giải ISS-15; (3) 5 route `blocked` ở NO_HANDLING/NORMAL_REPLACEMENT không bao giờ tới vì đứng sau route `wrong` cùng thẻ — validator dùng first-match theo mảng → engine phải theo đúng như vậy; (4) gói ghi Phaser 3, dự án Phaser 4.2.1 (DEC-005) — chỉ cần adapter; (5) repo mới có ảnh Hòa, thiếu toàn bộ background + 5 nhân vật + ảnh Evidence.
- **Hướng đề xuất:** narrative engine JS thuần chạy `chapter1.json` + scene Phaser làm phần hiển thị (chi tiết `CHAPTER1_PLAN.md`).
- **Cần xác nhận:** Q1–Q5 (mục 7 kế hoạch).
- **Self-Check:** chỉ dùng nội dung gói + repo; không thêm đặc tả/lời thoại; các đề xuất ghi [ĐỀ XUẤT]. Trạng thái: xong phần đọc/lưu/kế hoạch; triển khai chờ duyệt.

### T-013 — Ghi quyết định Q1: giữ nguyên cấu trúc dự án
- Ngày giao: 13/10/2026 — người dùng: "ở Q1 giữ nguyên cấu trúc hiện tại của đồ án"
- **Kế hoạch:** mục đích — ghi quyết định để mọi phiên sau theo đúng; ảnh hưởng — PROJECT_MEMORY (thêm DEC-009; ISS-01 đã xử lý, ISS-02 đóng, ISS-31 một phần), `docs/ARCHITECTURE.md` (thêm mục 3a bảng ánh xạ Project.docx bản mới §3.1/§4.1 → cấu trúc hiện tại), `docs/chapter1/CHAPTER1_PLAN.md` + `CHAPTER1_MEMORY.md` (đánh dấu Q1 đã trả lời), `CLAUDE.md` (dòng SRC-5 bỏ "chờ Q1", trỏ DEC-009); **không sửa code**; rủi ro — hiểu sai phạm vi câu trả lời (đã ghi rõ cách hiểu trong DEC-009 để người dùng sửa nếu cần).
- **Cách hiểu đã ghi:** giữ cấu trúc hiện tại, không theo §3.1/§4.1, không thêm Redux; Project.docx bản mới được dùng làm bản tham chiếu kỹ thuật (ví dụ backend Java).
- **Còn mở:** Q2 (autosave), Q3 (định dạng dữ liệu Chương 1), Q4 (văn bản P2–P4), Q5 (asset).
- **Self-Check:** chỉ ghi quyết định người dùng vừa đưa và bảng ánh xạ thực tế; không đổi code/đặc tả khác. Trạng thái: xong.

### T-014 — Ghi quyết định Q2: giữ tính năng autosave
- Ngày giao: 13/10/2026 — người dùng: "Q2 vẫn giữ tính năng auto save"
- **Kế hoạch:** mục đích — ghi quyết định để phiên sau và WP-C8 làm đúng; ảnh hưởng — PROJECT_MEMORY (thêm DEC-010; ISS-31 đóng; REQ-030 ghi căn cứ giữ theo DEC-010), `docs/chapter1/CHAPTER1_PLAN.md` (Q2 đã trả lời, WP-C8 bước 3 cụ thể hóa), `CHAPTER1_MEMORY.md` (Q2 đã trả lời); **không sửa code** — `game/systems/autosave.js` + test đã đúng REQ-030 nên giữ nguyên; rủi ro — hiểu sai phạm vi (đã ghi rõ cách hiểu trong DEC-010).
- **Cách hiểu đã ghi:** giữ đúng REQ-030 (lưu thủ công bất kỳ lúc nào + tự động mỗi 5 phút + khi có sự kiện quan trọng); khi tích hợp Chương 1, sự kiện quan trọng = hiệu ứng `collect_evidence` và `save_checkpoint`.
- **Còn mở:** Q3 (định dạng dữ liệu Chương 1), Q4 (văn bản P2–P4), Q5 (asset).
- **Self-Check:** chỉ ghi quyết định người dùng vừa đưa; không đổi code/đặc tả khác. Trạng thái: xong.

### T-015 — Flow tổng hợp và các flow chi tiết kèm code
- Ngày giao: 16/10/2026 — người dùng: "với những gì đã chạy được trong project, làm ra cái flow tổng hợp và các flow chi tiết bao gồm code."
- **Kế hoạch:** mục đích — tài liệu luồng hệ thống dựa trên code thật; ảnh hưởng — **không sửa file nào trong repo**, chỉ tạo trang Artifact riêng (riêng tư, của người dùng); rủi ro — mô tả sai trạng thái "đã chạy" (giảm bằng cách lấy trạng thái từ T-009..T-011 và đọc code thật), đoạn code lệch file (giảm bằng script cắt theo số dòng từ bản đã đối chiếu với máy).
- **Bước con & kiểm tra:** B1 stage `frontend/src` (50 file) từ máy, `cmp` với bản sao: khớp; Java quá sâu để stage → dùng bản sao, 32/32 file trùng kích thước với máy · B2 đọc toàn bộ code + PROGRESS_LOG T-009..T-011 · B3 viết 14 flow (sơ đồ Mermaid, các bước, trạng thái, 70+ đoạn code trích nguyên văn có đường dẫn + số dòng) + bảng API, EventBus, test · B4 kiểm tra: ranh giới từng đoạn trích (in dòng đầu/cuối), bố cục desktop/điện thoại/sáng/tối bằng Playwright (không tràn ngang). **Chưa kiểm được:** Mermaid render thật (mạng chặn cdnjs/npm) — đã rà cú pháp bằng tay.
- **Phát hiện ghi lại:** `DeductionScene`, `BadEndingScene` chưa có đường vào; `runtime.penalize` / `collectEvidence` chưa được gọi; `Hotspot` chưa đặt vào scene; sự kiện `ui:toast` và `notebook:entry-added` chưa có bên nghe; API save/load/bug report có code nhưng chưa có request thật (ISS-29, chưa có UI).
- **Self-Check:** không đổi code/đặc tả/API; không chạy lại test (dùng kết quả T-009/T-010 và ghi rõ). Trạng thái: xong.

### T-016 — Xác định vị trí lưu dữ liệu hội thoại
- Ngày giao: 16/10/2026 — người dùng hỏi: "đoạn hội thoại của nhân vật hiện đang được lưu ở vị trí nào"
- **Kế hoạch:** mục đích — đối chiếu vị trí dữ liệu hội thoại runtime với nguồn kịch bản Chương 1; ảnh hưởng — không sửa code, chỉ cập nhật nhật ký; rủi ro — nhầm file runtime rỗng với dữ liệu nguồn đầy đủ.
- **Bước con & kiểm tra:** đọc `dialogueData.js`, `PreloadScene.js`, `DialogueScene.js`; kiểm tra `frontend/public/assets/dialogues/chapter-1.json`; đối chiếu `docs/sources/chapter1/data/chapter1.json` và các file `scripts/`.
- **Kết quả:** runtime đang nạp `frontend/public/assets/dialogues/chapter-1.json`, nhưng `dialogues` hiện rỗng; dữ liệu Chương 1 đầy đủ đang ở `docs/sources/chapter1/data/chapter1.json` và nội dung kịch bản đọc được ở `docs/sources/chapter1/scripts/`.
- **Self-Check:** không đổi code/đặc tả/API; chưa chạy test vì chỉ tra cứu vị trí dữ liệu. Trạng thái: xong.

### T-017 — Đổi tên thư mục `features/game` → `features/play`
- Ngày giao: 16/10/2026 — người dùng: "2 folder game nằm ở vị trí dể bị nhầm lẫn, hãy đỗi tên để dể phân biệt hơn"; chọn phương án "Chỉ đổi features/game → features/play".
- **Kế hoạch:** mục đích — phân biệt trang React `/play` với thư mục Phaser `game/`; ảnh hưởng — `AppRouter.jsx` (1 import), `game/index.js` (1 chú thích), `docs/ARCHITECTURE.md`, `docs/chapter1/CHAPTER1_PLAN.md`, `CLAUDE.md` (thêm dòng phân biệt), PROJECT_MEMORY (DEC-011); rủi ro — sót import làm build lỗi (đã grep: không còn `features/game` trong code/tài liệu đang dùng), mất lịch sử git (dùng `git mv`).
- **Bước con:** B1 sửa import + tài liệu, ghi lên máy (xong) · B2 **người dùng** chạy `git mv` (phiên này không di chuyển/xóa được thư mục trên máy) · B3 **người dùng** chạy `npm run check` · B4 xác nhận lại.
- **Lưu ý:** giữa B1 và B2, `npm run dev` sẽ báo không tìm thấy `@/features/play/...` — bình thường, hết sau khi chạy `git mv`.
- **Self-Check:** không đổi logic, API, CSDL, test; lịch sử T-xxx cũ giữ nguyên đường dẫn cũ. Trạng thái: chờ B2–B3.

### T-018 — Đọc lại tài liệu và nguồn trước phần chính theo cốt truyện
- Ngày giao: 20/10/2026 — người dùng: "phần demo vừa rồi được đánh giá khá tích cực bây giờ chúng tôi sẽ bắt tay vào làm phần chính đúng với tuyến cốt truyện của game, trước tiên hãy đọc lại cái file .md và các file source để nắm rõ hướng đi và chờ yêu cầu của tôi"
- **Đã đọc (bản trên máy không đổi từ 16/10, bản sao khớp kích thước):** CLAUDE.md, PROJECT_MEMORY.md (toàn bộ A–H), PROGRESS_LOG.md, docs/ARCHITECTURE.md, docs/CONVENTIONS.md, docs/chapter1/CHAPTER1_MEMORY.md + CHAPTER1_PLAN.md; docs/sources: working-rules.md, Story.txt, Project.md; gói chapter1: README_FIRST, CLAUDE_INTEGRATION_PROMPT, DATA_CONTRACT, STORY_AND_GAMEPLAY_BIBLE (602 dòng), 5 kịch bản P1/P2/P3/FINAL/P4 (đủ), PLAYTEST_CHECKLIST.
- **Phát hiện:** `docs/ARCHITECTURE.md` dòng 61 (cây thư mục) còn `features/game/` — sót ở T-017; `docs/CONVENTIONS.md` mục 7 ghi nhánh `main/feature/*` trong khi thực tế làm trên `Nhan` → PR vào `master` (CLAUDE.md).
- **Self-Check:** chỉ đọc, không sửa code/tài liệu ngoài log. Trạng thái: xong, chờ yêu cầu.

### T-019 — Kế hoạch dự án + thiết kế Menu chính & Cài đặt (ảnh xem trước)
- Ngày giao: 20/10/2026 — người dùng: "hãy lên một bản kế hoạch chi tiết cho dự án hiện tại, bước tiếp theo tôi muốn là thiết kế một menu game trông có gu và hợp với game trinh thám … thêm vào phần lựa chọn setting … độ phân giải và cả ngôn ngữ gồm có tiếng việt và tiếng anh. sau đó hãy tạo ra một bức ảnh về phần menu để cho tôi xem trước. nếu tôi đồng ý thì mới bắt đầu lên kế hoạch code"
- REQ / nguồn: Project.docx §3.2 (New Game / Load Game / điều khiển âm thanh); yêu cầu 20/10 (cài đặt đồ họa, âm thanh, độ phân giải, ngôn ngữ VI/EN); bảng màu `game/ui/theme.js`.
- **Bước con 1 (xong):** tạo `docs/PROJECT_PLAN.md` [ĐỀ XUẤT — chờ duyệt]: hiện trạng, lộ trình A–F (A = Menu & Cài đặt, B = tích hợp Chương 1 WP-C1…C10, C = lưu server + Load Game, D = Admin, E = E2E + bảo vệ giai đoạn 1, F = Capstone 2/3), đặc tả Menu/Cài đặt, ảnh hưởng, rủi ro, đề xuất, câu hỏi Q-M1…Q-M5, các bước M1…M4.
- **Bước con 2 (xong):** ảnh xem trước = artifact Design "Menu The Unspoken" (2 artboard 1280×720, bấm được): Menu chính (Ván mới / Tiếp tục điều tra / Cài đặt, nút tắt tiếng, cảnh hành lang mưa + cửa 204 — ảnh nền là hình minh họa tạm dựng bằng CSS) và Cài đặt (3 tab Hiển thị / Âm thanh / Trò chơi; chọn English đổi nhãn giao diện ngay). Nhãn tiếng Anh chỉ là giao diện; KHÔNG dịch lời thoại. Không có tiết lộ cốt truyện.
- **File đã tạo/sửa:** `docs/PROJECT_PLAN.md` (mới), `PROGRESS_LOG.md` (mục này + ĐIỂM KHÔI PHỤC). Không sửa code, API, CSDL, cốt truyện.
- **Self-Check:** đặc tả trong bản thiết kế khớp PROJECT_PLAN §3.3; phần [ĐỀ XUẤT] (bố cục, phông, mặc định) chờ duyệt; số phiên bản để `[phiên bản]` (chưa có nguồn). Trạng thái: chờ duyệt ảnh + Q-M1…Q-M5.

### T-020 — Thực thi Menu chính & Cài đặt (DEC-012)
- Ngày giao: 20/10/2026 14:00 — người dùng: "tôi chốt thiết kế hiện tại, về phần tùy chĩnh setting về display, vì là game trên web nên tôi nghĩ nó không cần thiết hãy bỏ phần đó đi và giữ nguyên các phần còn lại, chốt phướng án và thực thi"
- **Bước con 1 (xong):** `docs/PROJECT_PLAN.md` — mục 3 đánh dấu ĐÃ CHỐT (DEC-012), bỏ tab Hiển thị, trạng thái Q-M1…Q-M5, kế hoạch code 3.9 (file mới/sửa, rủi ro, thứ tự). Bản thiết kế "Menu The Unspoken" cập nhật: màn Cài đặt còn 2 tab.
- **Bước con 2 (xong):** logic thuần + test — `game/systems/settings.js`, `i18n.js`, `menuNavigation.js`, `game/core/settingsStore.js`, `game/data/uiText.js` (VI/EN) + 4 file test.
- **Bước con 3 (xong):** giao diện — `MainMenuScene` làm lại, `SettingsScene` mới (2 tab), `ui/{MenuItem, IconButton, PanelButton, SegmentedControl, Slider, Toggle, ConfirmDialog, MenuBackdrop}.js`; áp dụng thiết lập vào `DialogueBox`/`DialogueScene` (tốc độ chữ, cỡ chữ, tự chuyển thoại) và âm thanh (`game/index.js`); i18n Preload/Room/Notebook/BadEnding/CredibilityBar; `useGameBridge` gửi `save:availability`; font JetBrains Mono (rút gọn 29 KB, OFL) + `@font-face` 3 font + README cách thêm 2 font còn thiếu.
- **Bước con 4 (xong):** tài liệu — ARCHITECTURE (cây thư mục, sửa dòng `features/game` sót từ T-017, luồng thiết lập), CLAUDE.md, PROJECT_MEMORY (DEC-012, REQ-020).
- **File đã tạo/sửa (đã ghi lên máy, 43 file):** xem `docs/PROJECT_PLAN.md` mục 3.9; thêm `game/ui/CredibilityBar.js` (nhãn uy tín theo ngôn ngữ).
- **Self-Check (thật sự đã chạy):** 11 file test / 63 ca qua (bộ chạy thay thế giả lập describe/it/expect — KHÔNG phải Vitest); ESLint 10 với bộ luật tối thiểu: 0 lỗi; Prettier 3.8.1 `--check src`: đạt; chạy game thật (Phaser 4.2.1 lấy từ node_modules trên máy) trong Chromium không giao diện: menu, hộp xác nhận Ván mới, Cài đặt 2 tab, đổi English + Lưu + tải lại trang (giữ English), thanh trượt nghe thử 0.4 rồi Esc trả 0.8, nút loa (mute + lưu), ↑ ↓ bỏ qua mục khóa, hội thoại cỡ 26 px / hiện ngay / tự chuyển sang màn điều tra, HUD + Sổ tay tiếng Anh — đều đúng. **Chưa chạy:** `npm run check` (Vitest, ESLint đầy đủ, Vite build) và trang React `/play` thật (dev server trên máy không mở được từ trình duyệt của AI). Trạng thái: chờ người dùng kiểm tra.

### T-021 — Kế hoạch phòng 201: di chuyển nhân vật + tutorial
- Ngày giao: 22/10/2026 — người dùng gửi 1 ảnh nền phòng + 3 tấm nhân vật (đi trái, đi phải, 4 góc đứng): "map đầu tiên sau khi người chơi xem xong intro … tutorial (di chuyển tương tác, hướng dẫn cơ bản) … làm cả phần di chuyển cho nhân vật … tránh … xuyên tường hay xuyên qua các bố cục. chia ra thành các phase"
- Căn cứ: Project.docx §3.2 (RoomInvestigationScene 2.5D, điều khiển nhân vật hoặc trỏ chuột); Bible 1.3 A3 (thám tử ở 201, chưa nêu tên); P1_001 (201, 21:35); `assets.integration.json` (room201 = null).
- **Đã làm:** đo ảnh (nền 2730×1536; 3 tấm 2752×1536, hình đi chồng nhau theo chiều ngang, nền be đặc, có dấu ✦ ở góc); dựng ảnh xem trước vùng đi được / vật cản / điểm tương tác / tỉ lệ nhân vật ở 3 độ sâu; viết `docs/ROOM201_TUTORIAL_PLAN.md` (10 phase P0–P9, điều khiển, va chạm đa giác, tutorial, rủi ro, câu hỏi Q-R1…Q-R9); thêm dòng A2 vào lộ trình `docs/PROJECT_PLAN.md`.
- **File đã tạo/sửa:** `docs/ROOM201_TUTORIAL_PLAN.md` (mới), `docs/images/room201_overlay_preview.jpg` (mới), `docs/PROJECT_PLAN.md`, `PROGRESS_LOG.md`. Không sửa code. Ảnh người dùng gửi CHƯA chép vào repo (chờ Q-R8 bản không dấu).
- **Self-Check:** số đo vùng sàn/vật cản là ước lượng trên ảnh thu nhỏ 1280×720 (TẠM, sẽ chỉnh bằng công cụ debug ở P2); không viết mô tả đồ vật (nội dung truyện — Q-R3). Phát hiện thêm: thư mục gốc repo trên máy có `package-lock.json` 120 byte mới xuất hiện (22/10) — có thể do chạy `npm install` nhầm ở thư mục gốc; chưa xóa, chờ người dùng.

### T-022 — Thực thi phòng 201: di chuyển nhân vật + tutorial (DEC-013)
- Ngày giao: 22/10/2026 18:13 — người dùng trả lời Q-R1…Q-R9 (nguyên văn: `docs/ROOM201_TUTORIAL_PLAN.md` mục 7a) + "kiểm tra xem file [package-lock.json gốc] đúng chỗ không … nếu dư thừa hãy xóa, kiểm tra trước khi thực hiện".
- **Bước con 1 — kiểm tra `package-lock.json` gốc:** nội dung `{"name": "The-Unspoken_Psychological-Detective-Game", "lockfileVersion": 3, "requires": true, "packages": {}}` (120 byte, 22/10); thư mục gốc KHÔNG có `package.json`; lock thật của dự án là `frontend/package-lock.json` (129 784 byte) → file gốc là **thừa** (do chạy `npm install` ở thư mục gốc), không cần di chuyển. AI **không xóa được** (công cụ trên máy không có lệnh xóa) → đưa lệnh cho người dùng.
- **Bước con 2 — P1 asset:** xóa dấu ✦ trên ảnh nền + 3 tấm (đảo phép trộn alpha, dò độ đậm theo từng ảnh); tách nền be; phát hiện tấm "đi phải" là ảnh lật gương của tấm "đi trái" → dùng 6 hình đi trái + lật khi đi phải; atlas `detective.webp/json` (10 khung 264×604, gốc giữa-đáy); nền `room201.webp` 1920×1080; lớp che góc dưới phải; bản sạch độ phân giải gốc vào `art-source/`; script tái tạo `scripts/art/build_room201_assets.py` (đã chạy lại, ra cùng kết quả).
- **Bước con 3 — P2–P3 logic + test:** `data/rooms/{index,room201}.js`; `systems/{walkArea,pathfinding,depthScale,facing,tutorial}.js` + test; `room201.test.js` (điểm xuất hiện/điểm đứng hợp lệ và đi tới được); `GameSession.tutorial` vào `saveDataJson`.
- **Bước con 4 — P4–P7 giao diện:** `entities/Player.js`; `RoomInvestigationScene` nạp phòng theo dữ liệu (nền, lớp che, nhân vật, hotspot, nhãn E, viền sáng, tutorial, bỏ qua bằng Esc, ra cửa, overlay debug F8); `ui/RoomWidgets.js`; `NotebookScene` nút "Lưu tiến trình" + kết quả qua sự kiện `save:result`; **bỏ phím S lưu**; `useGameBridge` gửi `save:result`; Ván mới → phòng 201; chuỗi VI/EN.
- **File đã tạo/sửa (ghi lên máy):** xem `docs/ROOM201_TUTORIAL_PLAN.md` mục 5 + `docs/ARCHITECTURE.md`; tài liệu: ARCHITECTURE, CONVENTIONS ("Phòng 2.5D mới"), CLAUDE.md, PROJECT_MEMORY (DEC-013), ROOM201_TUTORIAL_PLAN (mục 7a).
- **Self-Check (thật sự đã chạy):** 17 file test / 91 ca qua bằng bộ chạy thay thế (KHÔNG phải Vitest); ESLint 10 bộ luật tối thiểu 0 lỗi; Prettier đạt; chạy Phaser 4.2.1 thật trong Chromium không giao diện: Ván mới vào phòng 201; giữ phím đâm vào tường trái/ghế/bàn → dừng đúng mép (không xuyên); đi chéo xuống góc phải dừng trước thùng gỗ; bấm chuột tới vòng sáng → bước 2; bấm vào lịch → tự đi tới, quay lưng, mở khung "[Chờ nội dung …]" → bước 3; N mở Sổ tay, Esc đóng → bước 4; bấm cửa → ra DialogueScene, tutorial "done"; ra cửa khi chưa xong → thông báo khóa; Esc → hộp "Bỏ qua hướng dẫn?"; đứng sau tủ góc phải → lớp che đè đúng; hoạt ảnh đi chạy khung 0→1→2, đi phải lật gương, đi lên dùng tư thế sau + nhún; nút Lưu trong Sổ tay hiện kết quả (giả lập React). **Chưa chạy:** `npm run check`, trang React `/play` thật, overlay F8 (chỉ bật khi debug).

### T-023 — Chọn góc nhìn phòng 201 + file nội dung xem đồ vật (DEC-014)
- Ngày giao: 24/10/2026 13:23 — "với góc nhìn hiện tại thì nhân vật đang quá to … còn có góc nhìn nào khác mà k cần thay đổi map lẫn nhân vật …" → AI dựng ảnh so sánh A/B/C (`so-sanh-goc-nhin.jpg`); 13:34 người dùng "chốt phương án B … chỉ file để có thể thêm nội dung khi xem các đồ vật".
- **Đã làm:** `room201.js` — vùng đi tới y ≤ 615, chiều cao 215 → 330 px, bỏ `textKey`, thêm `inspectContent`; `WALK_SPEED` 300 → 220 (TẠM); file nội dung mới `frontend/public/assets/dialogues/room201-inspect.json` (5 đồ vật, đang rỗng, có khóa `_huong_dan`); `data/rooms/inspectContent.js` + test (đọc an toàn, bỏ câu rỗng, kiểm file có đủ khóa); `RoomInvestigationScene` hiện nhiều câu, E để sang câu; `PreloadScene` nạp file nội dung; test `room201.test.js` thêm kiểm DEC-014; tài liệu CLAUDE.md, ARCHITECTURE, CONVENTIONS, ROOM201_TUTORIAL_PLAN (mục 7b), PROJECT_MEMORY (DEC-014).
- **Self-Check:** 18 file test / 95 ca qua (bộ chạy thay thế, KHÔNG phải Vitest); ESLint bộ luật tối thiểu 0 lỗi; Prettier đạt; chạy Phaser thật: giữ ↓ dừng ở y 606 (không xuống dải sát camera), nhân vật cao ~330 px ở gần; thử tạm 2 câu cho lịch treo tường → hiện câu 1, E → câu 2, E → đóng (đã trả file về rỗng). **Chưa chạy:** `npm run check`.
- **Ghi lên máy (24/10):** thư mục người dùng kết nối lần này là bản sao trên Desktop `C:\Users\Admin\Desktop\The Unspoken_Psychological Detective Game` (đã có đủ T-022, kích thước các file khớp bản AI ghi lần trước) → 14 file T-023 ghi vào đây. Ở gốc thư mục này vẫn có `package-lock.json` 120 byte (rỗng) và `node_modules/` chỉ chứa phaser + eventemitter3 (ngày 08/10) — đều thừa, chờ người dùng đồng ý xóa.

### T-024 — Hành lang tầng 2 sau cửa phòng 201 (DEC-015)
- Ngày giao: 24/10/2026 14:07 — người dùng gửi ảnh hành lang (A201–A205, lan can, cầu thang): "khi nhân vật chính mở cửa phòng 201 ra sẽ đến hành lang, hãy làm nhân vật đi lại thích hợp trên map này."
- **Bước con 1 — đo + asset:** `art-source/hallway/hallway.png` (ảnh gốc 1672×940, không có dấu ✦); `scripts/art/build_hallway_assets.py` xuất `hallway.webp` + 3 lớp che (`hallway-occ-railing.webp` = lan can sau theo vị trí song chắn đo tay + đoạn lan can trái tách màu; `hallway-occ-plant-a/b.webp` = 2 chậu cây cạnh lan can, tách theo lá xanh + chậu).
- **Bước con 2 — dữ liệu + code:** `data/rooms/hallway.js` (vùng đi chữ U, mép dưới y 624, cao 222→330 px TẠM, 6 hotspot, `entrances`); `room201.js` (cửa có `target: hallway`, `entrances.hallway`); `rooms/index.js` (+`entrancePoint`); `RoomInvestigationScene` (cửa sang phòng khác bằng restart + tối/sáng 250 ms, lớp che `baseY` xếp cùng thang với nhân vật 20 + y/1000, nhãn `promptKey`, dọn tham chiếu + gỡ listener RESUME khi restart); `uiText` (`interact.enter`, `hallway.*` VI/EN); `public/assets/dialogues/hallway-inspect.json` (5 khóa rỗng); test `hallway.test.js`, `rooms.test.js` (kiểm chung MỌI phòng: lối vào/điểm đứng đi tới được, cửa nối hai chiều), `inspectContent.test.js` đổi sang kiểm mọi phòng.
- **Self-Check:** 20 file test / 110 ca qua (bộ chạy thay thế, KHÔNG phải Vitest); ESLint bộ luật tối thiểu 0 lỗi; Prettier đạt; Phaser thật trong Chromium: phòng 201 → bấm cửa → hành lang, đứng (200, 605) trước A201; giữ → dừng ở x 388 (chậu cây), ↑ dừng ở chân tường y 463, → đi ra sau lan can, ↓ bị lan can chặn; bấm A204 → đi tới (629, 460), lan can che chân đúng, hiện "[Chờ nội dung]"; bấm cầu thang → (938, 460); bấm cửa A201 → về phòng 201 ở cửa (190, 585). Ảnh gửi người dùng: `hanh-lang-chay-that.jpg`. **Chưa chạy:** `npm run check` thật.
- **Chờ xác nhận:** A204 → phòng 204 (P2); cầu thang; "giấy khen" (gói Chương 1 đặt trên tường hành lang, ảnh này chưa thấy); lưu vị trí phòng trong file lưu (đổi dữ liệu lưu → cần duyệt); điểm xem cho bảng Nội quy/Thông báo.

### T-025 — Kiểm tra hiện trạng + lộ trình & bảng việc cần làm
- Ngày giao: 27/10/2026 16:04 — "kiểm tra project hiện tại và lên các implement và table of todo tasks".
- **Đã kiểm tra (chỉ đọc, trên máy):** `master` = `origin/master` = `b744ce7` (duy-nkd, 24/10 14:56, "Add hallway exploration and room inspection content") — đã gồm T-023 + T-024; không còn thay đổi chưa commit; không còn `_migration/`. Cây `frontend/src` (scene, systems, rooms), backend 32 lớp Java + 1 test, asset có trong `public/assets`, PROJECT_MEMORY C/E/H, CHAPTER1_PLAN.
- **Phát hiện:** (1) `b744ce7` đưa `backend/src/main/resources/application.yml` có mật khẩu MySQL ghi cứng (giá trị mặc định 6 ký tự của `DB_PASSWORD`) lên `master`; (2) commit đẩy thẳng `master`; (3) `frontend/package-lock.json` bị bỏ các trường `libc` (khác phiên bản npm); (4) `characters/main1–3.png` (937×1678, 5,2 MB, từ 2879879 ngày 09/10) không được code nào dùng; (5) nhiều trạng thái REQ ở PROJECT_MEMORY mục C còn từ 08/10.
- **Đã làm:** viết lại `docs/PROJECT_PLAN.md` mục 1 (hiện trạng 27/10), mục 2 (lộ trình GĐ 0–8), mục 2a (bảng TODO TD-01..TD-45: Ai/Ưu tiên/Cỡ/Chặn bởi/Xong khi), mục 2b (rủi ro); mục 3 cũ (Menu & Cài đặt) giữ làm lịch sử. PROJECT_MEMORY G4 trỏ tới bảng mới. Không sửa code, không chạy git ghi.
- **Self-Check:** số liệu trong bảng lấy từ file thật trên máy (git log/show chỉ đọc, `GIT_OPTIONAL_LOCKS=0`, không để lại `.lock`); không đưa giá trị mật khẩu vào tài liệu. Lịch tuần là ước tính (Tuần 1 = 07/10) — cần nhóm xác nhận.

### T-026 — Ảnh phòng 204 + hoạt ảnh đi của thám tử (31/10 → 02/11/2026)
- 31/10: hướng dẫn prompt vẽ phòng 204 theo gói Chương 1 (9 vị trí vật chứng, bồn rửa sau vách/WC khuất khu bàn); người dùng chốt bản có WC góc trước-phải, cửa sổ tường phải giống phòng 201. AI xóa dấu ✦, cắt 16:9 → `art-source/room204/room204.png` (2731×1536) + `frontend/public/assets/images/backgrounds/room204.webp` (1920×1080), ghi vào máy `C:\The-Unspoken_Psychological-Detective-Game` (người dùng đã commit "Add room 204 background for Chapter 1" trên nhánh `Nhan`). Ảnh còn lệch gói: tờ khảo sát có dấu X + chữ, gạt tàn có khói, giấy thành xấp, hộp thuốc trên sàn, vòng bụi mờ (→ TD-51).
- 31/10: hoạt ảnh đi ngang 6 khung (tấm 8 hình nền xanh, dùng hình 1,2,3,5,6,7) → `scripts/art/build_detective_walk.py`, thay 6 ô `walk-side-*` trong `detective.webp` (giữ idle), `WALK_ANIM_FPS` 10 → 8 (TẠM, khớp bước chân ở WALK_SPEED 220); chạy thật trong phòng 201: đúng khung, lật gương đúng, không lỗi console. Chưa chạy `npm run check`.
- 31/10 → 02/11: người dùng chuyển sang thiết kế thám tử mới (gói 4 hướng do GPT dựng). AI đo từng bản: V1 bước quá ngắn (chân lướt ×7), giày nhân đôi; V3 đầu không nhấp nhô; V4 hướng lên/xuống khóa chân theo 220 px/giây → chân sau cao ngang gối, cả 2 bàn chân lơ lửng; V5 số đo đạt nhưng thân trên đứng yên tuyệt đối + chân lên/xuống bị bóp méo như ống; V6 (vẽ lại 12 khung) GPT tự báo KHÔNG đạt (thứ tự tư thế lộn, thừa tay, chân trượt 10–22 px). Đề xuất cách A (V6b: giữ rig V5 + thân trên chuyển động + vẽ lại 6 hình thân dưới lên/xuống, lật gương bước kia) — đang chờ GPT. Đề xuất tốc độ đi dọc 0,4 × 220 = 88 px/giây (TD-47) — chờ duyệt.
- Không sửa code game ngoài `gameplay.js` + atlas ở trên.

### T-027 — Lập bảng việc sống `docs/TODO.md`
- Ngày giao: 03/11/2026 09:51 — "hãy tạo ra todo list các việc cần làm trước vào project sau đó chúng ta sẽ thống nhất xem nên làm việc nào trước".
- Đã kiểm tra máy `dangthenhan` (`C:\The-Unspoken_Psychological-Detective-Game`, nhánh `Nhan`): commit gần nhất "Add room 204 background for Chapter 1"; `PROGRESS_LOG.md`, `PROJECT_MEMORY.md`, `docs/PROJECT_PLAN.md` trên máy này là bản T-024 (chưa có T-025 vốn chỉ nằm ở máy Desktop) → ghi bản T-025 + T-026 + T-027 vào máy này để hai máy hội tụ (TD-46).
- **Đã làm:** tạo `docs/TODO.md` — 9 nhóm A–I (dọn nền, quyết định, map, Chương 1, lưu/tải, hoạt ảnh, asset, Admin, kiểm thử), mã TD-01..TD-45 giữ như PROJECT_PLAN 2a + TD-46..TD-63 mới (đồng bộ 2 máy, tốc độ dọc, thiết kế thám tử, thi thể Tùng, phòng 204, hoạt ảnh V6b, chân dung, ảnh vật chứng); mỗi việc có Ai/Ưu tiên/Cỡ/Chặn bởi/Trạng thái/Đề xuất + cột "Thứ tự (chốt)" để trống. PROJECT_PLAN 2a và PROJECT_MEMORY G4 trỏ tới TODO.md. Không sửa code.
- **Self-Check:** mọi việc lấy từ PROJECT_PLAN 2a (27/10), CHAPTER1_PLAN, CHAPTER1_MEMORY §8 (asset, biểu cảm), nhật ký T-024..T-026; trạng thái ❓ ở TD-01/TD-03 vì AI chưa được báo kết quả. Thứ tự là đề xuất, chờ nhóm chốt.

### T-028 — Dọn nền: TD-01, TD-02, TD-46, TD-03
- Ngày giao: 03/11/2026 09:54 — "Dọn nền: TD-01, TD-02, TD-46, rồi TD-03." (nhóm chốt thứ tự đầu tiên trong `docs/TODO.md`).
- **TD-02 (xong phần AI):** `backend/src/main/resources/application.yml` trên máy `C:\The-Unspoken…`: `password: ${DB_PASSWORD:<giá trị cũ>}` → `${DB_PASSWORD:}` + chú thích; không đổi dòng nào khác (đã đối chiếu: chỉ 1 chỗ DB_PASSWORD). Giá trị cũ KHÔNG được ghi vào tài liệu. Mật khẩu cũ vẫn còn trong lịch sử git (commit `b744ce7`) → bắt buộc TD-01. `JWT_SECRET` vẫn có giá trị mặc định cho dev (thiết kế T-002, Project.docx §4.2) — không thuộc TD-02.
- **TD-01, TD-46, TD-03:** việc trên máy người dùng (đổi mật khẩu, git, chạy kiểm tra) — AI gửi hướng dẫn từng bước; AI không tự nhập/đổi mật khẩu (quy tắc an toàn), không chạy git trong thư mục máy.
- `docs/TODO.md`: cột "Thứ tự (chốt)" TD-01=1, TD-02=2, TD-46=3, TD-03=4; TD-02 → 🔄.
- **Self-Check:** đọc lại file sau sửa (LF, 1 dòng thay). Chưa chạy backend với cấu hình mới — nếu máy chưa đặt biến `DB_PASSWORD` thì backend báo `Access denied` (README bước 6 đã hướng dẫn đặt biến).

### T-029 — TD-03: chạy kiểm tra thật trên máy + sửa lỗi test
- Ngày giao: 03/11/2026 — "chạy kiểm tra" (`npm install`, `npm run check`, `mvn clean test`), sau đó "Có, sửa đi".
- Máy: Node v24.18.0, npm 11.16.0, Maven 3.10.0, JDK 21.0.12. `_migration/` không còn.
- **Lần chạy 1:** `npm install` xong (npm audit: 10 lỗ hổng — 8 moderate, 2 high, chưa xử lý). Lint ✅, Prettier ✅, Vitest ❌ 109/110 — `inspectContent.test.js`: `R201_COATS` và `R201_WINDOW` trong `frontend/public/assets/dialogues/room201-inspect.json` là chuỗi, không phải danh sách. Build ✅ (cảnh báo font BeVietnamPro resolve lúc chạy — không phải lỗi). `mvn clean test` ✅ (mã thoát 0).
- **Sửa (người dùng đồng ý):** bọc 2 giá trị thành `["..."]`, GIỮ NGUYÊN chữ do nhóm viết (chữ hiện là nội dung thử, nhóm cần thay bằng lời thật).
- **Lần chạy 2:** `npm run check` ✅ — 20 file test, 110/110 test qua, build qua.
- TD-04 (CRLF `index.html`): kiểm `git ls-files --eol` → `i/lf w/lf`, Prettier qua → đánh dấu ✅.
- `docs/TODO.md`: TD-03, TD-04 → ✅. Chưa commit.

### T-030 — Cập nhật TODO sau dọn nền
- 03/11/2026 10:09: kiểm tra trên máy (dist mới build 10:05, surefire 4/4) xác nhận TD-03/TD-04 (T-029) xong; `docs/TODO.md`: TD-01 (máy `dangthenhan` không cần đổi, còn máy Desktop), TD-02 ✅ (push nhánh `Nhan`, commit `8ea663f`), TD-46 🔄, thêm TD-64 (`npm audit` 10 lỗ hổng).

### T-031 — DEC-016: chọn Data Contract 2.0 + kế hoạch theo phase
- Ngày giao: 03/11/2026 10:11–10:17 — giải thích Q3; so sánh định dạng tạm với Data Contract 2.0 theo cơ chế Ch1–5 (chọn câu, Press/Present, Sổ tay, vật chứng xuyên chương, suy luận, flashback, lưu server); người dùng: "vậy thì hãy làm theo Data Contract 2.0 (mạng nút) cho project này, lên kế hoạch chi tiết chia ra thành từng phase nhỏ".
- **Đã làm:** `PROJECT_MEMORY.md` thêm DEC-016 (đóng ISS-07; ISS-06/15/16 theo gói); `docs/NARRATIVE_ENGINE_PLAN.md` mới — kiến trúc `game/narrative/` (8 module JS thuần + test), 17 phase N0–N17 chia 5 giai đoạn, mốc A (bộ máy) → B (Phase 1) → C (Sổ tay & Suy luận) → D (Chương 1 hoàn chỉnh), bảng file ảnh hưởng, 7 câu cần trả lời (Q4, Q5, N-Q1..3, TD-49, ISS-29), rủi ro, ước lượng phiên; `docs/TODO.md`: TD-08 ✅, TD-16/17/18 gỡ chặn, ánh xạ TD ↔ N. Không sửa code.
- **Self-Check:** đối chiếu DATA_CONTRACT.md (14 kiểu nút, 15 toán tử, 6 hiệu ứng, luật Press/Present/Final/checkpoint), CLAUDE_INTEGRATION_PROMPT.md (11 yêu cầu), `chapter1.json` (836 242 byte, entryNode P1_001, phaseEntries, CH2_ENTRY là biên ngoài), MANIFEST (Phase 4 = A+S1+S2 đã được phép). Ước lượng phiên là dự đoán.

### T-032 — Trả lời Q4, Q5, N-Q1 (DEC-017); N-Q2 hoãn; phương án N-Q3
- Ngày giao: 03/11/2026 10:28 — "Q4: cứ áp dụng trước các văn bản có sẵn hiện tại nếu sau này thay đỗi sẽ thông báo. Q5: hãy làm đúng chỗ sau này nhóm sẽ cung cấp ảnh sau, chỉ cần dùng nhãn tên không cần tự tạo ảnh tạm. N-Q1 … khi vào game người chơi sẽ được chiếu một đoạn intro … tôi chấp nhận đề xuất của bạn. N-Q2: tôi chưa hiểu rõ nên tạm hoãn lại bước này. N-Q3: đưa ra hướng tốt nhất để tôi đọc qua thử để lựa chọn".
- **Đã làm:** PROJECT_MEMORY thêm DEC-017; `docs/NARRATIVE_ENGINE_PLAN.md` mục 6 + N7/N8/N10 cập nhật theo DEC-017 (Q4 tạm chốt, không ảnh tạm, thứ tự Ván mới → Intro → tutorial → P1_001); `docs/TODO.md`: TD-09 ✅ tạm, TD-10 ✅, TD-21 bỏ. Trình bày lại N-Q2 (để chốt trước N8) và 3 phương án N-Q3 (A chỉ `scene_location`, B thêm khối vị trí người chơi ngoài state v2 — đề xuất, C suy ra từ nút — không khuyên). Không sửa code.

### T-033 — N-Q2 (DEC-018) + so sánh chi tiết N-Q3
- Ngày giao: 03/11/2026 10:37 — "N-Q2: làm theo hướng tương tác với npc khi tới gần và nhấn nút. N-Q3: nêu chi tiết ưu nhược điểm của A B C".
- **Đã làm:** PROJECT_MEMORY DEC-018; kế hoạch N8 + mục 6 cập nhật; TODO ghi chú. Đọc 3 nút HUB trong `chapter1.json` (P1_HUB_MENU 7 lựa chọn, P3_HUB 13, P4_HUB 9) để lấy vị trí NPC đúng theo dữ liệu (Linh cửa 205, Hào bên lan can, Minh gần đầu cầu thang) và phân loại lựa chọn không phải NPC. So sánh A/B/C cho N-Q3 theo 8 tình huống (trả lời trong hội thoại). Không sửa code.

### T-034 — DEC-019 (N-Q3 = B) + N0: nhập dữ liệu Chương 1 & bộ kiểm tra (TD-16)
- Ngày giao: 03/11/2026 — "N-Q3: chốt cách B"; N0 là bước kế tiếp đã thống nhất trong `docs/NARRATIVE_ENGINE_PLAN.md`.
- **Kế hoạch (DEC-003):** mục đích — đưa dữ liệu gói Chương 1 vào chỗ game đọc được + có bộ kiểm tra chạy lại được khi nhóm sửa; ảnh hưởng — thêm 5 file JSON, `game/data/chapters.js` + test, `scripts/chapter1/validate.py`, README; không sửa code game hiện có, API, CSDL, cốt truyện; rủi ro — dữ liệu chép sai/lệch gói (kiểm SHA-256), validator ghi đè tài liệu gốc (chạy trên bản sao tạm), Windows đọc sai UTF-8 (`-X utf8`).
- **DEC-019** ghi vào PROJECT_MEMORY F; kế hoạch mục 6 (N-Q3 đã trả lời) + N6 (cách lưu/tải vị trí); TODO TD-28.
- **Dữ liệu:** chép `chapter1.json`, `evidence.json`, `people.json`, `statements.json`, `game-state.definitions.json` từ `docs/sources/chapter1/data/` vào `frontend/public/assets/chapters/chapter1/` — SHA-256 cả 5 file khớp `MANIFEST.json`. Không chép `source-map.json`, `chapter.schema.json`, `assets.integration.json` (chỉ dùng khi viết/kiểm tra).
- **Code:** `frontend/src/game/data/chapters.js` (`CHAPTER_DATA`, `chapterFileUrl`) — khai báo file dữ liệu theo chương, chưa nạp vào Preload (N3/N7 mới cần). `chapters.test.js` 7 test: phiên bản 2.0.0/chương 1; id nút duy nhất; mọi `next/targetNode/sourceNode/boardNode/entryNode/completionNode/phaseEntries` trỏ tới nút có thật hoặc `CH2_ENTRY`; biên ngoài `implemented: false`; vật chứng + lời khai được nhắc tới có trong danh mục; state v2 ban đầu (`P1_001`, `room201`, chưa có vật chứng); đường dẫn file.
- **Khác kế hoạch (báo người dùng):** test KHÔNG so SHA-256 với MANIFEST — vì DEC-017 cho nhóm sửa lời thoại ở bản game, test SHA sẽ luôn đỏ; SHA kiểm một lần lúc nhập + `validate.py` in thông tin "giống/khác bản gốc". Tên test `chapters.test.js` (cạnh module) thay cho `chapterData.test.js`.
- **`scripts/chapter1/validate.py`:** dựng bản sao tạm theo bố cục gói (`data/` + `scripts/*.md` + `validation/`), thay 5 file runtime bằng bản game, chạy `validate_data.py` bằng `python -I -X utf8`, in tóm tắt; `--source` chạy trên bản gốc. Không ghi vào repo. README thêm mục "Dữ liệu kịch bản Chương 1".
- **Kiểm tra đã chạy (trong môi trường AI, Linux):** `validate.py` → PASSED 6255 assertion, 1257 nút, 43 lời khai, 0 đích hỏng, 0 nút không tới được, "giống hệt bản gốc"; `--source` → PASSED; `validation.results.json` của gói không đổi (SHA trước = sau). Thử phá 1 `next` → test đỏ đúng chỗ và `validate.py` FAIL (mã thoát 1). Bộ chạy thay thế (shim Vitest): 21 file, 117/117 test qua (110 cũ + 7 mới). ESLint (cấu hình lõi) 0 lỗi, Prettier sạch, `py_compile` qua.
- **Chưa chạy:** Vitest/Vite thật, `npm run check` (npm trong môi trường AI không tải được gói; máy không mở được shell từ xa lần này); chưa thử Vite phục vụ JSON (`http://localhost:5173/assets/chapters/chapter1/chapter1.json`); chưa chạy `validate.py` bằng Python trên Windows. Chưa commit.
- **Bước tiếp theo:** người dùng chạy 3 lệnh kiểm tra → đóng N0 (TD-16 ✅) → N1 `game/narrative/statePath.js` + `expr.js`.
- **Đóng (03/11 12:47):** người dùng báo `python scripts\chapter1\validate.py`, `npm run check`, `npm run dev` + mở `/assets/chapters/chapter1/chapter1.json` đều qua → N0 ✅, TD-16 ✅. Câu hỏi "bỏ test SHA khỏi `npm run check`" chưa được trả lời — giữ nguyên cách hiện tại, chờ.

### T-035 — N1: đọc state & đánh giá điều kiện (TD-17a)
- Ngày giao: 03/11/2026 12:47 — người dùng báo 3 lệnh kiểm tra N0 đều qua; N1 là bước kế tiếp trong kế hoạch DEC-016 (người dùng: "hãy làm theo Data Contract 2.0 … chia ra thành từng phase nhỏ").
- **Kế hoạch (DEC-003):** mục đích — module JS thuần đọc state theo đường dẫn và đánh giá Condition AST đúng như bộ kiểm tra của gói, nền cho N2–N5; ảnh hưởng — thêm thư mục `frontend/src/game/narrative/` (4 file), không sửa code cũ, dữ liệu, API, CSDL, cốt truyện; rủi ro — lệch ngữ nghĩa với validator Python (đúng/sai kiểu Python: `[]`/`{}` là sai; `None` so sánh lỗi; `contains` trên object = có khóa) → game chạy nhưng mở/khóa sai nhánh. Phòng: đối chiếu trên trạng thái thật.
- **Đã làm:** `statePath.js` — `parsePath` (chặn đường dẫn sai, đoạn rỗng, khóa `__proto__/prototype/constructor`), `getPath` (thiếu → null, không đánh chỉ số mảng, không đọc thuộc tính kế thừa), `setPath` (tạo object trung gian, ghi bản sao, gặp giá trị không phải object → lỗi), `cloneJson`. `expr.js` — `evaluate`, `testCondition` (không có điều kiện = đúng), `createContext` (`/state`, `/bindings`, `/input`), `buildBindings` (people chỉ có khi bản ghi có; checkpoint chỉ có khi snapshot đã lưu → giá trị `storageKey`; handler chỉ có khi engine đã triển khai), `isTruthy` (kiểu Python), `valuesEqual` (so sâu, `true` ≠ `1`), 15 toán tử với kiểm số đối số, phát hiện predicate gọi vòng.
- **Test:** `statePath.test.js` 9 test; `expr.test.js` 22 test — từng toán tử, đúng/sai kiểu Python, cờ chưa có = false, `exists` chưa có bản ghi = false, bindings, quét 1.000+ biểu thức của `chapter1.json` ở state ban đầu × 13 lựa chọn thẻ nguồn (không lỗi), 19 predicate đều sai lúc bắt đầu, nút mở đầu không bị chặn.
- **Đối chiếu với validator Python (ngoài repo, công cụ trong thư mục tạm của AI):** chạy `validate_data.py` (bản sao) có móc ghi lại mọi trạng thái nó đi qua → 1.293 trạng thái khác nhau × 2 kiểu input = 2.586 ca; lấy 637 biểu thức khác nhau (điều kiện, before/after, 19 predicate); Python và JS cho cùng kết quả ở **1.647.282/1.647.282** lần đánh giá, 0 lệch, 0 lỗi. 19/19 predicate có lúc đúng lúc sai trong tập này. Thử cố tình làm sai `exists` → bắt được 62.698 chỗ lệch (công cụ đối chiếu có tác dụng). Đúng/sai của `[]`/`{}` không xuất hiện trong dữ liệu — chỉ unit test kiểm.
- **Kiểm tra đã chạy (Linux, bộ chạy thay thế):** 23 file, 148/148 test qua (117 cũ + 31 mới); Prettier sạch; ESLint lõi 0 lỗi (đã khai báo `structuredClone` — ESLint thật của dự án dùng `globals.browser` có sẵn tên này). **Chưa chạy:** Vitest/ESLint thật (`npm run check`) trên máy. Chưa commit.
- **Bước tiếp theo:** người dùng chạy `npm run check` → đóng N1 → N2 `effects.js`.
- **Đóng (03/11 13:04):** người dùng gửi kết quả `npm run check` trên máy (nhánh `Nhan`, mã thoát 0): ESLint 0 lỗi, Prettier sạch, Vitest 23/23 file — 148/148 test, Vite build 158 module. Dòng `NativeCommandError` là cảnh báo font BeVietnamPro Vite in ra stderr, không phải lỗi. → N1 ✅.

### T-036 — N2: hiệu ứng & giao dịch (TD-17b)
- Ngày giao: 03/11/2026 13:04 — người dùng gửi kết quả `npm run check` của N1 (qua hết); N2 là bước kế tiếp trong kế hoạch DEC-016.
- **Kế hoạch (DEC-003):** mục đích — áp 6 loại hiệu ứng của Data Contract đúng như validator, một giao dịch tất-cả-hoặc-không, chống trừ điểm 2 lần bằng token; ảnh hưởng — thêm `game/narrative/effects.js` + test, dùng lại `systems/credibility.applyPenalty`; không sửa code cũ, dữ liệu, API, CSDL; rủi ro — tạo/ghi đè bản ghi sai (đổi nguồn lần đầu, merge tạo bản ghi thiếu), lỗi giữa chừng làm state nửa vời, đọc `after` bằng ngữ cảnh cũ.
- **Đã làm:** `applyEffects(state, effects, {graph, node, input, handlers})` chạy trên bản sao, trả state mới, lỗi → ném lỗi kèm nút + số thứ tự hiệu ứng, state cũ không đổi; `after` đánh giá với ngữ cảnh dựng lại sau từng hiệu ứng; `before` không dùng (validator cũng không). set/increment ghi `after`; upsert/collect chỉ tạo khi chưa có, gắn `source_node` (= `sourceNode` của hiệu ứng, thiếu thì = nút commit), `source_step`, `collected_phase`, `source_kind` cho statements/observations/evidence_records/timeline; collect thêm ID duy nhất; merge chỉ sửa bản ghi đã có; save_checkpoint chép state trừ `checkpoints`, overwrite=false giữ bản đầu. `commitEvent(state, {token, effects, penalty})`: token đã có → trả nguyên state cũ (`applied: false`); thứ tự trừ uy tín → hiệu ứng → ghi token.
- **Phát hiện (điểm cần xác nhận):** (N2-Q1) DATA_CONTRACT + `upsertPolicy` + PHASE_3 §B yêu cầu giữ revision khi sửa bản ghi nhưng KHÔNG có định dạng; validator chỉ gộp trường → 22 lệnh merge (12 lời khai, 9 nhân vật, 1 vật chứng) hiện làm mất giá trị cũ. Đánh dấu `PENDING(N2-Q1)`, đề xuất gửi người dùng. (N2-Q2) Nhãn `source_kind` của validator (professional_record/observed/source_node) thô hơn kịch bản (giấy khen = public_document; ảnh P2 được phép) — đề xuất giữ quy tắc validator, Sổ tay đọc thêm `physical_custody`/`status` có sẵn trong bản ghi. Không điều kiện nào trong `chapter1.json` đọc `revision`/`source_kind` → không chặn N3–N5.
- **Test:** `effects.test.js` 24 test (từng hiệu ứng, giữ nguồn đầu, không tạo bản ghi khi merge, checkpoint không lồng/overwrite, giao dịch lỗi giữa chừng, token trùng, uy tín không âm, quy tắc nguồn, 100 nút có hiệu ứng của `chapter1.json` áp lên state ban đầu không lỗi, thu ổ khóa đúng nguồn).
- **Đối chiếu với validator Python (ngoài repo):** (1) móc vào `Runner.effects` khi validator chơi 2 lượt: 147 lần gọi khác nhau (đủ 6 loại) → JS ra state y hệt 147/147, không lần nào sửa state đầu vào; (2) 100 nút có hiệu ứng × 72 trạng thái thật rải khắp chương = 7.200 ca → 7.200/7.200 trùng khớp (so băm state). Cố tình làm sai (merge tạo bản ghi thiếu / sai `collected_phase`) → bắt được 331 / 1.693 chỗ lệch.
- **Kiểm tra đã chạy (Linux, bộ chạy thay thế):** 24 file, 172/172 test qua (148 cũ + 24 mới); Prettier sạch; ESLint lõi 0 lỗi. **Chưa chạy:** `npm run check` thật trên máy. Chưa commit.
- **Bước tiếp theo:** người dùng chạy `npm run check` + trả lời N2-Q1/N2-Q2 → N3 `storyRunner.js`.

### T-037 — TD-58: kiểm tra bộ đi 4 hướng V6b của GPT
- Ngày giao: 03/11/2026 13:14 — người dùng gửi `DETECTIVE_WALK_4_DIRECTIONS_V6b.zip` + `V6b_QUALITY_CHECK.md`: "hãy kiểm tra xem đã đủ điều kiện cho vào chưa".
- **Kế hoạch (DEC-003):** đo độc lập trên ảnh xuất (không tin báo cáo GPT), không chạy script trong gói; không sửa code/asset game. Rủi ro: đo sai do 2 chân dính nhau trong ảnh → dùng nhiều cách đo + xem ảnh.
- **Đã làm / kết quả (công cụ trong thư mục tạm của AI, đọc ảnh bằng PIL/numpy):**
  - Gói: 800/800 file khớp `MANIFEST.sha256`; 72 khung 448×720 RGBA (trái/phải 24 khung 24 hình/giây, lên/xuống 12 khung 12 hình/giây); mỗi ô trong sheet trùng khung lẻ; 4 tư thế đứng 448×720, đáy y=659.
  - Ngang (trái/phải) — **ĐẠT**: chân chống đứng yên trong thế giới ở 220 px/giây (gót 153,6–154,3 px ảnh suốt khung 2–10 = lệch ≤ 0,4 px game); đầu nhấp nhô 17 px ảnh theo đường cong mượt (24 khung); thân và túi có chuyển động (xem ảnh; số đo góc 6°/10° là của GPT, AI không đo lại); chỗ nối hông khuất; giày đủ.
  - Lên/xuống — chân **ĐẠT**: chân chống khớp sàn ở 88 px/giây (đặt khung theo toạ độ thế giới, viền đế các khung trùng nhau; GPT đo ≤ 0,4 px game); gối gập, giày thấy rõ, không lộ chỗ nối. **Lỗi còn lại:** đo vị trí đầu bằng so khớp ảnh (không dùng điểm tóc cao nhất): lên 0, +9, −8, −5, 0, +2; xuống 0, +10, −7, −4, +1, +3 px ảnh theo K0–K5 → đầu/thân trên thấp nhất ở khung 1 rồi bật lên cao nhất ở khung 2 trong 1/12 giây (≈ 17 px ảnh ≈ 10 px trong game ở mốc gần), 2 lần mỗi giây → thấy rõ như "nảy". V5 (24 khung) mượt: 0, 4, 1, −5, −10, −12, −13… Báo cáo GPT chỉ kiểm biên độ (15–19 px), không kiểm độ mượt.
  - Không đổi tỷ lệ thân trên giữa các khung (bề rộng đầu 77/79 px không đổi) — chỉ dịch dọc.
- **Đề xuất:** gửi GPT prompt sửa V6c — CHỈ đổi độ cao thân trên theo đường cos (thấp nhất K0, cao nhất K3, biên độ 16 px ảnh, mỗi khung đổi ≤ 8 px), giữ nguyên thân dưới/vệt chân, ngang, tư thế đứng, định dạng. Tích hợp (TD-59) không phụ thuộc V6c vì định dạng giữ nguyên, thay 2 ảnh sau.
- **Cần người dùng:** TD-47 (đi dọc 88 px/giây — hoạt ảnh lên/xuống khớp chân theo đúng số này), TD-48 (đổi hẳn sang thiết kế mới cho đi + đứng), chọn tích hợp ngay hay đợi V6c.
- Không sửa code/asset game. Ảnh minh chứng: `V6b_head_pop.png` (gửi trong hội thoại).

### T-038 — Kiểm tra V6c (bản sửa "nảy đầu" lên/xuống)
- Ngày giao: 03/11/2026 13:53 — người dùng gửi `DETECTIVE_WALK_4_DIRECTIONS_V6c.zip` + `V6c_QUALITY_CHECK.md`: "đây là bản tôi đã fix chuyển động".
- **Kết quả đo độc lập (không chạy script trong gói):** 803/803 file khớp `MANIFEST.sha256`; 72 khung 448×720 RGBA, ô sheet = khung lẻ. So với V6b: 54/54 file khóa (khung trái/phải, 2 sheet ngang, 4 tư thế đứng) giống từng byte; chỉ đổi khung lên/xuống (trừ K3 giữ nguyên) + sheet/ảnh xem trước/QA. Vị trí đầu (so khớp vùng đầu với khung 00) cả lên và xuống: 0, −4, −12, −16, −12, −4 lặp lại → đúng đường cong yêu cầu, biên độ 16 px ảnh, mỗi khung đổi ≤ 8 px (cả chỗ nối vòng 11→00). Chân: mọi hàng y ≥ 600 giống V6b từng pixel ở cả 24 khung (vệt chân chống giữ nguyên); chỉ đổi hàng 89–476 (thân trên). Khe hở kín quanh hông: tương đương V6b (khe tay–thân, khe giữa hai đùi có sẵn), không phát sinh khe mới; xem ảnh: vạt áo che cạp quần ở cả 12 khung lên/xuống.
- **Kết luận:** V6c ĐẠT cả 4 hướng → TD-57/TD-58 ✅. Tích hợp (TD-59) chỉ còn chờ TD-47 + TD-48.
- **Kiểm lại lần 2 (03/11 14:42, phiên khác, người dùng gửi lại cùng gói):** kết quả trùng — 803/803 file khớp manifest; 54 file khóa giống V6b từng byte; đầu 0, −4, −12, −16, −12, −4 ở cả lên/xuống; 0 pixel đổi ở y ≥ 560 (thay đổi chỉ ở hàng 89–476), vùng thân trên là phép dịch nguyên khối (sai số ≤ 0,02 mức màu); xem cận eo các khung dịch +11/+12 và −2/−3: không hở. Không ghi thêm gì khác.
- Không sửa code/asset game.

### T-039 — TD-59: tích hợp hoạt ảnh đi 4 hướng V6c (DEC-020)
- Ngày giao: 03/11/2026 ~14:00 — người dùng chọn: đi dọc 88 px/giây (TD-47), đổi sang thiết kế mới (TD-48), tích hợp hoạt ảnh trước N3.
- **Kế hoạch (DEC-003):**
  - Mục đích: thám tử trong phòng 201 + hành lang dùng 4 hướng đi + 4 tư thế đứng của V6c, chân khớp sàn.
  - Ảnh hưởng: `art-source/characters/detective/walk-4dir-v6c/` (ảnh gốc V6c: 4 sheet, 4 tư thế đứng, manifest, báo cáo QA); `scripts/art/build_detective_atlas.py` (mới: cắt khung chung quanh điểm chân y=660, thu 0,625, ghép atlas WebP + JSON); thay `public/assets/images/characters/detective.webp/.json`; `entities/Player.js` (4 hoạt ảnh, bỏ lật gương + nhún, gốc mới, tốc độ 220/88); `systems/facing.js` (+test); `systems/locomotion.js` (mới, +test); `constants/gameplay.js` (thêm `WALK_SPEED_VERTICAL`, bỏ `WALK_ANIM_FPS`, `BOB_*`); test atlas. Không đổi dữ liệu phòng, API, CSDL, kịch bản.
  - Rủi ro: gốc (origin) sai → nhân vật lơ lửng/chìm sàn; atlas > 4096 px → lỗi WebGL máy yếu; viền sáng/tối do co ảnh có alpha (→ co trên ảnh nhân sẵn alpha); hướng/tốc độ phím chéo đổi so với trước (theo DEC-020); tên khung gõ sai → hoạt ảnh trống.
  - Đề xuất (chờ duyệt, không làm ở đây): chân dung hội thoại thiết kế mới (TD-61).
- **Đã làm:**
  - Ảnh gốc: `art-source/characters/detective/walk-4dir-v6c/` (4 sheet đi, 4 tư thế đứng, `animation_manifest.json`, README, QUALITY_CHECK của V6c; 9,7 MB).
  - `scripts/art/build_detective_atlas.py` (mới): kiểm manifest (người cao 560, điểm chân y=660), cắt 76 khung bằng cùng khung 320×624 quanh điểm chân (script kiểm không mất điểm ảnh nào), co ×0,625 trên ảnh nhân sẵn alpha, ghép atlas 2018×3134 (≤ 4096) WebP 1,1 MB + JSON (meta: origin 0,5/0,923077, sourceHeight 350, nhịp/tốc độ từng hướng). Chạy lại từ art-source cho ra file giống từng byte.
  - `entities/Player.js`: atlas mới (gốc = điểm chân), bỏ lật gương + nhún; vận tốc theo `systems/locomotion.js` (mới): đi tới điểm giữ hướng màn hình, độ lớn theo elip 220/88; phím = hướng trên mặt sàn (phím chéo = đường chéo sàn ≈ (155, 62) px/giây); hướng/hoạt ảnh theo trục trội trên mặt sàn. Khung chọn theo đồng hồ chu kỳ chạy bằng CÙNG delta với di chuyển (`advanceWalkCycle`), hình chỉ dời khi đổi khung tới đúng chỗ đứng lúc khung bắt đầu → chân chống không trượt. Không còn dùng hệ hoạt ảnh Phaser cho thám tử.
  - `systems/facing.js` (tên khung `walk-<hướng>-NN`, `idle-<hướng>`), `constants/gameplay.js` (thêm `WALK_SPEED_VERTICAL: 88`, bỏ `WALK_ANIM_FPS`, `BOB_*`), CLAUDE.md; ghi chú "lỗi thời" trong `build_detective_walk.py` và "không chép detective.* nữa" trong `build_room201_assets.py`.
  - Test: `locomotion.test.js` (7), `facing.test.js` (4, viết lại), `detectiveAtlas.test.js` (4: đủ 76 khung, gốc/chiều cao/nhịp/tốc độ khớp meta, atlas ≤ 4096).
- **Kiểm tra đã chạy (Linux):** bộ chạy thay thế 26 file, 183/183 test; Prettier sạch; ESLint lõi 0 lỗi. Chạy game thật trong Chromium (Phaser 4.2.1, phòng 201 + hành lang): 4 hướng đúng hoạt ảnh/tư thế đứng, chân chạm sàn, cây che đúng chiều sâu, nhãn E đúng chỗ, bấm chuột đi tới và dừng đúng điểm; tốc độ đo được (quy về mốc gần): ngang 220,0, dọc 88,3/87,3, chéo bằng phím 168,8 px/giây. Trượt chân đo trong game: gót chân chống khi đi ngang lệch 0,41 px (nếu vẽ theo vị trí liên tục như trước: 7,86 px); đế chân chống khi đi lên 0,56 px, đi xuống 2,11 px (do nhân vật to dần theo phối cảnh trong lúc bước). Không lỗi console.
- **Chưa chạy:** `npm run check` thật trên máy; chơi thử bằng tay ở 60 hình/giây (trình duyệt trong môi trường AI chạy chậm, đã quy đổi theo thời gian game). Chưa commit.
- **Lưu ý:** cách đi bằng phím chéo đổi theo DEC-020 (đi theo đường chéo của sàn, chậm hơn đi ngang).

### T-040 — Nhân vật đi "không phải một khối liền mạch"
- Ngày giao: 03/11/2026 14:49 — "nhân vật hiện tại không phải là một khối liền mạch với nhau". Hỏi lại, người dùng chọn: **đầu trượt trên vai**, **lộ đường nối/vệt**, **hình giật khi di chuyển**.
- **Kế hoạch (DEC-003):** tìm nguyên nhân từng hiện tượng bằng số đo + chạy game trong Chromium; phần do code thì sửa, phần do hình thì soạn yêu cầu sửa cho GPT (không tự vẽ lại). Rủi ro: bỏ cách "chỉ dời hình khi đổi khung" (T-039) thì chân chống trượt nhẹ trong 1 khung.
- **Nguyên nhân (đo trên V6c):**
  - Mọi khung vẫn liền một mảnh (alpha > 128: 1 mảnh/khung) — không phải tay/chân rời.
  - *Đầu trượt trên vai* (hình): lớp đầu giữ cố định theo chiều ngang, còn ngực/vai lắc. Đo bằng so khớp ảnh: đầu lệch so với ngực −4…+3 px ở đi ngang, −6…+6 px ở đi xuống (px ảnh gốc).
  - *Đường nối/vệt* (hình): ở vai sau của bản trái/phải (cả `idle_left/right`), đường bao bị cắt khuyết vào ~10 px (trái: y≈242, x 280→270; `idle_right`: y≈230) và dưới chỗ khuyết còn một nét viền mờ của đường bao cũ. Có từ hình gốc V5. Không thấy viền sáng do nén WebP hay co ảnh (đo viền bán trong suốt của atlas: không sáng hơn phần đặc).
  - *Giật* (code T-039): hình chỉ được dời khi đổi khung (24 lần/giây ngang, 12 lần/giây dọc) → cả người nhảy từng nấc 9 px / 7 px.
- **Đã sửa (code):** `systems/locomotion.js` — thêm `strideProgressMs` (quãng vừa đi quy ra ms bước ở tốc độ chuẩn, theo độ sâu); `advanceWalkCycle` chỉ còn chọn khung theo quãng bước, bỏ `drawX/drawY`. `entities/Player.js` — vẽ ở vị trí logic liên tục; khung đổi theo quãng đường thật (bị chặn/trượt dọc vật cản thì bước chậm lại, không giậm chân tại chỗ). `locomotion.test.js` viết lại phần chu kỳ (8 test: quãng bước ở mọi hướng/độ sâu, bị chặn = 0, đủ 24/12 khung mỗi giây theo thứ tự, đi chậm thì khung chậm, đổi hướng về khung 0). CLAUDE.md cập nhật dòng thám tử.
- **Đánh đổi:** chân chống giờ lệch tối đa 1 khung (≈ 9 px ngang, 7 px dọc ở mốc gần) rồi về đúng chỗ — như đa số game 2D. Muốn giảm nữa: GPT làm thêm khung đi dọc (24 khung) — chưa đề xuất.
- **Kiểm tra đã chạy (Linux):** bộ chạy thay thế 26 file, 185/185 test; Prettier sạch; ESLint lõi 0 lỗi. Chromium (Phaser 4.2.1, phòng 201): 4 hướng, mọi nhịp hình vẽ đúng vị trí logic, không nhịp nào đứng yên rồi nhảy; tốc độ quy về mốc gần = 1,00 (ngang), 1,00 (dọc); khung ngang đổi mỗi 2–3 nhịp (24/giây), dọc mỗi 5 nhịp (12/giây). **Chưa chạy:** `npm run check` thật; chơi thử 60 hình/giây trên máy.
- **Cần người dùng:** gửi GPT prompt V6d (đầu theo thân; vá vai sau + xóa nét viền mờ) — trong hội thoại; ảnh minh chứng `V6c_issues.png`.

### T-041 — AI tự sửa toàn bộ lỗi hình của thám tử (thay cho yêu cầu V6d)
- Ngày giao: 03/11/2026 15:04 — "bạn có thể trực tiếp điều chỉnh toàn bộ lỗi hiện tại không".
- **Kế hoạch (DEC-003):** sửa trên dữ liệu của gói V6c (ảnh khung + các lớp xuất `source/build/qa/upper_layers` + texture V5 `art_parts`), KHÔNG chạy script của gói (đọc `render_upper.cjs`/`patch_v6c.py` để hiểu, viết lại phần cần bằng Python); giữ nguyên thân dưới/vệt chân/nhịp/tốc độ/định dạng; sửa xong dựng lại atlas bằng `build_detective_atlas.py`. Rủi ro: vá sai thứ tự lớp (tay bị thân đè), vệt vá lộ, chạm vào chân → kiểm từng bước bằng số đo + xem ảnh phóng to + chạy game.
- **Đã làm** (chi tiết + số đo: `art-source/characters/detective/walk-4dir-v6c-t041/PATCH_T041.md`):
  - *Đầu trượt trên vai (lên/xuống):* lớp đầu (gồm cả vai trên) bị giữ đứng yên ngang trong khi thân lắc ±4,2 px → dựng lại vùng đầu từ các lớp xuất, dời lớp đầu theo độ lắc của thân đo ở cổ áo (0, 2, 4, 4, 4, 2, 0, −2, −4, −4, −4, −2 px); tay gần (không có lớp) giữ nguyên ảnh gốc. Tự kiểm: dựng lại với độ dời 0 → khung 00/06 không đổi byte nào. Đầu − ngực còn −2…+2 px (thân nghiêng quanh cổ, tự nhiên), trước −6…+6. Hết luôn vệt lệch sọc áo ngang lưng ở mép dưới lớp đầu.
  - *Vai sau khuyết + nét viền mờ (trái/phải + `idle_left/right`):* gốc ở texture thân V5 (chỗ tách tay). Vá 1 lần trên texture (đường cong Hermite nối mép vai và mép lưng, màu inpaint + chi tiết sọc vải, nét viền vẽ khử răng cưa), rồi dựng lại lớp thân từng khung bằng phép biến đổi viết lại (khớp lớp của gói: alpha ≤ 12/255, màu ≈ 1/255) và chỉ thay phần thay đổi, giữ thứ tự lớp (tay gần/túi/đầu vẫn đè lên; hướng phải dựng lại từ các lớp đã biết). Tư thế đứng: khớp vị trí thân bằng so khớp (lệch 0,0). Kết quả: 0 hàng còn bậc khuyết ≥ 6 px ở 48 khung + 2 tư thế đứng.
  - *Nét viền mờ còn trôi (mọi khung):* xóa điểm alpha ≤ 160 cách phần đặc > 2,5 px (trừ tóc). *Lỗ kim* ở chỗ 2 lớp chạm nhau (thân trên, y < 480): lấp cụm ≤ 40 px nằm kín trong hình.
  - Ảnh mới: `art-source/characters/detective/walk-4dir-v6c-t041/` (4 sheet, 4 tư thế đứng, manifest `6c-t041`, PATCH_T041.md). Atlas dựng lại: `detective.webp/json` (2018×3134, meta giống hệt, chỉ đổi dòng `source`). `build_detective_atlas.py`: đường dẫn + ghi chú nguồn. CLAUDE.md cập nhật.
- **Kiểm tra đã chạy:** mỗi khung vẫn 1 mảnh; lên/xuống 0 pixel đổi ở y ≥ 560; trái/phải chỉ đổi điểm viền mờ (alpha ≤ 160) ở chân; bộ chạy thay thế 26 file 185/185 test (gồm test atlas); game thật trong Chromium (phòng 201, 4 hướng + đứng): đúng khung, vai sau liền, đầu khớp thân, không lỗi console.
- **Giới hạn:** vùng vá vai là AI dựng — ở cỡ trong game liền mạch, phóng to thấy sọc vải mềm hơn. Chưa chạy `npm run check` thật / chơi thử trên máy. Chưa commit. Thư mục `walk-4dir-v6c/` (bản gốc, ~9,7 MB) vẫn giữ để đối chiếu — có thể xóa khi người dùng đồng ý.

### T-042 — Quay về nhân vật thám tử cũ (DEC-021)
- Ngày giao: 03/11/2026 15:39 — "tôi muốn đổi lại thành nhân vật cũ trước đó". AI gửi ảnh so sánh A (cũ) / B (V6c) và hỏi; người dùng chọn **A — thiết kế cũ** và **giữ lại** các file thiết kế mới để dùng sau.
- **Kế hoạch (DEC-003):** bản cũ nằm nguyên trong git (commit mới nhất `cdd6d77`, T-029; mọi việc T-034 → T-041 CHƯA commit — đã đọc `.git/logs/HEAD`) → lấy lại CHÍNH XÁC bằng `git restore` các file nhân vật; AI không chạy git trên máy (quy tắc) và không xóa được file qua cầu nối → người dùng chạy 1 khối lệnh. Trước đó AI cất bộ thiết kế mới ra ngoài `frontend/`. Rủi ro: chạy `git restore` nhầm file khác sẽ mất việc chưa commit (N0–N2, tài liệu) → lệnh chỉ liệt kê đúng 8 file nhân vật.
- **Đã làm:** cất 9 file đang dùng của thiết kế mới (`Player.js`, `detectiveAtlas.test.js`, `facing.js`(+test), `locomotion.js`(+test), `gameplay.js`, `detective.webp/json`) + `README_KHOI_PHUC.md` vào `art-source/characters/detective/walk-4dir-v6c-t041/integration/`; ghi DEC-021 (PROJECT_MEMORY F), CLAUDE.md (dòng thám tử), TODO (TD-47 gác, TD-48 = giữ thiết kế cũ, TD-56 dùng lại, TD-59 gác, TD-61 gác). Ảnh V6c gốc + bản sửa T-041 và `scripts/art/build_detective_atlas.py` vẫn để nguyên trong repo.
- **Kiểm tra trước (trên bản sao trong môi trường AI, đã đưa về đúng trạng thái sau khi đổi):** bộ chạy thay thế 24 file, 172/172 test; Prettier sạch; ESLint lõi 0 lỗi; chạy game trong Chromium phòng 201: đi trái/phải dùng `walk-side-*` 8 hình/giây, đi lên/xuống dùng tư thế đứng + nhún, không lỗi console. `RoomInvestigationScene`/`PreloadScene` không đổi từ T-024 nên khớp API `Player` cũ.
- **Lệnh người dùng cần chạy (PowerShell, thư mục gốc repo):**
  - `git restore frontend/src/game/entities/Player.js frontend/src/game/systems/facing.js frontend/src/game/systems/facing.test.js frontend/src/game/constants/gameplay.js frontend/public/assets/images/characters/detective.webp frontend/public/assets/images/characters/detective.json scripts/art/build_detective_walk.py scripts/art/build_room201_assets.py`
  - `Remove-Item frontend/src/game/systems/locomotion.js, frontend/src/game/systems/locomotion.test.js, frontend/src/game/entities/detectiveAtlas.test.js`
  - `cd frontend; npm run check` (mong đợi 24 file test, 172 test qua).
- **03/11/2026 15:49 — Claude Code chạy các lệnh trên trên máy người dùng (người dùng yêu cầu):** trước khi ghi đè đã đối chiếu 9 file đang dùng với bản cất ở `integration/` — 8 file trùng từng byte, `detective.webp` trùng từng điểm ảnh (chỉ khác vài byte metadata) → không mất gì. Phần sửa ở 2 script `scripts/art/*.py` chỉ là ghi chú "đã chuyển V6c" (không còn đúng sau DEC-021) → bỏ. `git restore` + `Remove-Item` thành công. `npm run check` THẬT: ESLint sạch, Prettier sạch, Vitest **24 file / 172 test qua** (gồm `narrative/effects.test.js` của T-036), `vite build` qua (cảnh báo font "resolve at runtime" là cảnh báo cũ). `npm run dev` chạy ở http://localhost:5173 (thêm `.claude/launch.json` cấu hình `frontend` cho khung xem trước), trang đăng nhập hiện, không lỗi console; `detective.json` được phục vụ là atlas cũ (10 khung: `walk-side-0…5` + `idle-front/left/right/back`). Chưa đăng nhập vào phòng 201 để xem nhân vật đi (cần backend + tài khoản).
- Chưa commit.

### T-043 — Tăng chu kỳ đi ngang của thám tử cũ lên 24 khung (prompt)
- Ngày giao: 03/11/2026 15:55 — "tôi cần tăng số frame của nhân vật lên … 24 frame hãy cung cấp promt cho tôi và gửi lại tôi hình 8 frame của nhân vật chính cũ".
- **Kế hoạch (DEC-003):** đo tấm gốc `art-source/characters/detective/detective-walk-side-v2.png` → viết prompt tiếng Anh giữ nguyên thiết kế, cỡ người và độ dài bước của tấm cũ, chỉ thêm khung trung gian → gửi người dùng tấm 8 hình + prompt. KHÔNG đổi code/atlas cho tới khi có ảnh 24 khung và người dùng đồng ý cách tích hợp.
- **Số đo tấm cũ (AI đo):** 2048×768, 8 hình nền #00FF00, nhìn sang trái; người cao ≈ 617 px, đế giày ở y ≈ 688; bước chân (mũi giày trước – mũi giày sau lúc chạm đất) 171–176 px ≈ 0,28 × chiều cao; đầu nhún 65…76 px (≈ 11 px); hình 3 và 7 là tư thế chân lướt qua nhau; tay: tay trước vung ra mỗi bước, tay sau gần như đứng yên (cùng một kiểu tay ở cả 2 bước).
- **Prompt đã gửi** (bản đầy đủ trong trả lời cho người dùng): 24 khung = 2 bước × 12; bảng tư thế từng khung; chân chống lùi đều 14,3 px/khung (172/12), đế giày trên cùng một đường đất ±1 px; đầu nhún 8–12 px; giữ kiểu tay của bản cũ; cấm các lỗi đã gặp ở V6b/V6c (đầu trượt trên vai, đường nối, viền ma, lỗ thủng); đầu ra: 24 PNG nền trong 384×768 (đất y = 720, tâm thân trên x = 192), tấm 6×4 nền #00FF00 2304×3072, GIF xem thử ~29 hình/giây, `qa.json`, `QA_CHECK.md`.
- **Khi có ảnh (chưa làm, cần người dùng đồng ý):** sửa `scripts/art/build_detective_walk.py` (lấy đủ 24 hình, bố cục atlas mới — 28 ô), `DETECTIVE_ATLAS.walkFrames` 6 → 24, `WALK_ANIM_FPS`: bước 0,28 × 330 px ở 220 px/giây → 24 × 220 / (2 × 0,28 × 330) ≈ 28,6 hình/giây (nếu muốn đúng 24 hình/giây thì phải giảm tốc độ đi còn ≈ 185 px/giây).
- Chưa sửa file nào của game. Chưa commit.

### T-044 — Lời khai, Lịch sử trò chuyện và đối chất
- Ngày giao: 10/11/2026. Người dùng yêu cầu thực thi kế hoạch đã có, rồi chốt Lịch sử trò chuyện tách khỏi bảng Lời khai. Bảng Lời khai chỉ nhận bản ghi mà kịch bản đánh dấu.
- Kế hoạch: triển khai runner và test vàng, nối các cảnh và trạng thái lưu cục bộ, kiểm thử đường chơi từ phòng 201 đến đối chất. Rủi ro chính là mở dữ kiện sớm, trừ uy tín lặp và phát lại hiệu ứng khi tải.
- Engine: N3–N5 có runner, Press/Present, bản nháp suy luận, checkpoint và hai đường kiểm thử đến `CH2_ENTRY`. `merge_record` giữ phiên bản cũ của lời khai và nguồn cập nhật.
- Phaser: Ván mới nối tutorial với P1; nói chuyện tại vị trí NPC; phòng 204 đọc hotspot từ graph; tab Lời khai liên kết bản thay thế. Sổ tay có nút Lịch sử trò chuyện để đọc lại từng câu của đoạn đã hoàn tất.
- Lưu cục bộ: trạng thái kịch bản, đoạn hội thoại, tutorial và vị trí khi được đi lại. Bản lưu mới tách theo tài khoản trình duyệt.
- Kiểm thử trên Windows: `npm run check` qua lint, format, 181 test và build. Validator Python qua 6.255 assertion, SHA-256 của dữ liệu runtime khớp nguồn. Chrome headless chạy qua tutorial bỏ qua, hỏi bốn NPC, xem Lời khai/Lịch sử, lưu và tải lại ở hành lang, khám phòng 204 và Press/Present ở Phase 3. Hai lượt đến `CH2_ENTRY` kiểm bằng test vàng của runner.
- Còn mở: N2-Q2 về nhãn nguồn, TD-49 về lớp ảnh thi thể, ISS-29 về lưu server, playtest toàn chương N16.

### T-045 — Hiển thị nguồn ghi nhận trong Sổ tay (N2-Q2)
- Người dùng chọn giữ mã `source_kind` theo validator và hiển thị xuất xứ dễ đọc. Sổ tay lấy nhãn từ nguồn ghi trên bản ghi. Ảnh tại phòng 204 và ảnh trong hồ sơ cảnh sát có nhãn riêng. Ghi chú về tờ khảo sát nằm trong mục Nhân vật → Tùng.
- Kiểm tra `npm run check` qua 182 test và build. Hai lộ trình kiểm tra nguồn khác nhau của đồng xu và tờ khảo sát, kể cả sau khi serialize bản lưu. Chrome headless xác nhận nhãn ảnh hiện trường và nguồn ghi chú tờ khảo sát trong Sổ tay. Validator Python qua 6.255 assertion và SHA-256 dữ liệu khớp nguồn.

### T-046 — Rà phòng 204 và kiểm thử hai lượt chơi trên Chrome
- Người dùng yêu cầu thực hiện phần rà hotspot TD-52 và kiểm thử N16. Dùng ảnh nền hiện có để so vùng bấm, rồi chạy từ Ván mới đến `CH2_ENTRY` bằng Playwright với chuột và bàn phím. Playwright dùng phiên cục bộ thử nghiệm.
- Đã đưa vùng bấm dấu bụi lên mặt tủ, mở rộng vùng bấm giường và kiểm tra đường đi giữa tất cả điểm đứng phòng 204. Vị trí vùng cổ sẽ cần rà lại cùng ảnh TD-49.
- Đã bổ sung danh sách nguồn còn thiếu khi người chơi chốt hồ sơ ở Phase 4. Thêm hai lượt Playwright và hướng dẫn chạy `npm run test:e2e` trong README.
- `npm run check` qua 182 test và build. Validator Python qua 6.255 assertion, dữ liệu runtime khớp nguồn.
- `npm run test:e2e` qua **2/2** trên Chrome. Hai lượt thu sớm và dùng hồ sơ Phase 4 đều tới tiêu đề Chương 2, dừng tại `CH2_ENTRY` và lưu cờ hoàn tất. Đã kiểm tra lối thoát phòng 204, Present bấm đúp chỉ trừ một lần, suy luận 8 ô, tải cục bộ giữa báo cáo và khôi phục checkpoint sau Bad Ending. Chrome dùng font dự phòng do thiếu các tệp font ở TD-43.

### T-047 — Commit tích hợp Chương 1
- Commit cục bộ `fff5ed8` trên nhánh `Nhan` gồm frontend, dữ liệu runtime, bộ kiểm thử và tài liệu kỹ thuật Chương 1.
- Kiểm tra trước commit qua 182 test frontend, 4 test backend bằng Maven offline và 6.255 assertion của validator Chương 1.
- Đã đẩy `fff5ed8` lên `origin/Nhan` theo yêu cầu của người dùng và xác nhận hai đầu nhánh trùng nhau.

### T-048 — Tích hợp ảnh Tùng vào phòng 204
- Người dùng yêu cầu đưa bộ ảnh Tùng đã có vào game. Dùng `Tunginroom.png` làm nền riêng trong lúc được phép khám phòng 204 và giữ nền trống cho các ngữ cảnh khác. Dùng khung cắt cổ áo từ `Tung.png` khi người chơi chọn vùng cổ hoặc xem lại vật chứng này trong luồng kịch bản.
- Đã căn `HP_NECK` vào vùng đầu/cổ, thêm vùng cản chân quanh thân Tùng và dời điểm đứng gần giường, mặt tủ và bảng. `npm run check` qua 183 test và build, gồm kiểm đường đi giữa các hotspot.
- Hai lượt Playwright đã qua. Kiểm tra nền có Tùng ở Phase 2 và khi trở lại phòng ở Phase 3, ảnh cận mở đúng lúc chọn vùng cổ và vật chứng chỉ được ghi sau khi xem xong. Validator qua 6.255 assertion, dữ liệu runtime khớp nguồn.

### T-049 — Kiểm tra lỗi khởi động backend
- `mvn spring-boot:run` biên dịch qua và kết nối MySQL 8.0.46. Tomcat báo cổng 8080 đang được `steamwebhelper.exe` (PID 21560 tại lúc kiểm tra) sử dụng.
- Đã xác nhận Spring Boot chạy thành công khi đặt `SERVER_PORT=8081` trong PowerShell. Phiên kiểm thử đã kết thúc. Khi chạy frontend cùng backend cổng 8081, dùng `VITE_API_URL=http://localhost:8081/api`.

### T-050 — Mở đầu phòng 204 và chân dung nhân vật
- Theo yêu cầu người dùng, hộp thoại chỉ hiện lời nói. Runner tự đi qua lời dẫn và chỉ dẫn sân khấu. Thông báo và nội dung hồ sơ dùng bảng riêng.
- Sau khi Hòa báo việc, game đánh dấu cửa A204. Người chơi vào phòng, quan sát Tùng, rồi ra hành lang. Linh, Minh và Hào mới xuất hiện ở lượt lấy lời khai. Phần nhìn hiện trường ban đầu không ghi vật chứng. Rút hai câu xưng chưa vào phòng để khớp với diễn biến mới.
- Dùng ba bảng thiết kế người dùng cung cấp. Phaser lấy các ô chân dung từ ảnh gốc cho hội thoại và điểm tương tác trên bản đồ.
- Hotspot kịch bản mở ngay khi người chơi bấm trong tầm tương tác. Đã kiểm tra việc nói tiếp với Minh sau khi lưu và tải lại ở đoạn báo cáo.
- `npm run check` qua 183 test và build. Hai lượt Playwright qua trên Chrome, xác nhận quan sát Tùng trước khi lấy lời khai và đúng chân dung người nói. Validator qua 6.290 assertion cho bản game và 6.255 assertion cho gói nguồn.

### T-051 — Khôi phục luồng đăng nhập và đăng ký cục bộ
- Cổng 8080 trả 404 từ Steam WebHelper, backend game chưa nghe ở 8081. Đã khởi động backend 8081 và Vite 5173. `frontend/.env.local` đặt API thành `http://localhost:8081/api` cho máy này.
- Chrome kiểm tra qua form thật. Đăng ký trả HTTP 201, đăng nhập trả HTTP 200 và chuyển đến `/play`. Đã dọn đúng tài khoản thử trong MySQL cục bộ. Hai dịch vụ vẫn chạy để người dùng tiếp tục thử.

### T-052-Nhan — Rà soát statement và kế hoạch hoàn thiện
- Ngày 16/11/2026. Người dùng yêu cầu kiểm tra dự án và lập kế hoạch cho phần statement chưa có.
- Xác nhận chức năng cốt lõi đã triển khai ở T-044/T-045, gồm ghi nhận lời khai theo graph, Lịch sử trò chuyện riêng, revision trong state, Press/Present và lưu/tải cục bộ. Dữ liệu có 43 template và 38 statementRules.
- Tạo `docs/STATEMENT_PLAN.md` với hiện trạng và S1 nghiệm thu giao diện, S2 lời khai sửa/tương thích bản lưu, S3 lưu/tải máy chủ phụ thuộc ISS-29. S4 ghi các đề xuất cần chốt về hiển thị revisions và dùng Statement làm nguồn Present.
- Cập nhật TD-24 và trạng thái REQ-024/028/029 để phản ánh code. UI hiện chưa đọc revisions, Present Chương 1 chỉ có route Evidence, tải máy chủ chưa được nối ở bridge. Lịch sử mở đầu được gom tới hub theo test hiện có, cần chốt nếu đổi ranh giới đoạn.
- `npm run check` đạt lint, format, 183 test và build. Validator đạt 6.290 assertion, 1.264 node, 43 lời khai. Build cảnh báo thiếu các font ở TD-43.
- `npm run test:e2e` đạt 3/3 bài trên Chrome, gồm hoạt ảnh và hai lượt chơi Chương 1 tới CH2_ENTRY. Các luồng có Press/Present, lời khai bị thay thế, blocked miễn phạt và wrong bấm đúp chỉ trừ một lần. Chưa kiểm tra lưu/tải statement lên MySQL trong tác vụ này.

### T-053-Nhan — Dòng thời gian theo sự kiện và nguồn
- Ngày 16/11/2026. Người dùng phản ánh mốc lộn xộn và trùng Lịch sử trò chuyện, sau đó duyệt hướng sắp theo giờ, tách quan hệ trước/sau, tên sự kiện ngắn và mở nguồn khi cần.
- Thêm `systems/timeline.js` để nhóm, sắp bản ghi thực có và dựng nhãn theo 13 mốc đã có trong graph. Mốc ước lượng giữ cách ghi gốc, mốc quan hệ không bị suy thành giờ. Bản lưu thiếu giờ vào nhóm chưa rõ thời điểm, thiếu record nguồn không hiện nút xem nguồn.
- `NotebookScene` có nhóm Mốc có giờ / Trước và sau / Chưa rõ thời điểm khi có dữ liệu, bốn mục mỗi trang, chi tiết sự kiện gọn, nút xem nguồn thực có và đường quay lại bằng Esc. Lời nguồn đầy đủ chỉ đọc sau khi mở bản ghi nguồn. Lời nguồn bị thay thế có nhãn tương ứng.
- `ChoiceMenu` nhận tùy chọn chiều cao và số dòng mỗi trang, các màn cũ dùng mặc định. Chuỗi UI VI/EN nằm trong `uiText.js`.
- Thêm 5 test về thứ tự, state không đổi, mốc quan hệ, bản lưu cũ, nguồn thiếu và nhãn của dữ liệu thật. Playwright có bước kiểm thứ tự năm mốc P1, phân trang, mở nguồn Hòa, quay lại, xem quan hệ Cảnh sát tới và state không thay đổi sau đọc.
- Đã xem ảnh chụp Chrome cho cả hai nhóm. Bản cuối `npm run check` đạt lint, format, 188 test và build. Playwright đạt 3/3 bài gồm hoạt ảnh, hai lượt chơi Chương 1 và các bước nghiệm thu Dòng thời gian. Validator đạt 6.290 assertion. Font dự phòng được dùng do thiếu các tệp ở TD-43.

### T-054-Nhan — Font dự phòng và menu theo bản lưu tài khoản
- Ngày giao: 16/11/2026. Người dùng gửi ảnh tiêu đề bị lệch dấu, yêu cầu người mới không thấy Tiếp tục điều tra và không nhận cảnh báo Ván mới; chỉ người có dữ liệu đã lưu mới thấy hai phần này.
- Căn cứ: yêu cầu hiện tại (DEC-029), Project.docx §3.2/§6.3, thiết kế font DEC-012.
- Kế hoạch (DEC-003): kiểm tra font và nguồn bản lưu → sửa đọc/lưu theo tài khoản → ẩn và dồn hàng menu, giữ điều kiện cảnh báo theo dữ liệu → kiểm thử người mới/cũ/đổi tài khoản, kiểm tra ảnh và chạy npm run check. Rủi ro: nhận nhầm bản lưu cũ chung, điều hướng bàn phím qua mục bị ẩn, khác font trên máy khác. Không thêm đặc tả/API/cốt truyện.
- B1 hoàn tất: thiếu Playfair Display/Be Vietnam Pro (TD-43); bản lưu riêng không tồn tại lại fallback sang khóa chung, gây nhận nhầm người mới. Tái hiện lệch dấu trong tiêu đề bằng ảnh Chrome trước sửa.
- B2 hoàn tất: saveService chỉ đọc/lưu theo username; không tạo bản lưu chung khi thiếu danh tính. Giữ nguyên dữ liệu chung cũ, không tự gán chủ sở hữu. MainMenu ẩn mục Tiếp tục khi chưa có bản lưu, đánh lại số và vị trí hàng; bàn phím bỏ qua mục bị ẩn. Ván mới dùng cùng điều kiện saveAvailable của tài khoản.
- B3 hoàn tất: bỏ Georgia khỏi chuỗi font dự phòng, dùng Times New Roman. Đã xem ảnh Chrome sau sửa, tiêu đề “Bắt đầu ván mới?” đúng dấu. Không đổi nội dung UI. Các font thiết kế vẫn thiếu: tải qua shell không kết nối được, chạy ngoài sandbox bị Access denied; Computer Use dừng vì không xác minh được URL Edge. Không tiếp tục điều khiển trình duyệt đó.
- B4: thêm 3 unit test saveService và 4 bài Playwright cho người mới, người cũ, xác nhận/hủy Ván mới, đổi tài khoản rồi lưu. Kiểm thử phát hiện lỗi thật khi React dựng lại canvas: ScaleManager giữ bounds lệch một chiều cao canvas, chuột không bấm trúng nút. MainMenu cập nhật lại bounds sau preload. Bài đổi tài khoản → ván mới → lưu → tải lại đã qua sau sửa; đang chạy lại toàn bộ với chuột/phím.
- `npm run check` sau sửa bounds đã qua lint, format, 191 test và build. Vẫn cảnh báo 4 font thiết kế bị thiếu (TD-43).
- Toàn bộ 7/7 ca Playwright qua trên Chrome: nhép miệng, hai lượt chơi tới CH2_ENTRY, người mới không đọc bản lưu chung/của người khác và vào thẳng bằng chuột, bàn phím bỏ qua mục ẩn, người cũ tiếp tục đúng bản lưu, cảnh báo/hủy/xác nhận Ván mới, đổi tài khoản rồi chơi/lưu/tải lại. Kiểm tra ảnh new-player-menu.png (hai mục, không hàng trống) và new-game-confirmation.png (tiêu đề đúng dấu). Chỉ dùng phiên giả trong trình duyệt test, không tạo tài khoản thật hay thay dữ liệu MySQL.
- Self-Check: đạt phạm vi T-054-Nhan; không đổi backend/API/CSDL/nội dung game. Bản lưu chung cũ được giữ nguyên nhưng không tự gán chủ sở hữu. Font Playfair Display/Be Vietnam Pro đầy đủ vẫn chờ TD-43; lưu máy chủ vẫn chờ ISS-29. Chưa commit.

### T-052-duy — Xây dựng phân hệ Website Admin tách biệt (DEC-024)
- Ngày giao: 12/11/2026 — người dùng yêu cầu lên PLAN trước cho Website Admin theo style hợp đồ án, tách biệt thư mục rõ ràng, có nút nối từ trang game chỉ dành cho tài khoản Admin duy nhất, bổ sung các tính năng quản trị phù hợp; sau đó duyệt thực thi.
- REQ / ISS liên quan: REQ-050, TD-32..TD-35; đóng ISS-10, ISS-11, ISS-12.
- **Kết quả thực hiện:**
  - **Backend (`backend/src/main/java/com/capstone/detectivegame/admin/`):** Tạo `AdminProperties`, `AdminSeeder` (tự động tạo tài khoản `ROLE_ADMIN` duy nhất khi khởi động, mặc định `admin` / `admin123`), `AdminService`, `AdminController` (`/api/admin/overview`, `/users`, `/users/{userId}/save`, `/reports/bugs`, `/reports/bugs/{id}/status`, `/evidence`, `/evidence/seed-chapter1`) và 6 DTO; cập nhật `SecurityConfig` yêu cầu `.hasAuthority("ROLE_ADMIN")` cho `/api/admin/**`; thêm `AdminServiceTest` (3 unit test mới).
  - **Frontend (`frontend/src/features/admin/` & `app/router/AdminRoute.jsx`):** Thiết kế theo phong cách *Noir Detective Archive* đồng bộ màu/font với game; tạo `AdminRoute.jsx` chặn người chơi thường; sửa `GamePlayPage.jsx` chỉ hiển thị nút `"HỒ SƠ QUẢN TRỊ →"` khi `session?.role === 'ROLE_ADMIN'`; tách rõ `admin/{api,layout,components,pages}` với 4 trang: `AdminOverviewPage`, `AdminUsersPage` (kèm `SaveJsonModal` soi 4 tab Sổ tay JSON cho E2E §5.2), `AdminBugReportsPage` (polling 5s, đổi `PENDING` ⇄ `RESOLVED`), `AdminEvidencePage` (quản lý & nạp nhanh 12 vật chứng Chương 1).
- **Kiểm tra:** `cd frontend; npm run check` PASS (ESLint 0 lỗi, Prettier sạch, Vitest 25 file / 183 tests PASS, Vite build thành công); `cd backend; mvn test` PASS (7/7 tests, BUILD SUCCESS).

### T-053-duy — Rà soát tính năng Website Admin (chỉ đọc)
- Ngày giao: 16/11/2026 — người dùng yêu cầu đọc và kiểm tra phần Admin, trọng tâm website; chỉ nêu tính năng và tác dụng, không thay đổi code.
- REQ / nguồn liên quan: REQ-050..055; SRC-1 Project.docx §4.2, §5.1–5.2; DEC-024; `PROJECT_MEMORY.md` mục C5, D5.6, E, F.

#### Kế hoạch (DEC-003)
- **Mục đích:** lập danh sách chức năng website Admin và tác động thực tế theo mã hiện tại.
- **Ảnh hưởng & thay đổi:** chỉ đọc frontend, backend, cấu hình, quyết định và tài liệu nguồn; không sửa code, dữ liệu ứng dụng hay API. Ghi checkpoint này vào `PROGRESS_LOG.md`.
- **Rủi ro bug / lỗi:** rà soát tĩnh không xác nhận giao diện đang chạy hoặc kết nối CSDL tại thời điểm này.
- **Đề xuất hướng phát triển (chờ duyệt):** không đưa đề xuất thay đổi trong phạm vi yêu cầu.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|
| B1 | Đọc điểm khôi phục, phần Admin trong Project Memory và tài liệu nguồn §4.2, §5.1–5.2 | Xong | Không sửa | Đối chiếu Project.docx và bản tham chiếu mới; nội dung Admin §5.1 nhất quán |
| B2 | Rà soát route, bốn trang Admin, API, service và phân quyền | Xong | Không sửa code | Ghi nhận tác dụng của số liệu, tra cứu bản lưu, báo lỗi, danh mục vật chứng và giới hạn tích hợp hiện tại |
| B3 | Tổng hợp kết quả và tự kiểm tra phạm vi | Xong | Chỉ cập nhật PROGRESS_LOG.md | Không chạy test hoặc khởi động dịch vụ theo yêu cầu chỉ đọc |

#### Kết quả
- **Đã hoàn thành:** rà soát chức năng website Admin và tác động backend; xác định trang báo lỗi cập nhật định kỳ 5 giây; danh mục `evidence_master` hiện chưa được game runtime đọc trực tiếp.
- **Chưa hoàn thành:** không kiểm tra thao tác trên website đang chạy/CSDL thật.
- **Điểm cần xác nhận:** không có yêu cầu xác nhận phát sinh.
- **Self-Check (A4):** không sửa code hoặc dữ liệu; không tuyên bố đã kiểm thử runtime; kết quả dựa trên mã và tài liệu đã đọc.
- **Bước tiếp theo:** tiếp tục T-043 theo điểm khôi phục; chờ ảnh 24 khung, playtest tay TD-38 và chốt ISS-29.

### T-054-duy — Xác định khả năng chỉnh cốt truyện từ Admin (chỉ đọc)
- Ngày giao: 16/11/2026 — người dùng hỏi Admin có thể tự thêm, xóa, sửa và cập nhật cốt truyện từ phần Tiến độ cốt truyện hay không.
- REQ / nguồn liên quan: Project.docx §5.1; SRC-5 `CHAPTER1_MEMORY.md` mục 0, 7, 9; DEC-016; DEC-024.

#### Kế hoạch (DEC-003)
- **Mục đích:** xác định Admin hiện chỉnh được nội dung kịch bản hay chỉ xem thống kê tiến độ.
- **Ảnh hưởng & thay đổi:** chỉ đọc luồng nạp kịch bản, trang/API Admin và hợp đồng dữ liệu; không sửa code, kịch bản, API hoặc dữ liệu ứng dụng. Ghi checkpoint này vào `PROGRESS_LOG.md`.
- **Rủi ro bug / lỗi:** rà soát tĩnh không xác nhận website đang chạy; không có thay đổi phần mềm.
- **Đề xuất hướng phát triển (chờ duyệt):** không lập đặc tả mới hoặc áp dụng thay đổi trong tác vụ này.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|
| B1 | Đọc điểm khôi phục, quy tắc làm việc, bộ nhớ và kế hoạch tích hợp Chương 1 | Xong | Không sửa | Data Contract 2.0 và yêu cầu giữ nguồn/chính sách runtime đã được đối chiếu |
| B2 | Đọc nơi khai báo/nạp dữ liệu chương và toàn bộ endpoint Admin | Xong | Không sửa | Graph kịch bản được cấu hình là JSON trong `public/assets/chapters`; không có route/API Admin cho story/chapter |
| B3 | Trả lời phạm vi hiện tại và ghi checkpoint | Xong | Chỉ cập nhật PROGRESS_LOG.md | Không chạy app hoặc test |

#### Kết quả
- **Đã hoàn thành:** xác nhận trang “Tiến độ cốt truyện” chỉ hiển thị thống kê; website Admin hiện chưa hỗ trợ thêm, xóa, sửa hoặc xuất bản graph/lời thoại.
- **Chưa hoàn thành:** không triển khai hoặc lập kế hoạch chi tiết tính năng chỉnh kịch bản.
- **Điểm cần xác nhận:** nếu người dùng muốn thực hiện tiếp, cần chốt rõ phạm vi nội dung chỉnh sửa và duyệt kế hoạch trước khi thay đổi API/dữ liệu/cấu trúc.
- **Self-Check (A4):** không thay đổi mã nguồn, kịch bản hoặc dữ liệu game; kết luận dựa trên luồng nạp JSON hiện tại và endpoint đã đọc.
- **Bước tiếp theo:** tiếp tục T-043 theo điểm khôi phục; tính năng Admin chỉnh cốt truyện chưa được yêu cầu triển khai.

### T-055 — Đề xuất ý tưởng quản lý kịch bản từ Admin (chờ duyệt)
- Ngày giao: 16/11/2026 — người dùng yêu cầu nêu ý tưởng cùng lợi ích và bất lợi cho chức năng Admin tự thêm/xóa/sửa/cập nhật cốt truyện.
- REQ / nguồn liên quan: Project.docx §5.1–5.2; DEC-016; DEC-024; SRC-5 `DATA_CONTRACT.md`, `CHAPTER1_MEMORY.md` mục 0, 7; `CHAPTER1_PLAN.md` mục 1–3.

#### Kế hoạch (DEC-003)
- **Mục đích:** đề xuất hướng xây dựng khả năng quản lý nội dung kịch bản từ website Admin mà vẫn giữ Data Contract 2.0.
- **Ảnh hưởng & thay đổi:** chỉ đọc tài liệu/mã hiện hành, so sánh phạm vi editor chữ và editor toàn graph; không sửa code, JSON kịch bản, API hoặc CSDL. Ghi checkpoint này vào `PROGRESS_LOG.md`.
- **Rủi ro bug / lỗi:** chưa triển khai; rủi ro thiết kế cần nêu gồm graph hỏng, save cũ tham chiếu node bị xóa và nội dung lệch canon.
- **Đề xuất hướng phát triển (chờ duyệt):** editor theo quy trình bản nháp → kiểm tra → xem trước → xuất bản; có thể chia giai đoạn sửa text node hiện có rồi mới mở chỉnh graph. Cơ chế lưu/truyền kịch bản và chính sách tương thích save chưa được chốt.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|
| B1 | Đọc điểm khôi phục, quyết định và tài liệu Data Contract 2.0 | Xong | Không sửa | Xác nhận kịch bản là graph JSON; current node và state nằm trong bản lưu |
| B2 | Đối chiếu luồng nạp game với phạm vi Admin hiện có | Xong | Không sửa | Runtime nạp JSON tĩnh; API Admin chưa có quản lý story/chapter |
| B3 | Soạn phương án và ghi nhận ưu/nhược điểm | Xong | Chỉ cập nhật PROGRESS_LOG.md | Chưa áp dụng phương án, không chạy test |

#### Kết quả
- **Đã hoàn thành:** đề xuất hai mức: sửa chữ trên node hiện có; hoặc editor toàn graph cho phép thêm/xóa node và sửa nhánh, điều kiện, hiệu ứng. Hướng khuyến nghị là triển khai theo giai đoạn, validate và xem trước trước khi xuất bản, kèm quản lý phiên bản.
- **Chưa hoàn thành:** chưa chốt lưu nội dung ở đâu, cách game lấy bản đã xuất bản, phạm vi người được duyệt, và cách xử lý save khi node bị xóa/đổi.
- **Điểm cần xác nhận:** người dùng chọn phạm vi editor và duyệt kế hoạch trước khi thay đổi API/dữ liệu/cấu trúc.
- **Self-Check (A4):** đề xuất được gắn nhãn chờ duyệt; không sửa code, API, CSDL hay cốt truyện.
- **Bước tiếp theo:** chờ hướng dẫn người dùng; nếu được yêu cầu, lập PLAN chi tiết trước khi triển khai.

### T-056 — Lập kế hoạch Admin chỉnh nội dung kịch bản và prompt tiếng Anh
- Ngày giao: 16/11/2026 — người dùng chọn chỉ cho Admin nhập/chỉnh nội dung văn bản vì phạm vi này ít rủi ro; yêu cầu kế hoạch và prompt bằng tiếng Anh.
- REQ / quyết định liên quan: REQ-056, DEC-025; DEC-016; SRC-5 Data Contract 2.0; Project.docx §5.1.

#### Kế hoạch (DEC-003)
- **Mục đích:** đề xuất một editor chỉ sửa nội dung văn bản trên node kịch bản hiện có, giữ nguyên graph và trình bày kế hoạch/prompt tiếng Anh.
- **Ảnh hưởng & thay đổi:** chỉ soạn kế hoạch và prompt; cập nhật PROJECT_MEMORY.md ghi nhận phạm vi do người dùng chốt và PROGRESS_LOG.md. Không sửa code, API, CSDL hay JSON kịch bản.
- **Rủi ro bug / lỗi:** chưa triển khai; kế hoạch nêu rủi ro lưu/xuất bản, nội dung sai, và tương thích giữa runtime với bản text đã cập nhật.
- **Đề xuất hướng phát triển (chờ duyệt):** text-only overrides trên node hiện có; bước lưu trữ/API, trường text được sửa, và workflow xuất bản phải được duyệt trước khi code.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|
| B1 | Đọc điểm khôi phục, yêu cầu Admin, quyết định và nguồn Data Contract | Xong | Không sửa | Xác nhận runtime dùng graph JSON; node có các trường văn bản, ID/đường đi/điều kiện/hiệu ứng là cấu trúc |
| B2 | Lập kế hoạch theo phạm vi text-only, nêu ưu/nhược và điểm chưa chốt | Xong | Không sửa code | Khuyến nghị giai đoạn editor, validation, preview và publish; persistence còn cần duyệt |
| B3 | Soạn prompt tiếng Anh có rào chắn phạm vi và yêu cầu chờ duyệt trước implementation | Xong | Chỉ cập nhật PROJECT_MEMORY.md và PROGRESS_LOG.md | Không chạy test |

#### Kết quả
- **Đã hoàn thành:** cung cấp kế hoạch và prompt tái sử dụng bằng tiếng Anh; ghi nhận scope text-only ở REQ-056/DEC-025.
- **Chưa hoàn thành:** chưa chọn trường text chính xác, cơ chế lưu/publish, và chính sách nội dung cho save đang chơi.
- **Điểm cần xác nhận:** kế hoạch chi tiết và các lựa chọn kỹ thuật cần người dùng duyệt trước khi sửa code.
- **Self-Check (A4):** không thêm/xóa node hoặc thay graph; không viết cốt truyện; không thay đổi code, API, CSDL hoặc dữ liệu game.
- **Bước tiếp theo:** chờ người dùng duyệt kế hoạch hoặc chỉ định phạm vi trường text/lưu trữ.

### T-057 — Tạo skill frontend-design-craft
- Ngày giao: 16/11/2026 — người dùng yêu cầu dùng skill-creator tạo skill frontend tránh thiết kế AI rập khuôn.
- Nguồn: yêu cầu hiện tại; skill-creator/SKILL.md và references/openai_yaml.md. Không bổ sung đặc tả game.

#### Kế hoạch (DEC-003)
- **Mục đích:** tạo skill tái sử dụng cho thiết kế UI có cá tính dựa trên sản phẩm và tác vụ người dùng.
- **Ảnh hưởng:** tạo SKILL.md và agents/openai.yaml trong thư mục skill cá nhân; chỉ cập nhật nhật ký trong repo, không sửa frontend/backend.
- **Rủi ro:** tránh biến hướng dẫn thành một template mới; không áp đặt màu/font cụ thể hoặc cấp quyền thay đổi công nghệ/nội dung dự án.
- **Hướng phát triển:** giữ skill ngắn, tự động áp dụng cho công việc thiết kế frontend phù hợp; chỉnh tiếp khi có phản hồi thực tế.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra |
|---|---|---|---|---|
| B1 | Đọc skill-creator, metadata reference và điểm khôi phục dự án | Xong | Không sửa | Đã đối chiếu phạm vi |
| B2 | Soạn skill tiếng Anh trong thư mục artifact tạm | Xong | frontend-design-craft/SKILL.md, agents/openai.yaml ngoài repo | quick_validate.py PASS; bổ sung PyYAML chỉ trong thư mục kiểm tra tạm |
| B3 | Cài skill cá nhân và kiểm tra lại | Xong | C:/Users/Admin/.codex/skills/frontend-design-craft; PROGRESS_LOG.md | quick_validate.py PASS; metadata hợp lệ; file cài giống bản đã kiểm; automatic selection mặc định bật |

#### Kết quả
- Đã hoàn thành: skill thiết kế frontend theo ngữ cảnh, bố cục/nội dung/typography có chủ đích, tránh mô típ rập khuôn, trạng thái tương tác, accessibility và rà soát viewport.
- Điểm cần xác nhận: không có. Không thay đổi mã, dữ liệu hoặc nội dung cốt truyện.
- Self-Check: chỉ tuyên bố kiểm tra cấu trúc/metadata đã chạy; chưa đánh giá skill qua tác vụ thiết kế thực tế.
- Bước tiếp theo: dùng $frontend-design-craft khi làm UI; T-056 chờ duyệt thiết kế editor nội dung.

### T-058 — Kế hoạch chi tiết Story Content cho Admin (chờ duyệt)
- Ngày giao: 16/11/2026 — người dùng yêu cầu rà soát nguồn/schema/loader/Admin, lập kế hoạch cho editor chỉ sửa text, so sánh persistence và dừng xin duyệt trước khi triển khai.
- Nguồn/REQ: REQ-056, DEC-016/019/023/024/025; Project.docx §5.1–5.2; Data Contract 2.0; CHAPTER1_MEMORY và CHAPTER1_PLAN.

#### Kế hoạch (DEC-003)
- **Mục đích:** xác định trường text thực có, tác động hiển thị, storage/API/phiên bản cần duyệt và các gói triển khai sau duyệt.
- **Ảnh hưởng & thay đổi:** chỉ đọc tài liệu và mã; soạn artifact kế hoạch ngoài cấu trúc repo, cập nhật checkpoint. Không sửa code/API/SQL/JSON hoặc cài thêm dependency.
- **Rủi ro:** baseline runtime khác schema nguồn; narration/action bị engine bỏ qua; text đối thoại không tự đồng bộ với hồ sơ trong effect/state; race khi publish và nội dung đang chơi.
- **Đề xuất chờ duyệt:** MySQL lưu sparse overrides, nháp riêng/phiên bản bất biến/pointer publish; runtime chụp phiên bản theo phiên New/Continue; hash bảo vệ baseline.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra thực tế |
|---|---|---|---|---|
| B1 | Đọc AGENTS, restore point, bộ nhớ/nguồn Project.docx và Data Contract | Xong | Không sửa | Đọc §5.1 trực tiếp từ cả hai Project.docx bằng ZIP/XML; không chỉnh nguồn |
| B2 | Rà schema, đếm trường runtime, kiểm tra loader/runner/bridge/Admin/security/SQL và validator | Xong | Không sửa | Runtime 1.264 node; 733 text + 80 choice labels; 9 hotspot labels chưa được schema định kiểu; 3 lựa chọn mở đầu thiếu condition mà runtime/validator hiện cho phép mặc định true |
| B3 | Hoàn thiện artifact kế hoạch, contract đề xuất và xác nhận ranh giới | Xong | Artifact ngoài repo, PROGRESS_LOG.md; cập nhật trạng thái REQ-056 trong PROJECT_MEMORY.md | Đọc lại artifact; git diff chỉ có 2 file bộ nhớ đang sửa từ trước; không có thay đổi code/API/SQL/JSON |

#### Kết quả
- **Đã hoàn thành:** kế hoạch tiếng Anh tại `C:/Users/Admin/.codex/visualizations/2026/11/16/01a1e1cf-f362-7163-89d7-571f1146147e/story-content-implementation-plan.md` (10 mục). Đề xuất allowlist 733 node.text + 80 choices[].text; 9 hotspot text và notebook_update.text chỉ đọc. Schema paths/type đã đối chiếu nguồn.
- **Đề xuất chờ duyệt:** sparse overrides trong MySQL (draft/version/published pointer), supplemental SQL giữ nguyên schema.sql gốc, các API Admin/published-text, deployment manifest lấy từ registry runtime, fingerprint chống lệch baseline, publication cố định trong phiên New/Continue, phục hồi thành draft và publish mới.
- **Giới hạn đã công khai:** runtime hiện 1.264 node khác nguồn 1.257; narration/action bị bỏ qua; sửa thoại không đổi record text bên trong state/effect; 3 choice mở đầu thiếu condition theo schema nguồn, validator/runner hiện chấp nhận mặc định true. Không tự sửa dữ liệu hoặc schema để làm PASS.
- **Chưa hoàn thành:** chưa triển khai; chưa chạy validator, test, build, UI hoặc CSDL. Các thao tác Python thực tế chỉ đọc ZIP/XML và thống kê JSON.
- **Điểm cần xác nhận:** 4 nhóm quyết định ở §10 của artifact; mọi lựa chọn kỹ thuật là đề xuất, chưa ghi thành DEC mới.
- **Self-Check (A4):** đã đọc nguồn/loader/schema/API liên quan; không sáng tác cốt truyện, không sửa công nghệ/dependency hoặc cấu trúc repo. Nhánh hiện tại `duy` được giữ nguyên trong giai đoạn kế hoạch; trước khi code cần làm đúng nhánh `Nhan`.
- **Bước tiếp theo:** chờ phê duyệt cụ thể của người dùng; không xem prompt lập kế hoạch là đồng ý triển khai.


### T-059 — Triển khai Story Content (DEC-026)
- Người dùng 16/11/2026 đồng ý cả 4 nhóm quyết định T-058; sau đó chỉ định nhánh duy.
- Căn cứ: REQ-056, DEC-026; Project.docx §5.1, Data Contract 2.0, kế hoạch đã duyệt.
- Kế hoạch: (B1) pure merge/manifest và schema bổ sung; (B2) API draft/version/publish bảo vệ Admin; (B3) editor theo phong cách Admin hiện tại; (B4) lấy published qua EventBus ở New/Continue; (B5) kiểm thử unit, validator trên bản tạm, frontend/backend check và E2E/manual.
- Ảnh hưởng: module/admin/game bridge, 3 bảng mới bằng SQL bổ sung, API đã duyệt; không sửa graph/state schema/source hoặc schema.sql gốc.
- Rủi ro: race publish, baseline khác hash, xung đột bản nháp, giữ nguyên state/history, offline fallback. Phòng bằng khóa/revision/fingerprint, allowlist trên server và client, kiểm tra invariant.
- Checkpoint B0: đọc nguồn và skill frontend, lưu kế hoạch vào docs; nhánh duy giữ các thay đổi bộ nhớ sẵn có. Nhánh Nhan vừa tạo chưa có commit, không xóa vì không cần thiết.

- Checkpoint B1–B4 (đang tích hợp): đã tạo pure allowlist/merge + manifest registry; bổ sung SQL 3 bảng giữ nguyên schema.sql; API/server lifecycle theo revision/fingerprint; trang Admin Story Content; game fetch qua EventBus theo phiên. `mvn test` đã qua 7 test cũ sau khi biên dịch Java mới, chưa phải kiểm tra toàn tính năng. Lần chạy đầu bị chặn Maven repository C:/.m2; chạy lại dùng C:/Users/Admin/.m2/repository thành công.
- Bước tiếp theo: thêm test có ý nghĩa cho graph invariant, lifecycle, offline và E2E; format/lint/check; áp dụng schema bổ sung trên MySQL rồi thử thật.

- Checkpoint B5.1: frontend check qua 204 test + build; có 1 lint warning đang sửa và các cảnh báo font có sẵn. Backend test qua 16 ca gồm lifecycle và SecurityFilterChain thật qua MockMvc. Đã áp dụng đúng 3 bảng supplemental SQL trên MySQL cục bộ; schema.sql và graph JSON không sửa.
- Việc tiếp theo: chạy validator baseline/overrides, kiểm tra backend khởi động với schema bổ sung và browser E2E trên dữ liệu thật; bổ sung docs.

- Checkpoint cuối T-059: tất cả 4 E2E qua (2.4 phút); frontend check lần cuối sạch lint/format + 204 test/build; backend `mvn clean test` qua **17** ca theo Surefire XML (sửa con số tạm 16 ở checkpoint trước); validator baseline và merged đều qua 6.290 assertion. Manifest idempotent đã xác nhận mtime không đổi.
- Đã sửa các lỗi thực tế khi kiểm tra: ánh xạ CHAR(64), Tomcat error dispatch làm 403 thành 401, manifest ghi lại làm Vite reload khi test đang chạy. Có ghi nhận lần chạy fail và cách xử lý trong docs/STORY_CONTENT_QA.md.
- Đã áp dụng supplemental SQL trên detective_game; các bảng story mới còn rỗng (0/0/0). Database E2E dùng một lần đã dọn; cổng test 18981/5196 đã đóng. Không sửa nguồn, chapter runtime JSON hoặc schema.sql gốc.

#### Kết quả T-059
- Hoàn thành B1–B5: editor/API/persistence/runtime/validator/test/docs theo DEC-026. Giao diện desktop/mobile đã chụp và xem lại; ảnh artifact trong thư mục visualizations cùng phiên.
- File chính: frontend/features/admin/pages/AdminStoryContentPage.jsx; game/narrative/storyText.js; play/services/storyTextService.js; backend/admin/story/*; db/story-content.sql; docs/STORY_CONTENT.md, STORY_CONTENT_PLAN.md, STORY_CONTENT_QA.md. Tài liệu và endpoint list đã cập nhật.
- Giới hạn: runner Playwright khai báo trong package chưa cài; E2E dùng bundle Playwright thật 1.62.1 bằng alias tooling ngoài repo, không đổi dependency/lockfile. Font game Playfair/BeVietnam bị thiếu từ trước nên có fallback warning; không tự thêm ảnh/font. ISS-29 giữ nguyên.
- Self-Check: scope chỉ sửa text hiện có; không tạo truyện/lời thoại; role guard được thử trên server thật; revisions/fingerprints/hash/copy kiểm tra. Không commit/push, làm trên duy theo yêu cầu mới nhất.
- Bước tiếp theo: người dùng dùng trang biên tập theo hướng dẫn; không còn xác nhận bắt buộc cho tính năng đã duyệt.

### T-060 — Xác nhận thao tác và trạng thái nạp danh mục chứng cứ
- Ngày giao 16/11/2026: người dùng hỏi thêm/xóa thiếu xác nhận, thêm có ghi DB không, ảnh có hiện game không và yêu cầu chứng cứ hiện đã nạp/chưa nạp.
- Căn cứ: phản hồi người dùng, DEC-024; Project.docx §2.1 (evidence_master), §5.1; SRC-5 evidence.json và cấu hình chapters.js.
- Kế hoạch: B1 rà CRUD/ảnh/nguồn game; B2 xác nhận trước thêm/xóa/nạp và trạng thái theo code; B3 unit/UI test + frontend check, cập nhật kết quả.
- Ảnh hưởng: frontend Admin, helper trạng thái, tests và bộ nhớ. Không đổi API, SQL, graph hoặc nơi game đọc chứng cứ; tích hợp ảnh vào game chưa được yêu cầu triển khai.
- Rủi ro: không được nhầm lỗi kết nối với chưa nạp; phân biệt đã có trong danh mục DB với người chơi đã thu; đếm theo mã chuẩn thay vì số dòng. Dùng danh mục runtime chính thức và kết quả API để đối chiếu.
- Checkpoint B1 xong: CRUD dùng JPA save/delete, ảnh packed trong description; Notebook game đọc state/effect, không lấy ảnh Admin.
- Checkpoint B2 xong: AdminEvidencePage có xác nhận trước thêm/sửa/xóa/nạp, khóa thao tác khi đang gửi; mỗi mã hiện đã nạp/chưa nạp theo GET danh mục. Helper đối chiếu mã với evidence.json runtime, hiển thị các mã chuẩn còn thiếu và tổng 0/12, một phần hoặc đủ. Khi lỗi DB/catalog, hiện chưa kiểm tra được và cho làm mới. Thêm liên kết nhãn biểu mẫu và trạng thái hỗ trợ trình đọc màn hình; không thay API/backend/SQL/game.
- B3 đang làm: đã viết 4 unit test đối chiếu mã và 3 browser test dùng API giả lập cho xác nhận/hủy, lỗi xóa, trạng thái, ảnh khi lưu và lỗi tải; chưa có kết quả. Prettier đã chạy trên 4 file frontend của T-060.
- Checkpoint B3 cuối: `npm run check` chạy thật và qua lần cuối sau sửa căn lề mobile: ESLint sạch, Prettier sạch, 28 file/208 test Vitest qua, Vite build thành công. Có 4 cảnh báo font có sẵn (Playfair/BeVietnam), không thêm font/dependency.
- Browser: `playwright/cli.js test e2e/admin-evidence.spec.js` qua **3/3**, lần cuối 8,5 giây. Đã thử hủy/xác nhận thêm/sửa/xóa/nạp; lỗi xóa giữ nguyên trạng thái; 0/12 → 12/12 → 11/12 và reload; chọn ảnh không gọi lưu cho tới khi xác nhận, ảnh gửi trong payload và hiện lại ở Admin; lỗi API/catalog hiện chưa kiểm tra được. Đây là API giả lập trong Chrome, không phải kiểm thử CRUD MySQL trực tiếp.
- Runner browser dùng Playwright bundle 1.62.1 và loader ngoài repo như T-059 do runner khai báo chưa được cài. Không thay package/lockfile trong T-060. Vite test 5196 đã dừng, không thay dữ liệu DB thật.
- Đã xem ảnh chụp desktop 1280px và mobile 390px; chỉnh grid một cột để thẻ nằm đúng lề mobile rồi chạy lại check và 3 browser test. Ảnh lưu tại `C:/Users/Admin/.codex/visualizations/2026/11/16/01a1e1cf-f362-7163-89d7-571f1146147e/admin-evidence-desktop.png` và `admin-evidence-mobile.png` cùng thư mục.

#### Kết quả T-060
- Hoàn thành B1–B3, REQ-057. File tác vụ: AdminEvidencePage.jsx, evidenceInventory.js, evidenceInventory.test.js, e2e/admin-evidence.spec.js, PROGRESS_LOG.md và PROJECT_MEMORY.md.
- Thêm/sửa/xóa hiện có API ghi/xóa evidence_master qua JPA; ảnh được packed cùng description trong DB sau lưu thành công. Chọn tệp riêng chỉ tạo preview trong trình duyệt. Game đọc state/asset chapter, chưa dùng imageUrl của danh mục Admin; không tự tích hợp hoặc thay API/SQL/game.
- Không chạy lại Maven/validator ở T-060 vì không sửa backend hoặc dữ liệu chapter; kết quả T-059 vẫn ghi riêng ở trên. Không phát sinh yêu cầu xác nhận cho phần sửa UX đã giao. Tích hợp ảnh vào game chưa triển khai.
- Self-Check: dùng dữ liệu chuẩn có sẵn, không sáng tác chứng cứ/truyện; không nhầm dữ liệu DB với người chơi thu thập; lỗi tải không bị hiển thị thành chưa nạp; giữ nhánh duy và các thay đổi T-059 có sẵn, không commit/push.

### T-061 — Đọc báo cáo TEETS.docx và lập kế hoạch fix
- Ngày giao 16/11/2026: người dùng cung cấp `C:/Users/Admin/Downloads/TEETS.docx`, yêu cầu đọc và lên kế hoạch; phân biệt nội dung tài liệu với chỉ dẫn hiện tại. Sau đó xác nhận mục cuối đã hoạt động ổn, bỏ qua.
- Căn cứ: TEETS.docx (SRC-6); Project.docx §3.2/§4.2–4.3/§5.1–5.2; DEC-012/024/026; ISS-29.
- Kế hoạch (DEC-003): B1 đọc đầy đủ text + hình, phân loại bug và đề xuất tính năng; B2 đối chiếu mã/nguồn và tái hiện đọc-only nếu hữu ích; B3 soạn kế hoạch có thứ tự, module, rủi ro, điều kiện nghiệm thu và điểm cần duyệt. Không triển khai.
- Ảnh hưởng: chỉ artifact kế hoạch ngoài repo và bộ nhớ/checkpoint. Không sửa code, JSON, API, SQL, docs/sources hoặc cài dependency. Giữ nhánh duy; giữ file không theo dõi có sẵn ở gốc repo.
- Rủi ro: nhầm số người có save với online; nhầm lỗi drawImage với điều hướng role; thêm chức năng ngoài phạm vi; kết luận nguyên nhân từ ảnh khi chưa có stack; save server thiếu userId; không tự chọn chính sách session/email/OAuth/bảo trì.
- Checkpoint B1: đã đọc XML văn bản của DOCX, trích 8 ảnh vào artifact teets-review và mở xem đủ 8. SHA-256 tài liệu a818c80a9803873948cc8e99f48e899d9fdb279d5e7c26560d8aaee00029f056. Các câu trong tài liệu được xem là báo cáo/đề xuất, không phải lệnh triển khai. Mục cuối bị loại theo trả lời trực tiếp của người dùng.
- Checkpoint B2 đang làm: đã kiểm tra LoginPage mặc định điều hướng /play, PhaserGame mount/destroy, thiếu 4 file font, menu/cài đặt đã có nhưng thiếu điểm mở trong khi chơi; auth chỉ JWT stateless, không có thu hồi phiên; activePlayers đếm game_saves; có POST reports/bug và API client nhưng không có form UI. Chưa chạy test/build hay sửa code.
- Checkpoint B2 xong: Chrome đọc-only với API giả lập tái hiện 3 luồng drawImage; stack `MainMenuScene.refreshAvailability → MenuItem.setEnabled/refresh → Text.setColor → Frame.updateUVs`. `MainMenuScene` chỉ gỡ EventBus ở SHUTDOWN; Phaser `Systems.destroy()` phát DESTROY, không phát SHUTDOWN. Khi quay lại, `useGameBridge` phát SAVE_AVAILABILITY nên menu đã bị hủy còn bị gọi. Không phải bằng chứng cần đổi phiên bản Phaser hoặc tắt StrictMode.
- Probe trong `teets-review/probe-navigation.mjs`, kết quả `navigation-probe-results.json`, ảnh lỗi cùng thư mục artifact. Lần đầu probe bắt URL API quá rộng làm chặn cả module JS; đã sửa bộ lọc ở script ngoài repo và chạy lại thành công tái hiện lỗi thật. Không dùng kết quả lỗi thiết lập làm bằng chứng của sản phẩm.
- Font: `document.fonts` báo Playfair 700 và Be Vietnam Pro 400/500/600 đều error; JetBrains Mono loaded. Đã đối chiếu font README/DEC-012 và @font-face. Không tải font hoặc thay asset ở giai đoạn kế hoạch.
- Checkpoint B3 xong: lưu kế hoạch chi tiết `C:/Users/Admin/.codex/visualizations/2026/11/16/01a1e1cf-f362-7163-89d7-571f1146147e/teets-review/teets-fix-plan.md` (11 nhóm, 4 giai đoạn, lựa chọn storage session, API/schema cần duyệt, affected modules, rủi ro và nghiệm thu). Đã dừng Vite probe; không có backend/DB thử trong tác vụ.

#### Kết quả T-061
- Hoàn thành B1–B3 đúng yêu cầu đọc và lập kế hoạch. Giai đoạn 1 đề xuất: lifecycle/drawImage, font, xác nhận logout, menu khi chơi; trang đích Admin và giữ tiến độ khi về menu là đề xuất chờ duyệt. Giai đoạn 2: UI báo lỗi và định danh; 3: phiên/online; 4: reset/social/bảo trì.
- Phân biệt hiện trạng với đặc tả: activePlayers theo DEC-024 là số player có save; số online là yêu cầu mới. Settings và Continue đã có ở menu chính; UI trong khi chơi còn thiếu. Login response thiếu userId (ISS-29), report API hiện có nhưng chưa có form; chính sách quyền sở hữu/ẩn danh/xung đột save cần chốt.
- Kiểm tra thực tế: đọc DOCX XML + xem 8 ảnh; Chrome chạy 3 kịch bản API giả lập và tái hiện lỗi. Không tuyên bố fix đã qua test. Không chạy frontend check/Maven/validator, không gửi request ghi DB thật. File mã/nguồn/asset không sửa; chỉ 2 file bộ nhớ trong repo thay đổi, giữ file untracked có sẵn. Không commit/push; nhánh duy giữ nguyên.
- Self-Check: kế hoạch có căn cứ Project.docx và quyết định đã duyệt, đề xuất mới được đánh dấu; không sáng tác truyện, không làm lại mục cuối đã được bỏ qua. Cần người dùng duyệt triển khai và các lựa chọn contract trước khi thay đổi.

### T-062 — Triển khai cả 4 giai đoạn TEETS (DEC-027)
- Người dùng yêu cầu làm cả 1–4, reset mật khẩu, chỉ Google, bảo trì. Trả lời tiếp: chưa có SMTP/Google client ID, chuẩn bị cấu hình và hướng dẫn; Admin thông báo trước, user tự dừng khi đến lịch.
- Kế hoạch/ảnh hưởng: docs/ACCOUNT_AND_OPERATIONS.md; frontend game/auth/play/admin, backend auth/security/report/game/admin, SQL bổ sung. Giữ stack, source/graph/schema.sql gốc và Story Content; không commit/push, giữ duy và file untracked có sẵn.
- Bước: B1 lifecycle/font/menu; B2 auth/định danh/báo lỗi/save; B3 MySQL session/online; B4 reset/Google/lịch bảo trì; B5 kiểm tra và hướng dẫn cấu hình.
- Rủi ro: stale scene callbacks; replay effect; token/nonce/reset/race phiên; mất save khi hết giờ; nhầm cấu hình chưa có với chức năng lỗi. Bảo vệ bằng cleanup, hash/claim/lock, local snapshot, backend guard và UI trạng thái rõ.
- Checkpoint đầu: đã đọc lại restore/AGENTS/nguồn/chapter/plan/skill UI; scope đã duyệt, không hỏi lại. Tích hợp mail dùng module Spring Boot Mail theo BOM, Google dùng GIS/JJWT hiện có. Chưa chỉnh code hoặc chạy test T-062.
- Checkpoint B1–B4 tích hợp: đã thêm sceneLifecycle (SHUTDOWN/DESTROY), gameControls pause/settings/menu memory/maintenance và local snapshot; thêm font Playfair variable 700 + BeVietnam 400/500/600 và 2 OFL từ Google fonts. Tải mạng thường bị chặn socket, lần yêu cầu quyền tự động đã tải đủ, không có rejection.
- Backend mới: AccountStore (Spring transaction JDBC trên 5 bảng supplemental), SessionService/sid, userId login, CurrentUser ownership cho save/load/report, reset mail/token hash, GIS nonce/JWKS verifier/link password, maintenance schedule/filter + public status/Admin APIs. Spring Boot Mail đã tải qua Maven; schema.sql gốc không sửa. Config SMTP/Google để rỗng theo xác nhận user.
- Frontend mới: AuthProvider config/heartbeat/status/401, auth recovery/Google UI, Menu/Report/native modal, Admin Operations poll5s + schedule/end, role landing /admin, backend/local save selection (helper/test). Sidebar/statistics label cần xem lại UI. Các file phần backend/React đã biên dịch qua backend 17 test cũ; account tests/DB/browser chưa thực hiện.
- Frontend: lần lint đầu báo 2 lỗi set-state-in-effect, đã đổi callback fetch; lần check tiếp dừng format BugReportDialog. Việc tiếp theo: format/check, thêm test auth/Google/maintenance, tạo DB dùng một lần + SMTP capture, startup/Chrome thật, sửa lỗi thực tế. Đừng báo tính năng đã xong chỉ dựa 17 test cũ.
- Hiện không có server T-062 đang chạy. Giữ file untracked tên lạ ở gốc repo (có sẵn trước task); không commit/push. Phần Google/mail thật chưa có cấu hình: test phải phân biệt fixture cục bộ với dịch vụ thật.
- Checkpoint QA1: frontend check qua 213 test/build, không còn cảnh báo font. Sau đó tách callback giữ save khỏi AuthProvider để giữ Phaser lazy-load, chưa check lại thay đổi này. Backend clean test **26/26** qua sau sửa JJWT registry (clear collection rỗng làm token hợp lệ bị từ chối); không giảm kiểm tra RS256/claims.
- QA2: đã tạo DB riêng `detective_t062_20261116_f512` (12 bảng), backend port 18982, Vite 5196 và SMTP capture localhost 25862. Session đang chạy: backend exec 99666 (Java PID 191452), Vite 17370, SMTP 27850. SMTP capture và probe ở artifact account-operations-qa; không chứa cấu hình tài khoản thật.
- API/MySQL/SMTP thật cục bộ: api-qa.mjs qua 7 nhóm: role/userId, online trước save, ownership save/load/report, login thay phiên và stale logout, reset email một lần/thu hồi phiên, Google chưa cấu hình, scheduled maintenance/server block/restore. Chưa áp dụng 5 bảng mới trên detective_game chính. Browser 3 ca đang chạy (exec 5133), gồm 20 vòng route/logout, pause/report/save/maintenance và hai trình duyệt/reset UI. Việc tiếp theo: xử lý kết quả browser, ảnh QA, full frontend/backend và hồi quy Chapter 1, hướng dẫn/cập nhật memory, dọn DB/server thử sau xong.
- QA3: 20 vòng Admin↔game và logout/login qua (43,4s). Browser phát hiện Esc đóng Settings rồi đóng luôn modal vừa mở: đã preventDefault/stopPropagation. Một lần test chọn nhầm menu do vị trí chuột/giả định index phím; đã click Continue theo bounds UI. Không sửa nội dung chương. Hai E2E còn lại sau chỉnh qua (51,3s): pause/settings/memory resume/report/save/online/lịch bảo trì và session thứ hai/reset từ SMTP thật cục bộ.
- QA4: thêm 4 unit gameControls (giữ parent scene pause, bảo trì giữa Settings, phiên nhớ trong menu, cleanup control). Frontend check mới nhất **217/217**, build lại giữ Phaser lazy-load (auth bundle ~330KB, game ~1,5MB), không cảnh báo font. Backend clean test mới nhất **26/26**. Đã sửa cooldown reset dùng locking current read để đúng với concurrent requests dưới MySQL REPEATABLE READ.
- Backend thử đã restart dùng bản mới: exec **66415**, PID **206028** (exec 99666 cũ đã dừng). reset-edge-qa.mjs qua 3 nhóm với DB thật: hai request đồng thời chỉ một email, cùng token đồng thời chỉ một reset thành công, hash-only/expired token bị từ chối. SMTP không gửi thư ra ngoài.
- Full hồi quy đang chạy **10 E2E** exec **72169** với backend 18982/SMTP25862/Vite5196. Fake-auth chapter/evidence test đã mock riêng heartbeat để tiếp tục kiểm tra canvas/UI; live Story Content và account dùng API thật. Docs/ACCOUNT_AND_OPERATIONS.md đã có hướng dẫn cấu hình Google Web Client ID/SMTP và thao tác/lịch bảo trì. Đừng sửa frontend hoặc chạy build khi E2E đang chạy để tránh HMR ảnh hưởng kết quả.

- Checkpoint QA cuối: thêm guard revision/server time/deadline latch cho lịch bảo trì và 4 unit test, tránh response lịch cũ mở lại game hoặc ghi đè trạng thái mới. Frontend `npm run check` lần cuối qua ESLint/Prettier, **221/221** Vitest (32 file) và Vite build; không còn cảnh báo font. Backend `mvn clean test` lần cuối sau chỉnh giới hạn mật khẩu Google-link theo 72 byte UTF-8 qua **26/26**, 0 failure/error/skipped theo Surefire XML.
- Chrome toàn bộ lần cuối exec **64943** qua **10/10** trong 4,8 phút: 3 account/operations, 3 evidence, 3 Chapter 1, 1 Story Content. Bao gồm 20 vòng Admin/game/logout/login, pause/settings/memory resume, báo lỗi đến Admin, lưu Sổ tay lên MySQL, online trước save, thông báo và tự dừng theo lịch, Admin mở lại, thay phiên ở browser thứ hai và reset bằng SMTP localhost. Không thử Google account hoặc thư ra ngoài vì chưa có cấu hình thật.
- Chapter validator `scripts/chapter1/validate.py` qua **6290 assertion**, 1264 node/43 statement, không có broken target/unreachable. Đã xem ảnh Operations desktop 1280px/mobile 390px và màn dừng bảo trì. Hộp bắt đầu ván mới được kiểm tra riêng sau hai Phaser postrender, đủ 5 font face loaded và dấu tiếng Việt đúng; không dùng frame cũ chụp quá sớm làm bằng chứng.
- Đã áp dụng `account-operations.sql` vào `detective_game`: users=4, game_saves=0, evidence_master=12, bug_reports=0 trước/sau không đổi; các bảng phiên/reset/Google mới rỗng, bảo trì OFF/revision0. Không chép fixture vào DB chính. DB thử `detective_t062_20261116_f512` đã xóa sau xác minh chỉ có tài khoản thử; các server backend/Vite/SMTP thử đã dừng và xác nhận không còn listener 18982/5196/25862.

#### Kết quả T-062
- **Đã hoàn thành:** B1–B5 của cả 4 giai đoạn theo DEC-027; sửa lifecycle/font/đăng xuất/menu, định danh/báo lỗi/lưu đúng tài khoản, một phiên/online, quên mật khẩu/Google duy nhất và bảo trì có lịch. Có hướng dẫn cấu hình tại `docs/ACCOUNT_AND_OPERATIONS.md`, kết quả và giới hạn QA tại `docs/ACCOUNT_OPERATIONS_QA.md`; helper SMTP localhost tại `scripts/qa_smtp_capture.py` đã kiểm tra cú pháp.
- **Chưa hoàn thành:** không còn việc triển khai trong phạm vi đã giao. Cần cấu hình SMTP/Google thật để sử dụng hai dịch vụ bên ngoài; đây là trạng thái người dùng đã chọn, không giả lập thành công trong sản phẩm.
- **Điểm cần xác nhận:** không có quyết định bắt buộc còn chờ cho phạm vi đã triển khai.
- **Self-Check (A4):** kiểm tra thực tế nêu trên; `git diff --check` sạch; không sửa `docs/sources/`, JSON chương runtime, graph/state contract hoặc `schema.sql` gốc. Giữ nhánh duy; không commit/push. Playwright QA dùng bundle thật 1.62.1 qua loader ngoài repo vì executable khai báo chưa cài, không thay dependency/lockfile frontend.
- **Bước tiếp theo:** cấu hình dịch vụ theo hướng dẫn, khởi động lại ứng dụng để dùng mã mới và tiếp tục yêu cầu tiếp theo.

### T-063 — Cung cấp lệnh commit và push lên duy
- Ngày giao: 16/11/2026 — người dùng yêu cầu gửi lệnh để tự commit/push lên nhánh duy.
- Căn cứ: yêu cầu hiện tại; quy tắc Git trong AGENTS và chỉ định duy của người dùng.
- Kế hoạch (DEC-003): đọc checkpoint/bộ nhớ, kiểm tra nhánh/status/remote, cung cấp lệnh PowerShell. Chỉ đọc Git và cập nhật nhật ký; không thực hiện stage/commit/push.
- Kết quả: nhánh hiện tại duy, HEAD 5459fed theo dõi origin/duy; origin là duy-nkd/The-Unspoken_Psychological-Detective-Game. Các thay đổi T-062 đang ở working tree. Cung cấp lệnh chuyển thư mục, chọn duy, stage, commit, push thông thường và xem trạng thái.
- Self-Check: đã kiểm tra Git cục bộ; không fetch, không sửa code, không chạy lại test, không thực hiện commit/push. Không cần quyết định bổ sung.

### T-064 — Lập kế hoạch sửa lỗi theo TEETS2
- Ngày giao: 17/11/2026 — người dùng yêu cầu dựa trên file vừa đọc để lên kế hoạch fix dự án. Chưa giao triển khai.
- Nguồn: `C:/Users/dangt/Downloads/TEETS2.docx` (đã đọc nội dung và xem 3 ảnh trong lượt trước); Project.docx §3.2/§6.3; DEC-012..016, DEC-026/027 theo các phần hiện có của bộ nhớ, cần đối chiếu khi giải quyết merge.
- Kế hoạch (DEC-003): đọc checkpoint/bộ nhớ và nguồn liên quan → khảo sát pause/input, thời gian Admin, lọc kịch bản, online và phòng 201/204 → ghi kế hoạch theo giai đoạn, tiêu chí nghiệm thu, rủi ro và phần cần chốt. Chỉ thêm tài liệu kế hoạch và ghi chú tiến độ ngoài conflict; không sửa code/API/SQL/asset/graph, không stage/commit/push.
- B1 hoàn tất: xác nhận nhánh Nhan; 2 file bộ nhớ/tiến độ unmerged, mã DEC-024/025 trùng giữa hai bên. Giữ nguyên xung đột. Code hiện tại đã có userId/save ownership, font, pause menu và online theo phần T-062; không dùng trạng thái T-054 để kết luận các chức năng này vẫn thiếu.
- B2 hoàn tất: đã đọc các file liên quan. Xác nhận capture phím toàn cục còn có thể preventDefault khi scene pause; chưa có xử lý ESC chung cho pause. Test report cũ dùng fill(), chưa chứng minh nhập thật WASD. Nguyên nhân menu treo cần tái hiện runtime, chưa tuyên bố đã xác định. Admin có nơi cắt chuỗi thời gian và nơi dùng múi giờ máy; lọc loại lấy cả node không có trường sửa; API online đã trả userId. Phòng 201/204 có staging/depth/hotspot riêng.
- B3 hoàn tất: tạo `docs/TEETS2_FIX_PLAN.md`, đối chiếu đủ M01–M10. Kế hoạch G0 merge/baseline, G1 pause/ESC/input, G2 giờ Việt Nam, G3 online, G4 bộ lọc/dọn UI/thông báo, G5 phòng 204, G6 hồi quy. Mỗi nhóm có ảnh hưởng/rủi ro/tiêu chí kiểm thử; phần thiếu như danh sách dòng Admin, mobile không ESC và hệ số nền 204 được ghi rõ là cần chốt, không tự bổ sung đặc tả.
- Self-Check: đạt phạm vi lập kế hoạch; chưa chạy lint/test/build hoặc tái hiện runtime trong T-064. Không sửa chức năng, nguồn docs/sources, API/SQL/graph/asset hay dữ liệu người chơi. Không sửa PROJECT_MEMORY hoặc nội dung các khối conflict; không stage/commit/push. Bước tiếp theo: người dùng xem kế hoạch và chốt phạm vi trước khi giao triển khai.

### T-065 — Thực hiện G0 và G1 theo TEETS2
- Ngày giao: 17/11/2026 — người dùng: "thực hiện G0 và G1". Căn cứ: docs/TEETS2_FIX_PLAN.md G0/G1; SRC-7; DEC-030.
- Kế hoạch: hợp nhất ghi nhớ và xác nhận Git → baseline → sửa pause/ESC/quyền input → gõ phím thật và hồi quy → cập nhật kết quả. Không sửa G2–G5, API/SQL/asset/graph; không commit/push. Rủi ro: mất lịch sử merge, ESC hai lớp, capture WASD, resume sai scene, mở khóa nhầm bảo trì.
- G0.1: hợp nhất các thông tin mới nhất, giữ cả lịch sử hai bên. T-052/053/054 thêm hậu tố Nhan/duy để phân biệt; quyết định Timeline/menu phía Nhan có mã mới DEC-028/029 (alias lịch sử DEC-024/025), giữ DEC-024..027 phía duy. Không đổi nội dung quyết định. REQ-028/029 giữ trạng thái triển khai Chương 1; REQ-030 giữ kết quả save server T-062.
- G0.2 hoàn tất: đã stage đúng PROGRESS_LOG/PROJECT_MEMORY để đánh dấu resolved; không còn file unmerged. Không commit/push. Baseline frontend npm run check qua 229/229 (34 file), lint/format/build; Maven clean test qua 26/26. Maven cần quyền dùng cache .m2, không sửa cấu hình hay DB.
- G1 đang làm: bộ điều khiển ESC ưu tiên lớp trên cùng, pause giải phóng capture của KeyboardManager và reset phím giữ, form đóng về pause, Settings không mở hai lần, tutorial bỏ qua từ pause với xác nhận cũ, preserveView cho resume không đổi cài đặt. Header bỏ nút Menu. 11/11 unit gameControls đã qua gồm 7 ca mới; đang kiểm thử DOM/Phaser thật bằng Playwright.
- Checkpoint G1: 3/3 ca Chrome mới đã qua sau chỉnh focus sau showModal và visibility của scene đã pause (Phaser không cho sleep một scene đang pause; ẩn bằng Systems.setVisible và khôi phục đúng trạng thái). Gõ phím thật kiểm W/A/S/D, sửa/chọn/xóa nội dung, Enter và tiếng Việt; kiểm payload POST chính xác, giữ player/state, Settings/Sổ tay/confirm tutorial, 3 vòng menu-memory không reset thoại, bảo trì không bị ESC/đóng form mở khóa. API fixture riêng, không ghi DB người dùng. Đang chạy check/hồi quy bản cuối.
- Checkpoint bản cuối: thêm chặn auto-repeat cho phím còn giữ từ biểu mẫu tới lúc nhả, có unit riêng và bước Chrome giữ W khi đóng form. Frontend npm run check đã qua **237/237** (34 file), lint/format/build. Đang chạy toàn bộ Playwright trên Chrome; không chạy build/chuẩn bị manifest trong lúc browser test để tránh HMR.
- Kết quả hồi quy: 10 ca qua trong lượt đầy đủ (gồm 2 lượt Chương 1 và 3 ca G1), 4 ca live API/DB/SMTP skip vì chưa có môi trường. Ba ca main-menu cũ thất bại chỉ do kỳ vọng chưa chứa mục Báo lỗi của T-062; đã đồng bộ kỳ vọng và xác nhận logout, chạy lại cả main-menu **4/4 qua**. Tổng cộng **13/13 ca khả dụng qua** trên cùng bản mã chức năng; không tuyên bố 4 ca live đã chạy. Bản cuối gameControls có 12 unit (8 mới). Đã xem 3 ảnh pause/report/menu-memory, lưu bản QA ổn định ở frontend/node_modules/.cache/teets2-g1-qa/.
- Self-Check cuối: hoàn thành đúng G0/G1 theo DEC-030. Không sửa G2–G5, backend/API/SQL/asset/graph hoặc dữ liệu người dùng; không commit/push. Git không còn unmerged. Chi tiết và giới hạn: docs/TEETS2_G0_G1_QA.md. Chỉ stage hai file ghi nhớ để resolved; giữ các thay đổi/staging trước tác vụ. Bước tiếp theo: người dùng thử bản sửa, giao giai đoạn tiếp theo khi muốn.

#### Checkpoint nguồn trước hợp nhất (lịch sử, không phải trạng thái hiện tại)

Nhánh Nhan:

| Trường | Giá trị |
|---|---|
| Cập nhật lần cuối | 17/11/2026 — T-074 thay code theo upstream/revert-9-Nhan |
| Tác vụ đang làm | T-074 đã hoàn tất đồng bộ code theo nhánh được chỉ định |
| Đã xong gần nhất | Sao lưu14file gồm palette13file và log vào stash64c180e7d28e42af55290a99dcb3a97cb7c4e1fd. Trước khi cập nhật log, HEAD/index/worktree khớp nguồn hoàn toàn |
| Trạng thái dở dang | Local revert-9-Nhan tracking upstream/revert-9-Nhan; Nhan giữ8cdb446. Không có sửa code riêng sau checkout, chỉ ghi nhật ký này theo DEC-002; không commit/push |
| Việc tiếp theo | Chờ yêu cầu người dùng; không tự khôi phục palette từ stash |
| Đang bị chặn bởi | Không. DB, file ignored/config local không đụng tới |
| Lệnh/kiểm tra cần chạy lại khi tiếp tục | Không có lệnh đang chạy. npm run check qua248/248 (37file), lint/format/build. Chưa kiểm backend/MySQL/Chrome trong tác vụ Git; code không sửa riêng |

Nhánh duy:

| Trường | Giá trị |
|---|---|
| Cập nhật lần cuối | 17/11/2026 — T-074 thay code theo upstream/revert-9-Nhan |
| Tác vụ đang làm | T-074 đã hoàn tất đồng bộ code theo nhánh được chỉ định |
| Đã xong gần nhất | Sao lưu14file gồm palette13file và log vào stash64c180e7d28e42af55290a99dcb3a97cb7c4e1fd. Trước khi cập nhật log, HEAD/index/worktree khớp nguồn hoàn toàn |
| Trạng thái dở dang | Local revert-9-Nhan tracking upstream/revert-9-Nhan; Nhan giữ8cdb446. Không có sửa code riêng sau checkout, chỉ ghi nhật ký này theo DEC-002; không commit/push |
| Việc tiếp theo | Chờ yêu cầu người dùng; không tự khôi phục palette từ stash |
| Đang bị chặn bởi | Không. DB, file ignored/config local không đụng tới |
| Lệnh/kiểm tra cần chạy lại khi tiếp tục | Không có lệnh đang chạy. npm run check qua248/248 (37file), lint/format/build. Chưa kiểm backend/MySQL/Chrome trong tác vụ Git; code không sửa riêng |

### T-066 — Thực thi G2: giờ Việt Nam trong Admin và lịch bảo trì
- Ngày giao: 17/11/2026 — người dùng: "thực thi G2". Căn cứ: SRC-7 (TEETS2 M03), docs/TEETS2_FIX_PLAN.md §G2; DEC-031.
- Kế hoạch trước sửa: đối chiếu ngữ nghĩa timestamp DB/JDBC/JPA → chuẩn hóa phản hồi Admin theo từng nguồn → helper shared định dạng Asia/Ho_Chi_Minh và chuyển datetime-local Việt Nam sang UTC → test đơn vị/Chrome nhiều timezone và hồi quy bảo trì → cập nhật QA/bộ nhớ. File ảnh hưởng: AdminService/StoryTextService, helper backend, trang Admin/SaveJsonModal/GamePlayPage (banner), shared/time và test. Không đổi schema, chữ ký/kiểu/định dạng JSON timestamp, cấu hình kết nối hoặc dữ liệu cũ. Rủi ro: chuyển hai lần, nhầm DB-generated với application-written, vượt ngày, lệch deadline/revision guard; chưa triển khai G3–G5.
- Checkpoint 1 — audit chỉ đọc: MySQL SYSTEM trả NOW 09:10, UTC_TIMESTAMP 02:10; JDBC URL đang serverTimezone=UTC nhưng getTimestamp/toLocalDateTime và Hibernate trả timestamp báo lỗi 15:55:47 trong khi SQL raw là 08:55:47 (epoch 1794880547). Đã xác minh HQL thật với Hibernate; không sửa URL/session timezone toàn ứng dụng. Các bảng game_saves/draft/version chưa có hàng để đối chiếu. Không đọc nội dung báo lỗi/save/người chơi và không ghi DB.
- Checkpoint 2 — đã sửa: AdminTimestamps dùng SELECT UNIX_TIMESTAMP với ID bind theo lô cho cột do DB tạo (users, game_saves, bug_reports); VietnamTime chuyển epoch sang LocalDateTime Việt Nam. Draft/version do Java ghi LocalDateTime.now được tái dựng theo zone JVM rồi chuyển sang Việt Nam ở DTO; persistence giữ nguyên. Helper frontend phân biệt ISO có offset với chuỗi Admin không offset (giờ Việt Nam), kiểm tra lịch/ngày thiếu/hỏng, áp dụng mọi vị trí G2 và chuyển ô nhập bảo trì Việt Nam sang UTC.
- Checkpoint 3 — kiểm tra: Maven test **30/30**, frontend npm run check **241/241** (35 file), ESLint/Prettier/build qua. Chrome G2 **6/6** qua tại UTC, Asia/Ho_Chi_Minh, America/New_York (Admin + gửi lịch UTC + banner). Đã xem hai ảnh save/maintenance; giờ và nhãn rõ, không tràn ở desktop. Đang bổ sung kiểm ranh giới deadline và chạy hồi quy G1/menu.
- Checkpoint 4 — đối chiếu lại DB chỉ đọc: helper trả 08:55:47, Jackson vẫn serialize chuỗi "2026-11-17T08:55:47"; HQL cũ vẫn 15:55:47. Prepared SELECT CAST với cách bind Timestamp của Hibernate tái dựng đúng giờ ứng dụng (09:29:29), không ghi fixture. Helper tạm ở backend/target (ignored). Đã chỉnh test live lịch bảo trì tạo input theo Việt Nam thay vì giờ máy; live API/SMTP chưa chạy trong G2.
- Self-Check cuối: **G2 hoàn tất**. Bản cuối npm run check qua **241/241**, lint/format/build; mvn test qua **30/30**; Chrome chọn lọc **13/13** (6 G2 + 3 G1 + 4 menu), gồm trước deadline một giây và đúng deadline ở UTC/Việt Nam/New York; input 01:00 ngày 17/11 luôn gửi 18:00 ngày 16/11 UTC. Đã xem ảnh, lưu ở frontend/node_modules/.cache/teets2-g2-qa/; ghi QA và hướng dẫn vận hành. git diff --check sạch, không còn unmerged, giữ Nhan/staging/application.yml có sẵn; không commit/push. Không đổi schema/API format/JDBC config, không ghi DB, không thực hiện G3–G5; cần restart backend/tải lại frontend cùng lần. Giới hạn DB/live E2E ghi rõ tại docs/TEETS2_G2_QA.md.

### T-067 — Làm rõ phạm vi G4 về giao diện Admin
- Ngày giao: 17/11/2026 — người dùng: "G4 là về giao diện admin hãy làm rõ vấn đề này".
- Căn cứ: đọc lại ĐIỂM KHÔI PHỤC, PROJECT_MEMORY A, working-rules, chữ gốc TEETS2.docx và docs/TEETS2_FIX_PLAN.md G3/G4; đối chiếu AdminStoryContentPage, AdminOverviewPage, useGameBridge và allowlist StoryTextCatalog.
- Kế hoạch/phạm vi: chỉ phân tích hiện trạng → phân biệt yêu cầu trong nguồn với đề xuất tinh giản → giải thích ranh giới G3/G4 và thông báo game. Chỉ cập nhật nhật ký, không đổi UI/code/API/dữ liệu. Rủi ro cần tránh: coi node kỹ thuật là dữ liệu thừa để xóa, ẩn lỗi quan trọng, hoặc gộp thay đổi online G3 vào G4.
- Kết quả kiểm đếm chỉ đọc runtime: dropdown hiện lấy 16 loại từ toàn graph; chỉ 8 loại có field được sửa theo allowlist hiện hành. router/transition/checkpoint_restore và các loại chỉ đọc khác vẫn xuất hiện trong dropdown dù mặc định editableOnly=true. Đề xuất menu loại khớp phạm vi biên tập, nhãn dễ hiểu và reset bộ lọc khi đổi phạm vi; không đổi allowlist/graph.
- Dọn Admin: nguồn yêu cầu giao diện sạch nhưng chưa liệt kê đầy đủ từng dòng. G4 cũ đề xuất thu gọn giải thích kỹ thuật vào trợ giúp/chi tiết; cần bảng giữ/bỏ/thu gọn cụ thể trước khi triển khai. Khối online lặp ở Tổng quan thuộc G3, chỉ bỏ sau khi ghép trạng thái vào Hồ sơ Thám tử.
- G4 cũ còn gộp mục ẩn thông báo nạp kịch bản thành công trong game theo TEETS2; đã phân biệt rõ đây là UI người chơi, khác phần Admin. Chưa sửa hoặc tự phân giai đoạn lại; chưa ghi quyết định triển khai mới.
- Self-Check: chỉ đọc nguồn/code/dữ liệu kỹ thuật và cập nhật nhật ký; chưa sửa chức năng, không chạy test/build vì không đổi code; số test G2 là kết quả lịch sử T-066. G3/G4/G5 chưa thực hiện, không commit/push.

### T-068 — Thực thi G4: tinh giản Admin và thông báo nội dung
- Ngày giao: 17/11/2026 — người dùng: "thực thi G4" sau khi đã làm rõ phạm vi ở T-067. Căn cứ: TEETS2/SRC-7, docs/TEETS2_FIX_PLAN.md G4, DEC-032.
- Kế hoạch đã trình bày: sửa menu loại theo phạm vi fields do server cho phép, nhãn tiếng Việt và reset loại không hợp lệ; giữ nháp khi tìm/lọc; chuyển giải thích poll/TTL sang trợ giúp; tách cảnh báo nội dung khỏi thông báo lưu và ẩn success base/published. Ảnh hưởng AdminStoryContentPage/helper/CSS, AdminBugReportsPage, AdminOperationsPage, useGameBridge/GamePlayPage và test. Rủi ro: mất nháp/ẩn cảnh báo/chọn phân đoạn ngoài danh sách/đổi ngôn ngữ ghi đè kết quả lưu. Không đổi API/SQL/allowlist/graph/nội dung; G3/G5 chưa giao, không commit/push.
- B1: đọc lại nguồn TEETS2 bằng XML chỉ đọc, quy tắc và ghi nhớ/plan Chương 1. Đã triển khai nhãn 16 loại thực có; mặc định 8 loại có fields, phạm vi chỉ đọc nằm trong Tra cứu nâng cao. Phân đoạn được chọn luôn thuộc kết quả; edits được giữ độc lập với filter. Poll/TTL giữ nguyên, lời giải thích thu gọn vào details; lỗi/trạng thái/xác nhận không xóa.
- B2: contentWarning chỉ giữ cached/offlineBase/rejected; base/published không tạo thông báo thường trực. Cảnh báo dịch độc lập, SAVE_RESULT/STORY_TEXT_RESULT/pinning/cache vẫn giữ. Frontend check bước đầu qua 244/244, lint/format/build. Đang kiểm Chrome bằng graph thật/API fixture; đã chỉnh fixture chọn đúng node, đúng response publish/restore và dùng settings store đầy đủ thay vì phát settings thiếu volume. Chưa ghi DB hoặc publish thật.
- B3: Chrome G4 **6/6 qua** sau chỉnh tên truy cập select và fixture. Kiểm 9/17 option (gồm Tất cả), tra cứu router chỉ đọc, giữ nháp/tìm nhãn Việt, reload không giữ loại đã biến mất, payload save/publish/restore giữ contract và lỗi thật vẫn thấy; nội dung base/published vẫn nạp và pinned, không còn thông báo success, save/cached/offline/rejected và đổi ngôn ngữ độc lập. Đã xem ảnh desktop/mobile/cảnh báo; ảnh Operations chụp quá sớm đang tải nên thêm đợi heading, chụp lại trước khi nghiệm thu cuối. Đang chạy check/hồi quy G1/G2, không đổi backend/API/DB.
- Self-Check cuối: G4 **hoàn tất**. Frontend npm run check qua **244/244**, 36 file, ESLint/format/build; E2E bản cuối **15/15** (6 G4 + 3 G1 + 6 G2), không pageerror. Đã chụp lại/xem ảnh Operations tải xong và cảnh báo+lỗi lưu đầy đủ, cùng desktop/mobile không tràn ngang. QA/bảng giữ-bỏ-thu gọn: docs/TEETS2_G4_QA.md, ảnh ignored frontend/node_modules/.cache/teets2-g4-qa/. Không đổi backend/API/schema/allowlist/graph/lời thoại, không ghi DB/publish thật; không chạy Maven/live E2E trong G4. Giữ staging/application.yml, Nhan; git diff --check sạch, không còn unmerged, không commit/push. G3/G5 chưa thực hiện; cần tải lại frontend.

### T-069 — Thực thi G5: tỷ lệ phòng 204 theo phòng 201
- Ngày giao: 17/11/2026 — người dùng: "thực thi G5". Nguồn: TEETS2/SRC-7, docs/TEETS2_FIX_PLAN.md G5, DEC-014/021/023 và DEC-033.
- Kế hoạch đã trình bày: đọc dữ liệu/phối cảnh/nguồn → đo và chụp 201/204 ba độ sâu → chuẩn hóa riêng room204 theo mốc 201, cập nhật vùng đi/spawn/điểm đứng tương ứng → unit đường đi/va chạm/bản lưu cũ → Chrome thực tế và hai lượt Chương 1 → validator/check/QA/bộ nhớ. Không đổi sprite chung, ảnh nếu chưa cần, graph/nội dung, save schema/API/DB. Rủi ro: hotspot lệch, đi xuyên Tùng/giường, kẹt cửa, save tọa độ cũ nằm ngoài sàn.
- B1: đã đọc nguồn TEETS2 phần 204, quy tắc, ghi nhớ/plan Chương 1; kiểm Nhan, không unmerged và không _migration. 201 depth 215@y474→330@y615; 204 cũ 216@y532→315@y655, sàn cho xuống y655. StoryMap lấy hotspot riêng từ ROOM_204_HOTSPOTS, gồm mở đầu quan sát/thoát và Phase 2. Đã xem cả hai nền 204 và nền 201; không có lớp che riêng ở 204.
- B2: baseline Chrome bằng technical fixture (không ghi DB) cho y550/587/605: 201 cao 276.99/307.16/321.84; 204 cao 230.49/260.27/274.76. Đã chụp ba vị trí và nền không Tùng; phát hiện chụp cùng roomId có thể bắt fade scene cũ nên thêm chờ player mới + fade xong và đang chụp lại baseline. Ảnh/JSON ignored ở frontend/node_modules/.cache/teets2-g5-qa/.
- B3: đã chụp lại baseline sau fade và sửa riêng room204.js: dùng ROOM_201.depth, cắt sàn cũ tại y615 (giao biên x≈129/1145), spawn225/600, điểm đứng khóa245/580 và cửa207/600; ảnh/rect hotspot/thân Tùng giữ nguyên. StoryMap tự nhận các điểm đứng mới qua ROOM_204_HOTSPOTS. 20/20 unit rooms liên quan qua, gồm tất cả cặp đường đi mượt tới đích thật, va chạm WASD và 4 tọa độ save cũ được đưa về sàn. Frontend check **248/248** (37 file), lint/format/build; validator **6290 assertion**, 1264 node, không target hỏng/không tới được. Đang chạy Chrome room204 và hai lượt Chương 1, không chạy build trong lúc browser.
- B4: Chrome lượt đầu 5/6 qua: cả hai lượt Chương 1 (thu nguồn sớm/qua hồ sơ Phase 4) tới CH2_ENTRY, ca nhép miệng, ảnh cùng tỷ lệ và WASD/chuột. Ca save cũ đã qua load về sàn rõ, state giữ nguyên; lỗi bước tìm nút Lưu vì PanelButton là Container có Text ở text.text. Sửa đúng selector trong test, không đổi game; đang chạy lại riêng 3 ca G5. Người dùng nhắc "tiếp túc đi", tiếp tục cùng tác vụ.
- Self-Check cuối: **G5 hoàn tất**. Sau sửa selector fixture, room204-scale.spec.js **3/3 qua** (ảnh ba độ sâu/hai nền, WASD/arrows/chuột quanh thi thể, load save cũ giữ state→Sổ tay lưu corrected position→reload). Cùng mã game với 3 ca chapter1 đã qua trước đó, gồm cả hai lượt tới CH2_ENTRY; không tuyên bố lượt đầu 5/6 là lượt sạch. Check248, validator6290, ESLint/Prettier test bản cuối qua. Đã mở xem ảnh trước/sau ba độ sâu + reference201/nền thường; số đo khớp 276.99/307.16/321.84px. Ghi docs/TEETS2_G5_QA.md/DEC-033, cập nhật kế hoạch. Giữ ảnh/sprite/graph/nội dung/API/DB/schema và staging/application.yml; không commit/push, không unmerged, diff check sạch. Chỉ thay bố trí riêng 204 + test/tài liệu; G3 chưa thực hiện, tải lại frontend để áp dụng.

### T-070 — Căn lại nhân vật 204 theo cửa và thi thể sau phản hồi người chơi
- Ngày giao: 17/11/2026 — người dùng nói G4 nhưng phản ánh tỷ lệ phòng 204 của G5: đã chơi thực tế và thấy nhân vật vẫn quá lùn so với cửa/thi thể. Tiếp tục sửa đúng vấn đề; không mở lại UI Admin G4.
- Căn cứ: phản hồi hiện tại, TEETS2/G5, DEC-014/021/033, room204/Player/atlas và ảnh QA T-069. Đã đọc checkpoint, PROJECT_MEMORY A/F, working-rules, ghi nhớ/plan Chương 1; Nhan, không unmerged/_migration.
- Kế hoạch đã trình bày: đo silhouette thật và mốc cửa/thi thể → preview tỷ lệ riêng 204 → áp dụng số đo phù hợp + cập nhật điểm đứng theo footprint → check/path/movement/save cũ/ảnh và hồi quy Chương 1 → QA/bộ nhớ. Không đổi ảnh, sprite toàn game/phòng201, nội dung graph, save schema/API/DB. Rủi ro: footprint lớn làm kẹt stand, prompt che đồ, đi xuyên body, save cũ nằm ngoài sàn.
- B1: bản T-069 cùng depth với 201 cho khoảng301px tại cửa y580 so với khung cửa hotspot454px (~66%); 307px ở y587 so với chiều dài hình thi thể khoảng350px. Số đo logic khớp 201 chưa đủ làm tỷ lệ vật thể 204 phù hợp theo người chơi. Atlas khung604px có padding, sourceHeight571; không kết luận lỗi padding khi chưa đo alpha. Đã thêm ảnh ở cửa/cạnh body, chạy preview riêng browser +25% trước khi sửa data; stage preview125 giữ ảnh T-069.
- B2: preview +25% qua1/1, đã xem ảnh cửa/cạnh body/giữa sàn. Chọn hệ số1.25 riêng depth204 (giữ near/farY201; nhân cả hai height nên speedFactor không đổi), giữ ảnh và phòng201. Căn stand khóa245→255 ở y580, thùng rác527/559→511/575 theo footprint lớn hơn. Unit20/20 qua tất cả cặp đích/path/va chạm/save cũ. Đổi QA đo visibleHeight bằng alpha frame thực; thêm kiểm tỷ lệ cửa80–90% và cạnh body350–405px, không chỉ assert chiều cao bằng201. Đang check/validator trước Chrome.
- B3: bản áp dụng T-070 check **248/248** (37file), lint/format/build; validator **6290**; Chrome room204 **3/3 qua** gồm alpha/đi lại/save cũ qua Sổ tay. Alpha frame idle cho visibleHeight388.04px ở khóa255/580 (=85.47% khung cửa454px),395.39px cạnh body582/587; chiều cao logic tương ứng376.82/383.95. Đã xem ảnh calibrated ở cửa/cạnh Tùng. Đang chạy lại chapter1.spec.js vì footprint/stand thay đổi, không dùng kết quả T-069 làm kiểm tra mới.
- Self-Check cuối: **T-070 hoàn tất sửa theo phản hồi**. chapter1.spec.js chạy lại **3/3 qua**, gồm hai lượt nguồn tùy chọn tớiCH2_ENTRY và ca nhép miệng; room204-scale **3/3 qua** trên cùng mã, không pageerror. Check248, validator6290; đã xem ảnh preview/calibrated ở cửa/cạnh thi thể, đo alpha thật. Cập nhật DEC-034/QA/kế hoạch, giữ ảnh/số đo T-069 làm lịch sử; không đổi201/atlas/ảnh/graph/nội dung/API/DB/schema. Giữ Nhan/staging/application.yml, không commit/push, diffcheck sạch/không unmerged. Chỉ chỉnh riêng204+test/tài liệu, G3 chưa thực hiện; tải lại frontend để áp dụng.

### T-071 — Gợi ý nội dung commit theo phạm vi đang stage
- Ngày giao: 17/11/2026 — người dùng hỏi "nên commit với nội dung gì gợi ý cho tôi"; chỉ tư vấn thông điệp, không giao thực hiện commit/push.
- Đã đọc checkpoint/quyết định liên quan và kiểm tra Git chỉ đọc: Nhan, MERGE_HEAD còn, không unmerged; 164file đã stage gồm Admin/tài khoản/vận hành và các sửa game/UI/timezone/tỷ lệ204. Kế hoạch: đề xuất message tổng hợp phù hợp phạm vi, không dùng tiêu đề chỉ mô tả sửa204 cho toàn bộ index.
- Kết quả: đề xuất tiêu đề tích hợp Admin và gameplay fixes, body nêu quản lý tài khoản/kịch bản/bảo trì, ESC/input, giờ Việt Nam, tinh giản UI và tỷ lệ204/save. Không chạy test mới vì không sửa code; không stage/commit/push, chỉ ghi nhật ký theo DEC-002.


### T-072 — Thiết kế lại giao diện Admin theo design-taste-frontend
- Ngày giao: 17/11/2026 — người dùng.
- Yêu cầu: khảo sát và thiết kế lại toàn bộ Admin, giữ nguyên tính năng/dữ liệu/nghiệp vụ/quyền/route/API; không sửa backend/auth/database. Không áp dụng bố cục landing page; profile kiểm thử tạm riêng.
- Căn cứ: yêu cầu hiện tại; DEC-024/026/027/031/032; quy tắc DEC-002/003.

#### Kế hoạch (DEC-003)
- Mục đích: tăng khả năng đọc và thao tác; thống nhất6 trang.
- Ảnh hưởng: frontend/features/admin, e2e và hồ sơ tiến độ; không đổi API/backend/dữ liệu nguồn/dependency.
- Rủi ro: CSS lọt ngoài Admin, contrast/mobile overflow/focus, vô tình đổi callback/payload. Đối chiếu source và fixture tách biệt DB.
- Hướng phát triển: token/component trình bày trong phạm vi người dùng cho phép; không đề xuất đặc tả mới.

#### Bước con & checkpoint
| Bước | Nội dung | Trạng thái | File tạo/sửa | Kiểm tra đã chạy & kết quả |
|---|---|---|---|---|
| 1 | Đọc nguồn, khảo sát6 trang/luồng, kế hoạch và snapshot | Xong | docs/ADMIN_REDESIGN_PLAN.md; snapshot node_modules/.cache | Git Nhan, không migration/unmerged; đã đọc route/API/form/polling/editor |
| 2 | Shell/token/nav/bảng/card/form/editor/modal keyboard | Xong | frontend/src/features/admin | Hoàn thiện theo QA; focus/contrast đã sửa và kiểm lại qua |
| 3 | Check, source audit, Chrome và xem ảnh | Xong | frontend/e2e/admin-redesign.spec.js; cache QA | Check248/37file;27/27Chrome +12/12 sau CSScuối;30layout không tràn;7AST nghiệp vụ khớp |
| 4 | Báo cáo và bộ nhớ/checkpoint | Xong | docs/ADMIN_REDESIGN_QA.md; PROJECT_MEMORY.md; PROGRESS_LOG.md | Giới hạn live DB/thiết bị thật đã ghi; không commit/push |

#### Kết quả
- Đã xong: khảo sát, thiết kế/triển khai đủ6 trang, kiểm tra và báo cáo QA.
- Chưa xác minh: live backend/MySQL/thiết bị thật theo giới hạn QA.
- Điểm cần xác nhận: không có trong phạm vi được giao.
- Self-Check: đạt trong phạm vi thiết kế; xem checkpoint cuối.
- Bước tiếp theo: chờ yêu cầu người dùng.

- B3 checkpoint: đã đối chiếu AST6page + ChapterFunnelChart, chỉ loại class/ARIA/scroll focus/ref trả focus/whitespace; nghiệp vụ khớp snapshot trước sửa. Adapter/helper/auth/router/backend/dependency/source không có diff. Modal chỉ đổi lớp trình bày và xử lý focus/Escape.
- B4 checkpoint: check248/37file + lint/format/build qua. Chrome lượt đầy đủ27/27 qua. QA phát hiện và đã sửa focus Tab, ref mở dialog sau tải async, tương phản chữ thiếu ảnh4.34:1; sau tinh chỉnh skip link/ảnh dừng transition đã chạy lại12/12 Admin và check cuối qua. 30layout (6trang×5width) không tràn tài liệu; 26ảnh và source-audit.json local ignored. Đã xem desktop/tablet/mobile cùng form/modal cuối.
- Kết quả cuối / Self-Check: T-072 hoàn tất trong phạm vi thiết kế. Báo cáo docs/ADMIN_REDESIGN_QA.md nêu đủ thao tác/giới hạn; không báo marketing GATE PASS, không tự áp quy tắc landing page trái prompt. Không khẳng định toàn bộ live transaction đã kiểm; chưa MySQL/backend thật, thiết bị thật/trình duyệt khác. Không sửa backend/database/auth/API/content/dependency, không commit/push, không có điểm cần xác nhận. Bước tiếp theo: người dùng xem giao diện thực tế; G3 chờ giao việc.

### T-074 — Thay code local bằng nhánh upstream/revert-9-Nhan
- Ngày: 17/11/2026; người dùng yêu cầu lấy code từ repo duy-nkd/The-Unspoken_Psychological-Detective-Game để thay code máy, sau đó chốt tên nhánh revert-9-Nhan.
- Căn cứ: yêu cầu hiện tại, remote upstream xác minh đúng URL; DEC-002/003 về kế hoạch/checkpoint. Không thay đặc tả hoặc API.

#### Kế hoạch (DEC-003)
- Mục đích: đồng bộ code máy đúng nhánh được chỉ định, có đường khôi phục thay đổi cũ.
- Ảnh hưởng: fetch và tạo local revert-9-Nhan tracking upstream; giữ nguyên Nhan/commit8cdb446, stash toàn bộ thay đổi chưa commit. Không reset nhánh cũ, không push/commit thường, không clean ignored hoặc tác động DB.
- Rủi ro mất code: xác minh stash có đúng14file, base đúng8cdb446 và worktree sạch trước checkout; dừng nếu phát sinh thay đổi khác. Không có đề xuất phát triển mới.

#### Bước con và checkpoint
| Bước | Kết quả | Kiểm tra |
|---|---|---|
| 1 | Đã fetch upstream/revert-9-Nhan:5c9a6fd7b1945afa420416d87405194c7fc77e08, Merge PR14 từ Nhan | Tree đã commit bằng8cdb446;14file chưa commit là palette và log |
| 2 | Stash64c180e7d28e42af55290a99dcb3a97cb7c4e1fd, nhãn Backup Nhan palette and local progress before upstream/revert-9-Nhan 2026-11-17 | Đủ14file, base8cdb446, status sạch; stash chứa cả checkpoint T-073/T-074 trước chuyển |
| 3 | Tạo và checkout local revert-9-Nhan theo upstream/revert-9-Nhan | HEAD đúng5c9a6fd; git diff và diff --cached với nguồn rỗng. Nhan vẫn8cdb446; không đổi master |
| 4 | Frontend check đã qua | ESLint/Prettier +248/248 Vitest,37file +Vite build. Không sửa source/config/test để kiểm qua; chỉ nhật ký này khác nguồn |

#### Kết quả / Self-Check
- Hoàn tất: code/index khớp nguồn5c9a6fd; local revert-9-Nhan tracking upstream đúng repo. Nhan vẫn8cdb446, stash đủ14file và SHA64c180e7d28e42af55290a99dcb3a97cb7c4e1fd giữ nguyên.
- Check248/37file, lint/format/build qua. Không chạy backend/MySQL/Chrome trong tác vụ chỉ đồng bộ Git này.
- Sau checkout chỉ ghi PROGRESS_LOG theo DEC-002, không sửa code riêng. Không có điểm cần xác nhận; không commit/push/reset/clean hoặc tác động DB.
- Bước tiếp theo: chờ yêu cầu người dùng; không tự khôi phục palette từ stash.


### T-075 — NPC có cơ thể đứng trên map hành lang
- Ngày17/11/2026; yêu cầu theo ảnh chụp: dùng model sẵn có, NPC có cơ thể để thám tử tương tác. Người dùng xác nhận Hòa=landlord và chọn bổ sung phần chân từ model Hòa hiện có.
- Căn cứ: DEC-015/018/023, CHAPTER1_MEMORY§8, Phase1/P1_HUB (Linh cửa205, Hào lan can, Minh cầu thang). Kế hoạch chi tiết docs/HALLWAY_NPC_PLAN.md.
- Kế hoạch DEC-003: giữ Phaser4.2.1, graph/save/API/nội dung/điểm đứng và choiceIndex; tách ảnh đứng3NPC từ sheet có sẵn trong preload, tạo model Hòa riêng có chân, actor neo chân/co giãn/depth nhưPlayer; vùng bấm theo thân+nhãn. Rủi ro alpha/halo, scale/occlusion, vùng bấm chồng, lộ tên Hào, actor lặp; kiểm unit + check/validator + Chrome map/chuột/E/restart và Chương1. Không thêm collision/AI/NPC/cốt truyện mới.
- Checkpoint1: branch revert-9-Nhan, chỉ PROGRESS_LOG có sẵn; đã đọc nguồn/kế hoạch, xem sheet Linh/Hào/Minh đủ người, Hòa runtime nửa thân và gốc tới đùi. Thêm npcSprites.js, npcCutout.js, entities/Npc.js; chưa nối scene/chưa test. Hòa đang chuẩn bị imagegen được duyệt, không thay3biểu cảm hội thoại cũ.

- Checkpoint2: imagegen hoàn tất model Hòa đủ chân, PNG887×1774 alpha0–255, bản riêng trong art-source và runtime (không sửa ảnh hội thoại). Đã nối preload/map và Npc neo chân/depth, vùng bấm theo thân+nhãn; unit tách nền3/3 qua. Thêm E2E và đang chạy Chrome session56849; chưa kết luận hình ảnh/tương tác. Check đầy đủ cần thu kết quả lại sau browser.
- Checkpoint3: Chrome map3/3 qua sau sửa fixture: tài khoản chưa lưu trả404 (không phải200/null), node hỏi mở đầu thuộc DETECTIVE theo graph gốc (không tự giả định người NPC nói trước). Không đổi logic game để làm test qua. Đã xem desktop/mobile, bốn người đủ chân/nền trong suốt, lan can che đúng. Check251/38file + lint/format/build qua; validator6290, không broken/unreachable. Đang chạy lại6Chrome gồm kiểm map cuối (thêm ảnh tablet) và3ca Chương1 hiện có, session54589. Không build/pretest trong lúc browser chạy.
- Checkpoint4: map cuối3/3 qua; Chương1 dừng2ca ở assertion cũ đòi head icon trên map. Đổi đúng kỳ vọng trình bày sang4body texture/không head icon, thêm không xuất hiện sớm; giữ toàn bộ kiểm tra hội thoại/nhép miệng/nghiệp vụ. Chạy lại chapter1.spec.js3/3 qua (session28542), hai lượt tớiCH2_ENTRY. Đã xem tablet, QA asset/prompt/số đo/giới hạn và DEC-036 ghi xong. Browser đã dừng; chuẩn bị check cuối.
- Checkpoint5 / kết quả cuối: npm run check session45046 qua lint/format,251unit/38file và production build. Git diffcheck qua, staging rỗng/không unmerged; backend/graph/thoại/geometry/portrait gốc/React play/API/dependency không có diff. Asset Hòa và art-source cùng SHA ghi trong QA. Không pageerror trong map/Chương1, không còn test/server chạy.

#### Kết quả / Self-Check T-075
- Hoàn thành: model đứng4NPC theo asset được cung cấp và phần chân Hòa đã duyệt; neo chân/phối cảnh/depth/lan can; chuột vàE, tên Hào, vòng đời actor; kiểm tra và báo cáo `docs/HALLWAY_NPC_QA.md`.
- Phạm vi file: `game/data/npcSprites.js`, `systems/npcCutout.js` +test, `entities/Npc.js`, `storyMap.js`, `PreloadScene.js`, `RoomInvestigationScene.js`;2E2E;2asset PNG Hòa; kế hoạch/QA/bộ nhớ/nhật ký. Không sửa schema/API/data graph/cốt truyện/lời thoại hoặc thêmNPC/collision/AI.
- Kiểm tra: check cuối251/251; validator6290; Chrome map3/3 + Chương1 3/3, hai lượt đầy đủ tớiCH2_ENTRY và nhép miệng; đã xem desktop/tablet/mobile.
- Chưa xác minh: backend/MySQL thật, trình duyệt khác và thiết bị vật lý; mobile vẫn cơ chế canvas hiện có. Không khẳng định các phần ngoài QA.
- Điểm cần xác nhận: không có trong phạm vi đã được người dùng duyệt. Self-Check: đạt trong phạm vi được giao. Không commit/push; đang ở revert-9-Nhan, không áp stash palette hoặc thay nhánh.


### T-076 — Thay dáng đứng Hào, Linh, Minh theo ảnh mới
- Ngày17/11/2026; nguồn: người dùng chỉ rõ hình1=Hào, hình2=Linh, hình3=Minh; yêu cầu thay3model đứng tương tác, giữ nguyên ông chủ trọ. DEC-015/018/036; kế hoạch chi tiết `docs/HALLWAY_NPC_POSES.md`.
- Kế hoạch DEC-003: sao chép nguyên byte3ảnh vào art-source/runtime, đổi riêng3nguồn trong registry; dùng pipeline CanvasTexture/cutout đã có, giữ model Hòa và mọi logic/điểm đứng/scale/depth/E/graph/save/API. Rủi ro viền JPG/nền/bóng giày/nhầm người; check và Chrome map/chuột/E/P1/P3/restart, xem desktop/tablet/mobile. Không phát sinh đề xuất đặc tả.
- Checkpoint1: đã đọc checkpoint/bộ nhớ/working-rules/tài liệu Chương1 và khảo sát code/ảnh. Branch revert-9-Nhan, T-075 đang chưa commit được giữ; không migration. Ba ảnh1024×1536 RGB, đủ toàn thân, không tạo ảnh mới.
- Checkpoint2: sao chép3ảnh thành6file (gốc art-source + runtime), SHA256 từng cặp khớp ảnh Downloads. Đổi riêng nguồn linh/hao/minh trong `npcSprites.js`; Hòa và8file asset/code/test liên quan được snapshot SHA ở `frontend/node_modules/.cache/hallway-npc-t076/baseline.json`. Chưa kiểm browser hoặc check lần này; chuẩn bị chạy.
- Checkpoint3: npm run check qua251/251unit (38file), lint/format/build. Đối chiếu đủ9SHA (2asset Hòa + entity/cutout/preload/scene/storyMap +2E2E) khớp trước tác vụ; ảnh nguồn/runtime nguyên byte. Chuẩn bị Chrome map hiện có; không đổi test để kiểm qua.
- Checkpoint4: Chrome map session18453 qua3/3, không pageerror; P1/P3/chuột/E/tên Hào/restart/alpha/neo chân/depth. Đã xem desktop/tablet/mobile, đúng3dáng mới, Hòa giữ nguyên. Sao chép ảnh/số đo vào cache riêng hallway-npc-t076;9SHA kiểm lại vẫn khớp. QA/source/SHA và DEC-037/SRC-8 ghi trong bộ nhớ; tài liệu T-075 ghi chú đã có bản cập nhật3model ở T-076.

#### Kết quả / Self-Check T-076
- Hoàn thành: dùng đúng Hao.jpg/Linh.jpg/Minh.jpg, sáu bản sao nguyên byte (art-source/runtime), thay riêng3nguồn trong npcSprites.js. Hòa/entity/cutout/scene/điểm đứng/tương tác/E/thoại/graph/API giữ nguyên.
- Kiểm tra mới: check251unit (38file), lint/format/build và Chrome map3/3 qua; đã xem3cỡ màn hình; không có lỗi còn lại trong phạm vi QA. Không sửa test, backend hoặc dependency.
- Chưa xác minh: backend/MySQL thật, browser khác Chrome, điện thoại/tablet vật lý. Không chạy lại full Chương1/validator lần này; kết quả T-075 chỉ là lịch sử.
- Điểm cần xác nhận: không có trong phạm vi đã giao. Self-Check đạt theo nguồn ảnh/yêu cầu người dùng; không vẽ lại ảnh, không thêm đặc tả. Không commit/push hoặc áp stash palette; giữ các sửa có sẵn T-075.


### T-077 — Hướng dẫn Everything up-to-date sau commit
- Ngày17/11/2026; người dùng yêu cầu hướng dẫn tự sửa tình trạng push trước commit, sau commit/push vẫn Everything up-to-date. Căn cứ: yêu cầu hiện tại, quy tắc Git AGENTS.md, hiện trạng repo và remote được đọc thực tế.
- Kế hoạch DEC-003: kiểm branch/status/log/reflog/staging/config/remotes; đọc đầu nhánh GitHub bằng ls-remote; đưa đúng lệnh theo nhánh đích. Chỉ nhật ký thay đổi, không sửa code/đặc tả/API hoặc tự commit/push. Rủi ro chính là nhầm local Nhan với HEAD trên revert-9-Nhan và nhầm origin fork với upstream repo nhóm; dùng refspec rõ ràng, không force/reset.
- Checkpoint1 / kết quả: HEAD=1ec33b7 (cập nhật model nhân vật dáng đứng ngoài hành lang), người dùng commit lúc15:42:57+07; chứa22file T-075/T-076. Ban đầu worktree/index sạch. Local Nhan=8cdb446; revert-9-Nhan tracking upstream, ahead1 theo ref local. origin là DangTheNhan, upstream là duy-nkd.
- Checkpoint2: git ls-remote xác minh origin/Nhan=8cdb446b871c68eb7055ce95c95a86fe5079c3df, upstream/revert-9-Nhan=5c9a6fd7b1945afa420416d87405194c7fc77e08; origin chưa có nhánh revert-9-Nhan và upstream chưa có Nhan trong kết quả. Nhan là tổ tiên HEAD, rev-list Nhan...HEAD=0/2. Không sửa ref remote/local bằng các kiểm tra này.
- Hướng dẫn: nếu đích là fork Nhan, dùng git push origin HEAD:Nhan; nếu đích là nhánh nhóm hiện đang tracking, dùng git push upstream HEAD:revert-9-Nhan. git push origin Nhan chỉ gửi local Nhan cũ nên vẫn up-to-date. Chưa có nguyên văn lệnh người dùng đã chạy, đây là giải thích theo trạng thái xác minh, không khẳng định đã quan sát lệnh đó.
- Self-Check: chẩn đoán và hướng dẫn hoàn tất; không tự thực hiện push/commit/đổi nhánh, không force/reset/stash hoặc sửa logic/cấu hình. Chỉ cập nhật PROGRESS_LOG theo DEC-002, không chạy lại test game. Chưa xác minh kết quả push sau khi người dùng làm theo.


### T-078 — Xác nhận lưu model vào dự án
- Ngày17/11/2026; người dùng nhắc lưu các model vào dự án. Căn cứ: SRC-8, DEC-036/037, docs/HALLWAY_NPC_POSES.md và file thực tế.
- Kế hoạch DEC-003: đối chiếu file bản gốc/runtime, URL nạp và nội dung đã commit; nếu còn thiếu mới sao chép. Không thay thiết kế/logic/API; không phát sinh rủi ro ghi đè vì chỉ kiểm khi tất cả đã có.
- Checkpoint/kết quả: đủ8file Hào/Linh/Minh/Hòa trong art-source/characters/<id>/ và frontend/public/assets/images/characters/. Get-Item xác nhận tồn tại/kích thước; git hash-object từng file khớp git rev-parse HEAD:<path>. Tất cả nằm trong commit1ec33b7, không phải file tạm hoặc chỉ tồn tại ở Downloads. Registry có4URL assets nội bộ tương ứng.
- Self-Check: hoàn tất, không cần tạo/copy lại ảnh; không có điểm cần xác nhận. Không đổi code, không chạy lại test game/remote check hoặc commit/push; chỉ cập nhật PROGRESS_LOG theo DEC-002. Trạng thái remote trước đó xem T-077, không khẳng định người dùng đã push sau hướng dẫn.


### T-079 — Preview Quan sát Tùng chia ảnh2/3, chữ1/3
- Ngày17/11/2026; người dùng yêu cầu tương tácE hiển thị ảnh Tùng lớn, hiệu ứng hoảng hốt/rung, phần ảnh2/3trên và mô tả1/3dưới không chồng nhau; giữ tỷ lệ khi phóng full chiều ngang trong khung. Căn cứ: yêu cầu hiện tại, DEC-023, nguồn Phase1/P1_002, graph P1_SEE_TUNG và EV_NeckScratches.
- Kế hoạch DEC-003: `docs/TUNG_OBSERVATION_PLAN.md`; preview trong StoryScene qua cờ trình bày tạm từ hotspot, giữ thời điểm runner.choose/effect và graph/save/API. Dùng ảnh Tung.png có sẵn; nội dung trích từ dữ liệu nguồn, không thêm suy luận. Rung ảnh0.35giây/giảm chuyển động, mask riêng và khung chữ dưới; kiểm helper/check/validator/Chrome/Chương1. Không đổi P2/asset/geometry/backend/dependency.
- Checkpoint1: đọc checkpoint/bộ nhớ/working-rules và nguồn Chương1; xem Tung.png1536×1024, cổ/vết cào và thi thể đã có. Hiện P1_SEE_TUNG không có màn quan sát, router ghi flag rồi chuyển EXIT ngay. Branch revert-9-Nhan, HEAD1ec33b7; chỉ log có sửa trước tác vụ. Kế hoạch đã ghi, chưa sửa code/test.
- Checkpoint2: triển khai helper trích2câu tư thế +1câu vết thương vật lý,3unit qua; UI ảnh base1536×1024 (không dùng crop P2), cover/mask480px và panel240px, rung ảnh350ms/giảm chuyển động/dọn tween+mask. Nối hai scene bằng cờ tạm, giữ choose/effect/stategraph; thêm UItext VI/EN và3E2E preview, helper fullgame đi qua preview mới. Check254/39file + lint/format/build qua; validator6290/1264node không broken/unreachable. Chưa kiểm hình ảnh/browser, chuẩn bị Chrome.
- Checkpoint3: Chrome phát hiện GeometryMask không hỗ trợ WebGL ở Phaser4. Đã đối chiếu mã thư viện và đổi sang setCrop (không đổi renderer/dependency), kiểm crop×scale=480px; hai ca ảnh/rung/Enter và chuột/reduced-motion/effect qua. Ca Notebook/Escape còn chờ: gameControls captureEscape cần StoryScene.handlesEscape nhận preview mới; đã dừng lượt test và bổ sung nhận diện này. Đã xem desktop/mobile: vùng ảnh/chữ tách đúng, cổ rõ, không kéo méo. Chuẩn bị chạy lại3ca; chưa kết luận hoàn tất.
- Checkpoint4: Chrome preview3/3 qua (session14709), Escape/Notebook/resume không lặp hiệu ứng, E/chuột/effect đúng một lần, không Evidence P1 và không pageerror. Đã xem desktop/mobile; bổ sung Large+English và logout qua React trong ca có sẵn để xác minh fit chữ/teardown thật. Không đổi code sau lượt3/3; chuẩn bị check cuối và Chrome6ca cùng Chương1.
- Checkpoint5: check cuối session42588 qua254/254unit/39file + lint/format/build; validator6290 qua, scope backend/asset/public data/narrative/rooms/entities/dependency không có diff. Chrome6ca session32728 đang chạy; đã xem tablet. Không sửa mã/build hoặc prepare manifest trong lúc Chrome chạy. Đang ghi QA và quyết định, chưa kết luận đầy đủ hồi quy.

### T-080 — Thiết lập Phaser AE cho Codex
- Ngày giao: 19/11/2026. Nguồn: người dùng yêu cầu xác minh Node.js ≥ 20, chạy `npx -y @phaser-ae/cli setup` và mở `https://phaser.io/agent/new` sau khi thiết lập xong.
- Kế hoạch (DEC-003): kiểm tra Node.js/npx, chạy CLI, chờ phê duyệt trên phaser.io, xác minh skill trong Codex rồi mở trang tạo game. Phạm vi là thiết lập công cụ cho người dùng và ghi checkpoint theo DEC-002. Rủi ro thực thi là CLI không truy cập được registry, không mở được trình duyệt hoặc phiên duyệt hết hạn. Không có đề xuất thay đổi đặc tả dự án.
- Checkpoint 1: `_migration/` không tồn tại. `node --version` cho v24.18.0, `npx --version` cho 11.16.0. Chưa chạy CLI.
- Checkpoint 2: đã chạy `npx -y @phaser-ae/cli setup`. CLI báo mở phaser.io để người dùng đăng nhập và phê duyệt, đang chờ xác thực (session 56239). Chưa xác minh cài skill.
- Checkpoint 3: CLI xác nhận đăng nhập và cài skill cho Codex tại `C:\Users\dangt\.agents\skills\phaser-ae\SKILL.md`, kết thúc mã 0. CLI cũng báo cài bản skill cho Claude Code, OpenCode, Antigravity và GitHub Copilot.
- Checkpoint 4 / kết quả: xác minh tệp skill Codex có 4501 byte. Lần mở URL đầu bị môi trường giới hạn quyền, lần chạy có quyền mở trình duyệt mặc định thành công (`Start-Process`, mã 0).
- Self-Check: hoàn tất phạm vi thiết lập, không còn điểm cần xác nhận. Chỉ cập nhật nhật ký trong repo. Không chạy kiểm thử game vì đây là thiết lập công cụ ngoài repo.

### T-081 — Cách dùng Phaser AE với The Unspoken
- Ngày giao: 19/11/2026. Nguồn: người dùng hỏi cách dùng Phaser AE cho project hiện tại; skill `phaser-ae`, `Project.docx` §1.1, DEC-005, `docs/ARCHITECTURE.md` §1–2.
- Kế hoạch (DEC-003): kiểm skill/CLI và cấu trúc repo, làm rõ khả năng nhập repo sẵn có, đưa cách phát triển game chính hoặc thử prototype. Chỉ cập nhật nhật ký. Rủi ro chính là nhầm trình tạo dự án AE với thư viện Phaser của repo hoặc chạy lệnh tạo dự án nhầm thư mục. Hướng prototype là đề xuất, chưa triển khai.
- Checkpoint 1: đã đọc skill `phaser-ae`, xác minh `frontend/package.json` ghim `phaser` 4.2.1 và thư mục gốc hiện không có `.phaser/build.json`; `_migration/` không tồn tại.
- Checkpoint 2 / kết quả: tài liệu chính thức `https://phaser.io/cli/guide` và `https://www.phaser.io/cli/codex` mô tả tạo thư mục AE từ game mới hoặc bản thiết kế phaser.io, không nêu lệnh nhập repo Phaser sẵn có. Với game chính, hướng dẫn sửa trực tiếp theo kiến trúc dự án. Nếu cần thử AE, đề xuất prototype riêng và sau khi được duyệt mới triển khai ý tưởng phù hợp bằng Phaser 4.2.1.
- Self-Check: hoàn tất phần hướng dẫn. Chỉ cập nhật nhật ký, chưa chạy lệnh tạo/build AE, chưa sửa mã nguồn hoặc chạy kiểm thử game.

### T-082 — Màn xem cận vật chứng trong Sổ tay
- Ngày giao: 19/11/2026. Yêu cầu: áp dụng màn xem cận vật chứng có dữ liệu mẫu vào game hiện có. Căn cứ: Project.docx §3.2, REQ-024, DEC-005/016/017/022, CHAPTER1_MEMORY §3/8, CHAPTER1_PLAN WP-C5/WP-C9.
- Kế hoạch (DEC-003): mở màn chi tiết từ tab Vật chứng, bố trí ảnh và thông tin riêng, tái dùng ảnh đã nạp và nội dung bản ghi đã thu. Kiểm bằng hai mục mẫu Chương 1 (một có ảnh, một chưa có ảnh). Chỉ sửa lớp trình bày và kiểm thử. Rủi ro là ảnh méo/hiện texture lỗi, chữ đè nút, thoát nhầm Sổ tay hoặc lộ vật chứng trước lúc thu; kiểm tra render Chrome/phím/chuột và state trước sau. Không đề xuất thay đổi đặc tả.
- Checkpoint 1: đã đọc tài liệu dự án, gói Chương 1 và các điểm vào. Sổ tay hiện mở chi tiết dạng chữ; ảnh `neck-and-collar` của `EV_NeckScratches` đã được Preload nạp. Ổ khóa 204 có dữ liệu nguồn nhưng chưa có ảnh riêng. Worktree có sẵn các sửa T-079, không có `_migration/`.
- Checkpoint 2: thêm `EvidenceDetailView` và nối `NotebookScene`. Bổ sung bước Playwright mở hai mẫu qua bàn phím/chuột, kiểm ảnh, xuất xứ và state. Đã chạy Prettier cho ba file, chưa chạy check/build hoặc Chrome.
- Checkpoint 3: `npm run check` qua lint/format/254 unit test (39 file)/build. `python scripts/chapter1/validate.py` qua 6290 điều kiện, không broken targets hoặc unreachable nodes. Chuẩn bị kiểm Chrome.
- Checkpoint 4: lượt Chrome thứ nhất bị cô lập localhost; đã dừng lượt đó, lượt chạy có quyền localhost (session 46828) qua 2 ca đầu, gồm lượt đi trọn Chương 1 và kiểm thêm hai vật chứng (ảnh/nhãn, phím/chuột, Esc/nút Quay lại, state). Đã xem ảnh desktop. Phát hiện gợi ý Esc chung cần đổi khi mở chi tiết. Chờ các ca Chrome còn lại trước khi sửa.
- Checkpoint 5: Chrome lượt có quyền qua 5/6; ca cuối hết thời gian khi đợi game hủy vì Playwright tự hủy hộp xác nhận đăng xuất. Đã bổ sung bước chấp nhận hộp xác nhận trong ca đó. Đã cập nhật gợi ý phím VI/EN cho chi tiết vật chứng và thêm xác nhận trong E2E. Chuẩn bị chạy lại kiểm tra.
- Checkpoint 6: bản cuối qua `npm run check` (254 unit test, lint, format, build) và validator 6290 điều kiện. Chrome session 40434 đã qua 2 ca đầu. Đã xem ảnh bản cuối của màn cận cảnh: ảnh giữ tỷ lệ, phần chữ nằm trong khung và gợi ý Esc/N đúng. Còn đợi bốn ca Chrome cuối.
- Kết quả cuối: Chrome 6/6 (session 40434), hai lượt đến `CH2_ENTRY`; kiểm hai mẫu ở Phase 2, mở bằng chuột/phím, Quay lại/Esc/N và state trước sau giống nhau. Ca đóng/mở Sổ tay trong lúc quan sát Tùng và đăng xuất qua sau khi fixture xác nhận hộp thoại. Đã xem ảnh desktop `evidence-closeup.png`.
- Self-Check: đạt trong phạm vi yêu cầu. Dùng bản ghi đã thu và ảnh có sẵn; mục thiếu ảnh hiện tên theo DEC-017. Không đổi graph, tài nguyên, schema lưu, backend/API hoặc dependency. Kiểm Chrome dùng API giả lập; không chạy MySQL thật hoặc thiết bị vật lý. Không có điểm cần người dùng xác nhận trong phạm vi đã giao.
