import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useContext, useReducer, useEffect } from 'react';
import { SSEContext } from './SSEContext';
export var useSSE = function useSSE(eventName) {
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
      context = _ref$context === void 0 ? SSEContext : _ref$context;

  var source = useContext(context);

  var _useReducer = useReducer(stateReducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  useEffect(function () {
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