import React, {useMemo} from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Callout} from './Callout';
import {Captions} from './Captions';
import {SCENES} from './scenes';
import {Soundtrack} from './sound';
import {H, STAGE_H, theme} from './theme';
import {TimeContext, ease, pop} from './anim';
import type {MainProps, Scene} from './types';

const FADE = 0.25;
const SPLIT_IN = 0.45; // duração da transição tela cheia ↔ tela dividida
const MERGE_GAP = 0.6; // cenas separadas por menos que isso não voltam para tela cheia no meio

// Junta cenas vizinhas em blocos contínuos de tela dividida.
const splitBlocks = (scenes: Scene[]) => {
	const sorted = [...scenes].sort((a, b) => a.start - b.start);
	const blocks: [number, number][] = [];
	for (const s of sorted) {
		const last = blocks[blocks.length - 1];
		if (last && s.start - last[1] < MERGE_GAP) last[1] = Math.max(last[1], s.end);
		else blocks.push([s.start, s.end]);
	}
	return blocks;
};

export const Main: React.FC<MainProps> = ({video, duration, words, plan}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const trimStart = plan.trimStart ?? 0;
	const trimEnd = plan.trimEnd ?? duration;
	// `t` é sempre o tempo no vídeo BRUTO, então os horários da transcrição valem direto.
	const t = trimStart + frame / fps;

	const scenes = plan.scenes;
	const blocks = useMemo(() => splitBlocks(scenes), [scenes]);
	// 0 = pessoa em tela cheia, 1 = tela dividida.
	const split = Math.max(
		0,
		...blocks.map(([a, b]) => Math.min(ease(t, a - 0.15, SPLIT_IN), 1 - ease(t, b - 0.2, SPLIT_IN))),
	);
	const activeIndex = scenes.findIndex((s) => t >= s.start && t < s.end);
	const active = scenes[activeIndex];
	const progress = (t - trimStart) / (trimEnd - trimStart);

	// Zoom: leve aproximação contínua em tela cheia + "punch" rápido nas palavras fortes.
	const punch = (plan.emphasis ?? []).reduce((acc, e) => {
		if (t < e.at) return acc;
		const p = pop(t, e.at, fps, 9) * (1 - ease(t, e.at + 0.9, 0.7));
		return acc + p * ((e.scale ?? 1.12) - 1);
	}, 0);
	const drift = 1 + 0.05 * (1 - split) * (((t - trimStart) % 8) / 8);
	const zoom = drift + punch;

	const videoTop = STAGE_H * split;
	const captionTop = interpolate(split, [0, 1], [H * 0.7, STAGE_H + 60]);

	return (
		<TimeContext.Provider value={{t, fps}}>
			<AbsoluteFill style={{background: theme.bg}}>
				{/* Pessoa: ocupa a tela toda e encolhe para a metade de baixo quando divide */}
				<div style={{position: 'absolute', top: videoTop, left: 0, right: 0, bottom: 0, overflow: 'hidden'}}>
					<OffthreadVideo
						src={staticFile(video)}
						trimBefore={Math.round(trimStart * fps)}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: `center ${interpolate(split, [0, 1], [50, 28])}%`,
							transform: `scale(${zoom})`,
							transformOrigin: 'center 32%',
						}}
					/>
				</div>

				{/* Palco das animações: desce de cima quando a tela divide */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: STAGE_H,
						overflow: 'hidden',
						background: theme.bg,
						transform: `translateY(${-(1 - split) * (STAGE_H + 10)}px)`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundImage: `radial-gradient(${theme.line} 1.5px, transparent 1.5px)`,
							backgroundSize: '44px 44px',
							opacity: 0.45,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: 34,
							left: 56,
							right: 56,
							display: 'flex',
							justifyContent: 'space-between',
							gap: 24,
							fontFamily: theme.mono,
							fontSize: 22,
							letterSpacing: 2,
							textTransform: 'uppercase',
							color: theme.muted,
							whiteSpace: 'nowrap',
						}}
					>
						<span style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
							{plan.handle ? `${plan.handle} · ` : ''}
							{plan.title}
						</span>
						{active ? (
							<span style={{flexShrink: 0}}>
								{String(activeIndex + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
								{active.label ? ` · ${active.label}` : ''}
							</span>
						) : null}
					</div>
					{scenes.map((scene, i) => {
						const Comp = SCENES[scene.type];
						if (!Comp || t < scene.start - 0.01 || t >= scene.end + FADE) return null;
						const inP = ease(t, scene.start, FADE);
						const outP = 1 - ease(t, scene.end, FADE);
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									inset: 0,
									opacity: Math.min(inP, outP),
									transform: `translateY(${(1 - inP) * 40 - (1 - outP) * 40}px)`,
								}}
							>
								<Comp scene={scene} />
							</div>
						);
					})}
					{/* Barra de progresso na borda de baixo do palco */}
					<div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, background: theme.line}}>
						<div style={{height: '100%', width: `${progress * 100}%`, background: theme.gold}} />
					</div>
				</div>

				{(plan.callouts ?? []).map((c, i) => (
					<Callout key={i} callout={c} top={210} />
				))}

				<Captions words={words} top={captionTop} />
				<Soundtrack plan={plan} trimStart={trimStart} durationInFrames={durationInFrames} />
			</AbsoluteFill>
		</TimeContext.Provider>
	);
};
