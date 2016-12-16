const TITLEBAR_OPTS = {
	register: {
		active: true,
		label: 'Register now',
		tooltip: false,
		icon: ['person_add', 'person_add'],
		class: 'cta-button bg-pink'
	},
	schedule: {
		active: true,
		label: 'Schedule visit',
		tooltip: false,
		icon: ['add_alarm', 'add_alarm'],
		class: 'cta-button bg-green'
	},
	apply: {
		active: true,
		label: 'Apply online',
		tooltip: false,
		icon: ['assignment_turned_in', 'assignment_turned_in'],
		class: 'cta-button bg-orange'
	},
	condense: {
		active: true,
		label: 'Toolbar size',
		tooltip: [ 'Expand toolbar', 'Condense toolbar' ],
		icon: [ 'flip_to_front', 'flip_to_back' ]
	},
	right: {
		active: true,
		label: 'Toolbar visibility',
		tooltip: [ 'Hide toolbar', 'Show toolbar' ],
		icon: [ 'last_page', 'first_page' ]
	}
};

export default {
  name: 'TITLEBAR_OPTS',
  fn: TITLEBAR_OPTS
};

