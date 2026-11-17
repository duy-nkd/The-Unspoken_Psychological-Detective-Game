# NPC cơ thể trên hành lang — QA T-075 / DEC-036

> Kết quả tại mốc T-075. Ba nguồn model map Hào/Linh/Minh đã được thay bằng ảnh mới trong T-076; Hòa và cơ chế tương tác giữ nguyên. Nguồn ảnh và QA mới: `HALLWAY_NPC_POSES.md`.

Ngày kiểm: 17/11/2026. Nhánh `revert-9-Nhan`, base `5c9a6fd`. Căn cứ: yêu cầu và ảnh người dùng; xác nhận Hòa là chủ trọ và cho phép bổ sung chân; DEC-015/018/023; `CHAPTER1_MEMORY.md` §8, `assets.integration.json` và `CHAPTER_1_PHASE_1.md` (mở cảnh, hub và vị trí nhân vật).

## Kết quả triển khai

- Hành lang tại `P1_HUB_MENU`/`P3_HUB` hiển thị cơ thể Hòa, Linh, Hào, Minh thay các ô ảnh đầu. Chỉ dựng người ứng với lựa chọn đang có từ `runner.choices()`.
- Linh/Hào/Minh dùng hình FRONT trong ba sheet đã cung cấp. Phaser tạo CanvasTexture riêng, tách nền giấy và chữ rời, cắt sát biên alpha; không sửa sheet/frame chân dung hoặc nhép miệng.
- Hòa dùng sprite đứng mới từ model gốc đã được người dùng cho phép bổ sung chân. Các ảnh hội thoại `landlord-smirk/stern/talk` cũ không thay.
- Điểm neo `(0.5, 1)` tại chân; chiều cao theo `heightAt` của phòng như Player; depth `20 + y / 1000`, phía sau lan can depth30. Tọa độ đứng cũ giữ nguyên. Chiều cao tại điểm đứng: Linh/Minh/Hòa229.28px, Hào232.92px trong khung1280×720; đây là số đo triển khai, không phải đặc tả chiều cao mới.
- Nhãn tên phía trên đầu; Hào vẫn là “Người đàn ông” trước khi biết tên. Vùng chuột bao thân và nhãn, đi tới điểm tương tác cũ. Bán kính70/phímE, choiceIndex/điều kiện và flow kịch bản giữ nguyên. Không thêm va chạm NPC hoặc AI đi lại.

## Asset và cách tạo

| NPC | Nguồn | Texture map |
|---|---|---|
| Linh | `frontend/public/assets/images/portraits/chapter1/linh-sheet.png`, FRONT `[240,6,210,642]` | `map-npc-linh` |
| Hào | `frontend/public/assets/images/portraits/chapter1/hao-sheet.png`, FRONT `[276,8,210,584]` | `map-npc-hao` |
| Minh | `frontend/public/assets/images/portraits/chapter1/minh-sheet.png`, FRONT `[320,8,195,580]` | `map-npc-minh` |
| Hòa | Tham chiếu `art-source/characters/landlord/landlord-smirk.png`, bổ sung chân được duyệt | `map-npc-landlord` |

Hòa được chỉnh bằng built-in `image_gen.imagegen`, `transparent_background: true`, ảnh tham chiếu là bản gốc nói trên. Không dùng script vẽ lại ảnh. Kết quả PNG887×1774, RGBA, alpha0–255,1,342,988byte; lưu nguyên kết quả vào:

- Bản gốc tạo mới: `art-source/characters/landlord/landlord-standing-t075.png`.
- Bản game nạp: `frontend/public/assets/images/characters/landlord-standing.png`.
- Hai bản cùng SHA-256: `f123f57b58fe12fa13909a18929f99e07d9b451fdf13c51d00495257ab95380b`.

Prompt dùng nguyên văn:

```text
Use case: identity-preserve. Edit target: the supplied original Hòa/landlord-smirk character model from The Unspoken. Asset type: a single standing 2D NPC sprite for an existing Phaser investigation game. Complete the missing lower legs and shoes so this exact man is visible from the top of his head to the soles of both feet. Preserve the original identity, face, balding hair, stocky body, orange-brown short sleeved shirt, necklaces, belt, keys, brown trousers, hands resting at his sides, front-facing standing pose, hand-drawn outlines and restrained shading. Continue the existing trousers naturally below the cropped thighs and add simple closed brown shoes in the same drawing style. Keep the existing upper-body design as faithfully as possible; no redesign. One man only, full body, both feet planted at the same level, no cropping, a small transparent margin on all sides. Real transparent background with clean alpha, no paper background, no floor, no scenery, no cast ground shadow, no lettering, no watermark, no extra props. This is a world sprite only: existing dialogue portraits are unchanged.
```

