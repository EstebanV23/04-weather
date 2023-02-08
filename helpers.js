const render = (element, child) => {
  element.innerHTML = child
}

const elementById = (id) => {
  return document.getElementById(id)
}

export { elementById, render }
