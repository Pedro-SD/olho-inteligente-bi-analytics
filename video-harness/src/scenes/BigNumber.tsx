import React from 'react';
import {theme} from '../theme';
import {ease, pop, useTime} from '../anim';
import type {Scene} from '../types';

// Número que aparece quando a cena entra e conta até o valor a partir de `at`. props: { value, prefix?, suffix?, label, at?, countFor?, decimals? }
export const BigNumber: React.FC<{scene: Scene}> = ({scene}) => {
	const {t, fps} = useTime();
	const {
		value = 0,
		prefix = '',
		suffix = '',
		label = '',
		at = scene.start,
		countFor = 1.1,
		decimals = 0,
	} = scene.props as {
		value?: number;
		prefix?: string;
		suffix?: string;
		label?: string;
		at?: number;
		countFor?: number;
		decimals?: number;
	};
	const n = Number(value) * ease(t, at, countFor);
	const shown = n.toLocaleString('pt-BR', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
	const p = pop(t, scene.start, fps);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					fontFamily: theme.sans,
					fontWeight: 900,
					fontSize: 220,
					color: theme.accent,
					letterSpacing: -6,
					transform: `scale(${0.7 + p * 0.3})`,
					opacity: p,
					fontVariantNumeric: 'tabular-nums',
				}}
			>
				{prefix}
				{shown}
				{suffix}
			</div>
			<div
				style={{
					fontFamily: theme.sans,
					fontWeight: 500,
					fontSize: 48,
					color: theme.text,
					opacity: pop(t, scene.start + 0.3, fps),
					maxWidth: 820,
					textAlign: 'center',
				}}
			>
				{label}
			</div>
		</div>
	);
};
