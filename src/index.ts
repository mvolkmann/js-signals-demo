import {effect} from './effect';
import {Signal} from 'signal-polyfill';

const counter = new Signal.State(0);
const isEven = new Signal.Computed(() => (counter.get() & 1) == 0);
const parity = new Signal.Computed(() => (isEven.get() ? 'even' : 'odd'));

// A library or framework defines effects based on other Signal primitives
//declare function effect(cb: () => void): () => void;

// Simulate external updates to counter...
setInterval(() => counter.set(counter.get() + 1), 1000);

window.onload = () => {
  const count = document.getElementById('count');
  const target = document.getElementById('target');
  if (target) {
    effect(() => {
      if (count) count.innerText = String(counter.get());
      if (target) target.innerText = parity.get();
      // Optionally return a cleanup function.
      // return () => {
      //   console.log("index.ts: performing cleanup");
      // };
    });
  } else {
    console.error('target element not found');
  }
};
