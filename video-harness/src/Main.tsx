import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Captions} from './Captions';
import {SCENES} from './scenes';
import {STAGE_H, theme} from './theme';
import {TimeContext, ease} from './anim';
import type {MainProps} from './types';

const FADE = 0.25;

export const Main: React.FC<MainProps> = ({video, duration, words, plan}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const trimStart = plan.trimStart ?? 0;
	const trimEnd = plan.trimEnd ?? duration;
	// `t` é sempre o tempo no vídeo BRUTO, então os horários da transcrição valem direto.
	const t = trimStart + frame / fps;

	const scenes = plan.scenes;
	const activeIndex = scenes.findIndex((s) => t >= s.start && t < s.end);
	const active = scenes[activeIndex];
	const progress = (t - trimStart) / (trimEnd - trimStart);

	return (
		<TimeContext.Provider value={{t, fps}}>
			<AbsoluteFill style={{background: theme.bg}}>
				{/* Palco das animações */}
				<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: STAGE_H, overflow: 'hidden'}}>
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
						const o = Math.min(inP, outP);
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									inset: 0,
									opacity: o,
									transform: `translateY(${(1 - inP) * 40 - (1 - outP) * 40}px)`,
								}}
							>
								<Comp scene={scene} />
							</div>
						);
					})}
				</div>

				{/* Divisória com barra de progresso */}
				<div style={{position: 'absolute', top: STAGE_H - 4, left: 0, right: 0, height: 8, background: theme.line, zIndex: 2}}>
					<div style={{height: '100%', width: `${progress * 100}%`, background: theme.gold}} />
				</div>

				{/* Você */}
				<div style={{position: 'absolute', top: STAGE_H, left: 0, right: 0, bottom: 0, overflow: 'hidden'}}>
					<OffthreadVideo
						src={staticFile(video)}
						trimBefore={Math.round(trimStart * fps)}
						style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%'}}
					/>
				</div>

				<Captions words={words} top={STAGE_H + 60} />
			</AbsoluteFill>
		</TimeContext.Provider>
	);
};
