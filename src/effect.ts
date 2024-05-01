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
  // can return a cleanup function.
  // If it does then the cleanup function is called every time
  // a piece of state used in the callback function changes,
  // and again when the effect goes out of scope.
  let cleanup: Cleanup | undefined;

  const computed = new Signal.Computed(() => {
    if (cleanup) cleanup();
    cleanup = callback() || undefined;
  });

  watcher.watch(computed);
  computed.get();

  return () => {
    watcher.unwatch(computed);
    if (cleanup) cleanup();
  };
}
