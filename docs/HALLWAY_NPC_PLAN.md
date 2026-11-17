# NPC đứng trên hành lang — T-075

> Mốc T-075. Từ T-076, ba model đứng Hào/Linh/Minh dùng ảnh mới do người dùng cung cấp, thay hình FRONT cũ; Hòa giữ nguyên. Xem `HALLWAY_NPC_POSES.md`.

Nguồn: yêu cầu người dùng17/11/2026 và ảnh chụp; DEC-015/018/023; kịch bản Chương1 Phase1 (Linh cửa205, Hào lan can, Minh đầu cầu thang). Người dùng xác nhận Hòa là landlord và cho phép bổ sung phần chân từ model Hòa hiện có. Không tự tạo NPC/cốt truyện/lời thoại mới.

## Kế hoạch (DEC-003)

- Mục đích: thay ô chân dung trên map bằng sprite cơ thể đứng trong cảnh Phaser4.2.1; giữ đúng người, tên hiển thị và lựa chọn kịch bản.
- Asset: dùng nguyên hình đứng trong linh/minh/hao-sheet.png đã có; Phaser tách nền giấy/cắt phần đứng khi preload, không sửa bảng gốc/ảnh hội thoại. Hòa dùng ảnh gốc landlord-smirk.png làm tham chiếu, imagegen bổ sung chân theo xác nhận; lưu asset riêng, giữ nguyên3 biểu cảm cũ.
- Code: registry model map, hệ thống tách nền thuần có test, entity Npc; PreloadScene tạo texture, RoomInvestigationScene dựng actor và vùng bấm theo thân/người, storyMap gắn Hòa với landlord. Dùng cùng heightAt/depth20+y/1000 như Player, sau lan can depth30. Giữ điểm đứng, vùng đi, bán kính/phím tương tác, choiceIndex, điều kiện, graph/save/API/backend.
- Không tự thêm collision NPC hoặc hoạt ảnh đi/AI khi người dùng chỉ yêu cầu đứng; không phát sinh lore/đồ vật.
- Rủi ro: nền giấy còn viền, lệch tỉ lệ/chân, lan can che sai, tên Hào lộ sớm, vùng bấm lệch hoặc chồng nhau, lặp actor khi scene restart, làm đổi lời thoại/đường chơi.
- Kiểm tra: unit tách nền/bounds, npm run check, validator; Chrome P1/P3, bấm thân/đầu và nhấnE, tên ẩn/hiện của Hào, tái vào phòng, footprint/depth, hai luồng Chương1 hiện có nếu khả dụng. Không ghi DB thật/commit/push.

## Phạm vi được duyệt

NPC hành lang hiện có trên map P1/P3: Hòa, Linh, Hào, Minh. Cảnh sát chưa có model/vị trí map trong adapter hiện tại; không tự thêm người hoặc đổi flow. Bản gốc Hòa kết thúc ở đùi, được người dùng duyệt bổ sung phần chân; ba bảng nhân vật khác đã có toàn thân tới giày.

Ảnh Hòa tạo bằng built-in image_gen, loại identity-preserve: giữ đầu/thân/áo/quần/phụ kiện/tư thế và nét vẽ, chỉ hoàn thiện phần chân/giày; nền trong suốt, một nhân vật, không chữ/đồ trang trí mới. Chi tiết prompt và đường dẫn cuối ghi trong QA.
