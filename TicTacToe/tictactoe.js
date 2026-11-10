const x_class = 'x'
const o_class = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById ('board')
let oturn

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
})

function handleClick(e) {
    const cell = e.target
    const currentClass = oturn? o_class : x_class
    placemark(cell, currentClass)
    

    swapturns()
    setBoardHoverClass()
}

function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapturns() {
    oturn = !oturn
}

function setBoardHoverClass() {
    board.classList.remove(x_class)
    board.classList.remove(o_class)
    if (oturn) {
        board.classList.add(o_class)
    } else {
        board.classList.add(x_class)
    }
}