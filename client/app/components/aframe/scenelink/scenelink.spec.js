import ScenelinkModule from './scenelink'
import ScenelinkController from './scenelink.controller';
import ScenelinkComponent from './scenelink.component';
import ScenelinkTemplate from './scenelink.html';

describe('Scenelink', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ScenelinkModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ScenelinkController();
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
      expect(ScenelinkTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ScenelinkComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ScenelinkTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ScenelinkController);
      });
  });
});
