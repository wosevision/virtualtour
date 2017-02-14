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
      target: '#search',
      placementPriority: [ 'left', 'top', 'bottom', 'right' ],
      content: '<h3>Not sure where to start?</h3>If you have an idea of something you\'re looking for, <strong>try searching for it</strong>.'
  }, {
      target: '#toolbar-controls',
      placementPriority: [ 'bottom', 'left', 'right', 'top' ],
      content: 'The button toolbar below and to the right can be <strong>expanded, condensed, or hidden entirely</strong> with the buttons to the right-hand side here.<br/><br/>Don\' forget to <strong>register your user account</strong> for future visits or <strong>book a real tour</strong> at the university!'
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

