#!/usr/bin/env bash
# Extrai quadros do vídeo numa folha de contato, para o Claude analisar o que aparece na gravação.
# Uso: bash scripts/frames.sh projects/<nome> [segundos_entre_quadros]
set -euo pipefail
project="$1"
every="${2:-4}"
mkdir -p "$project/frames"
ffmpeg -v error -y -i "$project/input.mp4" \
	-vf "fps=1/${every},scale=270:-1,drawtext=text='%{pts\:hms}':x=6:y=6:fontsize=16:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=4x3" \
	"$project/frames/sheet_%02d.jpg"
ls "$project/frames"
