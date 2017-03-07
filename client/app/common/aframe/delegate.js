import { registerComponent } from 'aframe';

const delegateEventComponent = {
	config: {
		schema: {
			elements: {
				type: 'selectorAll'
			},
			events: {
				type: 'array'
			}
		},

		init() {
			this.validateProperties();

			this.unbinders = {};

			this.bindAllEventsToElements();
		},

		update(oldData) {
	    if (Object.keys(oldData).length === 0) return;

			this.validateProperties();
			
			this.oldData.elements.forEach(element => {
				const elementIndex = this.data.elements.indexOf(element);
				if (elementIndex === -1) {
					this.unbindAllEventsFromElement(element);
				}
			});

			this.oldData.events.forEach(eventName => {
				const eventNameIndex = this.data.events.indexOf(eventName);
				if (eventNameIndex === -1) {
					this.unbinders[eventName].forEach(unbind => unbind());
					this.unbinders.delete(eventName);
				}
			});
		},

		bindAllEventsToElements() {
			this.data.elements.forEach(element => this.bindAllEventsTo(element));
		},

		bindAllEventsTo(element) {
			this.data.events.forEach(eventName => this.bindEventTo(eventName, element));
		},

		bindEventTo(eventName, element) {
			const boundDelegateFn = this.delegateEvent.bind(element);
			this.el.addEventListener(eventName, boundDelegateFn);

			const unbindFn = () => this.el.removeEventListener(eventName, boundDelegateFn);

			this.unbinders[eventName] = new Map();
			this.unbinders[eventName].set(element, unbindFn);
		},

		delegateEvent(originalEv) {
			originalEv.stopPropagation();
			this.emit(originalEv.type, { originalEv }, false);
		},

		unbindAllEventsFromElement(element) {
			Object.keys(this.unbinders).forEach(eventName => {
				if (this.unbinders[eventName].has(element)) {
					const unbind = this.unbinders[eventName].get(element);
					unbind();
					this.unbinders[eventName].delete(element);
				}
			});
		},

		validateProperties() {
			if (!this.data.elements) {
				throw new Error('delegateEvent: Please provide an element selector to delegate events to!')
			}
			if (!this.data.events || !this.data.events.length) {
				throw new Error('delegateEvent: Please provide at least one event to delegate!')
			}
		}
	},
	register() {
		registerComponent('delegate-event', this.config);
	}
}

export default delegateEventComponent;