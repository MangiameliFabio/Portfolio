import subprocess
import sys
from pathlib import Path


def format_size(num_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB", "TB"]
    size = float(num_bytes)

    for unit in units:
        if size < 1024 or unit == units[-1]:
            if unit == "B":
                return f"{int(size)}{unit}"
            return f"{size:.1f}{unit}"
        size /= 1024

    return f"{num_bytes}B"


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python compress.py <video-file>")
        return 1

    input_file = Path(sys.argv[1])

    if not input_file.is_file():
        print(f"Error: file not found: {input_file}")
        return 1

    output_file = Path.cwd() / f"{input_file.stem}-compressed.mp4"

    command = [
        "ffmpeg",
        "-i",
        str(input_file),
        "-vf",
        "scale=1280:-2",
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-profile:v",
        "high",
        "-movflags",
        "+faststart",
        "-crf",
        "28",
        "-preset",
        "slow",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        str(output_file),
    ]

    try:
        subprocess.run(command, check=True)
    except FileNotFoundError:
        print("Error: ffmpeg is not installed or not available in PATH")
        return 1
    except subprocess.CalledProcessError:
        return 1

    original_size = format_size(input_file.stat().st_size)
    compressed_size = format_size(output_file.stat().st_size)

    print(f"Successful: compressed {input_file}")
    print(f"Size: {original_size} -> {compressed_size}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
