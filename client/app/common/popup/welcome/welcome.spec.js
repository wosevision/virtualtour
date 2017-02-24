import WelcomeModule from './welcome'
import WelcomeController from './welcome.controller';
import WelcomeComponent from './welcome.component';
import WelcomeTemplate from './welcome.html';

describe('Welcome', () => {
  let $rootScope, makeController;

  beforeEach(window.module(WelcomeModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new WelcomeController();
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
      expect(WelcomeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = WelcomeComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(WelcomeTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(WelcomeController);
      });
  });
});
