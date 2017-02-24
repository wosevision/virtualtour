import TitlebarModule from './titlebar'
import TitlebarController from './titlebar.controller';
import TitlebarComponent from './titlebar.component';
import TitlebarTemplate from './titlebar.html';

describe('Titlebar', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TitlebarModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TitlebarController();
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
      expect(TitlebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = TitlebarComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(TitlebarTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(TitlebarController);
      });
  });
});
