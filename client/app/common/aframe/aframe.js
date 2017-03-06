import 'aframe';
import 'aframe-animation-component';
import 'aframe-look-at-component';
import 'aframe-mouse-cursor-component';

import { primitives, loaders } from 'aframe-extras';

import sceneLink from './scenelink';
import hotSpot from './hotspot';
import textPanel from './textpanel';
import hoverAnimation from './hover';
import levelScaleTo from './scale';
import hitBox from './hitbox';
import delegateEvent from './delegate';
import anchorLook from './anchorlook';

export default {
	sceneLink,
	hotSpot,
	textPanel,
	hoverAnimation,
	levelScaleTo,
	hitBox,
	delegateEvent,
	anchorLook,
	registerAll() {
		loaders.registerAll();
		primitives.registerAll();

		anchorLook.register();
		delegateEvent.register();
		hitBox.register();
		levelScaleTo.register();
		hoverAnimation.register();
		textPanel.register();
		hotSpot.register();
		sceneLink.register();
	}
}