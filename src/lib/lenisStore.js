// src/lib/lenisStore.js
//
// Tiny shared singleton so any component (like StarField) can get access
// to the Lenis instance created inside useLenis.js, without needing
// context/props drilling. Also handles the timing issue where StarField
// might mount before or after useLenis() runs.

let lenisInstance = null;
const readyListeners = new Set();

export function setLenisInstance(instance) {
  lenisInstance = instance;
  if (instance) {
    readyListeners.forEach((cb) => cb(instance));
  }
}

export function getLenisInstance() {
  return lenisInstance;
}

// Subscribe to be notified once Lenis is ready (fires immediately if
// it's already set up). Returns an unsubscribe function.
export function onLenisReady(callback) {
  if (lenisInstance) callback(lenisInstance);
  readyListeners.add(callback);
  return () => readyListeners.delete(callback);
}