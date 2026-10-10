import React from 'react';
import {theme} from '../theme';
import {pop, useTime} from '../anim';
import type {Scene} from '../types';

type Step = {label: string; at: number};

// Fluxo em etapas que acendem uma a uma. props: { title?, steps: [{ label, at }], result?: { label, at } }
export const Steps: React.FC<{scene: Scene}> = ({scene}) => {
	const {t, fps} = useTime();
	const {title, steps = [], result} = scene.props as {title?: string; steps?: Step[]; result?: Step};
	const colors = [theme.gold, theme.mint, theme.accent];

	return (
		<div
			style={{
				position: 'absolute',
				inset: '110px 70px 70px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 26,
			}}
		>
			{title ? (
				<div
					style={{
						fontFamily: theme.mono,
						fontSize: 30,
						letterSpacing: 5,
						textTransform: 'uppercase',
						color: theme.muted,
						marginBottom: 20,
					}}
				>
					{title}
				</div>
			) : null}
			{steps.map((step, i) => {
				const p = pop(t, step.at, fps);
				return (
					<React.Fragment key={i}>
						{i > 0 ? (
							<div style={{fontSize: 44, color: theme.muted, opacity: p, lineHeight: 1}}>↓</div>
						) : null}
						<div
							style={{
								width: '100%',
								textAlign: 'center',
								padding: '26px 30px',
								borderRadius: 24,
								border: `3px solid ${colors[i % colors.length]}`,
								color: theme.text,
								background: theme.panel,
								fontFamily: theme.sans,
								fontWeight: 800,
								fontSize: 48,
								opacity: p,
								transform: `scale(${0.8 + p * 0.2})`,
							}}
						>
							{step.label}
						</div>
					</React.Fragment>
				);
			})}
			{result ? (
				<div
					style={{
						marginTop: 16,
						padding: '26px 40px',
						borderRadius: 24,
						background: theme.accent,
						color: '#1a1612',
						fontFamily: theme.sans,
						fontWeight: 900,
						fontSize: 54,
						opacity: pop(t, result.at, fps),
						transform: `translateY(${(1 - pop(t, result.at, fps)) * 40}px)`,
					}}
				>
					= {result.label}
				</div>
			) : null}
		</div>
	);
};
