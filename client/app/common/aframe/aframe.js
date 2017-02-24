import 'aframe';
import 'aframe-animation-component';
import 'aframe-event-set-component';
import 'aframe-drag-look-controls-component';
import 'aframe-look-at-component';
import 'aframe-mouse-cursor-component';
import { primitives, loaders } from 'aframe-extras';

import sceneLink from './scenelink';
import hoverAnimation from './hover';

export default {
	sceneLink,
	registerAll() {
		loaders.registerAll();
		primitives.registerAll();

		hoverAnimation.register();
		sceneLink.register();
	}
}