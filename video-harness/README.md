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
| `number` | número que conta até o valor (de `at` até `at + countFor` segundos) | `value`, `prefix?`, `suffix?`, `label`, `at?`, `countFor?`, `decimals?` |
| `terminal` | pedido digitado + respostas (estilo Claude Code) | `window?`, `prompt`, `promptAt?`, `tool?`, `lines: [{text, at, value?, tag?}]` |
| `steps` | fluxo em etapas + resultado | `title?`, `steps: [{label, at}]`, `result?: {label, at}` |
| `compare` | antes x depois | `left: {title, items, at}`, `right: {title, items, at}` |

## Tela dividida x tela cheia, destaques, zoom e som

- **Tela dividida só durante as cenas.** Entre uma cena e outra, a pessoa ocupa a tela inteira. Cenas separadas por menos de 0,6 s ficam num bloco só de tela dividida. Para alternar bastante, deixe trechos sem cena.
- **`callouts`:** destaque amarelo por cima da pessoa nos trechos em tela cheia: `[{start, end, text, kicker?}]`.
- **`emphasis`:** zoom rápido na pessoa numa palavra forte: `[{at, scale?}]` (padrão 1.12).
- **`music`:** `{src: "music/bed.wav", volume: 0.13}`, em loop, com fade no começo e no fim. `false` desliga.
- **`sfx`:** efeitos automáticos tirados do plano (whoosh quando uma cena ou destaque entra, pop em cada item, impacto em títulos, números e zooms, ding no último destaque). `false` desliga.

Os sons de `public/sfx/` e `public/music/` são gerados por síntese (`python3 scripts/make-sounds.py`), originais e sem direitos de terceiros. Para usar os seus, substitua os arquivos com o mesmo nome ou aponte `music.src` para outro arquivo em `public/`.

O render final também gera `<nome>-envio.mp4`, uma cópia comprimida para mandar por chat ou WhatsApp.

Veja um plano completo em `projects/exemplo/plan.json`. Cores e fontes ficam em `src/theme.ts`.
