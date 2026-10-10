import type React from 'react';
import type {Scene} from '../types';
import {BigNumber} from './BigNumber';
import {Bullets} from './Bullets';
import {Compare} from './Compare';
import {Queue} from './Queue';
import {Steps} from './Steps';
import {Terminal} from './Terminal';
import {Title} from './Title';

// Tipos de cena disponíveis para o plan.json. Para criar uma nova, adicione aqui.
export const SCENES: Record<string, React.FC<{scene: Scene}>> = {
	title: Title,
	bullets: Bullets,
	queue: Queue,
	number: BigNumber,
	terminal: Terminal,
	steps: Steps,
	compare: Compare,
};
