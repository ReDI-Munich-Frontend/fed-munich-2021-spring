import { CustomHtmlElement } from "../custom-html-element";
import template from './preview-window.html';
import style from './preview-window.raw.scss';

/**
 * This component produces a mock-up of a desktop window. A typical use case is
 * wrapping an iframe with it.
 * 
 * Example:
 * <preview-window>
 *   <iframe src="some-file.html">
 * </preview-window>
 *
 * This element has following options:
 * - window-title: A string that is shown inside the title bar of the window.
 * - address:      A string that is shown inside an address bar similar to that
 *                 of a web browser.
 * - icon-class:   A font-awesome icon class to show as window icon.
 *                 An overview can be found here: https://fontawesome.com/icons?m=free
 *
 * Both of these options are purely cosmetic and don't influence the beaviour
 * of this component at all.
 * 
 * Example:
 * <preview-window window-title="Example page"
 *                 address="https://www.example.com"
 *                 icon-class="fa-globe-europe">
 *   <iframe src="some-file.html">
 * </preview-window>
 */
export class PreviewWindowElement extends CustomHtmlElement {
  static get template() {
    return template;
  }

  static get style() {
    return style;
  }

  static get elementTagName() {
    return 'preview-window';
  }

  static get observedAttributes() {
    return ['window-title', 'address', 'icon-class'];
  }

  constructor() {
    super();

    this.titleElement = this.select('#title');
    this.addressBarElement = this.select('#address-bar');
    this.addressElement = this.select('#address');

    this.observeAttribute('window-title', (oldValue, newValue) => this.updateTitle(newValue));
    this.observeAttribute('address', (oldValue, newValue) => this.updateAddress(newValue));
    this.observeAttribute('icon-class', (oldValue, newValue) => this.updateIconClass(newValue));
  }

  updateTitle(newValue) {
    if (!newValue) {
      newValue = 'Example';
    }
    this.titleElement.innerHTML = newValue;
  }

  updateAddress(newValue) {
    this.addressElement.innerHTML = newValue;
    this.addressBarElement.style.display = newValue ? 'flex' : 'none';
  }

  updateIconClass(newValue) {
    if (!newValue) {
      newValue = 'fa-window-maximize';
    }
    this.titleElement.classList.value = newValue;
  }
}