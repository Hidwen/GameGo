const x_class = 'x'
const o_class = 'o'

const win_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById ('board')
let oturn

startgame()

function startgame() {
    oturn: false
    cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
})
    setBoardHoverClass()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oturn ? o_class : x_class
    placemark(cell, currentClass)
    if (checkwin(currentClass)) {
        console.log('winner')
    }

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

function checkwin(currentClass) {
    return win_combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}