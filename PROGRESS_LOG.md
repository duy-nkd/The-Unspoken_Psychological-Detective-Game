# PROGRESS_LOG.md — Nhật ký tiến trình & Điểm khôi phục

> Thứ tự đọc khi bắt đầu/tiếp tục: **PROJECT_MEMORY.md → mục "ĐIỂM KHÔI PHỤC" bên dưới → mục nhật ký của tác vụ đang dở.**
> File này do AI cập nhật sau **mỗi bước con** và **mỗi tác vụ** (DEC-002). Chỉ ghi việc đã thực sự làm.

---

## ĐIỂM KHÔI PHỤC (RESUME POINT) — luôn cập nhật mục này trước tiên

| Trường | Giá trị |
|---|---|
| Cập nhật lần cuối | 09/10/2026 19:15 — T-008 (CLAUDE.md + docs/sources để chuyển sang Claude Code) xong |
| Tác vụ đang làm | Không (T-002 chờ người dùng chạy script — bước B6) |
| Bước con cuối cùng đã xong | T-002 / B5 — 115 file đã ghi lên máy, đối chiếu kích thước khớp |
| Trạng thái dở dang | **Có — phía người dùng**: file cũ vẫn còn và Java mới đang nằm trong `_migration/` cho tới khi chạy `scripts/apply-restructure.ps1` |
| Việc tiếp theo | Người dùng: (1) `powershell -ExecutionPolicy Bypass -File scripts\apply-restructure.ps1 -DryRun` rồi chạy thật; (2) `cd frontend; npm run check`; (3) chạy `db/schema.sql`; (4) `cd backend; mvn clean test`; (5) báo lỗi (nếu có) + trả lời ISS-02, ISS-29, ISS-05/06/07. AI: sau đó làm WP-02/03 |
| Đang bị chặn bởi | ISS-29 (userId), ISS-05, ISS-06, ISS-07, ISS-10; ISS-26 (sửa Java về sau vẫn phải qua `_migration/`) |
| Lệnh/kiểm tra cần chạy lại khi tiếp tục | Nếu `_migration/` còn tồn tại → script chưa chạy. Kiểm tra `git status` |
| Ghi chú cho phiên sau | Không có quyền shell trên máy người dùng trong phiên 08/10; chỉ đọc/ghi file qua đồng bộ file |

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
| B6 | Người dùng chạy script + kiểm thử thật | **Chờ người dùng** | — | — |

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

