import HotspotModule from './hotspot'
import HotspotController from './hotspot.controller';
import HotspotComponent from './hotspot.component';
import HotspotTemplate from './hotspot.html';

describe('Hotspot', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HotspotModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HotspotController();
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
      expect(HotspotTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = HotspotComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(HotspotTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(HotspotController);
      });
  });
});
