import controller from './sky.controller';

const skyComponent = {
  controller,
  bindings: {
    sky: '<',
    preload: '<?'
  },
  require: {
  	SceneCtrl: '^aframeScene'
  }
};


export default skyComponent;
