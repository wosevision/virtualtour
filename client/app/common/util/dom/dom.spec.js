import DomModule from './dom'
import DomController from './dom.controller';
import DomComponent from './dom.component';
import DomTemplate from './dom.html';

describe('Dom', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DomModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DomController();
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
      expect(DomTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DomComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DomTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DomController);
      });
  });
});
