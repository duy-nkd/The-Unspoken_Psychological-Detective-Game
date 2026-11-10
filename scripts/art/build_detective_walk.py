"""
Thay chu kỳ đi ngang của thám tử bằng tấm mới (T-026, người dùng gửi 31/10/2026).

Tấm gốc: art-source/characters/detective/detective-walk-side-v2.png — 8 hình trên nền xanh #00FF00,
nhìn sang TRÁI. Người dùng chọn bản 6 khung: dùng hình 1, 2, 3, 5, 6, 7 (bỏ 4 và 8 vì trùng tư thế
với 5 và 1 → gây khựng).

Việc làm:
  1. Tách nền xanh (chroma key mềm) + khử ám xanh ở viền.
  2. Co giãn cho cao bằng chu kỳ đi cũ (~569 px trong ô 264x604) → khớp DETECTIVE_ATLAS.sourceHeight
     và các tư thế đứng; căn tâm phần thân trên vào giữa ô, chân chạm đáy ô (cách 2 px) — đúng quy ước
     của build_room201_assets.py.
  3. Ghi đè 6 ô walk-side-0..5 trong atlas hiện có; các ô idle-* giữ nguyên. detective.json giữ bố cục.

Cách chạy:
  python scripts/art/build_detective_walk.py <tấm 8 hình nền xanh> <detective.webp hiện tại> <thư mục ra>
Cần: Python 3.10+, Pillow, numpy, scipy.
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

CELL_W, CELL_H = 264, 604
TARGET_HEIGHT = 569  # chiều cao người trong ô của chu kỳ đi cũ (đo trên atlas T-022)
PICK = [0, 1, 2, 4, 5, 6]  # hình 1, 2, 3, 5, 6, 7 của tấm 8 hình
ATLAS_COLS = 5


def key_green(rgb):
    """Nền xanh -> alpha mềm; khử ám xanh: G không vượt max(R, B)."""
    a = rgb.astype(float)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    greenness = np.clip((g - np.maximum(r, b) - 30) / 60, 0, 1)
    alpha = 1 - greenness
    a[..., 1] = np.minimum(g, np.maximum(r, b))
    return a.clip(0, 255).astype(np.uint8), alpha


def figures(rgb):
    clean, alpha = key_green(rgb)
    solid = alpha > 0.5
    lab, n = ndimage.label(solid)
    sizes = ndimage.sum(solid, lab, range(1, n + 1))
    ids = [i + 1 for i, s in enumerate(sizes) if s > 20000]
    out = []
    for i in ids:
        mask = lab == i
        ys, xs = np.where(mask)
        y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
        keep = ndimage.binary_dilation(mask, iterations=2)[y0:y1, x0:x1]
        a = np.where(keep, alpha[y0:y1, x0:x1], 0)
        crop = np.dstack([clean[y0:y1, x0:x1], (a * 255).astype(np.uint8)])
        top_part = mask[y0:y0 + int((y1 - y0) * 0.35), x0:x1]
        cx = float(np.median(np.where(top_part)[1]))
        out.append({'x0': x0, 'img': crop, 'cx': cx, 'h': y1 - y0})
    return sorted(out, key=lambda f: f['x0'])


def to_cell(fig, scale):
    im = Image.fromarray(fig['img'])
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    cell = Image.new('RGBA', (CELL_W, CELL_H), (0, 0, 0, 0))
    left = round(CELL_W / 2 - fig['cx'] * scale)
    if left < 0 or left + im.width > CELL_W:
        raise SystemExit(f'Hình rộng {im.width}px tràn ô {CELL_W}px (lệch {left}) — cần ô rộng hơn')
    cell.alpha_composite(im, (left, CELL_H - im.height - 2))
    return cell


def main(sheet_path, atlas_path, out_dir):
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    figs = figures(np.asarray(Image.open(sheet_path).convert('RGB')))
    if len(figs) != 8:
        raise SystemExit(f'Tìm thấy {len(figs)} hình, cần đúng 8')
    chosen = [figs[i] for i in PICK]
    scale = TARGET_HEIGHT / float(np.median([f['h'] for f in chosen]))
    atlas = Image.open(atlas_path).convert('RGBA')
    for i, fig in enumerate(chosen):
        x, y = (i % ATLAS_COLS) * CELL_W, (i // ATLAS_COLS) * CELL_H
        atlas.paste(Image.new('RGBA', (CELL_W, CELL_H), (0, 0, 0, 0)), (x, y))
        atlas.alpha_composite(to_cell(fig, scale), (x, y))
    atlas.save(out / 'detective.webp', quality=90, method=6)
    print(f'Xong: {out / "detective.webp"} (tỉ lệ {scale:.3f})')


if __name__ == '__main__':
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
