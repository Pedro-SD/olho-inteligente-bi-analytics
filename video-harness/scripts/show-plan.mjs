// Mostra o plano de cenas lado a lado com o que você fala em cada trecho, para aprovar.
// Uso: node scripts/show-plan.mjs projects/<nome>
import fs from 'node:fs';
import path from 'node:path';

const project = process.argv[2];
if (!project) throw new Error('Uso: node scripts/show-plan.mjs projects/<nome>');
const plan = JSON.parse(fs.readFileSync(path.join(project, 'plan.json'), 'utf8'));
const words = JSON.parse(fs.readFileSync(path.join(project, 'words.json'), 'utf8'));

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
const said = (a, b) =>
	words
		.filter((w) => w.s >= a && w.s < b)
		.map((w) => w.w)
		.join(' ');

console.log(`\n${plan.title}  (${mmss(plan.trimStart ?? 0)} → ${plan.trimEnd ? mmss(plan.trimEnd) : 'fim'})\n`);
plan.scenes.forEach((s, i) => {
	console.log(`${String(i + 1).padStart(2, '0')}. ${mmss(s.start)}–${mmss(s.end)}  [${s.type}] ${s.label ?? ''}`);
	console.log(`    fala: "${said(s.start, s.end)}"`);
});
console.log('');
