import InfoModule from './info'
import InfoController from './info.controller';
import InfoComponent from './info.component';
import InfoTemplate from './info.html';

describe('Info', () => {
  let $rootScope, makeController;

  beforeEach(window.module(InfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new InfoController();
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
      expect(InfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = InfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(InfoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(InfoController);
      });
  });
});
