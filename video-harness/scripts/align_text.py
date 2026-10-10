"""Alternativa ao Whisper: alinha um roteiro em texto com a fala, de forma aproximada.

Uso: python3 scripts/align_text.py projects/<nome> roteiro.txt

Detecta os trechos com fala (ffmpeg silencedetect) e distribui as palavras do roteiro
por esses trechos, proporcional ao tamanho de cada palavra. A sincronia fica boa o
bastante para legendas e cenas, mas menos precisa que o Whisper (erros de ~0,3 s).
"""

import json
import pathlib
import re
import subprocess
import sys


def speech_regions(video: pathlib.Path, min_silence: float = 0.12):
    # Limiar de silêncio relativo ao volume médio da gravação (microfones variam muito).
    vol = subprocess.run(
        ["ffmpeg", "-i", str(video), "-af", "volumedetect", "-f", "null", "-"],
        capture_output=True, text=True,
    ).stderr
    noise_db = float(re.search(r"mean_volume: (-?[\d.]+)", vol).group(1)) - 9
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(video)],
        capture_output=True, text=True, check=True,
    )
    duration = float(probe.stdout.strip())
    out = subprocess.run(
        ["ffmpeg", "-i", str(video), "-af", f"silencedetect=n={noise_db}dB:d={min_silence}", "-f", "null", "-"],
        capture_output=True, text=True,
    ).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    regions, cursor = [], 0.0
    for s, e in zip(starts, ends + [duration]):
        if s - cursor > 0.15:
            regions.append((cursor, s))
        cursor = e
    if duration - cursor > 0.15:
        regions.append((cursor, duration))
    return regions


SKIP_PAUSE = 0.8  # custo (s) de uma pausa que não cai em pontuação


def proportional(words, regions):
    """Primeira estimativa: palavras espalhadas pela fala, proporcional ao tamanho."""
    total_speech = sum(e - s for s, e in regions)
    weights = [len(w) + 2 for w in words]
    per_unit = total_speech / sum(weights)
    times, ri, cursor = [], 0, regions[0][0]
    for weight in weights:
        length = weight * per_unit
        while ri < len(regions) - 1 and cursor + length / 2 > regions[ri][1]:
            ri += 1
            cursor = max(cursor, regions[ri][0])
        times.append((cursor, cursor + length))
        cursor += length
    return times


def anchor_pauses(words, guess, regions):
    """Casa cada pausa real com uma pontuação do roteiro (programação dinâmica).

    Devolve {índice da última palavra antes da pausa: (fim da fala, início da próxima)}.
    """
    bounds = [i for i, w in enumerate(words[:-1]) if w[-1] in ".,!?;:"]
    pauses = [(regions[k][1], regions[k + 1][0]) for k in range(len(regions) - 1)]
    nb, npz = len(bounds), len(pauses)
    inf = float("inf")
    cost = [[inf] * (npz + 1) for _ in range(nb + 1)]
    back = [[None] * (npz + 1) for _ in range(nb + 1)]
    for i in range(nb + 1):
        for j in range(npz + 1):
            if i == 0 and j == 0:
                cost[0][0] = 0
                continue
            opts = []
            if i > 0:
                opts.append((cost[i - 1][j], "skip_bound"))
            if j > 0:
                opts.append((cost[i][j - 1] + SKIP_PAUSE, "skip_pause"))
            if i > 0 and j > 0:
                mid = (pauses[j - 1][0] + pauses[j - 1][1]) / 2
                opts.append((cost[i - 1][j - 1] + abs(guess[bounds[i - 1]][1] - mid), "match"))
            cost[i][j], back[i][j] = min(opts)
    anchors, i, j = {}, nb, npz
    while i or j:
        move = back[i][j]
        if move == "match":
            anchors[bounds[i - 1]] = pauses[j - 1]
            i, j = i - 1, j - 1
        elif move == "skip_bound":
            i -= 1
        else:
            j -= 1
    return anchors


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    project, script = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    words = script.read_text().split()
    regions = speech_regions(project / "input.mp4")
    guess = proportional(words, regions)
    anchors = anchor_pauses(words, guess, regions)

    # Entre duas âncoras, espalha as palavras proporcionalmente ao tamanho.
    out, seg_start, t0 = [], 0, regions[0][0]
    cut_points = sorted(anchors) + [len(words) - 1]
    for last in cut_points:
        t1 = anchors[last][0] if last in anchors else regions[-1][1]
        seg = words[seg_start : last + 1]
        weights = [len(w) + 2 for w in seg]
        unit = (t1 - t0) / sum(weights)
        cursor = t0
        for w, weight in zip(seg, weights):
            out.append({"w": w, "s": round(cursor, 2), "e": round(cursor + weight * unit, 2)})
            cursor += weight * unit
        seg_start = last + 1
        t0 = anchors[last][1] if last in anchors else t1

    (project / "words.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
    print(f"{len(out)} palavras, {len(anchors)} pausas ancoradas em pontuação → {project / 'words.json'}")


if __name__ == "__main__":
    main()
