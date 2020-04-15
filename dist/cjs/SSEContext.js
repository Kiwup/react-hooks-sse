"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SSEProvider = exports.SSEConsumer = exports.SSEContext = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createSourceManager = require("./createSourceManager");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SSEContext = (0, _react.createContext)(null);
exports.SSEContext = SSEContext;
var SSEConsumer = SSEContext.Consumer;
exports.SSEConsumer = SSEConsumer;

var SSEProvider = function SSEProvider(_ref) {
  var endpoint = _ref.endpoint,
      onError = _ref.onError,
      options = _ref.options,
      props = (0, _objectWithoutProperties2.default)(_ref, ["endpoint", "onError", "options"]);

  var _useState = (0, _react.useState)(function () {
    return (0, _createSourceManager.createSourceManager)({
      endpoint: endpoint,
      onError: onError,
      options: options
    });
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      source = _useState2[0];

  return (0, _react.createElement)(SSEContext.Provider, _objectSpread({}, props, {
    value: source
  }));
};

exports.SSEProvider = SSEProvider;
SSEProvider.propTypes = {
  endpoint: _propTypes.default.string.isRequired,
  options: _propTypes.default.shape({
    withCredentials: _propTypes.default.bool.isRequired
  })
};
SSEProvider.defaultProps = {
  options: {
    withCredentials: false
  }
};