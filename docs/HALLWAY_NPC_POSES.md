# Thay dáng đứng Hào, Linh, Minh — T-076

Nguồn: ba ảnh người dùng cung cấp ngày17/11/2026 (`Hao.jpg`, `Linh.jpg`, `Minh.jpg`) và yêu cầu đổi đúng ba model tương tác, giữ nguyên ông chủ trọ. Cơ sở kỹ thuật: DEC-015/018/036, `CHAPTER1_MEMORY.md` §8 và `assets.integration.json` (ánh xạ người đàn ông chưa biết tên sang Hào).

## Kế hoạch trước khi thực hiện — DEC-003

1. Giữ ảnh gốc trong `art-source/characters/<nhân vật>/`, sao chép nguyên byte sang `frontend/public/assets/images/characters/<id>-standing.jpg`. Không chỉnh/vẽ lại ảnh hoặc thay chân dung hội thoại.
2. Đổi riêng ba nguồn `linh/hao/minh` trong `game/data/npcSprites.js` sang ảnh mới. Dùng preload và CanvasTexture/cutout hiện có; không còn lấy hình FRONT của sheet làm model map. Registry Hòa, entity Npc, điểm đứng/height/depth/hitbox/E/graph/save/API giữ nguyên.
3. Rủi ro: viền JPG, phần nền hoặc bóng dưới giày còn sót, bàn chân bị cắt hoặc model gán sai tên; kiểm trực tiếp cảnh P1/P3, bốn actor/lan can, bấm vàE, ẩn tên Hào, tái vào cảnh, màn hình desktop/tablet/mobile.
4. Chạy `npm run check` và E2E map hiện có. Chỉ mở rộng kiểm tra nếu có thay đổi logic hoặc lỗi mới; không cần viết lại kiểm thử nghiệp vụ cho thay đổi đường dẫn ảnh. Ghi kết quả/thành phần chưa xác minh ở cuối tài liệu; cập nhật checkpoint/bộ nhớ.

Đây là thay asset đã được yêu cầu trực tiếp, không phải đề xuất đặc tả mới. Không đổi Hòa, cốt truyện, lời thoại, NPC, va chạm, backend hoặc dependency. Giữ thay đổi T-075 đang có và stash palette, không tự commit/push.

## Kết quả kiểm tra

Hoàn tất trong phạm vi người dùng yêu cầu. Dùng trực tiếp ba JPG đã cung cấp, không tạo/vẽ lại model. Pipeline Phaser hiện có tạo texture trong suốt cho map; sheet chân dung hội thoại vẫn giữ nguyên.

| Người | Ảnh nguồn trong Downloads | Bản gốc lưu trong repo | Bản nạp vào game |
|---|---|---|---|
| Hào | `Hao.jpg` | `art-source/characters/hao/hao-standing-t076.jpg` | `frontend/public/assets/images/characters/hao-standing.jpg` |
| Linh | `Linh.jpg` | `art-source/characters/linh/linh-standing-t076.jpg` | `frontend/public/assets/images/characters/linh-standing.jpg` |
| Minh | `Minh.jpg` | `art-source/characters/minh/minh-standing-t076.jpg` | `frontend/public/assets/images/characters/minh-standing.jpg` |

Mỗi bản sao khớp nguyên byte ảnh người dùng. Ba ảnh RGB1024×1536; SHA-256 lần lượt:

- Hào: `9b765bfdd97372bf8d26072a9344a23da76c453cbf210a5c1127693a6e7757e5`.
- Linh: `665436dff9561cda136f50c9b0d0a878135eb07fc8d82d2d569da3e32b428ce7`.
- Minh: `e3c5c6390d35a474fc677c3e032e9f838b8f15c9ddd69de8c2b682f7080fbaac`.

| Kiểm tra T-076 đã chạy | Kết quả |
|---|---|
| `cd frontend; npm run check` | Qua ESLint, Prettier, 251/251 unit test (38 file) và Vite production build |
| `npm run test:e2e -- e2e/hallway-npcs.spec.js` | 3/3 qua: P1/P3 đủ bốn model, alpha góc trong suốt, chân/chiều cao/depth và lan can đúng; bấm vào từng người tới đúng node; E, tên Hào ẩn/hiện và tái vào cảnh không lặp actor/texture; không pageerror |
| Xem ảnh thực tế | Đã xem desktop1280×800, tablet1024×768, mobile390×844: Hào cầm thuốc/một tay túi quần, Linh nắm tay áo, Minh hai tay trong túi và cúi đầu đúng ảnh; không còn nền giấy thành khối, không cắt bàn chân, Hòa giữ dáng cũ |
| Giữ Hòa và phần xử lý | So sánh SHA trước/sau của 9 file: hai asset Hòa, Npc, cutout, PreloadScene, RoomInvestigationScene, storyMap và hai E2E đều khớp. Hòa vẫn ở632/458, cao229.28px, rộng91.90px, depth20.458 như T-075 |
| Giới hạn diff | T-076 chỉ đổi code trong `npcSprites.js`, thêm sáu bản ảnh và cập nhật tài liệu/bộ nhớ/nhật ký. Giữ nguyên các thay đổi T-075 có sẵn; không đổi test, backend/API/graph/thoại/điểm đứng/tỷ lệ/cơ chế tương tác |

Ảnh và số đo local ignored lưu riêng ở `frontend/node_modules/.cache/hallway-npc-t076/`: `hallway-p1.png`, `hallway-p3.png`, `hallway-tablet.png`, `hallway-mobile.png`, `models.json`, `baseline.json`. Chrome dùng profile tạm mới của Playwright, API fixture, không ghi DB thật.

Chưa xác minh trên điện thoại/tablet vật lý, browser khác Chrome hoặc backend/MySQL thật. Không chạy lại toàn bộ Chương1/validator trong T-076 vì chỉ đổi nguồn ảnh; các kết quả full Chương1 và validator ở T-075 là lịch sử, không tính thành kiểm tra mới. Không có lỗi còn lại trong các kiểm tra T-076 nêu trên; không có điểm cần xác nhận. Chưa commit/push và giữ nguyên stash palette.
