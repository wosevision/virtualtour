const WELCOME_TIP_LIST = [
	[{
		title: 'Tour navigation',
		icon: 'my_location',
		link: 'navigation',
		desc: 'Learn how to use warp arrows, map view and the location menu to move from scene to scene.',
	},{
		title: 'Points of interest',
		icon: 'place',
		link: '',
		desc: 'See which tour elements offer interactivity and how to use them.',
	}],[{
		title: 'Virtual reality',
		icon: '3d_rotation',
		link: '',
		desc: 'Experience the UOIT virtual tour immersively with an Oculus© Rift.',
	},{
		title: 'Mobile VR',
		icon: 'screen_rotation',
		link: '',
		desc: 'Turn your smartphone into a portal to UOIT with a mobile VR peripheral like HTC Vive, Samsung Gear or Google Cardboard.',
	},{
		title: 'Customization',
		icon: 'settings',
		link: '',
		desc: 'Learn about the options available for fine-tuning the virtual tour interface.'
	}]
];

export default {
	name: 'WELCOME_TIP_LIST',
	fn: WELCOME_TIP_LIST
};