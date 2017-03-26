import {getDataset, ajax} from './utils.js'

const Action = function (props) {
  this._block = props.block
  this._onActionEnd = props.onActionEnd

  this._id = null
  this._restTime = null
  this._recoveryTime = null
  this._points = null

  this._initialize()
}

Action.prototype._initialize = function () {
  const block = this._block

  this._id = getDataset(block, 'id')
  this._restTime = getDataset(block, 'rest-time')
  this._recoveryTime = getDataset(block, 'recovery-time')
  this._points = getDataset(block, 'points')

  this._bindControls()
}

Action.prototype._bindControls = function () {
  this._block.addEventListener('click', e => {
    e.preventDefault()

    if (this._restTime > 0) {
      return
    }

    this._requestAction()
  })
}

Action.prototype._requestAction = function () {
  ajax({
    success: request => {
      if (request.status !== 'ok') {
        return
      }

      this._onActionEnd(this._points)
    }
  })
}

export default Action
