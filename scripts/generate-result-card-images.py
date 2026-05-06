from __future__ import annotations

import re
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src" / "diagnosisData.ts"
SOURCE_DIR = ROOT / "assets" / "showa-result-cards-jpg"
OUTPUT_DIR = ROOT / "assets" / "showa-result-cards-complete"

FONT_SANS = "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc"
FONT_DISPLAY = "/System/Library/Fonts/ヒラギノ明朝 ProN.ttc"
FONT_SERIF = FONT_DISPLAY
FONT_DISPLAY_BOLD_INDEX = 2


def font(size: int, serif: bool = False, display: bool = False) -> ImageFont.FreeTypeFont:
    if display:
        return ImageFont.truetype(FONT_DISPLAY, size=size, index=FONT_DISPLAY_BOLD_INDEX)
    return ImageFont.truetype(FONT_SERIF if serif else FONT_SANS, size=size)


def parse_types() -> list[dict[str, object]]:
    source = DATA_PATH.read_text(encoding="utf-8")
    entries: list[dict[str, object]] = []

    for code, block in re.findall(r"^  ([A-Z]{4}): \{(.*?)^  \},", source, flags=re.S | re.M):
        role = re.search(r'role: "([^"]+)"', block)
        mark = re.search(r'mark: "([^"]+)"', block)
        line = re.search(r'line: "([^"]+)"', block)
        ng_score = re.search(r"ngScore: (\d+)", block)
        tags = re.search(r"tags: \[(.*?)\]", block, flags=re.S)

        if not (role and mark and line and ng_score and tags):
            raise ValueError(f"Could not parse metadata for {code}")

        tag_values = re.findall(r'"([^"]+)"', tags.group(1))[:2]
        entries.append(
            {
                "code": code,
                "role": role.group(1),
                "mark": mark.group(1),
                "line": line.group(1),
                "ngScore": int(ng_score.group(1)),
                "tags": tag_values,
            }
        )

    if len(entries) != 16:
        raise ValueError(f"Expected 16 result types, found {len(entries)}")

    return entries


