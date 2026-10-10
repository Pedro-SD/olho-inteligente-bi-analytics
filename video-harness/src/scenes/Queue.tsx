import React from 'react';
import {interpolate} from 'remotion';
import {theme} from '../theme';
import {pop, useTime} from '../anim';
import type {Scene} from '../types';
import {Window} from './Window';

type Item = {text: string; at: number};

// Itens chegando numa fila (pedidos, leads, tarefas...). props: { title?, window?, items: [{ text, at }], processor? }
export const Queue: React.FC<{scene: Scene}> = ({scene}) => {
	const {t, fps} = useTime();
	const {title, window: windowTitle, items = [], processor = '⚙'} = scene.props as {
		title?: string;
		window?: string;
		items?: Item[];
		processor?: string;
	};
	const arrived = items.filter((it) => t >= it.at).length;

	return (
		<Window title={windowTitle}>
			{title ? (
				<div
					style={{
						fontFamily: theme.mono,
						fontSize: 28,
						letterSpacing: 4,
						textTransform: 'uppercase',
						color: theme.muted,
						marginBottom: 60,
					}}
				>
					{title}
				</div>
			) : null}
			<div style={{display: 'flex', alignItems: 'center', gap: 30, height: 420}}>
				<div
					style={{
						flex: 1,
						height: 180,
						borderRadius: 28,
						background: theme.panelRaised,
						border: `2px dashed ${theme.line}`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						gap: 16,
						padding: '0 22px',
						overflow: 'hidden',
					}}
				>
					{items.map((item, i) => {
						const p = pop(t, item.at, fps, 16);
						if (p === 0) return null;
						return (
							<div
								key={i}
								style={{
									flexShrink: 0,
									padding: '22px 22px',
									borderRadius: 18,
									background: i % 2 ? theme.gold : theme.accent,
									color: '#1a1612',
									fontFamily: theme.mono,
									fontWeight: 700,
									fontSize: 30,
									transform: `translateX(${(1 - p) * -500}px)`,
									opacity: interpolate(p, [0, 0.3], [0, 1], {extrapolateRight: 'clamp'}),
								}}
							>
								{item.text}
							</div>
						);
					})}
				</div>
				<div
					style={{
						width: 180,
						height: 180,
						borderRadius: 36,
						background: '#0d0b0a',
						border: `2px solid ${theme.line}`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 84,
						color: theme.gold,
						transform: `rotate(${t * 90}deg)`,
					}}
				>
					{processor}
				</div>
			</div>
			<div style={{fontFamily: theme.mono, fontSize: 30, color: theme.muted, textAlign: 'right'}}>
				na fila: <span style={{color: theme.text}}>{arrived}</span>
			</div>
		</Window>
	);
};
