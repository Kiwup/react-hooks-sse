"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSourceManager = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-param-reassign */
var closedConnectionHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, onError, endpoint, options, src, listenersByName) {
    var _yield$onError, isConnected;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(err.target.readyState === 2)) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return onError();

          case 3:
            _yield$onError = _context.sent;
            isConnected = _yield$onError.isConnected;

            if (isConnected) {
              src = new window.EventSource(endpoint, options); // eslint-disable-next-line no-shadow

              src.onerror = function (err) {
                return closedConnectionHandler(err, onError, endpoint, options, src, listenersByName);
              };

              listenersByName.forEach(function (listener, name) {
                src.addEventListener(name, listener.entries().next().value[0]);
              });
            } else {
              window.location.reload();
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function closedConnectionHandler(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var createSourceManager = function createSourceManager(_ref2) {
  var endpoint = _ref2.endpoint,
      onError = _ref2.onError,
      _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? {} : _ref2$options;
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

        state.source.onerror = function (err) {
          return closedConnectionHandler(err, onError, endpoint, options, state.source, state.listenersByName);
        };
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

exports.createSourceManager = createSourceManager;