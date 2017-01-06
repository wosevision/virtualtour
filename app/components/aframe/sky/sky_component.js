const aframeSky = {
  bindings: {
    sky: '<',
    preload: '<?'
  },
  require: {
  	SceneCtrl: '^aframeScene'
  },
  controller: 'SkyCtrl'
};

export default {
  name: 'aframeSky',
  fn: aframeSky
};
