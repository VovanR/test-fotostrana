// because IE 10
export function getDataset(element, name) {
  const value = element.getAttribute(`data-${name}`)
  const number = parseInt(value)
  if (value == number) {
    return number
  }
  return value
}

export function forEach(elements, callback) {
  Array.prototype.forEach.call(elements, callback)
}

// ajax mock
export function ajax(props) {
  setTimeout(() => {
    props.success({status: 'ok'})
  }, 250)
}

// Fastest math round (Math.round)
export function mathRound(num) {
  return (0.5 + num) << 0
}

// format timestamp
export function formatTime(ms) {
  return formatSecondsToTime(mathRound(ms))
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
export function formatSecondsToTime(seconds) {
  if (seconds === 0 || typeof seconds !== 'number') {
    return ''
  }

  const date = new Date(seconds)
  let h = date.getUTCHours()
  let m = date.getUTCMinutes()
  let s = date.getUTCSeconds()
  let time = ''

  if (h !== 0) {
    time += h + ':'
  }

  if (m < 10) {
    m = '0' + m
  }

  if (s < 10) {
    s = '0' + s
  }

  time += m + ':' + s

  return time
}
