# Bộ tích hợp thám tử thiết kế mới (V6c) — ĐANG CẤT, game không dùng (DEC-021, T-042)

03/11/2026 người dùng chọn quay về nhân vật cũ (đi ngang 6 khung, đi dọc nhún người — bản trong git trước T-039) và
**giữ lại** thiết kế mới để dùng sau. Thư mục này chứa đúng các file game đã dùng ở T-039 → T-041, cất ngoài `frontend/`
nên không bị lint/test/build.

| File ở đây | Vị trí khi bật lại | Ghi chú |
|---|---|---|
| `Player.js` | `frontend/src/game/entities/Player.js` | 4 hướng, gốc = điểm chân, vẽ liên tục, khung theo quãng đường (T-039 + T-040) |
| `detectiveAtlas.test.js` | `frontend/src/game/entities/detectiveAtlas.test.js` | kiểm atlas khớp `DETECTIVE_ATLAS` |
| `facing.js`, `facing.test.js` | `frontend/src/game/systems/` | tên khung `walk-<hướng>-NN`, `idle-<hướng>` |
| `locomotion.js`, `locomotion.test.js` | `frontend/src/game/systems/` | tốc độ elip ngang 220 / dọc 88, chu kỳ đi theo quãng đường |
| `gameplay.js` | `frontend/src/game/constants/gameplay.js` | có `WALK_SPEED_VERTICAL: 88`, không còn `WALK_ANIM_FPS`, `BOB_*` |
| `detective.webp`, `detective.json` | `frontend/public/assets/images/characters/` | atlas dựng từ `../` (V6c + sửa T-041) |

Bật lại: chép các file về đúng vị trí trên (ghi đè bản cũ), rồi `cd frontend; npm run check`.
Dựng lại atlas từ ảnh: `python scripts/art/build_detective_atlas.py art-source/characters/detective/walk-4dir-v6c-t041 frontend/public/assets/images/characters`.
Lưu ý: `gameplay.js` ở đây là bản 03/11 — nếu bản trong game đã thêm hằng số mới, gộp tay thay vì ghi đè cả file.
Quyết định liên quan: DEC-020 (thiết kế mới, đi dọc 88 px/giây) — tạm gác bởi DEC-021.
