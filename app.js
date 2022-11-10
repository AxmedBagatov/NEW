const cols = document.querySelectorAll(".col")

function generateRandomColor() {
  const hexcolor = "0123456789ABCDEF"
  let color = ""
  for (let i = 0; i < 6; i++) {
    color += hexcolor[Math.floor(Math.random() * hexcolor.length)]
  }
  return "#" + color
}

document.addEventListener("keydown", (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === "space") {
    setRandomColors()
  }
})

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type

  if (type === "lock") {
    const name =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0]
    console.log(name)

    name.classList.toggle("fa-lock")
    name.classList.toggle("fa-lock-open")
  } else if (type === "copy") {
    copyClickBoard(event.target.textContent)
    alert("Цвет сохранен")
  }
})

function copyClickBoard(text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock")
    const text = col.querySelector("h2")
    const button = col.querySelector("button")

    if (isLocked) {
      colors.push(text.textContent)
      return
    }
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random()

    if (!isInitial) colors.push(color)

    text.textContent = color
    col.style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
  })
  updateColorsHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? "black" : "white"
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1)
    })
    .join("-")
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color)
  }
  return []
}

setRandomColors(true)
