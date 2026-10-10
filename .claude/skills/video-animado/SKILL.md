---
name: video-animado
description: Edita um vídeo vertical falado (Reels, TikTok, Shorts) no estilo "animação sincronizada com a fala" - transcrição com o tempo de cada palavra, análise dos quadros, plano de cenas aprovado pelo usuário, animações em código (Remotion/React) na metade de cima e legenda palavra por palavra. Usar quando o usuário mandar um vídeo para editar, pedir "edita esse vídeo", "faz as animações", "coloca legenda", "faz igual àquele reels", ou falar de vídeo com animação, motion, Remotion ou legenda karaokê.
---

# Vídeo animado sincronizado com a fala

O projeto fica em `video-harness/`. Leia `video-harness/README.md` para os detalhes de cada tipo de cena.

O fluxo tem 6 etapas. **A etapa 4 é um gate: nunca renderize o vídeo final sem a aprovação explícita do usuário.** Corrigir o plano custa segundos; renderizar uma ideia ruim custa minutos.

## 1. Receber o vídeo

- Crie `video-harness/projects/<nome-curto>/` e copie o vídeo para `input.mp4` lá dentro (converta com ffmpeg se não for mp4).
- Se for a primeira vez nesta máquina: `cd video-harness && npm install`.
- Pergunte só o que faltar: o @ do perfil e um título curto para o topo. Não pergunte o tema, ele sai da transcrição.

## 2. Transcrever com o tempo de cada palavra

```bash
cd video-harness
python3 scripts/transcribe.py projects/<nome>        # gera words.json e transcript.txt
```

Precisa de `pip install faster-whisper` e acesso a `huggingface.co` na primeira execução (download do modelo). Se o download falhar com 403/proxy, **não invente tempos**. Diga ao usuário que a rede bloqueia `huggingface.co` e ofereça duas saídas:
- liberar o domínio nas configurações de rede do ambiente; ou
- ele colar o roteiro em texto, e você roda `python3 scripts/align_text.py projects/<nome> roteiro.txt`. Avise que a sincronia fica aproximada (pode errar ~1 s).

Leia `transcript.txt` e marque mentalmente o que cada trecho significa: tema, ferramenta, etapa, número, exemplo, chamada para ação.

## 3. Analisar os quadros

```bash
bash scripts/frames.sh projects/<nome>      # folhas de contato em projects/<nome>/frames/
```

Abra as folhas com a ferramenta Read e anote: enquadramento, onde está o rosto, gestos, objetos e fundo. Isso decide o corte (`trimStart`/`trimEnd`) e se há algo na gravação que a animação deve complementar.

## 4. Plano de cenas → GATE de aprovação

Escreva `projects/<nome>/plan.json` (formato abaixo). Regras:
- Cada `start` cai numa palavra real de `words.json`, e cada `at` (aparecimento de item) é o `s` da palavra que dispara aquele item.
- A cena mostra o que está sendo dito: se fala de fila de pedidos, usa `queue`; de etapas, `steps`; de número, `number`; de comando/ferramenta, `terminal`; de antes x depois, `compare`.
- **Alterne tela dividida e tela cheia.** A tela só divide enquanto há uma cena ativa. Use cenas (3–10 s) para listas, números e comparações, e deixe a pessoa em tela cheia nas falas de emoção, abertura e chamada para ação, com `callouts` (frase curta em destaque) e `emphasis` (zoom na palavra forte).
- Não deixe o palco vazio: a cena começa no máximo ~1,5 s antes do primeiro item aparecer.
- Música e efeitos: `"music": {"src": "music/bed.wav", "volume": 0.13}` e `"sfx": true`. Se `public/sfx/` estiver vazio, rode `python3 scripts/make-sounds.py`.
- Corte silêncio, ajustes e sobras no começo e no fim com `trimStart`/`trimEnd`.
- Confirme com o usuário números e nomes que a transcrição pode ter errado antes de pôr na tela.

Depois rode `node scripts/show-plan.mjs projects/<nome>` e mostre ao usuário uma tabela: horário, tipo de cena, o que aparece e a fala daquele trecho. Pergunte:

> Aprovar o plano antes de renderizar? 1. Sim, renderizar · 2. Não, quero ajustar

**Pare aqui e espere a resposta.** Aplique os ajustes e mostre de novo, até ele aprovar.

## 5. Renderizar

```bash
node scripts/render.mjs projects/<nome> --preview   # opcional: metade da resolução, ~1 min
node scripts/render.mjs projects/<nome>             # final 1080x1920 → output.mp4
```

Antes de entregar, extraia alguns quadros do resultado (`ffmpeg -i output.mp4 -vf fps=1/3,scale=270:-1,tile=6x2 check.jpg`) e confira: legenda legível e sem sobrepor nada, cenas no lugar, texto sem cortar. Corrija e renderize de novo se algo falhar.

## 6. Entregar

Mande `projects/<nome>/<nome>-envio.mp4` com SendUserFile (o `output.mp4` em qualidade máxima costuma passar do limite de 30 MB). Os vídeos não vão para o git (ver `.gitignore`).

## Formato do plan.json

```json
{
  "title": "como eu faço meus vídeos",
  "handle": "@perfil",
  "trimStart": 0.4,
  "trimEnd": 58.2,
  "music": {"src": "music/bed.wav", "volume": 0.13},
  "sfx": true,
  "callouts": [{"start": 0.6, "end": 3.0, "kicker": "direto de Bariloche", "text": "Hands on em Vitória"}],
  "emphasis": [{"at": 2.4, "scale": 1.12}],
  "scenes": [
    {"start": 0.4, "end": 3.1, "type": "title", "label": "abertura",
     "props": {"kicker": "etapa 1", "text": "Grave o vídeo", "at": 0.6}},
    {"start": 3.1, "end": 7.0, "type": "queue", "label": "exemplo",
     "props": {"title": "fila de pedidos", "items": [{"text": "#101", "at": 3.4}, {"text": "#102", "at": 4.0}]}}
  ]
}
```

Tipos de cena: `title`, `bullets`, `queue`, `number`, `terminal`, `steps`, `compare`. As props de cada um estão no README e no comentário do topo de cada arquivo em `video-harness/src/scenes/`. Para um tipo novo, crie o componente lá e registre em `src/scenes/index.ts`.
