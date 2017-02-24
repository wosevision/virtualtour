import controller from './entity.controller';

const entityComponent = {
  controller,
  require: {
    $ngModel: 'ngModel',
    SceneCtrl: '^aframeScene'
  }
};

export default entityComponent;
