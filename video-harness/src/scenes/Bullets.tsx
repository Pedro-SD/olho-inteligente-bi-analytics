import React from 'react';
import {theme} from '../theme';
import {pop, useTime} from '../anim';
import type {Scene} from '../types';
import {Window} from './Window';

type Item = {text: string; at: number; tag?: string};

// Lista que vai aparecendo item a item. props: { title?, window?, items: [{ text, at, tag? }] }
export const Bullets: React.FC<{scene: Scene}> = ({scene}) => {
	const {t, fps} = useTime();
	const {title, window: windowTitle, items = []} = scene.props as {title?: string; window?: string; items?: Item[]};

	return (
		<Window title={windowTitle}>
			{title ? (
				<div style={{fontFamily: theme.sans, fontWeight: 800, fontSize: 54, color: theme.text, marginBottom: 40}}>
					{title}
				</div>
			) : null}
			<div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
				{items.map((item, i) => {
					const p = pop(t, item.at, fps);
					return (
						<div
							key={i}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 26,
								opacity: p,
								transform: `translateX(${(1 - p) * -50}px)`,
							}}
						>
							<div
								style={{
									width: 54,
									height: 54,
									borderRadius: 14,
									background: theme.accent,
									color: '#1a1612',
									fontFamily: theme.mono,
									fontWeight: 700,
									fontSize: 28,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexShrink: 0,
								}}
							>
								{i + 1}
							</div>
							<div style={{fontFamily: theme.sans, fontWeight: 500, fontSize: 44, color: theme.text, flex: 1}}>
								{item.text}
							</div>
							{item.tag ? (
								<div
									style={{
										fontFamily: theme.mono,
										fontSize: 24,
										color: '#10241d',
										background: theme.mint,
										padding: '6px 14px',
										borderRadius: 8,
									}}
								>
									{item.tag}
								</div>
							) : null}
						</div>
					);
				})}
			</div>
		</Window>
	);
};
