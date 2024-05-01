import {Signal} from 'signal-polyfill';

let needsEnqueue = true;

function processPending() {
  needsEnqueue = true;
  for (const s of watcher.getPending()) {
    s.get();
  }
  watcher.watch();
}

const watcher = new Signal.subtle.Watcher(() => {
  if (needsEnqueue) {
    needsEnqueue = false;
    queueMicrotask(processPending);
  }
});

type Cleanup = () => void;
type Callback = () => Cleanup | void;
export function effect(callback: Callback) {
  // The callback function passed to the effect function
  // can optionally return a "cleanup" function.
  // If it does then the cleanup function is called every time
  // a piece of state used in the callback function changes,
  // and again if the function returned by this one is called.
  let cleanup: Cleanup | undefined;

  const computed = new Signal.Computed(() => {
    if (cleanup) cleanup();
    cleanup = callback() || undefined;
  });

  watcher.watch(computed);
  computed.get();

  // The caller of "effect" can call this returned function
  // to stop watching for state changes.
  return () => {
    watcher.unwatch(computed);
    if (cleanup) cleanup();
  };
}
