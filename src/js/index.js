import '../css/index.css';
import Points from './points.js'
import Action from './action.js';
import {forEach} from './utils.js';

const points = new Points({
  block: document.querySelector('.js-points')
})
const actions = []

const actionBlocks = document.querySelectorAll('.js-action-list__item')
forEach(actionBlocks, block => {
  const action = new Action({
    block,
    onActionEnd: value => {
      points.addValue(value)
    }
  })

  actions.push(action)
})
