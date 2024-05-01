import {effect} from './effect';
import {Signal} from 'signal-polyfill';
import {getElement, setInnerText, watchNumberInput} from './utilities';

const counter = new Signal.State(0);
const isEven = new Signal.Computed(() => (counter.get() & 1) == 0);
const parity = new Signal.Computed(() => (isEven.get() ? 'even' : 'odd'));

// Log a state value every time it changes.
effect(() => console.log(parity.get()));

// Simulate external updates to counter.
const interval = setInterval(() => {
  counter.set(counter.get() + 1);
  if (counter.get() >= 10) clearInterval(interval);
}, 1000);

const n1State = new Signal.State(0);
const n2State = new Signal.State(0);

window.onload = () => {
  effect(() => setInnerText('#count', counter.get()));
  const unwatch = effect(() => setInnerText('#parity', parity.get()));
  const button = getElement('#unwatch');
  button.onclick = () => {
    unwatch();
    button.remove();
  };

  watchNumberInput('#n1', n1State);
  watchNumberInput('#n2', n2State);
  effect(() => {
    setInnerText('#sum', n1State.get() + n2State.get());
  });
};
