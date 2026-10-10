"""Transcreve o vídeo com o tempo de cada palavra (Whisper).

Uso: python3 scripts/transcribe.py projects/<nome> [--model large-v3]

Gera em projects/<nome>/:
  words.json      [{"w": "palavra", "s": 1.82, "e": 2.10}, ...]
  transcript.txt  frases com horário, para ler e montar o plano

Precisa de `pip install faster-whisper` e acesso a huggingface.co (download do modelo
na primeira vez). Sem isso, use scripts/align_text.py com o roteiro em texto.
"""

import argparse
import json
import pathlib
import sys


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("project", type=pathlib.Path)
    parser.add_argument("--model", default="large-v3", help="tiny, base, small, medium, large-v3")
    parser.add_argument("--language", default="pt")
    args = parser.parse_args()

    video = args.project / "input.mp4"
    if not video.exists():
        sys.exit(f"Não achei {video}")

    import subprocess

    import numpy as np
    from faster_whisper import WhisperModel

    # O ffmpeg decodifica o áudio (16 kHz mono); evita depender da versão do PyAV instalada.
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(video), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
        capture_output=True, check=True,
    ).stdout
    audio = np.frombuffer(raw, np.float32)

    model = WhisperModel(args.model, device="auto", compute_type="int8")
    segments, _ = model.transcribe(
        audio, language=args.language, word_timestamps=True, vad_filter=True
    )

    words, lines = [], []
    for seg in segments:
        lines.append(f"[{seg.start:6.2f} – {seg.end:6.2f}] {seg.text.strip()}")
        for w in seg.words or []:
            text = w.word.strip()
            if text:
                words.append({"w": text, "s": round(w.start, 2), "e": round(w.end, 2)})

    (args.project / "words.json").write_text(json.dumps(words, ensure_ascii=False, indent=1))
    (args.project / "transcript.txt").write_text("\n".join(lines) + "\n")
    print(f"{len(words)} palavras → {args.project / 'words.json'}")


if __name__ == "__main__":
    main()
