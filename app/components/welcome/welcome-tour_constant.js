const TOUR_STEPS = {
  config: {
    // mask: {
    //   visible: false
    // },
    // dark: true
  },
  steps: [{
      target: '#locations',
      placementPriority: [ 'top', 'left', 'bottom', 'right' ],
      content: '<h3>This is the location menu.</h3>UOIT locations can be explored manually using an expanding location menu. <strong>Click this button to open it!</strong>'
  }, {
      target: '#map',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: '<h3>Explore locations on the campus map!</h3>The same locations featured above are layed out on an <strong>interactive map, available in this menu</strong>.'
  }, {
      target: '#settings',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: '<h3>And don\'t forget...</h3>'
  }, {
      target: '#breadcrumbs',
      placementPriority: [ 'bottom', 'right', 'left', 'top' ],
      content: 'The title bar will always show <strong>exactly where you are</strong> in a breadcrumb trail that appears here.'
  }, {
      target: '#settings',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: 'You can <strong>configure your own personal</strong> settings for the Virtual Tour experience!'
  }]
};

export default {
  name: 'TOUR_STEPS',
  fn: TOUR_STEPS
};

