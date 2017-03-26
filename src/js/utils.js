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
