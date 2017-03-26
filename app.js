/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getDataset = getDataset;
exports.forEach = forEach;
exports.ajax = ajax;
exports.mathRound = mathRound;
exports.formatTime = formatTime;
exports.formatSecondsToTime = formatSecondsToTime;
// Because IE 10
function getDataset(element, name) {
	var value = element.getAttribute('data-' + name);
	var number = parseInt(value, 10);
	if (value === String(number)) {
		return number;
	}
	return value;
}

function forEach(elements, callback) {
	Array.prototype.forEach.call(elements, callback);
}

// AJAX mock
function ajax(props) {
	setTimeout(function () {
		props.success({ status: 'ok' });
	}, 250);
}

// Fastest math round (Math.round)
function mathRound(num) {
	return 0.5 + num << 0;
}

// Format timestamp
function formatTime(ms) {
	return formatSecondsToTime(mathRound(ms));
}

/**
 * Format Seconds To Time
 *
 * @see {@link https://jsfiddle.net/VovanR/kbx1sayd/}
 *
 * @example
 * // returns '07:40'
 * formatSecondsToTime(460000)
 *
 * @param {Number} seconds
 * @returns {String}
 */
function formatSecondsToTime(seconds) {
	if (seconds === 0 || typeof seconds !== 'number') {
		return '';
	}

	var date = new Date(seconds);
	var h = date.getUTCHours();
	var m = date.getUTCMinutes();
	var s = date.getUTCSeconds();
	var time = '';

	if (h !== 0) {
		time += h + ':';
	}

	if (m < 10) {
		m = '0' + m;
	}

	if (s < 10) {
		s = '0' + s;
	}

	time += m + ':' + s;

	return time;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

__webpack_require__(5);

var _utils = __webpack_require__(0);

/* global window */

var Action = function Action(props) {
	this._block = props.block;
	this._onActionEnd = props.onActionEnd;

	this._id = null;
	this._restTime = null;
	this._recoveryTime = null;
	this._points = null;

	this._initialize();
};

Action.prototype._initialize = function () {
	var block = this._block;

	this._id = (0, _utils.getDataset)(block, 'id');
	this._restTime = (0, _utils.getDataset)(block, 'rest-time') * 10;
	this._recoveryTime = (0, _utils.getDataset)(block, 'recovery-time') * 10;
	this._points = (0, _utils.getDataset)(block, 'points');

	this._bindControls();

	if (this._restTime > 0) {
		this._startAction();
	}
};

Action.prototype._bindControls = function () {
	var _this = this;

	this._block.addEventListener('click', function (e) {
		e.preventDefault();

		if (_this._restTime > 0) {
			return;
		}

		_this._requestAction();
	});
};

Action.prototype._requestAction = function () {
	var _this2 = this;

	(0, _utils.ajax)({
		success: function success(request) {
			if (request.status !== 'ok') {
				return;
			}

			_this2._startAction();
		}
	});
};

Action.prototype._startAction = function () {
	var _this3 = this;

	var start = null;
	var element = this._block;
	var recoveryTime = this._recoveryTime;
	var restTime = this._restTime;
	var startTime = restTime ? recoveryTime - restTime : 0;

	var step = function step(timestamp) {
		if (!start) {
			start = timestamp;
		}

		var progress = timestamp - start + startTime;
		restTime = recoveryTime - progress;

		_this3._restTime = restTime;
		element.innerText = (0, _utils.formatTime)(restTime);

		if (restTime > 0) {
			window.requestAnimationFrame(step);
		} else {
			_this3._onActionEnd(_this3._points);
			_this3._restTime = 0;
			element.innerText = '';
		}
	};

	window.requestAnimationFrame(step);
};

exports.default = Action;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(0);

var Points = function Points(props) {
	this._block = props.block;
	this._valueBlock = null;
	this._points = null;

	this._initialize();
};

Points.prototype._initialize = function () {
	var block = this._block;
	this._valueBlock = block.querySelector('.js-points__value');
	this._points = (0, _utils.getDataset)(block, 'points') || 0;
};

Points.prototype.addPoints = function (points) {
	this._setValue(this._points + points);
};

Points.prototype._setValue = function (value) {
	this._points = value;
	this._valueBlock.innerText = this._points;
};

exports.default = Points;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var _points = __webpack_require__(2);

var _points2 = _interopRequireDefault(_points);

var _action = __webpack_require__(1);

var _action2 = _interopRequireDefault(_action);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global document */

var points = new _points2.default({
	block: document.querySelector('.js-points')
});
var actions = [];

var actionBlocks = document.querySelectorAll('.js-action-list__item');
(0, _utils.forEach)(actionBlocks, function (block) {
	var action = new _action2.default({
		block: block,
		onActionEnd: function onActionEnd(value) {
			points.addPoints(value);
		}
	});

	actions.push(action);
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/***/ })
/******/ ]);