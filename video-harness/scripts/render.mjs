// Renderiza projects/<nome> → projects/<nome>/output.mp4
// Uso: node scripts/render.mjs projects/<nome> [--preview]
//   --preview  metade da resolução, para conferir rápido
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const project = path.resolve(process.argv[2] ?? '');
const preview = process.argv.includes('--preview');
const slug = path.basename(project);
const input = path.join(project, 'input.mp4');
if (!fs.existsSync(input)) throw new Error(`Não achei ${input}`);

const read = (f) => JSON.parse(fs.readFileSync(path.join(project, f), 'utf8'));
const plan = read('plan.json');
const words = read('words.json');

// O Remotion só enxerga arquivos dentro de public/, então copiamos o vídeo para lá.
const publicRel = `projects/${slug}/input.mp4`;
fs.mkdirSync(path.join(root, 'public/projects', slug), {recursive: true});
fs.copyFileSync(input, path.join(root, 'public', publicRel));

const duration = Number(
	execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', input]).toString().trim(),
);
const inputProps = {video: publicRel, duration, words, plan};

// Usa o Chromium já instalado quando existir (ambiente da nuvem); senão o Remotion baixa o dele.
const localChrome = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = process.env.REMOTION_CHROME ?? (fs.existsSync(localChrome) ? localChrome : null);

console.log('Empacotando…');
const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'Main', inputProps, browserExecutable});

const out = path.join(project, preview ? 'preview.mp4' : 'output.mp4');
let last = -1;
await renderMedia({
	composition,
	serveUrl,
	codec: 'h264',
	outputLocation: out,
	inputProps,
	browserExecutable,
	scale: preview ? 0.5 : 1,
	crf: preview ? 28 : 18,
	onProgress: ({progress}) => {
		const pct = Math.floor(progress * 100);
		if (pct % 10 === 0 && pct !== last) {
			last = pct;
			console.log(`Renderizando ${pct}%`);
		}
	},
});
console.log(`Pronto → ${out}`);
