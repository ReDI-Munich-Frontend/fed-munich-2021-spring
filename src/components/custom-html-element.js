import { PendingSelection } from './util/pending-selection';

const resolveSelectors = Symbol('resolveSelectors');
const isResolved = Symbol('isResolved');
const observedAttributes = Symbol('observedAttributes');

/**
 * @abstract
 */
export class CustomHtmlElement extends HTMLElement {
  /**
   * @abstract
   * @returns {string}
   */
  static get template() { }
  
  /**
   * @abstract
   * @returns {string}
   */
  static get style() { }
  
  /**
   * @abstract
   * @returns {string}
   */
  static get elementTagName() { }
  
  /**
   * Register a CustomHtmlElement with the DOM's CustomElementRegistry
   * @param {CustomHtmlElement} element 
   * @param {ElementDefinitionOptions} options
   * @returns {void}
   */
  static register(element, options) {
    customElements.define(element.elementTagName, element, options);
  }
  
  constructor() {
    super();
    this[isResolved] = false;
    this[observedAttributes] = {};
  }
  
  /**
   * @returns {void}
   */
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<style>${this.constructor.style}</style>${this.constructor.template}`;
    
    this[resolveSelectors]();
    
    for(const attribute of Object.keys(this[observedAttributes])) {
      let value = undefined;
      if (this.attributes.getNamedItem(attribute) && this[isResolved]) {
        value = this.attributes.getNamedItem(attribute).value;
      }
      this[observedAttributes][attribute](undefined, value);
    }
  }
  
  /**
   * Select an element from the template by id
   * @param {string} selector 
   * @returns {HTMLElement | PendingSelection}
   */
  select(selector) {
    if (!this[isResolved]) {
      return new PendingSelection(selector, this);
    } else {
      return this.shadowRoot.querySelector(selector);
    }
  }
  
  /**
   * @returns {void}
   */
  [resolveSelectors]() {
    for (const key of Object.keys(this)) {
      if (this[key] instanceof PendingSelection) {
        this[key] = this.shadowRoot.querySelector(this[key].selector);
      }
    }
    this[isResolved] = true;
  }
  
  /**
   * @param {string} name 
   * @param {function(string, string): void} callback 
   */
  observeAttribute(name, callback) {
    if (!this.constructor.observedAttributes || !this.constructor.observedAttributes.includes(name)) {
      console.warn(`Attribute ${name} is not an observed attribute of ${this.constructor.name}`);
      return;
    }
    
    this[observedAttributes][name] = callback;
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (this[observedAttributes][name] && this[isResolved]) {
      this[observedAttributes][name](oldValue, newValue);
    }
  }
}