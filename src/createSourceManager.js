export const createSourceManager = ({ endpoint, onError, options = {} }) => {
  const state = {
    source: null,
    listenersByName: new Map(),
  };

  return {
    getState() {
      return state;
    },
    addEventListener(name, listener) {
      if (!state.listenersByName.size) {
        state.source = new window.EventSource(endpoint, options);
        state.source.onerror = async (err) => {
          if(err.target.readyState === 2) {
            const isConnected = await onError()
            if(isConnected) {
              state.source = new window.EventSource(endpoint, options);
            } else {
              document.location.reload()
            }
          }
        }
      }

      const listeners = state.listenersByName.get(name) || new Set();

      listeners.add(listener);

      state.listenersByName.set(name, listeners);

      state.source.addEventListener(name, listener);
      state.source.addEventListener('error', listener);
    },
    removeEventListener(name, listener) {
      const listeners = state.listenersByName.get(name) || new Set();

      listeners.delete(listener);

      state.source.removeEventListener(name, listener);

      if (!listeners.size) {
        state.listenersByName.delete(name);
      }

      if (!state.listenersByName.size) {
        state.source.close();
        state.source = null;
      }
    },
  };
};
