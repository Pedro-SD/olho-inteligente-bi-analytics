import {createContext, useContext} from 'react';
import {Easing, interpolate, spring} from 'remotion';

// Tempo absoluto (segundos do vídeo bruto) e fps, compartilhados com todas as cenas.
export const TimeContext = createContext({t: 0, fps: 30});
export const useTime = () => useContext(TimeContext);

// 0 → 1 com mola, começando exatamente em `at`. Antes de `at`, fica 0.
export const pop = (t: number, at: number, fps: number, damping = 14) =>
	t < at ? 0 : spring({frame: (t - at) * fps, fps, config: {damping, stiffness: 140, mass: 0.7}});

// 0 → 1 linear-suave entre `at` e `at + dur`.
export const ease = (t: number, at: number, dur = 0.4) =>
	interpolate(t, [at, at + dur], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

// Quantos caracteres de `text` já foram "digitados" no tempo `t`.
export const typed = (text: string, t: number, at: number, cps = 38) =>
	text.slice(0, Math.max(0, Math.floor((t - at) * cps)));
