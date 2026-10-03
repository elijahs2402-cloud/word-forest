from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]

def extract(sheet_path: Path, columns: int, rows: int, outputs: list[Path]) -> None:
    sheet = Image.open(sheet_path).convert("RGBA")
    cell_w, cell_h = sheet.width // columns, sheet.height // rows
    for index, output in enumerate(outputs):
        col, row = index % columns, index // columns
        cell = sheet.crop((col * cell_w, row * cell_h, (col + 1) * cell_w, (row + 1) * cell_h))
        alpha = cell.getchannel("A")
        bbox = alpha.point(lambda value: 255 if value > 8 else 0).getbbox()
        if bbox:
            cell = cell.crop(bbox)
        canvas = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
        cell.thumbnail((456, 456), Image.Resampling.LANCZOS)
        canvas.alpha_composite(cell, ((512 - cell.width) // 2, (512 - cell.height) // 2))
        output.parent.mkdir(parents=True, exist_ok=True)
        canvas.save(output, optimize=True)

manifest = json.loads((ROOT / "public/assets/manifest.json").read_text(encoding="utf-8"))
deco_outputs = []
for number in range(1, 13):
    entry = next(item for item in manifest if item["file"] == f"deco/{number}.png")
    deco_outputs.append(ROOT / "public" / entry["url"].lstrip("/"))

extract(ROOT / "work-deco-sheet.png", 4, 3, deco_outputs)
extract(ROOT / "work-outfit-sheet.png", 5, 1, [ROOT / "public/outfit" / f"{name}.png" for name in ["crown", "hat", "glasses", "bow", "scarf"]])
