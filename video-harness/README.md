# video-harness

Edita vídeos verticais falados no estilo "animação sincronizada com a fala": metade de cima com animações feitas em código (Remotion), metade de baixo com você, e legenda palavra por palavra.

No Claude Code, é só mandar o vídeo e pedir para editar. A skill `video-animado` (`.claude/skills/video-animado/`) conduz o processo e **pede a sua aprovação do plano antes de renderizar**.

## Como funciona

1. **Transcrição com o tempo de cada palavra:** `scripts/transcribe.py` (Whisper) → `words.json`
2. **Análise dos quadros:** `scripts/frames.sh` → folhas de contato para o Claude ler
3. **Plano de cenas:** o Claude escreve `plan.json`, cada animação presa ao segundo da palavra
4. **Aprovação:** `scripts/show-plan.mjs` mostra plano + fala lado a lado; você aprova ou ajusta
5. **Renderização:** `scripts/render.mjs` → `output.mp4` (1080x1920, 30 fps)

Cada vídeo fica em `projects/<nome>/`, com `input.mp4`, `words.json`, `plan.json` e `output.mp4`. Vídeos não vão para o git.

## Instalação

```bash
cd video-harness
npm install
pip install faster-whisper   # transcrição; baixa o modelo de huggingface.co na 1ª vez
```

Precisa de Node 18+, Python 3.9+ e ffmpeg. Fora da nuvem, o Remotion baixa o próprio Chromium na primeira renderização. Para usar outro, defina `REMOTION_CHROME=/caminho/do/chrome`.

## Comandos

```bash
python3 scripts/transcribe.py projects/meu-video [--model small]
python3 scripts/align_text.py projects/meu-video roteiro.txt    # sem Whisper: sincronia aproximada (~1 s)
bash scripts/frames.sh projects/meu-video
node scripts/show-plan.mjs projects/meu-video
node scripts/render.mjs projects/meu-video --preview            # metade da resolução, rápido
node scripts/render.mjs projects/meu-video
npm run studio                                                  # editor visual do Remotion no navegador
```

## Tipos de cena

Todo `at` é o segundo (no vídeo bruto) em que o elemento aparece. Use o `s` da palavra em `words.json`.

| Tipo | Para quê | Props |
|---|---|---|
| `title` | frase de impacto | `text`, `kicker?`, `at?` |
| `bullets` | lista aparecendo item a item | `title?`, `window?`, `items: [{text, at, tag?}]` |
| `queue` | coisas chegando numa fila | `title?`, `window?`, `items: [{text, at}]`, `processor?` |
| `number` | número contando até o valor | `value`, `prefix?`, `suffix?`, `label`, `at?`, `decimals?` |
| `terminal` | pedido digitado + respostas (estilo Claude Code) | `window?`, `prompt`, `promptAt?`, `tool?`, `lines: [{text, at, value?, tag?}]` |
| `steps` | fluxo em etapas + resultado | `title?`, `steps: [{label, at}]`, `result?: {label, at}` |
| `compare` | antes x depois | `left: {title, items, at}`, `right: {title, items, at}` |

Veja um plano completo em `projects/exemplo/plan.json`. Cores e fontes ficam em `src/theme.ts`.
