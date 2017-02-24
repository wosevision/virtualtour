import SceneModule from './scene'
import SceneController from './scene.controller';
import SceneComponent from './scene.component';
import SceneTemplate from './scene.html';

describe('Scene', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SceneModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SceneController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(SceneTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SceneComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SceneTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SceneController);
      });
  });
});
