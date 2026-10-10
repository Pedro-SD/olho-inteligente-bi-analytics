import React from 'react';
import {theme} from '../theme';

// Moldura de janela (bolinhas + título) usada pela maioria das cenas.
export const Window: React.FC<{title?: string; children: React.ReactNode; padding?: number}> = ({
	title,
	children,
	padding = 56,
}) => (
	<div
		style={{
			position: 'absolute',
			inset: '96px 56px 56px',
			background: theme.panel,
			border: `2px solid ${theme.line}`,
			borderRadius: 36,
			overflow: 'hidden',
			display: 'flex',
			flexDirection: 'column',
		}}
	>
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: 14,
				padding: '22px 30px',
				borderBottom: `2px solid ${theme.line}`,
				fontFamily: theme.mono,
				fontSize: 24,
				color: theme.muted,
			}}
		>
			{[theme.accent, theme.gold, theme.mint].map((c) => (
				<div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c, opacity: 0.85}} />
			))}
			{title ? <span style={{marginLeft: 12}}>{title}</span> : null}
		</div>
		<div style={{flex: 1, padding, position: 'relative'}}>{children}</div>
	</div>
);
