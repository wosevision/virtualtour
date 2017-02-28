import 'aframe';
import 'aframe-animation-component';
import 'aframe-event-set-component';
import 'aframe-drag-look-controls-component';
import 'aframe-look-at-component';
import 'aframe-mouse-cursor-component';
import { primitives, loaders } from 'aframe-extras';

import sceneLink from './scenelink';
import hotSpot from './hotspot';
import textPanel from './textpanel';
import hoverAnimation from './hover';
import levelScaleTo from './scale';
import delegateEvent from './delegate';

export default {
	sceneLink,
	hoverAnimation,
	levelScaleTo,
	registerAll() {
		loaders.registerAll();
		primitives.registerAll();

		delegateEvent.register();
		levelScaleTo.register();
		hoverAnimation.register();
		textPanel.register();
		hotSpot.register();
		sceneLink.register();
	}
}