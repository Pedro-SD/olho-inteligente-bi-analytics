import React from 'react';
import {theme} from '../theme';
import {pop, useTime} from '../anim';
import type {Scene} from '../types';

// Frase de impacto. props: { text, kicker?, at? }
export const Title: React.FC<{scene: Scene}> = ({scene}) => {
	const {t, fps} = useTime();
	const {text = '', kicker, at = scene.start} = scene.props as {text?: string; kicker?: string; at?: number};
	const words = String(text).split(' ');

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 80px',
				textAlign: 'center',
			}}
		>
			{kicker ? (
				<div
					style={{
						fontFamily: theme.mono,
						fontSize: 30,
						letterSpacing: 6,
						textTransform: 'uppercase',
						color: theme.accent,
						marginBottom: 28,
						opacity: pop(t, at, fps),
					}}
				>
					{kicker}
				</div>
			) : null}
			<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 26px'}}>
				{words.map((w, i) => {
					const p = pop(t, at + 0.08 + i * 0.07, fps, 12);
					return (
						<span
							key={i}
							style={{
								fontFamily: theme.sans,
								fontWeight: 900,
								fontSize: words.length > 4 ? 104 : 136,
								lineHeight: 1.05,
								color: theme.text,
								opacity: p,
								transform: `translateY(${(1 - p) * 60}px) scale(${0.85 + p * 0.15})`,
								display: 'inline-block',
							}}
						>
							{w}
						</span>
					);
				})}
			</div>
			<div
				style={{
					marginTop: 40,
					height: 10,
					borderRadius: 5,
					background: theme.accent,
					width: 260 * pop(t, at + 0.25 + words.length * 0.07, fps),
				}}
			/>
		</div>
	);
};
