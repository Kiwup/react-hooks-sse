"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSSE = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _SSEContext = require("./SSEContext");

var useSSE = function useSSE(eventName) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === void 0 ? null : _ref$initialState,
      _ref$stateReducer = _ref.stateReducer,
      stateReducer = _ref$stateReducer === void 0 ? function (_, changes) {
    return changes;
  } : _ref$stateReducer,
      _ref$parser = _ref.parser,
      parser = _ref$parser === void 0 ? function (data) {
    return JSON.parse(data);
  } : _ref$parser,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? _SSEContext.SSEContext : _ref$context;

  var source = (0, _react.useContext)(context);

  var _useReducer = (0, _react.useReducer)(stateReducer, initialState),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    var listener = function listener(event) {
      var data = parser(event.data);
      dispatch({
        event: event,
        data: data
      });
    };

    source.addEventListener(eventName, listener);
    return function () {
      source.removeEventListener(eventName, listener);
    };
  }, []);
  return state;
};

exports.useSSE = useSSE;