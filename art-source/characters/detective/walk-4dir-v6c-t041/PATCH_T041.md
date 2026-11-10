# Thám tử đi 4 hướng — V6c + bản sửa của AI (T-041, 03/11/2026)

Gốc: gói `DETECTIVE_WALK_4_DIRECTIONS_V6c` (GPT, AI đo đạt ở T-038; bản nguyên gốc giữ ở `../walk-4dir-v6c/`).
Người dùng báo trong game: nhân vật "không phải một khối liền mạch" — đầu trượt trên vai, lộ đường nối/vệt.
Atlas game dựng lại từ thư mục này bằng `scripts/art/build_detective_atlas.py`.

## Đã sửa

| Lỗi (đo trên V6c) | Cách sửa | Kết quả đo lại |
|---|---|---|
| Đi lên/xuống: lớp đầu (gồm cả vai trên) đứng yên theo chiều ngang trong khi thân lắc ±4,2 px → đầu trượt trên vai, sọc áo lệch ở mép dưới lớp đầu | Dựng lại vùng đầu từ các lớp xuất của gói (`source/build/qa/upper_layers`): dời lớp đầu theo đúng độ lắc ngang của thân đo ở dải cổ áo (0, 2, 4, 4, 4, 2, 0, −2, −4, −4, −4, −2 px); tay gần (không có lớp riêng) giữ nguyên ảnh gốc | Đầu − ngực: còn −2…+2 px (chỉ do thân nghiêng ±2° quanh cổ — tự nhiên); trước đó −6…+6 px. Khung 00/06 không đổi byte nào |
| Trái/phải + tư thế đứng trái/phải: đường bao vai sau bị cắt khuyết vào ~10 px (chỗ tách tay khỏi thân ở texture V5) + nét viền mờ của đường bao cũ trôi bên ngoài | Vá 1 lần trên texture thân (`v5_reference/source/art_parts/<hướng>/torso.png`): đường bao mới là đường cong Hermite nối mép vai trên và mép lưng dưới chỗ khuyết; nền màu từ inpaint + chi tiết sọc vải chép cùng hàng; nét viền mới vẽ khử răng cưa. Dựng lại lớp thân từng khung theo đúng phép biến đổi của `render_upper.cjs` (viết lại bằng Python — sai khác so với lớp xuất của gói: alpha ≤ 12/255, màu ≈ 1/255) rồi chỉ thay phần thay đổi, giữ đúng thứ tự lớp (tay gần/đầu/túi đè lên vẫn ở trên) | Không còn hàng nào có bậc khuyết ≥ 6 px ở cả 48 khung + 2 tư thế đứng |
| Mọi khung: nét viền mờ (alpha ≤ 160) cách phần đặc > 2,5 px | Xóa (trừ vùng tóc: 75 hàng trên cùng của đầu) | ~1.200 px/khung, chỉ điểm rất mờ |
| Thân trên: lỗ kim nửa trong suốt ở chỗ 2 lớp cắt chạm nhau (nền lọt qua thành chấm sáng) | Lấp các cụm lỗ nhỏ (≤ 40 px) nằm kín bên trong hình, chỉ ở y < 480 | — |

## Giữ nguyên

- Thân dưới: đi lên/xuống 0 pixel thay đổi ở y ≥ 560; trái/phải chỉ đổi các điểm viền mờ (alpha ≤ 160) ngoài hình.
- Vệt chân chống, số khung, nhịp (24/12 hình/giây), tốc độ (220/88 px/giây), ô 448×720, điểm chân y = 660, tên file.
- Mỗi khung vẫn liền một mảnh (alpha > 128: 1 mảnh/khung).

## Giới hạn

- Phần vá vai sau là AI dựng (không phải họa sĩ vẽ): ở cỡ trong game (~0,6×) liền mạch, nhưng phóng to sẽ thấy sọc vải
  vùng vá mềm hơn chỗ khác. Muốn hoàn hảo: nhờ họa sĩ/GPT vẽ lại texture thân (`torso.png`) rồi dựng lại.
- Các công cụ sửa chạy trên thư mục `source/` của gói V6c (116 MB, không đưa vào repo).
