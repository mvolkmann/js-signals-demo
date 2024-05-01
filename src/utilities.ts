function getElement(selector: string): HTMLElement {
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) throw new Error(`No element found for selector: ${selector}`);
  return element;
}

export function setInnerText(selector: string, value: string | number) {
  const element = getElement(selector) as HTMLInputElement;
  element.innerText = String(value);
}

export function watchNumberInput(selector: string, state: Signal.State<any>) {
  const element = getElement(selector) as HTMLInputElement;
  element.onchange = () => state.set(Number(element.value));
}
