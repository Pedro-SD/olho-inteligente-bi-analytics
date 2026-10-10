// Uma palavra da transcrição: texto + início/fim em segundos no vídeo original.
export type Word = {w: string; s: number; e: number};

// Uma cena do plano. `start`/`end` e todo `at` dentro de `props` são segundos
// absolutos na linha do tempo do vídeo, presos à palavra que dispara a animação.
export type Scene = {
	start: number;
	end: number;
	type: string;
	label?: string;
	props: Record<string, unknown>;
};

export type Plan = {
	title: string;
	handle?: string;
	fps?: number;
	// Corta o vídeo bruto: começa em `trimStart` e termina em `trimEnd` (segundos).
	trimStart?: number;
	trimEnd?: number;
	scenes: Scene[];
};

export type MainProps = {
	video: string; // caminho relativo a public/
	duration: number; // duração do vídeo bruto em segundos
	words: Word[];
	plan: Plan;
};
