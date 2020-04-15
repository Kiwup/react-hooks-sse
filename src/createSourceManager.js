/* eslint-disable no-param-reassign */
const closedConnectionHandler = async (
  err,
  onError,
  endpoint,
  options,
  src,
  listenersByName
) => {
  if (err.target.readyState === 2) {
    const { isConnected } = await onError();
    if (isConnected) {
      src = new window.EventSource(endpoint, options);
      // eslint-disable-next-line no-shadow
      src.onerror = err =>
        closedConnectionHandler(
          err,
          onError,
          endpoint,
          options,
          src,
          listenersByName
        );
      listenersByName.forEach((listener, name) => {
        src.addEventListener(name, listener.entries().next().value[0]);
      });
    } else {
      window.location.reload();
    }
  }
};

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
        state.source.onerror = err =>
          closedConnectionHandler(
            err,
            onError,
            endpoint,
            options,
            state.source,
            state.listenersByName
          );
      }

      const listeners = state.listenersByName.get(name) || new Set();

      listeners.add(listener);

      state.listenersByName.set(name, listeners);

      state.source.addEventListener(name, listener);
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
