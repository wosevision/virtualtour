import ResourceModule from './resource'
import ResourceController from './resource.controller';
import ResourceComponent from './resource.component';
import ResourceTemplate from './resource.html';

describe('Resource', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ResourceModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ResourceController();
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
      expect(ResourceTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ResourceComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ResourceTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ResourceController);
      });
  });
});
