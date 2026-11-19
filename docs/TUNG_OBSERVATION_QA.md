# Quan sát Tùng — QA T-079 / DEC-038

Ngày17/11/2026, nhánh `revert-9-Nhan`, base `1ec33b7`. Căn cứ: yêu cầu/ảnh người dùng, DEC-023; `CHAPTER_1_PHASE_1.md` P1_002, graph runtime P1_ROOM_204_VIEW/P1_SEE_TUNG và evidence.json EV_NeckScratches. Kế hoạch: `TUNG_OBSERVATION_PLAN.md`.

## Thay đổi

- E hoặc bấm hotspot Quan sát Tùng thực hiện nguyên `runner.choose`, ghi flag quan sát như trước, rồi mở preview trong StoryScene bằng tham số trình bày tạm. Khi đóng, trở về map P1_ROOM_204_EXIT. Không thêm node/flag/save field, không cấp Evidence ở P1 hoặc thay thao tác khám cổ P2.
- Ảnh `frontend/public/assets/images/characters/Tung.png`1536×1024 có sẵn trong dự án, frame `__BASE`. Không dùng frame630×420 của lần khám cổ P2 làm ảnh lớn, không sửa/tạo lại ảnh.
- Khung game1280×720: ảnh ở y0–480, toàn chiều ngang; mô tả ở y480–720, nền đặc. ScaleX=ScaleY=0.833333, ảnh nguyên tỉ lệ1280×853.33, source crop1536×576 ở phía trên (ưu tiên đầu/cổ). Không hiển thị trọn chân trong kiểu cover này; đây là phần tràn được cắt theo yêu cầu phóng ngang trong2/3khung. Không kéo méo ảnh hoặc tăng độ phân giải gốc bằng AI.
- Ảnh rung ngang tối đa9px, giảm dần và dừng sau350ms ở x640; mô tả/nút không rung. `prefers-reduced-motion` tắt rung theo quy ước sẵn có, không thêm setting.
- Nội dung là hai câu tư thế đầu tiên trong đoạn Tùng của node P1_002__005 và câu quan sát vật lý đầu tiên của EV_NeckScratches. Dùng graph phiên đang áp dụng để phản ánh chỉnh chữ Admin; không đưa suy luận tự cào/nguyên nhân tử vong vào màn này. UI VI/EN có cùng khóa `story.observeTung`, mô tả vẫn tiếng Việt theo DEC-012.
- Tiếp tục bằng Enter/Space, bấm nút hoặc bấm vùng ảnh; Escape đóng preview thông qua handlesEscape của StoryScene. Notebook/resume không phát lại rung; xóa view/tween khi chuyển cảnh hoặc rời game. Hành vi quan sát/điểm số/vật chứng vẫn do graph cũ xử lý.

## Kiểm tra thực tế

| Kiểm tra | Kết quả đã thu |
|---|---|
| `cd frontend; npm run check` | Qua trên mã cuối: ESLint, Prettier,254/254unit (39file), Vite production build |
| Helper3unit | Khớp đoạn mô tả có nguồn, không lộ phần suy luận/từ bậu cửa; đọc chữ của graph phiên, không tự điền dữ liệu thiếu |
| `python scripts/chapter1/validate.py` | Qua6290assertion,1264node,43statement; không broken target/unreachable. Khác MANIFEST gốc là graph có sẵn từ trước, không sửa dữ liệu chương trong T-079 |
| Chrome preview lượt trước | 3/3 qua: E/chuột, crop và bounds, rung ảnh/chữ đứng yên/dừng đúng x640, reduced motion, một effect, không Evidence sớm, Notebook/resume/Escape và rời trang; không pageerror |
| Chrome lượt cuối preview + Chương1 | Đang thu kết quả6ca; thêm Large/English và logout qua React, hai luồng đầy đủ Chương1 và nhép miệng |
| Xem ảnh | Đã xem desktop1280×800, tablet1024×768, mobile390×844; cổ/vết cào thấy rõ, vùng chữ riêng, ảnh không đè lên chữ |
| Số đo | Heading y502–539, body y551–648, nút y660–704; cả ba nằm trong phần dưới480–720, body cách nút12px. Ảnh hiển thị đúng crop×scale=480px |
| Phạm vi | Backend, public assets/data/thoại, narrative engine, room geometry/entities và package/lockfile không có diff; không đổi API/DB/cơ chế đăng nhập/quyền. `git diff --check` qua |

Lượt đầu phát hiện GeometryMask của Phaser3 không hỗ trợ WebGL trong Phaser4; đã đối chiếu mã thư viện và dùng `Image.setCrop` hỗ trợ renderer hiện tại, không đổi công nghệ. Kiểm Escape phát hiện capture global cần nhận biết preview; đã bổ sung `observationPending` vào `StoryScene.handlesEscape`. Các lỗi này đã được sửa và3ca preview chạy lại qua trước lượt hồi quy cuối.

Ảnh/số đo ignored tại `frontend/node_modules/.cache/tung-observation-qa/`: `desktop.png`, `tablet.png`, `mobile.png`, `measurements.json`. Các lượt Chrome dùng profile tạm mới của Playwright, API fixture, không ghi database thật.

## Giới hạn

Chưa xác minh backend/MySQL thật, trình duyệt khác Chrome hoặc điện thoại/tablet vật lý. Mật độ và cách thu canvas trên mobile giữ cơ chế hiện có của game; không thêm layout/điều khiển cảm ứng ngoài phạm vi. Chưa kết luận lượt6ca cuối trước khi có output. Không commit/push hoặc áp stash palette; giữ sửa PROGRESS_LOG có sẵn từ T-077/T-078.
