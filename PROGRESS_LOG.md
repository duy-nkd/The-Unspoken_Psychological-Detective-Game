# PROGRESS_LOG.md — Nhật ký tiến trình & Điểm khôi phục

> Thứ tự đọc khi bắt đầu/tiếp tục: **PROJECT_MEMORY.md → mục "ĐIỂM KHÔI PHỤC" bên dưới → mục nhật ký của tác vụ đang dở.**
> File này do AI cập nhật sau **mỗi bước con** và **mỗi tác vụ** (DEC-002). Chỉ ghi việc đã thực sự làm.

---

## ĐIỂM KHÔI PHỤC (RESUME POINT) — luôn cập nhật mục này trước tiên

| Trường | Giá trị |
|---|---|
| Cập nhật lần cuối | 10/11/2026 — T-050. Đã đổi mở đầu và nối chân dung Linh, Minh, Hào |
| Tác vụ đang làm | T-043 chờ ảnh 24 khung. Chương 1 còn playtest tay TD-38 |
| Đã xong gần nhất | T-050 nối hướng dẫn đến A204 trước khi lấy lời khai. T-048 hoàn thành ảnh Tùng và vùng cổ |
| Trạng thái dở dang | Mã Chương 1 bản trước đã đẩy lên `origin/Nhan` tại `fff5ed8`. T-048 và T-050 đang ở máy |
| Việc tiếp theo | Playtest tay theo TD-38 và chốt ISS-29 |
| Đang bị chặn bởi | ISS-29 (lưu server) |
| Lệnh/kiểm tra cần chạy lại khi tiếp tục | `git status` · `cd frontend; npm run check` · `npm run test:e2e` · `python scripts/chapter1/validate.py` (tự chạy validator của gói trên bản sao tạm — KHÔNG chạy thẳng `docs/sources/.../validate_data.py` vì nó ghi đè `validation.results.json`) |
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
