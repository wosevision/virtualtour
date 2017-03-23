import ButtonbarModule from './buttonbar'
import ButtonbarController from './buttonbar.controller';
import ButtonbarComponent from './buttonbar.component';
import ButtonbarTemplate from './buttonbar.html';

describe('Buttonbar', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ButtonbarModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ButtonbarController();
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
      expect(ButtonbarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ButtonbarComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ButtonbarTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ButtonbarController);
      });
  });
});
