import {effect} from './effect';
import {Signal} from 'signal-polyfill';
import {bindNumberInput, getElement, setInnerText} from './utilities';

const {Computed, State} = Signal;
const counter = new State(0);
const isEven = new Computed(() => (counter.get() & 1) == 0);
const parity = new Computed(() => (isEven.get() ? 'even' : 'odd'));

// Log a state value every time it changes.
effect(() => console.log(parity.get()));

// Simulate external updates to counter.
let interval: ReturnType<typeof setInterval>;
function simulate() {
  clearInterval(interval);
  interval = setInterval(() => {
    counter.set(counter.get() + 1);
    if (counter.get() >= 10) clearInterval(interval);
  }, 1000);
}
simulate();

const n1 = new State(0);
const n2 = new State(0);

window.onload = () => {
  effect(() => setInnerText('#count', counter.get()));

  const unwatch = effect(() => setInnerText('#parity', parity.get()));
  const button = getElement('#unwatch');
  button.onclick = () => {
    unwatch();
    button.remove();
  };

  bindNumberInput('#n1', n1);
  bindNumberInput('#n2', n2);
  effect(() => {
    setInnerText('#sum', n1.get() + n2.get());
  });
  getElement('#reset').onclick = () => {
    counter.set(0);
    simulate();
    n1.set(0);
    n2.set(0);
  };
};
