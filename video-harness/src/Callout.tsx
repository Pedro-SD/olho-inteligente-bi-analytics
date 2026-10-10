import React from 'react';
import {theme} from './theme';
import {ease, pop, useTime} from './anim';
import type {Callout as CalloutT} from './types';

// Texto em destaque por cima da pessoa, nos trechos em tela cheia.
export const Callout: React.FC<{callout: CalloutT; top: number}> = ({callout, top}) => {
	const {t, fps} = useTime();
	if (t < callout.start || t > callout.end + 0.3) return null;
	const pIn = pop(t, callout.start, fps, 11);
	const pOut = 1 - ease(t, callout.end, 0.3);
	const p = Math.min(pIn, pOut);

	return (
		<div
			style={{
				position: 'absolute',
				top,
				left: 70,
				right: 70,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 16,
				opacity: p,
				transform: `translateY(${(1 - pIn) * -50}px) scale(${0.85 + 0.15 * pIn})`,
			}}
		>
			{callout.kicker ? (
				<div
					style={{
						fontFamily: theme.mono,
						fontSize: 30,
						letterSpacing: 5,
						textTransform: 'uppercase',
						color: '#fff',
						background: 'rgba(20,18,16,.75)',
						padding: '8px 18px',
						borderRadius: 10,
					}}
				>
					{callout.kicker}
				</div>
			) : null}
			<div
				style={{
					fontFamily: theme.sans,
					fontWeight: 900,
					fontSize: 78,
					lineHeight: 1.08,
					textAlign: 'center',
					color: '#1a1612',
					background: theme.gold,
					padding: '18px 34px',
					borderRadius: 24,
					boxShadow: '0 18px 50px rgba(0,0,0,.35)',
				}}
			>
				{callout.text}
			</div>
		</div>
	);
};
