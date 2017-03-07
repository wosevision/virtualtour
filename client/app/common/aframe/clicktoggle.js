import { registerComponent, utils } from 'aframe';

const COMPONENT_NAME = 'click-toggle';

const ON_EVENT = 'toggle-on',
			OFF_EVENT = 'toggle-off';

const clickToggleComponent = {
	config: {
		schema: {
			events: {
				default: ['click']
			}
		},
	  init() {
	  	this.state = false;
	  	this.unbinders = [];

	    this.onToggle = AFRAME.utils.bind(this.onToggle, this);
			this.bindEvents();
	  },
	  onToggle(event) {
  		event.stopPropagation();
  		this.el.emit(this.state ? OFF_EVENT : ON_EVENT);
	  	this.state = !this.state;
	  },
	  bindEvents() {
			this.data.events.forEach(eventName => {
				this.el.addEventListener(eventName, this.onToggle);
				this.unbinders.push(() => this.el.removeEventListener(eventName, this.onToggle));
			});
	  },
	  unbindEvents() {
			this.unbinders.forEach(unbind => unbind());
	  },
	  remove() {
			this.unbindEvents();
	  }
	},
	register() {
		registerComponent(COMPONENT_NAME, this.config);
	}
}

export default clickToggleComponent;