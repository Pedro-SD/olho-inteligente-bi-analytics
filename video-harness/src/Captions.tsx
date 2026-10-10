import React, {useMemo} from 'react';
import type {Word} from './types';
import {theme} from './theme';
import {useTime} from './anim';

type Chunk = {words: Word[]; s: number; e: number};

const MAX_WORDS = 3;
const MAX_CHARS = 22;
const GAP_BREAK = 0.35;

// Agrupa palavras em blocos curtos (até 3 palavras), quebrando em pausas e pontuação.
const toChunks = (words: Word[]): Chunk[] => {
	const chunks: Chunk[] = [];
	let cur: Word[] = [];
	const flush = () => {
		if (cur.length) chunks.push({words: cur, s: cur[0].s, e: cur[cur.length - 1].e});
		cur = [];
	};
	words.forEach((word, i) => {
		const prev = words[i - 1];
		const chars = cur.reduce((n, x) => n + x.w.length + 1, 0) + word.w.length;
		if (cur.length && (cur.length >= MAX_WORDS || chars > MAX_CHARS || (prev && word.s - prev.e > GAP_BREAK))) {
			flush();
		}
		cur.push(word);
		if (/[.,!?;:]$/.test(word.w)) flush();
	});
	flush();
	// Estica cada bloco até o próximo quando a pausa é curta, para a legenda não piscar.
	chunks.forEach((c, i) => {
		const next = chunks[i + 1];
		if (next && next.s - c.e < 0.3) c.e = next.s;
	});
	return chunks;
};

export const Captions: React.FC<{words: Word[]; top: number}> = ({words, top}) => {
	const {t} = useTime();
	const chunks = useMemo(() => toChunks(words), [words]);
	const chunk = chunks.find((c) => t >= c.s && t < c.e);
	if (!chunk) return null;

	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: 60,
				right: 60,
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				gap: 18,
				fontFamily: theme.sans,
				fontWeight: 900,
				fontSize: 64,
				letterSpacing: 1,
				textTransform: 'uppercase',
			}}
		>
			{chunk.words.map((word, i) => {
				const active = t >= word.s && t < (chunk.words[i + 1]?.s ?? chunk.e);
				return (
					<span
						key={i}
						style={{
							color: active ? '#1a1612' : '#fff',
							background: active ? theme.gold : 'transparent',
							borderRadius: 12,
							padding: '2px 14px',
							textShadow: active ? 'none' : '0 4px 0 #000, 0 0 18px rgba(0,0,0,.65)',
							WebkitTextStroke: active ? undefined : '2px #000',
							paintOrder: 'stroke fill',
						}}
					>
						{word.w}
					</span>
				);
			})}
		</div>
	);
};
