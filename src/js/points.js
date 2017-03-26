import {getDataset} from './utils.js'

const Points = function (props) {
  this._block = props.block
  this._valueBlock = null
  this._points = null

  this._initialize()
}

Points.prototype._initialize = function () {
  const block = this._block
  this._valueBlock = block.querySelector('.js-points__value')
  this._points = getDataset(block, 'points') || 0
}

Points.prototype.addPoints = function (points) {
  this._setValue(this._points + points)
}

Points.prototype._setValue = function (value) {
  this._points = value
  this._valueBlock.innerText = this._points
}

export default Points
