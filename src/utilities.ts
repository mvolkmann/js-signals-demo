import {effect} from './effect';
import {Signal} from 'signal-polyfill';

/** Creates a two-way binding between an input element and a state. */
export function bindNumberInput(selector: string, state: Signal.State<any>) {
  const element = getElement(selector) as HTMLInputElement;
  element.onchange = () => state.set(Number(element.value));
  effect(() => (element.value = state.get()));
}

export function getElement(selector: string): HTMLElement {
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) throw new Error(`No element found for selector: ${selector}`);
  return element;
}

export function setInnerText(selector: string, value: string | number) {
  const element = getElement(selector) as HTMLInputElement;
  element.innerText = String(value);
}
