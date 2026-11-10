"""
Chạy bộ kiểm tra của gói Chương 1 (validate_data.py) trên dữ liệu GAME đang dùng — T-034, kế hoạch N0.

Vì sao cần file này:
  - validate_data.py của gói tự ghi đè validation/validation.results.json của gói (tài liệu nguồn — KHÔNG sửa).
  - Game đọc bản trong frontend/public/assets/chapters/chapter1/; nhóm sửa lời thoại ở bản đó.
  Script này dựng một bản sao tạm theo đúng bố cục gói (data/ + validation/), thay 5 file runtime bằng bản của game,
  chạy validator trong thư mục tạm rồi xóa. Không ghi gì vào repo.

Cách chạy (từ thư mục gốc repo, PowerShell):
  python scripts/chapter1/validate.py            # kiểm dữ liệu game
  python scripts/chapter1/validate.py --source   # kiểm bản gốc trong docs/sources/chapter1 (đối chiếu)
Kết quả: in tóm tắt; mã thoát 0 = PASS, 1 = lỗi (in lỗi của validator).
Validator cần data/*.json (gồm chapter.schema.json, source-map.json của gói) và scripts/*.md của gói — script này chép đủ.
Validator KHÔNG so lời thoại trong game với kịch bản gốc; dòng "khác bản gốc" (so SHA-256 với MANIFEST) chỉ để thông tin.
"""
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PACKAGE = ROOT / 'docs' / 'sources' / 'chapter1'
GAME_DATA = ROOT / 'frontend' / 'public' / 'assets' / 'chapters' / 'chapter1'
RUNTIME_FILES = ['chapter1.json', 'evidence.json', 'people.json', 'statements.json', 'game-state.definitions.json']


def main(use_source: bool) -> int:
    with tempfile.TemporaryDirectory(prefix='ch1-validate-') as tmp:
        work = Path(tmp)
        (work / 'validation').mkdir()
        # validator đọc data/*.json và scripts/*.md (kịch bản gốc, để đối chiếu lời thoại nguyên văn)
        shutil.copytree(PACKAGE / 'data', work / 'data')
        shutil.copytree(PACKAGE / 'scripts', work / 'scripts')
        if not use_source:
            for name in RUNTIME_FILES:
                shutil.copy2(GAME_DATA / name, work / 'data' / name)
        script = work / 'validation' / 'validate_data.py'
        shutil.copy2(PACKAGE / 'validation' / 'validate_data.py', script)
        if not use_source:
            adapt_opening_walkthrough(script)
        # -X utf8: validator đọc file bằng read_text() không ghi encoding -> trên Windows phải ép UTF-8
        run = subprocess.run([sys.executable, '-I', '-X', 'utf8', str(script)],
                             capture_output=True, text=True, encoding='utf-8')
        results = work / 'validation' / 'validation.results.json'
        if run.returncode != 0 or not results.exists():
            print('FAIL — validator báo lỗi:')
            print(run.stdout[-4000:])
            print(run.stderr[-4000:])
            return 1
        data = json.loads(results.read_text(encoding='utf-8'))
        label = 'docs/sources/chapter1 (bản gốc)' if use_source else 'frontend/public/assets/chapters/chapter1 (bản game)'
        print(f"{data['status'].upper()} — {label}")
        print(f"  assertions: {data['assertions']} · nodes: {data['nodes']} · statements: {data['statements']}")
        print(f"  broken targets: {data['brokenTargets']} · unreachable: {data['unreachableNodes']}")
        if not use_source:
            report_changes()
        return 0 if data['status'] == 'passed' else 1


def adapt_opening_walkthrough(script: Path) -> None:
    """Đi qua ba thao tác mở đầu của bản game. Giữ nguyên validator trong gói nguồn."""
    text = script.read_text(encoding='utf-8')
    source_step = " r=Runner();check(r.run('P1_001')=='P1_HOA_MENU','P1 starts in 201 then Hòa')"
    game_steps = "\n".join([
        " r=Runner();check(r.run('P1_001')=='P1_HALL_204','P1 Hòa directs player to room 204')",
        " check(r.choose('P1_ENTER_204')=='P1_ROOM_204_VIEW','P1 enter room before interviewing')",
        " check(r.choose('P1_SEE_TUNG')=='P1_ROOM_204_EXIT','P1 acknowledge Tùng before leaving')",
        " check(r.s['flags']['victim_seen_from_door'] and not r.s['evidence_collected'],'P1 observation without evidence')",
        " check(r.choose('P1_LEAVE_204')=='P1_HOA_MENU','P1 return to hallway then interview Hòa')",
    ])
    if text.count(source_step) != 1:
        raise RuntimeError('Không tìm thấy bước mở đầu chuẩn trong validator của gói.')
    script.write_text(text.replace(source_step, game_steps, 1), encoding='utf-8')


def report_changes() -> None:
    """Chỉ để thông tin (không làm FAIL): file nào của game đã khác bản gốc trong gói (so SHA-256 với MANIFEST)."""
    manifest = json.loads((PACKAGE / 'MANIFEST.json').read_text(encoding='utf-8'))
    expected = {entry['path']: entry['sha256'] for entry in manifest['files']}
    changed = [name for name in RUNTIME_FILES
               if hashlib.sha256((GAME_DATA / name).read_bytes()).hexdigest() != expected.get(f'data/{name}')]
    if changed:
        print(f"  khác bản gốc (MANIFEST): {', '.join(changed)} — bình thường nếu nhóm đã sửa lời thoại/dữ liệu")
    else:
        print('  giống hệt bản gốc (SHA-256 khớp MANIFEST)')


if __name__ == '__main__':
    # In tiếng Việt an toàn cả khi PowerShell chuyển hướng output ra file (mặc định không phải UTF-8)
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.exit(main('--source' in sys.argv[1:]))
