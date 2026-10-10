import {continueRender, delayRender, staticFile} from 'remotion';

const faces: [family: string, file: string, weight: string][] = [
	['HarnessSans', 'Inter-Medium.otf', '500'],
	['HarnessSans', 'Inter-ExtraBold.otf', '800'],
	['HarnessSans', 'Inter-Black.otf', '900'],
	['HarnessMono', 'DejaVuSansMono.ttf', '400'],
	['HarnessMono', 'DejaVuSansMono-Bold.ttf', '700'],
];

let started = false;

// Segura a renderização até as fontes carregarem, senão os primeiros quadros saem com fonte errada.
export const loadFonts = () => {
	if (started) return;
	started = true;
	const handle = delayRender('Carregando fontes');
	Promise.all(
		faces.map(([family, file, weight]) =>
			new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, {weight})
				.load()
				.then((face) => document.fonts.add(face)),
		),
	)
		.catch((err) => console.error('Falha ao carregar fontes', err))
		.finally(() => continueRender(handle));
};
