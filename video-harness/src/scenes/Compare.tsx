import React from 'react';
import {theme} from '../theme';
import {pop, useTime} from '../anim';
import type {Scene} from '../types';

type Side = {title: string; items: string[]; at: number};

// Antes x depois / errado x certo. props: { left: { title, items, at }, right: { title, items, at } }
export const Compare: React.FC<{scene: Scene}> = ({scene}) => {
	const {t, fps} = useTime();
	const {left, right} = scene.props as {left?: Side; right?: Side};
	const sides: [Side | undefined, string, string][] = [
		[left, '#5a4a44', '✕'],
		[right, theme.accent, '✓'],
	];

	return (
		<div style={{position: 'absolute', inset: '110px 56px 60px', display: 'flex', gap: 30}}>
			{sides.map(([side, color, mark], i) => {
				if (!side) return null;
				const p = pop(t, side.at, fps);
				return (
					<div
						key={i}
						style={{
							flex: 1,
							background: theme.panel,
							border: `3px solid ${color}`,
							borderRadius: 32,
							padding: 40,
							opacity: p,
							transform: `translateY(${(1 - p) * 60}px)`,
						}}
					>
						<div style={{fontFamily: theme.sans, fontWeight: 900, fontSize: 52, color: theme.text, marginBottom: 34}}>
							<span style={{color}}>{mark}</span> {side.title}
						</div>
						{side.items.map((item, j) => (
							<div
								key={j}
								style={{
									fontFamily: theme.sans,
									fontWeight: 500,
									fontSize: 38,
									color: i === 0 ? theme.muted : theme.text,
									marginBottom: 22,
									opacity: pop(t, side.at + 0.25 + j * 0.2, fps),
								}}
							>
								{item}
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};