def wrap_text(draw: ImageDraw.ImageDraw, text: str, target_font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""

    for char in text:
        candidate = f"{current}{char}"
        bbox = draw.textbbox((0, 0), candidate, font=target_font)
        if bbox[2] - bbox[0] > max_width and current:
            lines.append(current)
            current = char
        else:
            current = candidate

    if current:
        lines.append(current)

    return lines


def draw_text_lines(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    lines: list[str],
    target_font: ImageFont.FreeTypeFont,
    fill: str,
    line_height: int,
    max_lines: int | None = None,
    stroke_width: int = 0,
    stroke_fill: str | tuple[int, int, int, int] | None = None,
) -> int:
    x, y = xy
    visible_lines = lines[:max_lines] if max_lines else lines
    for line in visible_lines:
        draw.text(
            (x, y),
            line,
            font=target_font,
            fill=fill,
            stroke_width=stroke_width,
            stroke_fill=stroke_fill,
        )
        y += line_height
    return y


def rectangle(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    fill: str | tuple[int, int, int, int],
    outline: str | tuple[int, int, int, int] | None = None,
    width: int = 1,
    radius: int = 2,
) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def draw_centered_text(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    target_font: ImageFont.FreeTypeFont,
    fill: str,
) -> None:
    bbox = draw.textbbox((0, 0), text, font=target_font)
    x = box[0] + ((box[2] - box[0]) - (bbox[2] - bbox[0])) / 2
    y = box[1] + ((box[3] - box[1]) - (bbox[3] - bbox[1])) / 2 - bbox[1]
    draw.text((x, y), text, font=target_font, fill=fill)


def draw_hanko(draw: ImageDraw.ImageDraw, center: tuple[int, int], mark: str) -> None:
    cx, cy = center
    outer = (cx - 58, cy - 58, cx + 58, cy + 58)
    inner = (cx - 46, cy - 46, cx + 46, cy + 46)
    draw.ellipse(outer, outline=(179, 32, 29, 188), width=6)
    draw.ellipse(inner, outline=(179, 32, 29, 116), width=3)
    mark_font = font(34)
    draw_centered_text(draw, (cx - 40, cy - 34, cx + 40, cy + 10), mark, mark_font, "#b3201d")
    draw_centered_text(draw, (cx - 48, cy + 12, cx + 48, cy + 40), "社外秘", font(18), "#b3201d")


def fit_font_size(draw: ImageDraw.ImageDraw, text: str, max_width: int, start: int, minimum: int) -> int:
    size = start
    while size > minimum:
        target_font = font(size, display=True)
        bbox = draw.textbbox((0, 0), text, font=target_font)
        if bbox[2] - bbox[0] <= max_width:
            return size
        size -= 2
    return minimum


def create_card(meta: dict[str, object], output_dir: Path = OUTPUT_DIR) -> None:
    code = str(meta["code"])
    image = Image.open(SOURCE_DIR / f"{code}.jpg").convert("RGBA")
    draw = ImageDraw.Draw(image)

    width, height = image.size

    # Do not alter the right-side illustration; all new design work lives in the left field.
    left = Image.new("RGBA", image.size, (0, 0, 0, 0))
    left_draw = ImageDraw.Draw(left)
    left_draw.rectangle((0, 0, 620, height), fill=(246, 225, 179, 72))
    for x in range(0, 620):
        alpha = int(120 * max(0, 1 - x / 620))
        left_draw.line((x, 0, x, height), fill=(246, 225, 179, alpha))
    image.alpha_composite(left)
    draw = ImageDraw.Draw(image)

    # Editorial poster-style layout: fewer boxes, stronger hierarchy, more whitespace.
    draw.text((72, 68), "昭和社員転生診断", font=font(30), fill="#b3201d")
    draw.line((72, 112, 360, 112), fill="#b3201d", width=4)
    draw.text((72, 124), "転生結果", font=font(18), fill="#5a3928")

    mark = str(meta["mark"])
    draw_hanko(draw, (514, 104), mark)

    role = str(meta["role"])
    role_max_width = 472
    role_size = fit_font_size(draw, role, role_max_width, 70, 36)
    role_font = font(role_size, display=True)
    role_lines = [role]
    role_y = 194
    role_bottom = draw_text_lines(
        draw,
        (72, role_y),
        role_lines,
        role_font,
        "#1d130d",
        role_size + 8,
        stroke_width=4,
        stroke_fill=(255, 246, 211, 232),
    )
    draw.line((72, role_bottom + 18, 540, role_bottom + 18), fill="#b3201d", width=7)
    draw.line((72, role_bottom + 31, 540, role_bottom + 31), fill=(179, 32, 29, 94), width=4)

    line = f"{meta['line']}"
    line_font = font(25)
    line_top = max(role_bottom + 58, 388)
    draw.text((72, line_top), "一言", font=font(19), fill="#b3201d")
    draw_text_lines(draw, (138, line_top - 4), wrap_text(draw, f"「{line}」", line_font, 372), line_font, "#2c1c13", 34, max_lines=2)

    meter_top = 506
    draw.line((72, meter_top - 18, 508, meter_top - 18), fill=(91, 63, 40, 125), width=2)
    draw.text((72, meter_top + 8), "令和NG濃度", font=font(23), fill="#5a3928")
    score_text = f"{meta['ngScore']}%"
    score_font = font(58)
    score_bbox = draw.textbbox((0, 0), score_text, font=score_font)
    draw.text(
        (508 - (score_bbox[2] - score_bbox[0]), meter_top - 6),
        score_text,
        font=score_font,
        fill="#b3201d",
        stroke_width=2,
        stroke_fill=(255, 246, 211, 218),
    )

    tag_x = 72
    tag_y = 606
    for tag in meta["tags"]:
        tag_text = str(tag)
        tag_font = font(21)
        bbox = draw.textbbox((0, 0), tag_text, font=tag_font)
        tag_w = bbox[2] - bbox[0] + 30
        rectangle(draw, (tag_x, tag_y, tag_x + tag_w, tag_y + 40), fill=(255, 246, 211, 220), outline="#b3201d", width=3, radius=0)
        draw.text((tag_x + 15, tag_y + 7), tag_text, font=tag_font, fill="#b3201d")
        tag_x += tag_w + 12

    image = image.convert("RGB")
    image.save(output_dir / f"{code}.jpg", quality=90, optimize=True, progressive=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--codes", nargs="*", help="Specific result codes to generate, e.g. ATDF CTEN")
    parser.add_argument("--output-dir", type=Path, default=OUTPUT_DIR)
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    target_codes = set(args.codes) if args.codes else None
    metas = [meta for meta in parse_types() if target_codes is None or meta["code"] in target_codes]

    for meta in metas:
        create_card(meta, args.output_dir)
    print(f"generated {len(metas)} cards in {args.output_dir}")


if __name__ == "__main__":
    main()
