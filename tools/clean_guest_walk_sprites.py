"""Build isolated six-frame guest walk sheets from the supplied source sheets."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "public" / "assets" / "guest-walk-animations"
TONES = ("gray", "orange", "black", "tabby", "pink")
FRAME_COUNT = 6
DISPLAY_WIDTH = 137
DISPLAY_HEIGHT = 220


def components(alpha: Image.Image) -> list[tuple[int, tuple[int, int, int, int], list[tuple[int, int]]]]:
    width, height = alpha.size
    pixels = alpha.load()
    visited = bytearray(width * height)
    found = []
    for y in range(height):
        for x in range(width):
            index = y * width + x
            if visited[index] or pixels[x, y] <= 8:
                continue
            queue = deque(((x, y),))
            visited[index] = 1
            points = []
            min_x = max_x = x
            min_y = max_y = y
            while queue:
                px, py = queue.popleft()
                points.append((px, py))
                min_x = min(min_x, px)
                max_x = max(max_x, px)
                min_y = min(min_y, py)
                max_y = max(max_y, py)
                for nx, ny in (
                    (px - 1, py - 1), (px, py - 1), (px + 1, py - 1),
                    (px - 1, py),                       (px + 1, py),
                    (px - 1, py + 1), (px, py + 1), (px + 1, py + 1),
                ):
                    if not (0 <= nx < width and 0 <= ny < height):
                        continue
                    neighbor = ny * width + nx
                    if not visited[neighbor] and pixels[nx, ny] > 8:
                        visited[neighbor] = 1
                        queue.append((nx, ny))
            found.append((len(points), (min_x, min_y, max_x, max_y), points))
    return sorted(found, key=lambda item: item[0], reverse=True)


def isolate_frame(frame: Image.Image) -> Image.Image:
    frame = frame.convert("RGBA")
    groups = components(frame.getchannel("A"))
    if not groups:
        return frame

    # The intended cat is the largest connected opaque subject in each cell.
    # Edge fragments from the previous/next atlas cell are smaller disconnected groups.
    keep = groups[0][2]
    clean = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    source = frame.load()
    target = clean.load()
    for x, y in keep:
        target[x, y] = source[x, y]
    return clean


def main() -> None:
    for tone in TONES:
        source_path = ASSET_DIR / f"guest-{tone}-walk-left-clean-v2.png"
        source = Image.open(source_path).convert("RGBA")
        frame_width = source.width // FRAME_COUNT
        frames = []
        for index in range(FRAME_COUNT):
            box = (index * frame_width, 0, (index + 1) * frame_width, source.height)
            frames.append(isolate_frame(source.crop(box)))

        # Add a transparent horizontal safety gutter so the source's natural
        # proportions match the in-game 137x220 frame without stretching.
        output_frame_width = round(source.height * DISPLAY_WIDTH / DISPLAY_HEIGHT)
        output = Image.new("RGBA", (output_frame_width * FRAME_COUNT, source.height), (0, 0, 0, 0))
        for index, frame in enumerate(frames):
            frame_x = index * output_frame_width + (output_frame_width - frame_width) // 2
            output.alpha_composite(frame, (frame_x, 0))
        output_path = ASSET_DIR / f"guest-{tone}-walk-left-isolated-v4.png"
        output.save(output_path, optimize=True)
        print(f"{output_path.name}: {output.width}x{output.height}")


if __name__ == "__main__":
    main()
