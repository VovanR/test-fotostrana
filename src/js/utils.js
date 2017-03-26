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

export function ajax(props) {
  setTimeout(() => {
    props.success({status: 'ok'})
  }, 250)
}

export function mathRound(num) {
  return (0.5 + num) << 0
}

export function formatTime(ms) {
  return formatSecondsToTime(mathRound(ms))
}

export function formatSecondsToTime(seconds) {
  if (seconds === 0 || typeof seconds !== 'number') {
    return '';
  }

  const date = new Date(seconds)
  let h = date.getUTCHours()
  let m = date.getUTCMinutes()
  let s = date.getUTCSeconds()
  let time = '';

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
