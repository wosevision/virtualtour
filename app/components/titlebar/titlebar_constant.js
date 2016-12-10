const TITLEBAR_OPTS = {
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

