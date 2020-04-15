import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { createElement, createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createSourceManager } from './createSourceManager';
export var SSEContext = createContext(null);
export var SSEConsumer = SSEContext.Consumer;
export var SSEProvider = function SSEProvider(_ref) {
  var endpoint = _ref.endpoint,
      onError = _ref.onError,
      options = _ref.options,
      props = _objectWithoutProperties(_ref, ["endpoint", "onError", "options"]);

  var _useState = useState(function () {
    return createSourceManager({
      endpoint: endpoint,
      onError: onError,
      options: options
    });
  }),
      _useState2 = _slicedToArray(_useState, 1),
      source = _useState2[0];

  return createElement(SSEContext.Provider, _objectSpread({}, props, {
    value: source
  }));
};
SSEProvider.propTypes = {
  endpoint: PropTypes.string.isRequired,
  options: PropTypes.shape({
    withCredentials: PropTypes.bool.isRequired
  })
};
SSEProvider.defaultProps = {
  options: {
    withCredentials: false
  }
};