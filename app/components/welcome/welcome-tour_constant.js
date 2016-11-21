const TOUR_STEPS = {
  config: {
    mask: {
      visible: true,
      clickThrough: false, 
      clickExit: true,
      scrollThrough: false,
      color: 'rgba(0,60,113,.7)'
    },
    container: 'body',
    scrollBox: 'body',
    previousText: 'Previous',
    nextText: 'Next',
    finishText: 'Finish',
    animationDuration: 400,
    dark: true
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
      target: '#breadcrumbs',
      placementPriority: [ 'bottom', 'right', 'left', 'top' ],
      content: 'If you\'re ever <strong>wondering where you are</strong>, the title bar will always show the current location in a breadcrumb trail that appears here.'
  }, {
      target: '#guided',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: '<h3>Why not enjoy a guided tour?</h3>See a curated selection of UOIT\'s most interesting locations and landmarks on a <strong>guided tour of highlights</strong>.'
  }, {
      target: '#toolbar-controls',
      placementPriority: [ 'bottom', 'left', 'right', 'top' ],
      content: 'The <strong>button toolbar below can be expanded, condensed, or hidden entirely</strong> with these buttons.'
  }, {
      target: '#settings',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: 'If you want your preferences saved for future visits, you can <strong>configure your own personal settings</strong> for the Virtual Tour experience here!'
  }, {
      // target: '#aframe-scene',
      placementPriority: [ 'bottom', 'top', 'left', 'right' ],
      content: 'Would you like to learn how to navigate through <strong>scenes</strong>?<br/><div class="text-center" layout-margin><md-button class="md-raised md-primary">Show me how</md-button><md-button>No thanks</md-button></div>'
  }]
};

export default {
  name: 'TOUR_STEPS',
  fn: TOUR_STEPS
};

