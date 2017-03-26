/* global window */

import './vendor/rAF.js';
import {getDataset, ajax, formatTime} from './utils.js';

const Action = function (props) {
	this._block = props.block;
	this._onActionEnd = props.onActionEnd;

	this._id = null;
	this._restTime = null;
	this._recoveryTime = null;
	this._points = null;

	this._initialize();
};

Action.prototype._initialize = function () {
	const block = this._block;

	this._id = getDataset(block, 'id');
	this._restTime = getDataset(block, 'rest-time') * 1000;
	this._recoveryTime = getDataset(block, 'recovery-time') * 1000;
	this._points = getDataset(block, 'points');

	this._bindControls();

	if (this._restTime > 0) {
		this._startAction();
	}
};

Action.prototype._bindControls = function () {
	this._block.addEventListener('click', e => {
		e.preventDefault();

		if (this._restTime > 0) {
			return;
		}

		this._requestAction();
	});
};

Action.prototype._requestAction = function () {
	ajax({
		success: request => {
			if (request.status !== 'ok') {
				return;
			}

			this._startAction();
		}
	});
};

Action.prototype._startAction = function () {
	let start = null;
	const element = this._block;
	const recoveryTime = this._recoveryTime;
	let restTime = this._restTime;
	const startTime = restTime ? recoveryTime - restTime : 0;

	const step = timestamp => {
		if (!start) {
			start = timestamp;
		}

		const progress = timestamp - start + startTime;
		restTime = recoveryTime - progress;

		this._restTime = restTime;
		element.innerText = formatTime(restTime);

		if (restTime > 0) {
			window.requestAnimationFrame(step);
		} else {
			this._onActionEnd(this._points);
			this._restTime = 0;
			element.innerText = '';
		}
	};

	window.requestAnimationFrame(step);
};

export default Action;
