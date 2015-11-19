'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noOp = noOp;
exports.restore = restore;
exports.default = register;
var DEFAULT_EXTENSIONS = exports.DEFAULT_EXTENSIONS = ['.css', '.scss', '.sass', '.stylus', '.less'];

var oldHandlers = exports.oldHandlers = {};

function noOp() {}

function restore() {
  for (var ext in oldHandlers) {
    if (oldHandlers[ext] === undefined) {
      delete require.extensions[ext];
    } else {
      require.extensions[ext] = oldHandlers[ext];
    }
  }

  exports.oldHandlers = oldHandlers = {};
}

function register() {
  var extensions = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_EXTENSIONS : arguments[0];

  restore();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var ext = _step.value;

      oldHandlers[ext] = require.extensions[ext];
      require.extensions[ext] = noOp;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

// Run at import
register();

//# sourceMappingURL=ignore-styles.js.map