import SkyModule from './sky'
import SkyController from './sky.controller';
import SkyComponent from './sky.component';
import SkyTemplate from './sky.html';

describe('Sky', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SkyModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SkyController();
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
      expect(SkyTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SkyComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SkyTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SkyController);
      });
  });
});
