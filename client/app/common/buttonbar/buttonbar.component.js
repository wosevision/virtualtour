import template from './buttonbar.html';
import controller from './buttonbar.controller';
import './buttonbar.scss';

const buttonbarComponent = {
  template,
  controller,
  bindings: {
  	items: '<',
  	open: '<?',
  	condensed: '<?',
  	mobile: '<?'
  }
}

export default buttonbarComponent;
