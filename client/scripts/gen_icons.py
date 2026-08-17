from PIL import Image, ImageDraw
import math, os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "icons")
os.makedirs(OUT, exist_ok=True)

BG_TOP = (124, 45, 18)     # deep terracotta
BG_BOTTOM = (67, 20, 7)    # dark brown
GOLD = (230, 190, 120)


def make_icon(size, padding_ratio=0.0, filename=None, rounded=False):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    for y in range(size):
        t = y / size
        r = int(BG_TOP[0] + (BG_BOTTOM[0] - BG_TOP[0]) * t)
        g = int(BG_TOP[1] + (BG_BOTTOM[1] - BG_TOP[1]) * t)
        b = int(BG_TOP[2] + (BG_BOTTOM[2] - BG_TOP[2]) * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    if rounded:
        mask = Image.new("L", (size, size), 0)
        mdraw = ImageDraw.Draw(mask)
        radius = int(size * 0.22)
        mdraw.rounded_rectangle([0, 0, size, size], radius=radius, fill=255)
        img.putalpha(mask)

    cx, cy = size / 2, size / 2
    bar_w = size * 0.11
    v_h = size * 0.52
    h_w = size * 0.34
    h_y = cy - size * 0.06

    draw.rounded_rectangle(
        [cx - bar_w / 2, cy - v_h / 2, cx + bar_w / 2, cy - v_h / 2 + v_h],
        radius=bar_w * 0.3,
        fill=GOLD,
    )
    draw.rounded_rectangle(
        [cx - h_w / 2, h_y - bar_w / 2, cx + h_w / 2, h_y + bar_w / 2],
        radius=bar_w * 0.3,
        fill=GOLD,
    )

    if filename:
        img.save(os.path.join(OUT, filename))
    return img


make_icon(192, filename="icon-192.png")
make_icon(512, filename="icon-512.png")
make_icon(180, filename="apple-touch-icon.png", rounded=True)

favicon = make_icon(64, filename=None)
favicon.save(os.path.join(OUT, "..", "favicon.png"))

print("icons written to", OUT)
