import 'aframe';
import 'aframe-animation-component';
import 'aframe-look-at-component';
import 'aframe-mouse-cursor-component';
import 'aframe-html-shader';

import { primitives, loaders } from 'aframe-extras';

import sceneLink from './scenelink';
import hotSpot from './hotspot';
import textPanel from './textpanel';
import hoverAnimation from './hover';
import levelScaleTo from './scale';
import hitBox from './hitbox';
import delegateEvent from './delegate';
import clickToggle from './clicktoggle';
import anchorLook from './anchorlook';

export const AFrameModule = {
	sceneLink,
	hotSpot,
	textPanel,
	hoverAnimation,
	levelScaleTo,
	hitBox,
	delegateEvent,
	clickToggle,
	anchorLook,
	registerAll() {
		loaders.registerAll();
		primitives.registerAll();

		anchorLook.register();
		clickToggle.register();
		delegateEvent.register();
		hitBox.register();
		levelScaleTo.register();
		hoverAnimation.register();
		textPanel.register();
		hotSpot.register();
		sceneLink.register();
	}
}