## Kiểm tra đã thực hiện

| Kiểm tra | Kết quả |
|---|---|
| `cd frontend; npm run check` | Qua lint, Prettier,251/251 unit (38file), Vite production build |
| Unit cutout3ca | Xóa giấy/chữ rời, giữ màu sáng trong viền/model và alpha bán trong suốt; đầu vào không bị sửa; khung trống không thành model giả |
| `python scripts/chapter1/validate.py` | Qua6290assertion,1264node,43statement; không broken target/unreachable. Khác MANIFEST gốc là trạng thái chapter1 đã có trước tác vụ, không sửa graph lần này |
| Chrome map `hallway-npcs.spec.js` | 3/3 qua trên mã cuối; P1/P3 đủ4texture, alpha góc0, neo chân/height/depth và lan can, không còn head icon; bấm phần đầu/thân phía trên vùng icon cũ tới đúng node; E từng NPC, tên Hào,5lần tái vào cảnh không lặp actor/texture; không pageerror |
| Chrome Chương1 hiện có | 3/3 qua sau cập nhật kỳ vọng hình ảnh map: nhép miệng Hòa và hai lượt đầy đủ tới `CH2_ENTRY` (thu nguồn tùy chọn sớm / qua hồ sơ Phase4), gồm kiểm điểm số, lưu/tải và nguồn dữ liệu; không pageerror |
| Xem ảnh | Đã xem desktop1280×800, tablet1024×768, mobile390×844. Đủ cơ thể, nền giấy/chữ sheet không xuất hiện, tỷ lệ theo Player, lan can che đúng lớp |
| Đối chiếu phạm vi | Backend, API, dữ liệu chương/thoại, narrative engine, room geometry, nhân vật hội thoại, React play và dependency không có diff; staging rỗng, không unmerged; `git diff --check` qua |

Lượt đầu test map dùng phản hồi200/null cho tài khoản chưa có save khiến menu hiểu có bản lưu. Fixture đã sửa thành404 đúng tình huống. Lượt kiểm tiếp tự giả định NPC nói trước nhưng graph có câu mở đầu của DETECTIVE; đã đối chiếu node gốc và sửa kỳ vọng test. Không sửa game theo các giả định này.

Hai luồng Chương1 lần đầu dừng ở assertion yêu cầu icon `chapter1-portrait-*` trên map. Đã cập nhật riêng assertion trình bày sang4model `map-npc-*` và xác nhận không có head icon; thêm kiểm model không xuất hiện sớm ở `P1_HALL_204`. Giữ nguyên các kiểm tra chân dung hội thoại, nhép miệng, nội dung, lựa chọn, tính điểm, bản lưu và trạng thái kịch bản.

Ảnh/số đo local (ignored) tại `frontend/node_modules/.cache/hallway-npc-qa/`: `hallway-p1.png`, `hallway-p3.png`, `hallway-tablet.png`, `hallway-mobile.png`, `models.json`. Các lượt Chrome dùng profile tạm mới của Playwright; không dùng profile cá nhân.

## Giới hạn và trạng thái

Kiểm map dùng API fixture, kiểm Chương1 dùng auth/story-text fixture và local save. Không xác minh giao dịch backend/MySQL thật, browser khác Chrome hoặc điện thoại/tablet vật lý. Kích thước mobile là canvas thu theo tỷ lệ của game hiện tại; không thiết kế lại HUD hoặc thêm điều khiển cảm ứng. Sprite đứng yên theo yêu cầu, không bổ sung hoạt ảnh.

Hoàn tất trong phạm vi NPC hành lang. Chưa commit/push; không áp stash palette `64c180e`. Bộ nhớ và nhật ký được cập nhật theo DEC-002. Không còn lỗi phát hiện trong các kiểm tra nêu trên; chưa kết luận các phần ngoài phạm vi QA.
