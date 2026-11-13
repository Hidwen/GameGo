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
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let oturn

//Score system tracks
const scores= {x:0, o:0, draw:0}

const scoreXElement = document.getElementById('scoreX')
const scoreOElement = document.getElementById('scoreO')
const scoreDrawElement = document.getElementById('scoreDraw')
const resetScoreButton = document.getElementById('resetScoreButton')

startgame()

restartButton.addEventListener('click', startgame)
resetScoreButton.addEventListener('click', resetScores)


function startgame() {
   // oturn: false
    cellElements.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
})
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oturn ? o_class : x_class
    placemark(cell, currentClass)
    if (checkwin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
    swapturns()
    setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
        scores.draw++
    } else {
        winningMessageTextElement.innerText = `${oturn ? "O's" : "X's"} Wins!`
        if (oturn) {
            scores.o++
        } else {
            scores.x++
        }
    }
    updateScoreBoard()
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
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

function updateScoreBoard() {
    scoreDrawElement.innerText = scores.draw
    scoreOElement.innerText = scores.o
    scoreXElement.innerText = scores.x
}

function resetScores() {
    scores.x = 0
    scores.o = 0
    scores.draw = 0
    updateScoreBoard()
}