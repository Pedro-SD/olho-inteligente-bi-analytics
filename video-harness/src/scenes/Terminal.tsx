import React from 'react';
import {theme} from '../theme';
import {pop, typed, useTime} from '../anim';
import type {Scene} from '../types';
import {Window} from './Window';

type Line = {text: string; at: number; value?: string; tag?: string};

// Terminal estilo Claude Code: um pedido digitado e linhas de resposta aparecendo.
// props: { window?, prompt, promptAt?, tool?, lines: [{ text, at, value?, tag? }] }
export const Terminal: React.FC<{scene: Scene}> = ({scene}) => {
	const {t, fps} = useTime();
	const {
		window: windowTitle = 'claude · ~/projeto',
		prompt = '',
		promptAt = scene.start,
		tool,
		lines = [],
	} = scene.props as {window?: string; prompt?: string; promptAt?: number; tool?: string; lines?: Line[]};
	const shown = typed(prompt, t, promptAt);
	const typing = shown.length < prompt.length;
	const firstLineAt = lines[0]?.at ?? promptAt + 1;

	return (
		<Window title={windowTitle} padding={44}>
			<div
				style={{
					display: 'inline-block',
					background: '#efe3c8',
					color: '#1a1612',
					fontFamily: theme.mono,
					fontSize: 32,
					padding: '10px 20px',
					borderRadius: 10,
					marginBottom: 34,
				}}
			>
				❯ {shown}
				{typing ? <span style={{opacity: Math.floor(t * 3) % 2 ? 1 : 0}}>▌</span> : null}
			</div>
			{tool ? (
				<div style={{fontFamily: theme.mono, fontSize: 32, color: theme.text, marginBottom: 18, opacity: pop(t, firstLineAt - 0.2, fps)}}>
					<span style={{color: theme.accent}}>●</span> <b>{tool}</b>
				</div>
			) : null}
			<div style={{display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 30}}>
				{lines.map((line, i) => {
					const p = pop(t, line.at, fps, 18);
					return (
						<div
							key={i}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 24,
								fontFamily: theme.mono,
								fontSize: 30,
								color: theme.text,
								opacity: p,
								transform: `translateY(${(1 - p) * 16}px)`,
							}}
						>
							<span style={{color: theme.muted}}>└</span>
							<span style={{minWidth: 300}}>{line.text}</span>
							{line.value ? <span style={{color: theme.gold, minWidth: 130}}>{line.value}</span> : null}
							{line.tag ? (
								<span
									style={{
										fontSize: 22,
										color: '#10241d',
										background: theme.mint,
										padding: '4px 12px',
										borderRadius: 8,
									}}
								>
									{line.tag}
								</span>
							) : null}
						</div>
					);
				})}
			</div>
		</Window>
	);
};
