import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import {loadFonts} from './fonts';
import {H, W} from './theme';
import type {MainProps} from './types';

loadFonts();

const defaultProps: MainProps = {
	video: 'projects/exemplo/input.mp4',
	duration: 10,
	words: [],
	plan: {title: 'Exemplo', scenes: []},
};

export const Root: React.FC = () => (
	<Composition
		id="Main"
		component={Main}
		width={W}
		height={H}
		fps={30}
		durationInFrames={300}
		defaultProps={defaultProps}
		calculateMetadata={({props}) => {
			const fps = props.plan.fps ?? 30;
			const start = props.plan.trimStart ?? 0;
			const end = props.plan.trimEnd ?? props.duration;
			return {fps, durationInFrames: Math.max(1, Math.round((end - start) * fps))};
		}}
	/>
);
