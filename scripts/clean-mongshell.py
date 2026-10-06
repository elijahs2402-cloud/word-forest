"""Non-generative cleanup: keep original geometry and front RGB pixels."""
from pathlib import Path
from PIL import Image, ImageStat

root = Path(__file__).resolve().parents[1]
art = root / 'public' / 'art'
front = Image.open(art / 'base-6ac08304a9e2.png').convert('RGBA')
side = Image.open(art / 'side-790d501f809b.png').convert('RGBA')
front_mean = ImageStat.Stat(front.crop((400, 560, 600, 760)).convert('RGB')).mean
side_mean = ImageStat.Stat(side.crop((350, 560, 550, 760)).convert('RGB')).mean
gains = [max(.9, min(1.15, a / b)) for a, b in zip(front_mean, side_mean)]
for name, source, color_gains in [('mongshell-front.png', front, [1, 1, 1]), ('mongshell-side.png', side, gains)]:
    result = Image.new('RGBA', source.size)
    pixels = []
    for r, g, b, a in source.getdata():
        # Remove near-transparent matte residue and invisible background RGB.
        alpha = 0 if a <= 16 else (255 if a >= 240 else round((a - 16) * 255 / 224))
        pixels.append((0, 0, 0, 0) if alpha == 0 else (*[min(255, round(c * gain)) for c, gain in zip((r, g, b), color_gains)], alpha))
    result.putdata(pixels)
    result.save(art / name)
    preview = Image.new('RGBA', source.size, '#f4f9fb')
    preview.alpha_composite(result)
    preview.convert('RGB').save(root / 'output' / name)
    if name == 'mongshell-front.png':
        assert source.crop((320, 160, 710, 470)).convert('RGB').tobytes() == result.crop((320, 160, 710, 470)).convert('RGB').tobytes(), 'Face RGB changed'
    print(name, 'saved; face geometry unchanged')
