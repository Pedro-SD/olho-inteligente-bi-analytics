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

// Texto em destaque por cima do vídeo em tela cheia (fora das cenas de tela dividida).
export type Callout = {start: number; end: number; text: string; kicker?: string};

// Zoom rápido na pessoa, no segundo de uma palavra forte.
export type Emphasis = {at: number; scale?: number};

export type Plan = {
	title: string;
	handle?: string;
	fps?: number;
	// Corta o vídeo bruto: começa em `trimStart` e termina em `trimEnd` (segundos).
	trimStart?: number;
	trimEnd?: number;
	// Cenas animadas: enquanto uma está ativa, a tela divide (animação em cima, pessoa embaixo).
	// Entre cenas, a pessoa ocupa a tela inteira.
	scenes: Scene[];
	callouts?: Callout[];
	emphasis?: Emphasis[];
	// Música de fundo (arquivo em public/) e efeitos sonoros automáticos.
	music?: {src: string; volume?: number} | false;
	sfx?: boolean;
};

export type MainProps = {
	video: string; // caminho relativo a public/
	duration: number; // duração do vídeo bruto em segundos
	words: Word[];
	plan: Plan;
};
