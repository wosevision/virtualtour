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
      if (!this.data.elements) {
        throw new Error('delegateEvent: Please provide a valid selector to delegate events to!')
      }
      if (!this.data.events || !this.data.events.length) {
        throw new Error('delegateEvent: Please provide at least one event to delegate!')
      }
      this.attachAllEventsToElements();
    },

    attachAllEventsToElements() {
      this.data.elements.forEach(element => this.attachAllEventsTo(element));
    },

    attachAllEventsTo(element) {
      this.data.events.forEach(eventName => this.attachEventTo(eventName, element));
    },

    attachEventTo(eventName, element) {
      const boundDelegateFn = this.delegateEvent.bind(element);
      this.el.addEventListener(eventName, boundDelegateFn);
    },

    delegateEvent(originalEv) {
      this.emit(originalEv.type, { originalEv }, false);
    }
  },
  register() {
    registerComponent('delegate-event', this.config);
  }
}

export default delegateEventComponent;