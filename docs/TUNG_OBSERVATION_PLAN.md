# Quan sát Tùng: ảnh 2/3, mô tả 1/3 — T-079

Nguồn: yêu cầu và ảnh chụp người dùng ngày17/11/2026; DEC-023 (mở đầu Chương1); `CHAPTER1_MEMORY.md` §5/8; `CHAPTER_1_PHASE_1.md` P1_002; graph runtime `P1_ROOM_204_VIEW → P1_SEE_TUNG → P1_ROOM_204_EXIT` và `evidence.json` EV_NeckScratches.

## Kế hoạch trước khi sửa — DEC-003

- Mục đích: nhấnE hoặc bấm hotspot Quan sát Tùng mở màn ảnh lớn có rung ngắn; ảnh nằm trong2/3trên, mô tả trong1/3dưới, không chồng nhau. Dùng ảnh `Tung.png`1536×1024 đã có trong dự án; phóng đồng tỷ lệ để phủ ngang, mask/cắt phần tràn (ưu tiên đầu/cổ), không kéo méo, tạo ảnh hay sửa asset.
- Luồng: giữ nguyên runner.choose và effect ghi nhận quan sát. RoomInvestigationScene chuyển sang StoryScene cùng cờ trình bày tạm khi đúng hotspot P1_SEE_TUNG; StoryScene hiển thị preview trước khi dựng map P1_ROOM_204_EXIT. Tiếp tục bằng Enter/Space/nút bấm hoặc Escape đóng preview và đi theo trạng thái đã có. Không thêm node/state/save field/API; không đổi khám cổ P2 hoặc phát Evidence ở P1.
- Nội dung: trích hai câu đầu đoạn mô tả Tùng trong node P1_002__005 (tư thế), thêm câu mô tả vật lý đầu tiên của EV_NeckScratches (vết cào/cổ áo); không đưa suy luận nguyên nhân tử vong. Đọc graph đang áp dụng của phiên để giữ sửa chữ qua Admin; không sáng tác lời thoại.
- Ảnh/text thành hai vùng tách biệt, ảnh toàn chiều ngang được clip đúng2/3, không ảnh mẫu/UI che nội dung. Rung chỉ tác động ảnh khoảng0.35giây, dừng đúng vị trí; không rung khung chữ. Theo quy ước MenuBackdrop, tôn trọng prefers-reduced-motion; không tự thêm setting.
- File ảnh hưởng: UI preview riêng, helper nội dung thuần + test, StoryScene/RoomInvestigationScene, uiText VI/EN nếu cần, E2E preview và cập nhật helper Chương1 để đi qua màn mới. Không đổi backend, dữ liệu chương, asset, room geometry, nhân vật hoặc dependency.
- Rủi ro: lệch tỷ lệ/khung hoặc cắt mất cổ; ảnh rung tràn vùng chữ, key/click đóng hai lần, preview mở lại khi vào Notebook, mask/tween rò rỉ; ghi effect nhiều lần hoặc nhận Evidence sớm; bỏ qua bản text Admin. Kiểm unit helper, check frontend, validator, Chrome viewport1280/1024/390 và reduced-motion, nhập liệu, Notebook/resume, reload, hai luồng Chương1 hiện có. Dùng profile tạm mới/API fixture, không ghi DB thật.
- Không có đề xuất đặc tả mới ngoài yêu cầu đã giao. Không commit/push hoặc khôi phục stash palette.

## Checkpoint

Đã triển khai preview/helper và nối scene. Lượt Chrome phát hiện GeometryMask cũ không hỗ trợ WebGL ở Phaser4, đã thay bằng `setCrop` trên Image, không thay renderer. Escape được nhận diện qua `StoryScene.handlesEscape` để không mở menu tạm dừng. Ba ca preview đã qua, đã xem desktop/mobile; check254/39file và validator6290 qua trước tinh chỉnh crop/Escape. Đang kiểm thêm cỡ Large/English và luồng Chương1 trước check cuối. Nội dung/ảnh/graph/API/save không đổi.
