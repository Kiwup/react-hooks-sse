import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
export var createSourceManager = function createSourceManager(_ref) {
  var endpoint = _ref.endpoint,
      onError = _ref.onError,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
  var state = {
    source: null,
    listenersByName: new Map()
  };
  return {
    getState: function getState() {
      return state;
    },
    addEventListener: function addEventListener(name, listener) {
      if (!state.listenersByName.size) {
        state.source = new window.EventSource(endpoint, options);

        state.source.onerror = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(err) {
            var isConnected;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(err.target.readyState === 2)) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 3;
                    return onError();

                  case 3:
                    isConnected = _context.sent;

                    if (isConnected) {
                      state.source = new window.EventSource(endpoint, options);
                    } else {
                      document.location.reload();
                    }

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }();
      }

      var listeners = state.listenersByName.get(name) || new Set();
      listeners.add(listener);
      state.listenersByName.set(name, listeners);
      state.source.addEventListener(name, listener);
    },
    removeEventListener: function removeEventListener(name, listener) {
      var listeners = state.listenersByName.get(name) || new Set();
      listeners.delete(listener);
      state.source.removeEventListener(name, listener);

      if (!listeners.size) {
        state.listenersByName.delete(name);
      }

      if (!state.listenersByName.size) {
        state.source.close();
        state.source = null;
      }
    }
  };
};