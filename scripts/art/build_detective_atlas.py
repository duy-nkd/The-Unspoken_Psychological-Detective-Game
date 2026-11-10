"""
Dựng atlas thám tử (đi 4 hướng + 4 tư thế đứng) từ gói V6c — T-039, DEC-020.

Ảnh gốc: art-source/characters/detective/walk-4dir-v6c-t041/ — gói V6c (AI đo đạt ở T-038) đã được AI sửa ở T-041
  (đầu đi theo thân khi đi lên/xuống, vá chỗ khuyết vai sau bên trái/phải, xóa nét viền mờ, lấp lỗ kim; xem PATCH_T041.md).
  Bản V6c nguyên gốc vẫn giữ ở art-source/characters/detective/walk-4dir-v6c/ để đối chiếu. Mỗi thư mục gồm:
  walk_left.png, walk_right.png (6×4 ô, 24 khung), walk_up.png, walk_down.png (4×3 ô, 12 khung), idle_<hướng>.png,
  animation_manifest.json. Mỗi ô 448×720, điểm chân (gốc) ở x=224, y=660; người cao 560 px ảnh.

Việc làm:
  1. Cắt MỌI khung bằng cùng một khung chữ nhật quanh điểm chân (x 64–384, y 84–708 — chứa trọn nhân vật ở cả 76 khung,
     script tự kiểm) → điểm chân giữ đúng chỗ, không khung nào lệch.
  2. Thu nhỏ ×0,625 (người cao 350 px; trong game cao tối đa 330 px ở mốc gần) trên ảnh NHÂN SẴN alpha để viền không bị
     quầng sáng/tối.
  3. Ghép atlas Phaser JSON hash (đệm 2 px giữa các ô), lưu WebP. Tên khung: walk-<hướng>-NN, idle-<hướng>.
  4. In các hằng số cho entities/Player.js (DETECTIVE_ATLAS): sourceHeight, origin — cũng ghi trong meta của JSON
     (test game/entities/detectiveAtlas.test.js so khớp).

Cách chạy (từ thư mục gốc repo):
  python scripts/art/build_detective_atlas.py art-source/characters/detective/walk-4dir-v6c-t041 frontend/public/assets/images/characters
Cần: Python 3.10+, Pillow, numpy.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

CROP = (64, 84, 384, 708)  # x0, y0, x1, y1 trong ô 448×720 — cân giữa x=224, điểm chân y=660
ANCHOR = (224, 660)
SCALE = 0.625  # 320×624 → 200×390; điểm chân (160, 576) → (100, 360)
REFERENCE_HEIGHT = 560  # chiều cao người trong ô gốc (animation_manifest.referenceCharacterHeight)
PAD = 2
COLUMNS = 10
DIRECTIONS = ['left', 'right', 'up', 'down']


def premultiplied_resize(img, size):
    """Co ảnh RGBA trên giá trị nhân sẵn alpha rồi chia lại → không loang màu nền trong suốt vào viền."""
    a = np.asarray(img.convert('RGBA')).astype(np.float64) / 255.0
    rgb = a[..., :3] * a[..., 3:4]
    channels = [Image.fromarray(rgb[..., i].astype(np.float32), 'F') for i in range(3)]
    channels.append(Image.fromarray(a[..., 3].astype(np.float32), 'F'))
    small = [np.asarray(c.resize(size, Image.LANCZOS)) for c in channels]
    alpha = np.clip(small[3], 0, 1)
    out = np.zeros((size[1], size[0], 4))
    safe = np.where(alpha > 1e-6, alpha, 1)
    for i in range(3):
        out[..., i] = np.clip(small[i] / safe, 0, 1)
    out[..., 3] = alpha
    out[alpha <= 1e-6] = 0
    return Image.fromarray((out * 255 + 0.5).astype(np.uint8), 'RGBA')


def load_cells(src):
    manifest = json.loads((src / 'animation_manifest.json').read_text(encoding='utf-8'))
    assert manifest['referenceCharacterHeight'] == REFERENCE_HEIGHT, 'chiều cao người trong ô đã đổi'
    assert manifest['groundPlaneY'] == ANCHOR[1], 'điểm chân trong ô đã đổi'
    w, h = manifest['frameWidth'], manifest['frameHeight']
    cells, animations = {}, {}
    for d in manifest['directions']:
        sheet = Image.open(src / d['sheet']).convert('RGBA')
        for i in range(d['frameCount']):
            r, c = divmod(i, d['columns'])
            cells[f"walk-{d['id']}-{i:02d}"] = sheet.crop((c * w, r * h, (c + 1) * w, (r + 1) * h))
        cells[f"idle-{d['id']}"] = Image.open(src / d['idle']).convert('RGBA')
        animations[d['id']] = {'frames': d['frameCount'], 'frameRate': d['frameRate'], 'speed': d['speed']}
    return cells, animations


def check_crop(cells):
    """Khung cắt phải chứa trọn phần không trong suốt của mọi ô (không cắt mất chân/tóc)."""
    for name, img in cells.items():
        alpha = np.asarray(img)[..., 3]
        inside = alpha[CROP[1]:CROP[3], CROP[0]:CROP[2]].astype(np.int64).sum()
        if inside != alpha.astype(np.int64).sum():
            raise SystemExit(f'Khung cắt làm mất điểm ảnh ở {name} — nới CROP')


def main(src_dir, out_dir):
    src, out = Path(src_dir), Path(out_dir)
    cells, animations = load_cells(src)
    check_crop(cells)
    cw = round((CROP[2] - CROP[0]) * SCALE)
    ch = round((CROP[3] - CROP[1]) * SCALE)
    names = list(cells)
    rows = (len(names) + COLUMNS - 1) // COLUMNS
    atlas = Image.new('RGBA', (COLUMNS * (cw + PAD) - PAD, rows * (ch + PAD) - PAD), (0, 0, 0, 0))
    frames = {}
    for i, name in enumerate(names):
        small = premultiplied_resize(cells[name].crop(CROP), (cw, ch))
        x, y = (i % COLUMNS) * (cw + PAD), (i // COLUMNS) * (ch + PAD)
        atlas.alpha_composite(small, (x, y))
        frames[name] = {'frame': {'x': x, 'y': y, 'w': cw, 'h': ch}, 'rotated': False, 'trimmed': False,
                        'spriteSourceSize': {'x': 0, 'y': 0, 'w': cw, 'h': ch}, 'sourceSize': {'w': cw, 'h': ch}}
    assert max(atlas.size) <= 4096, f'atlas {atlas.size} vượt 4096 px'
    origin = {'x': (ANCHOR[0] - CROP[0]) / (CROP[2] - CROP[0]), 'y': round((ANCHOR[1] - CROP[1]) / (CROP[3] - CROP[1]), 6)}
    source_height = REFERENCE_HEIGHT * SCALE
    out.mkdir(parents=True, exist_ok=True)
    atlas.save(out / 'detective.webp', 'WEBP', quality=90, alpha_quality=100, method=6)
    meta = {
        'app': 'The Unspoken — scripts/art/build_detective_atlas.py (T-039, DEC-020)',
        'image': 'detective.webp', 'size': {'w': atlas.width, 'h': atlas.height}, 'scale': '1',
        'source': f'art-source/characters/detective/{src.name} (DETECTIVE_WALK_4_DIRECTIONS_V6c'
                  + (' + AI patch T-041)' if src.name.endswith('t041') else ')'),
        'origin': origin, 'sourceHeight': source_height, 'animations': animations,
        'note': 'Đặt setOrigin(origin.x, origin.y): gốc = điểm chân. Trái/phải là ảnh riêng — KHÔNG lật gương. '
                'Tốc độ khớp chân ở mốc gần: ngang 220, lên/xuống 88 px/giây (DEC-020).',
    }
    (out / 'detective.json').write_text(json.dumps({'frames': frames, 'meta': meta}, ensure_ascii=False, indent=1) + '\n',
                                        encoding='utf-8')
    print(f'atlas {atlas.width}×{atlas.height}, {len(names)} khung {cw}×{ch}')
    print(f'DETECTIVE_ATLAS: sourceHeight {source_height}, origin {origin}')
    print('animations', animations)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    main(sys.argv[1], sys.argv[2])
