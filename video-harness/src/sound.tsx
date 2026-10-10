import React, {useMemo} from 'react';
import {Audio, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import type {Plan} from './types';

type Cue = {at: number; file: string; volume: number};

const SFX = {
	whoosh: 'sfx/whoosh.wav',
	pop: 'sfx/pop.wav',
	impact: 'sfx/impact.wav',
	ding: 'sfx/ding.wav',
	tick: 'sfx/tick.wav',
};

// Tira os efeitos sonoros do próprio plano: whoosh quando uma cena entra, pop em cada item,
// impacto em títulos/números/zooms e ding na chamada final.
export const cuesFromPlan = (plan: Plan): Cue[] => {
	const cues: Cue[] = [];
	const add = (at: number | undefined, file: string, volume: number) => {
		if (typeof at === 'number') cues.push({at, file, volume});
	};
	plan.scenes.forEach((scene) => {
		const p = scene.props as Record<string, any>;
		add(scene.start - 0.12, SFX.whoosh, 0.45);
		if (scene.type === 'title' || scene.type === 'number') add(p.at ?? scene.start, SFX.impact, 0.5);
		for (const list of [p.items, p.lines, p.steps]) {
			if (Array.isArray(list)) list.forEach((it: {at?: number}) => add(it.at, SFX.pop, 0.4));
		}
		if (p.result) add(p.result.at, SFX.impact, 0.45);
		if (p.left) add(p.left.at, SFX.pop, 0.4);
		if (p.right) add(p.right.at, SFX.pop, 0.4);
		if (p.prompt) add(p.promptAt ?? scene.start, SFX.tick, 0.3);
	});
	(plan.callouts ?? []).forEach((c, i, all) => {
		add(c.start, i === all.length - 1 ? SFX.ding : SFX.whoosh, i === all.length - 1 ? 0.45 : 0.35);
	});
	(plan.emphasis ?? []).forEach((e) => add(e.at, SFX.impact, 0.3));
	return cues;
};

export const Soundtrack: React.FC<{plan: Plan; trimStart: number; durationInFrames: number}> = ({
	plan,
	trimStart,
	durationInFrames,
}) => {
	const {fps} = useVideoConfig();
	const cues = useMemo(() => (plan.sfx === false ? [] : cuesFromPlan(plan)), [plan]);
	const music = plan.music;
	const musicVolume = music ? (music.volume ?? 0.12) : 0;

	return (
		<>
			{music ? (
				<Audio
					src={staticFile(music.src)}
					loop
					volume={(f) =>
						musicVolume *
						interpolate(f, [0, fps, durationInFrames - fps * 1.5, durationInFrames], [0, 1, 1, 0], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})
					}
				/>
			) : null}
			{cues
				.filter((c) => c.at >= trimStart)
				.map((c, i) => (
					<Sequence key={i} from={Math.round((c.at - trimStart) * fps)} durationInFrames={fps * 2} layout="none">
						<Audio src={staticFile(c.file)} volume={c.volume} />
					</Sequence>
				))}
		</>
	);
};
