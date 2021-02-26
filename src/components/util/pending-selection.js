import { CustomHtmlElement } from '../custom-html-element';

export class PendingSelection {
  /**
   * @param {string} selector 
   * @param {CustomHtmlElement} element 
   */
  constructor(selector, element) {
    this.selector = selector;
    this.element = element;
  }
}