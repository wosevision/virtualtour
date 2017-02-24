import DrilldownModule from './drilldown'
import DrilldownController from './drilldown.controller';
import DrilldownComponent from './drilldown.component';
import DrilldownTemplate from './drilldown.html';

describe('Drilldown', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DrilldownModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DrilldownController();
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
      expect(DrilldownTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DrilldownComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DrilldownTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DrilldownController);
      });
  });
});
