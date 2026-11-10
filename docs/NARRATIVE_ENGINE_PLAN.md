# KẾ HOẠCH: Bộ chạy kịch bản Data Contract 2.0 + đưa Chương 1 vào game (T-031)

> **Quyết định nền:** DEC-016 (03/11/2026) — Data Contract 2.0 (mạng nút, `chapter1.json`) là định dạng kịch bản
> chính thức; đóng ISS-07. Người dùng: "vậy thì hãy làm theo Data Contract 2.0 (mạng nút) cho project này, lên kế hoạch
> chi tiết chia ra thành từng phase nhỏ".
> **Trạng thái:** kế hoạch — từng phase bắt đầu khi được giao; phần đánh dấu **[ĐỀ XUẤT]** chờ duyệt; **[CHỜ]** là điểm
> cần người dùng trả lời.
> **Căn cứ:** gói Chương 1 (`docs/sources/chapter1/`: DATA_CONTRACT.md, CLAUDE_INTEGRATION_PROMPT.md, data/*.json,
> validation/validate_data.py, PLAYTEST_CHECKLIST.md), `docs/chapter1/CHAPTER1_MEMORY.md`, `docs/chapter1/CHAPTER1_PLAN.md`
> (WP-C1…C10 — kế hoạch này chia nhỏ hơn và thay thế phần thứ tự), Project.docx §3.2–3.3, §5.2, PROJECT_MEMORY (DEC-005..016),
> `docs/TODO.md` (TD-16…TD-30).
>
> **T-044 (10/11/2026):** N3–N5 đã triển khai. Phaser đã nối Lời khai, Lịch sử trò chuyện, Press/Present và lưu/tải cục bộ.
> **T-045 (10/11/2026):** N2-Q2 đã chốt và triển khai. Sổ tay hiện nguồn theo lần thu thập thực tế. Xem `PROGRESS_LOG.md` cho kết quả kiểm thử và phần còn lại.

---

## 1. Mục đích

Game chạy **toàn bộ Chương 1 từ dữ liệu** (`chapter1.json`, 1.257 nút): Phase 1 → 2 → 3 → Final → 4 → dừng ở `CH2_ENTRY`,
đúng luật Press/Present, uy tín, checkpoint, Sổ tay 4 tab; lời thoại và logic nằm trong dữ liệu, KHÔNG viết lại trong code.
Bộ chạy dùng lại được cho Chương 2–5.

## 2. Hiện trạng liên quan (03/11/2026)

| Đã có | Còn thiếu |
|---|---|
| Phòng 201 + hành lang đi lại được (DEC-013/014/015), ảnh nền phòng 204 | Map phòng 204 (vùng đi, 9 hotspot) |
| `DialogueBox` (chữ chạy, nhép miệng), `CharacterStage` (Hòa 3 ảnh) | Hiển thị 4 kiểu nút (thoại/dẫn/hành động/hệ thống), menu lựa chọn |
| `GameSession` (chapter, uy tín, notebook dạng mảng cũ, tutorial), lưu localStorage | State v2 của gói, checkpoint thật |
| Khung `NotebookScene`, `DeductionScene`, `BadEndingScene`, `credibility.js` (có test) | Đọc state v2, đối chất, bảng suy luận 8 ô, load checkpoint |
| Định dạng hội thoại tạm (`data/dialogueData.js`, `chapter-1.json` rỗng) | — sẽ được thay bằng Data Contract 2.0 |
| `npm run check` xanh (110 test, T-029) | — |

## 3. Kiến trúc

```
public/assets/chapters/chapter1/      chapter1.json · evidence.json · people.json · statements.json · game-state.definitions.json
        │  (PreloadScene nạp 1 lần)
        ▼
game/narrative/  ── JS THUẦN, không Phaser, có test ──────────────────────────────────────────────
   statePath.js    đọc/ghi state theo JSON Pointer (/flags/x, /evidence_records/EV_…)
   expr.js         điều kiện: literal · ref · predicate · all/any/not/exists/contains/eq/ne/gt/gte/lt/lte/add/subtract/max/min
   effects.js      set · increment · upsert_record · merge_record · collect_evidence · save_checkpoint  (1 transaction)
   storyRunner.js  nút hiện tại · advance() · choose(i) · router/next · __COMMIT · transition · khóa input theo token
   crossExam.js    Press (route đúng đầu tiên, 0 điểm) · Present (route khớp đầu tiên theo thứ tự mảng; wrong −15 một lần)
   deduction.js    bảng nháp 8 ô · thẻ chỉ hiện khi đủ điều kiện · nộp thiếu 0 · sai −20 một lần, giữ nháp · đúng → RECON
   checkpoints.js  lưu/khôi phục nguyên snapshot (không lồng)
   saveMigration.js đọc save cũ (notebook mảng) → state v2, báo xung đột
        │  phát sự kiện: node mới · đổi địa điểm · đổi uy tín · thu vật chứng · tới biên CH2_ENTRY
        ▼
game/scenes/ ── Phaser chỉ HIỂN THỊ ─────────────────────────────────────────────────────────────
   StoryScene (mới, điều phối)  → DialogueScene/DialogueBox · ChoiceMenu · RoomInvestigationScene (theo scene_location)
                                  · Notebook · đối chất · DeductionScene · BadEnding · màn chuyển thời gian/tiêu đề
core/GameSession.js  bọc state v2 → toSaveSnapshot(): currentChapter = state.chapter, credibilityScore = state.credibility,
                     saveDataJson = state v2 (khớp game_saves.save_data_json LONGTEXT, Project.docx §2.1)
```

Quy tắc: `game/narrative/` không import Phaser/React; mọi logic có `*.test.js`; scene không tự đọc JSON gói mà hỏi runner;
`answerKey` của suy luận và bảng đúng/sai KHÔNG bao giờ được hiển thị (DATA_CONTRACT "Press và Present").

## 4. Các phase

Cỡ: S ≈ 1 phiên · M ≈ 2–3 phiên · L ≥ 4 phiên. Mỗi phase kết thúc: `npm run check` xanh + ghi PROGRESS_LOG + cập nhật `docs/TODO.md`.

### Giai đoạn I — Bộ máy (không cần ảnh, không cần Q4)

**N0 — Nhập dữ liệu & bộ kiểm tra** · S · TD-16 · **✅ T-034 (người dùng chạy trên máy 03/11 12:47: `validate.py`, `npm run check`, Vite phục vụ JSON — đều qua)**
- Chép 5 file dữ liệu vào `frontend/public/assets/chapters/chapter1/` (không chép `source-map.json` — chỉ dùng khi viết/đối chiếu).
- Test Vitest `game/data/chapters.test.js` (cạnh `chapters.js` — khai báo file dữ liệu theo chương): id nút duy nhất; mọi
  `next/targetNode/sourceNode/boardNode/phaseEntries` trỏ tới nút có thật hoặc biên ngoài đã khai báo (`CH2_ENTRY`); vật chứng
  và lời khai được nhắc tới có trong danh mục; state v2 ban đầu đúng. SHA-256 khớp `MANIFEST.json` **kiểm một lần lúc nhập**
  (T-034) và in ra trong `validate.py`, KHÔNG đặt trong test — vì nhóm được sửa lời thoại ở bản game (DEC-017), test SHA sẽ
  luôn đỏ sau mỗi lần sửa.
- `scripts/chapter1/validate.py`: chạy `validate_data.py` của gói trên bản sao tạm (script gốc ghi đè kết quả trong gói)
  + lệnh chạy trong README.
- **Xong khi:** validator PASS trên bản trong repo; Vite phục vụ được JSON; test mới xanh.

**N1 — Đọc state & điều kiện** · S · TD-17a · **✅ T-035 (`npm run check` trên máy 03/11 13:04: 23 file, 148 test, build qua)**
- `statePath.js`, `expr.js` + test từng toán tử; cờ chưa có = false; `exists` chưa có bản ghi = false; không dựng
  Evidence/Statement bị thiếu để vượt điều kiện.
- **Xong khi:** đánh giá đúng mọi điều kiện xuất hiện trong `chapter1.json` (test quét toàn file không ném lỗi).
- **Đã làm (T-035):** `game/narrative/statePath.js` (`getPath`/`setPath`/`parsePath`/`cloneJson`), `expr.js` (`evaluate`,
  `testCondition`, `createContext`, `buildBindings`, `isTruthy`, `valuesEqual`) + 2 file test. Ngữ nghĩa giữ đúng `Runner.ev`
  của validator (đánh giá hết đối số, đúng/sai kiểu Python, ref thiếu = null); chặt hơn ở chỗ dữ liệu sai (sai số đối số,
  so sánh khác kiểu, khóa lạ → ném lỗi). Đối chiếu ngoài repo: 637 biểu thức × 2.586 trạng thái thật lấy từ 2 lượt chơi của
  validator = 1.647.282 lần đánh giá, khớp Python 100 %. Hiệu ứng chạy nhiều bước phải dựng lại ngữ cảnh sau mỗi bước (N2).

**N2 — Hiệu ứng & giao dịch** · M · TD-17b · **✅ T-036, T-044, T-045**
- `effects.js`: 6 loại hiệu ứng; bản ghi lưu `source_node`, `source_step`, `collected_phase`, `source_kind`; không đổi nguồn
  lần đầu; `merge_record` giữ revision; tất cả-hoặc-không; token sự kiện + `committed_events` chống trừ điểm 2 lần.
- **Xong khi:** test: thu vật chứng 1 lần duy nhất; double-commit cùng token không đổi state; lỗi giữa chừng → state không đổi.
- **Đã làm (T-036):** `game/narrative/effects.js` — `applyEffects` (6 hiệu ứng trên bản sao state, lỗi → state cũ giữ nguyên),
  `commitEvent` (token trong `committed_events`; trừ uy tín qua `systems/credibility.applyPenalty` rồi mới chạy hiệu ứng, như
  validator), `sourceKindFor` (quy tắc validator). Đối chiếu ngoài repo: 147/147 lần gọi hiệu ứng thật của validator và
  100 nút có hiệu ứng × 72 trạng thái thật = 7.200/7.200 kết quả khớp Python. T-044 thêm lịch sử sửa lời khai.
  T-045 nối nhãn nguồn từ dữ liệu lần đầu ghi nhận vào Sổ tay.

**N3 — Bộ chạy kịch bản** · M · TD-17c
- `storyRunner.js`: nút hiện tại, `advance()`, `choose(i)`, router/`next` dạng mảng (route đúng đầu tiên), nút `__COMMIT`,
  `transition` có kiểm điều kiện, khóa input khi đang commit, đổi `scene_location`, dừng ở `CH2_ENTRY` (không gọi nút chưa có),
  resume tại `current_node` không phát lại hiệu ứng.
- **Xong khi:** chạy "không giao diện" được Phase 1 từ `P1_001` tới cảnh sát tới (test).

**N4 — Đối chất, suy luận, checkpoint** · M · TD-17d
- `crossExam.js`, `deduction.js`, `checkpoints.js` đúng luật mục 3 (route khớp ĐẦU TIÊN theo thứ tự mảng — không tự sắp xếp
  lại; `blocked` không nộp, miễn phạt; phản hồi wrong không trừ lần hai).
- **Xong khi:** test: wrong −15 / support 0 / blocked 0; Final thiếu 0 / sai −20 một lần giữ nháp / đúng → RECON; khôi phục
  checkpoint trả nguyên snapshot.

**N5 — Test vàng (đối chiếu validator Python)** · M · TD-18
- Port 2 lượt chơi trọn chương + các ca chấm điểm của `validate_data.py` sang `chapter1.golden.test.js`; so từng bước
  với kết quả Python.
- **Xong khi:** test vàng xanh trong `npm run check`. ⇒ **Mốc A: bộ máy đúng luật, chưa có giao diện.**

### Giai đoạn II — Phase 1 chơi được (dùng phòng 201 + hành lang đã có)

**N6 — State v2 vào ván chơi + lưu cục bộ** · S · TD-28 (phần cục bộ)
- `GameSession` bọc state v2; `toSaveSnapshot()` như mục 3; `saveMigration.js` cho save cũ (notebook mảng, tutorial).
- Vị trí nhân vật theo DEC-019 (N-Q3 = B): save = state v2 + khối `player: {roomId, x, y, face}` đặt CẠNH state (không
  ghi vào state của gói) + tiến độ tutorial. Khi tải: chỉ dùng tọa độ đã lưu nếu nút hiện tại cho đi lại tự do và
  `player.roomId` = `scene_location`; ngược lại (đang thoại, cảnh chuyển, phòng khác) dùng điểm vào của `scene_location`.
  Tọa độ đi qua `nearestClearPoint` (đổi map/vật cản không làm kẹt). Thiếu khối `player` (save cũ) → như phương án A.
- Đóng ISS-06 theo state v2 của gói (DEC-016).
- **Xong khi:** New Game tạo state v2 ban đầu; lưu/đọc lại localStorage không mất gì; save cũ không làm hỏng game.

**N7 — Hiển thị hội thoại & lựa chọn** · M · TD-19
- **T-050** hiển thị lời nhân vật trong hộp thoại. Lời dẫn và chỉ dẫn sân khấu tự chạy qua. Thông báo và bản ghi có bảng riêng.
- `data/speakers.js`: ánh xạ `speaker`/`expression` → ảnh (HÒA → 3 ảnh landlord theo bảng ánh xạ 15 biểu cảm; nhân vật chưa có
  ảnh → chỉ hiện NHÃN TÊN, không ảnh tạm (DEC-017)); thám tử: ẩn hoặc chân dung nhỏ [ĐỀ XUẤT].
- `DialogueBox` 4 kiểu: `dialogue` (có tên), `narration` (chữ nghiêng, không tên), `action` (chỉ dẫn), `ui` (thông báo hệ thống).
- `ui/ChoiceMenu.js` (phím ↑↓ + chuột); màn chuyển thời gian/tiêu đề; `StoryScene` điều phối.
- **Xong khi:** đọc hết thoại Phase 1 trong trình duyệt, chọn được câu hỏi, câu đã hỏi tự ẩn.

**N8 — Nối map với kịch bản** · M · TD-20
- **T-050** nối lời báo của Hòa với ba bước trên bản đồ. Người chơi vào A204, quan sát Tùng rồi trở ra trước khi gặp người để lấy lời khai.
- `RoomInvestigationScene` nghe đổi `scene_location`: `room201` → `hallway` (P1_002) → … ; cửa ra/vào theo kịch bản.
- Nơi tập trung (HUB) theo DEC-018: NPC đứng trên map (Linh ở cửa 205, Hào bên lan can, Minh gần đầu cầu thang — theo chữ
  trong dữ liệu; Hòa, cảnh sát đặt TẠM), tới gần → [E] → chạy lựa chọn tương ứng của nút `choice` HUB; lựa chọn đang ẩn theo
  điều kiện → NPC không mở hội thoại đó. Chưa có ảnh → nhãn tên tại chỗ đứng. Lựa chọn không phải NPC: Sổ tay (N), cửa A204,
  giấy khen trên tường, danh sách việc nhờ cảnh sát, nút kết thúc lượt hỏi / chuẩn bị Final / khép hồ sơ.
- Ghép tutorial phòng 201 với mở màn P1_001 theo DEC-017: Ván mới → Intro (chỗ trống chờ nhóm) → tutorial → bước "ra cửa" = Hòa gõ cửa → P1_001.
- **Xong khi:** từ New Game đi được phòng 201 → hành lang → hỏi đủ 4 người → cảnh sát tới, không kẹt.

**N9 — Kiểm thử Phase 1** · S · TD-36 (một phần)
- Playwright tự đi Phase 1 theo 2 thứ tự hỏi khác nhau; playtest tay các mục Phase 1 của `PLAYTEST_CHECKLIST.md`.
- ⇒ **Mốc B: Phase 1 chơi được từ đầu tới cuối.**

### Giai đoạn III — Phase 2 → Final (mốc Tuần 6: Sổ tay & Suy luận) · Q4 đã chốt tạm (DEC-017)

**N10 — Map phòng 204 + khám hiện trường** · M · TD-52, TD-22
- `data/rooms/room204.js`: vùng đi, vật cản (giường, bàn, tủ, cửa WC), lớp che; 9 hotspot đo theo ảnh thật, gắn với nút
  `investigation` (HP_LOCK, SINK, NECK, INHALER, TRASH, RECEIPT, DUST, BED, BOARD); `ui/InspectModal.js` (ảnh + chữ từ nút;
  đóng giữa chừng không commit); nút "Trở ra hỏi chuyện" sáng khi đủ 5 vật chứng chính (`P2_CORE`), không tự chuyển.
- **T-048** dùng `Tunginroom.png` làm nền khám phòng 204. Khi chọn vùng cổ, game hiển thị khung cắt từ `Tung.png`. Ảnh xem cận các vật chứng còn lại theo TD-63.
- **Xong khi:** thu 5 vật chứng chính theo nhiều thứ tự → sang Phase 3; bỏ khăn/hộp vẫn thoát được.

**N11 — Sổ tay 4 tab đọc state v2** · M · TD-24
- Vật chứng (ảnh, mô tả, trạng thái, nguồn, phase thu), Nhân vật (kèm quan sát), Dòng thời gian (độ chính xác/"khoảng"),
  Lời khai (revision/bị thay thế); "Unknown" là trạng thái trong tab Vật chứng; nút `notebook_view`, `record_view`,
  `source_view`, `checklist`; nút Lưu giữ nguyên (DEC-013).
- **Xong khi:** đúng 4 tab (REQ-024); bản ghi không hồi tố câu chưa hỏi.

**N12 — Đối chất Press/Present** · M · TD-23
- Lớp đối chất cho nút `cross_examination`: danh sách lời khai đang có, nút Press, Present mở bảng chọn vật chứng (chỉ thẻ đã
  thu có bản ghi), thông báo `blocked` miễn phạt, thanh Uy tín cập nhật.
- **Xong khi:** đi hết Phase 3 tới `P3_READY`; bấm đúp không trừ 2 lần; uy tín 0 → Bad Ending.

**N13 — Suy luận cuối + tái dựng** · M · TD-25
- `DeductionScene`: 5 nhóm / 8 ô (WHO/WHAT/WHEN/WHY + 4 ô EVIDENCE), chọn thẻ rồi chọn ô (kéo thả: tùy chọn), xem nguồn, Nộp;
  RECON_01–06 trên nền phòng 204; handler `commit_ch1_final_notebook` commit xong mới đặt cờ.
- **Xong khi:** thiếu 0 / sai −20 giữ nháp / đúng → tái dựng → Phase 4. ⇒ **Mốc C (≈ Tuần 6).**

### Giai đoạn IV — Kết chương, lưu/tải, bàn giao

**N14 — Phần còn lại Phase 3 + Phase 4 + Bad Ending + kết chương** · M · TD-26
- Cảnh sát kiểm đồ, gửi mẫu (khóa quay lại 204), chuyển thời gian "Một thời gian sau…", báo cáo có phần nạn nhân; Phase 4 +
  fallback xu/khảo sát/giấy khen; Bad Ending → load checkpoint thật (`ch1_phase3_start`, `ch1_pre_final`); tiêu đề
  "CHAPTER 2 — CON HẺM NƠI QUÁN BAR" → dừng ở `CH2_ENTRY`, lưu `chapter1_complete`.
- **Xong khi:** đi hết chương không lỗi, không gọi nút chưa có.

**N15 — Lưu/tải thật** · M · TD-28, TD-29, TD-30
- "Tiếp tục điều tra" tải save, resume đúng nút (không phát lại hiệu ứng); tự động lưu 5 phút + sau thu vật chứng / lưu
  checkpoint / đổi phase (DEC-010); lưu server qua `POST /api/game/save` khi có cách lấy `userId` **[CHỜ ISS-29/TD-11]**.
- **Xong khi:** tải lại ở REPORT/RECOVER/RECON đều đúng chỗ.

**N16 — Kiểm thử toàn chương & tài liệu** · M · TD-36, TD-38
- Playwright 2 lượt chơi trọn chương; nhóm playtest tay 12 mục `PLAYTEST_CHECKLIST.md`; cập nhật ARCHITECTURE, CONVENTIONS,
  README ("cách sửa lời thoại + chạy bộ kiểm tra").
- **T-046** đã qua hai lượt Playwright và cập nhật hướng dẫn. Còn TD-38 để nhóm xác nhận bằng playtest tay.
- ⇒ **Mốc D: Chương 1 hoàn chỉnh.**

### Giai đoạn V — Chuẩn bị Chương 2–5 [ĐỀ XUẤT, sau Mốc D]

**N17 — Công cụ viết chương mới**
- Mẫu kịch bản chữ (tiếng Việt) cho nhóm; công cụ chuyển kịch bản chữ → JSON; bộ kiểm tra chạy trong `npm run check`;
  sơ đồ trực quan mạng nút.
- Quy tắc mở rộng định dạng: chỉ THÊM kiểu nút mới kèm số phiên bản (vd 2.1), không đổi nghĩa kiểu cũ (DEC-016).
- Thiết kế "trạng thái xuyên chương" (đồng xu, chữ ký Khang Ch1 → Ch4–5) — đề xuất riêng, chờ duyệt.

## 5. Ảnh hưởng (file)

| Khu vực | Thêm mới | Sửa | Thay thế |
|---|---|---|---|
| Dữ liệu | `public/assets/chapters/chapter1/*` (5 file) | — | `public/assets/dialogues/chapter-1.json` (rỗng, demo) |
| Bộ máy | `game/narrative/*.js` + test (8 module) | — | `game/data/dialogueData.js`, `game/systems/notebook.js` (định dạng tạm) |
| Hiển thị | `scenes/StoryScene.js`, `ui/ChoiceMenu.js`, `ui/InspectModal.js`, `ui/PresentPicker.js`, `ui/ChecklistPanel.js`, `data/speakers.js`, `data/rooms/room204.js` | `DialogueBox`, `CharacterStage`, `characters.js`, `DialogueScene`, `RoomInvestigationScene`, `NotebookScene`, `DeductionScene`, `BadEndingScene`, `MainMenuScene`, `PreloadScene` | demo F9 (giữ cho debug hoặc bỏ — [CHỜ]) |
| Lõi | — | `core/GameSession.js`, `core/runtime.js`, `systems/autosave.js` | — |
| React | — | `features/play/services/saveService.js`, `hooks/useGameBridge.js` (payload state v2) | — |
| Backend | (sau) seed `evidence_master` 12 dòng Ch1 (TD-35) | cách lấy `userId` (ISS-29) | — |
| Công cụ/tài liệu | `scripts/chapter1/` | ARCHITECTURE, CONVENTIONS, README, TODO, PROJECT_MEMORY | — |

Không đổi: `schema.sql`, chữ ký API §4.3, cốt truyện, lời thoại, ID vật chứng/lời khai, mức trừ điểm của gói.

## 6. Điểm cần người dùng trả lời

| # | Câu hỏi | Ảnh hưởng | Khi nào cần |
|---|---|---|---|
| ~~Q4 (TD-09)~~ | **ĐÃ TRẢ LỜI (DEC-017):** dùng tạm toàn bộ văn bản hiện có; nhóm báo nếu đổi | — | — |
| ~~Q5 (TD-10)~~ | **ĐÃ TRẢ LỜI (DEC-017):** không tạo ảnh tạm; chỗ chưa có ảnh chỉ hiện NHÃN TÊN, đặt đúng vị trí để thay ảnh sau | — | — |
| ~~N-Q1~~ | **ĐÃ TRẢ LỜI (DEC-017):** Ván mới → Intro (nhóm cung cấp sau) → tutorial phòng 201 → bước "ra cửa" thay bằng Hòa gõ cửa → P1_001; bỏ qua tutorial → vào thẳng P1_001 | — | — |
| ~~N-Q2~~ | **ĐÃ TRẢ LỜI (DEC-018):** NPC đứng trên map, tới gần nhấn E | — | — |
| ~~N-Q3~~ | **ĐÃ TRẢ LỜI (DEC-019): phương án B** — state v2 + khối vị trí nhân vật cạnh state; chi tiết ở N6 | — | — |
| ~~N2-Q1~~ | **Đã chốt cách hiển thị (T-044):** Lịch sử trò chuyện đọc lại hội thoại đã hoàn tất; tab Lời khai dùng bản ghi quan trọng từ graph và liên kết bản thay thế. Runtime giữ phiên bản cũ và nguồn cập nhật cho mỗi lần sửa lời khai. | N2, N11, N5 | — |
| ~~N2-Q2~~ | **Đã chốt (T-045):** giữ `source_kind` theo validator. Sổ tay hiện nhãn theo nguồn đã ghi, gồm ảnh hiện trường, ảnh trong hồ sơ cảnh sát và giấy khen hành lang. | N11 | — |
| ~~TD-49~~ | T-048 dùng nền ghép sẵn của PR #8 trong thời gian được phép khám phòng 204. | N10 | — |
| ISS-29 (TD-11) | Lấy `userId` khi login | N15 (lưu server) | Trước N15 |

## 7. Rủi ro bug / lỗi phần mềm

| Rủi ro | Mức | Phòng / phát hiện |
|---|---|---|
| Bộ chạy hiểu sai luật (thứ tự route, increment, giữ nguồn bản ghi) → game chạy nhưng sai | Cao | Test vàng N5 so từng bước với validator Python |
| Trừ điểm 2 lần do bấm đúp / React vẽ lại / tween | Cao | Token sự kiện + `committed_events`; khóa input khi commit; test riêng |
| Tải game giữa đoạn phát lại hiệu ứng (thu vật chứng 2 lần, trừ điểm lại) | Cao | Resume tại `current_node`; test tải ở REPORT/RECOVER/RECON |
| Lộ đáp án (`answerKey`, bảng đúng/sai) qua giao diện hoặc debug | TB | Không render; debug overlay chỉ ở dev; test quét chuỗi |
| File ~836 KB nạp chậm | Thấp | Nạp 1 lần ở Preload; không nạp `source-map.json` |
| Chữ dẫn truyện dài tràn hộp thoại; dấu tiếng Việt | TB | Chia trang tự động trong DialogueBox; thiếu font Be Vietnam Pro (TD-43) |
| Ảnh tạm lọt vào bản nộp | TB | Ảnh tạm luôn có chữ "PLACEHOLDER"; checklist asset |
| Save cũ không đọc được | TB | `saveMigration.js` + test; báo xung đột, không tự chọn |
| Phạm vi lớn, dở dang nhiều nơi | TB | Mỗi phase chạy độc lập, `npm run check` xanh, commit theo phase trên nhánh `Nhan` |

## 8. Ước lượng & mốc

| Mốc | Phase | Ước lượng | Lịch tạm (Tuần 1 = 07/10, TD-15) |
|---|---|---|---|
| A — bộ máy đúng luật | N0–N5 | ≈ 8–10 phiên | — |
| B — Phase 1 chơi được | N6–N9 | ≈ 6–8 phiên | — |
| C — Sổ tay & Suy luận | N10–N13 | ≈ 9–12 phiên | Tuần 6 ≈ 11–17/11 (khó kịp nếu chưa có Q4 + asset) |
| D — Chương 1 hoàn chỉnh | N14–N16 | ≈ 6–8 phiên | trước Tuần 8–12 |

Mốc tuần chỉ để tham khảo (DEC-004). Thứ tự làm có thể đổi khi nhóm chốt trong `docs/TODO.md`.
