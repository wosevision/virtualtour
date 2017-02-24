import ErrorModule from './error'
import ErrorController from './error.controller';
import ErrorComponent from './error.component';
import ErrorTemplate from './error.html';

describe('Error', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ErrorModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ErrorController();
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
      expect(ErrorTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ErrorComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ErrorTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ErrorController);
      });
  });
});
