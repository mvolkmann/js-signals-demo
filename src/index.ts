import {effect} from './effect';
import {Signal} from 'signal-polyfill';

const counter = new Signal.State(0);
const isEven = new Signal.Computed(() => (counter.get() & 1) == 0);
const parity = new Signal.Computed(() => (isEven.get() ? 'even' : 'odd'));

// A library or framework defines effects based on other Signal primitives
//declare function effect(cb: () => void): () => void;

// Simulate external updates to counter...
setInterval(() => counter.set(counter.get() + 1), 1000);

effect(() => console.log(parity.get()));

const n1State = new Signal.State(0);
const n2State = new Signal.State(0);

function setInnerText(element: HTMLElement | null, value: string | number) {
  if (element) element.innerText = String(value);
}

function watchInput(element: HTMLInputElement | null, state: Signal.State) {
  if (element) element.onchange = () => state.set(Number(element.value));
}

window.onload = () => {
  const count = document.getElementById('count');
  const target = document.getElementById('target');
  effect(() => {
    setInnerText(count, counter.get());
    setInnerText(target, parity.get());
    // Optionally return a cleanup function.
    // return () => {
    //   console.log("index.ts: performing cleanup");
    // };
  });

  const n1 = document.getElementById('n1') as HTMLInputElement;
  const n2 = document.getElementById('n2') as HTMLInputElement;
  const sum = document.getElementById('sum');
  watchInput(n1, n1State);
  watchInput(n2, n2State);
  effect(() => {
    setInnerText(sum, n1State.get() + n2State.get());
  });
};
