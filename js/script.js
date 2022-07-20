// utilizar o DOM para pegar o datacell do HTML e guardar em uma const (semelhante à variável)
const elementsCell = document.querySelectorAll('[data-cell]')
const game = document.querySelector('[data-game]')
const winningMessageText =  document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn // verificar se é a vez do círculo

const winningCombinations = [ //em listas/array
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    for (const cell of elementsCell) {
        cell.classList.remove('circle')
        cell.classList.remove('x')
        cell.removeEventListener('click', changeClick)

        cell.addEventListener('click', changeClick, { once: true })
    }

    isCircleTurn = false

    game.classList.add('x')

    winningMessage.classList.remove('show-winning-message')
}

const endGame = (empate) => { // empate = draw
    if (empate) {
        winningMessageText.innerText = "Empate!"
    } else {
        winningMessageText.innerText = isCircleTurn ? "Círculo Venceu!" : "X Venceu!"
    }

    winningMessage.classList.add("show-winning-message")
}

//chegar qual é o vencedor
const isWinner = (currentPlayer) => {
    // verificar se alguma combinacao é preenchida
    return winningCombinations.some((combinations) => {
        return combinations.every((index) => {
            return elementsCell[index].classList.contains(currentPlayer)
        })
    })
}

const mark = (cell, addClass) => {
    cell.classList.add(addClass)
}



const symbolChange = () => {
    isCircleTurn = !isCircleTurn

    game.classList.remove('circle')
    game.classList.remove('x')

    if (isCircleTurn) {
        game.classList.add('circle')
    } else {
        game.classList.add('x')
    }
}

const changeClick = (e) => {
    // colocar X ou circle
    const cell = e.target
    const addClass = isCircleTurn ? "circle" : "x"

    mark(cell, addClass)

    // verificar por vitória
    const isWin = isWinner(addClass)

    // verificar por empate
    if (isWin) {
        endGame(false)
    }
    // mudar símbolo
    symbolChange()
} 

for (const cell of elementsCell) {
    // adicionar evento em cada célula e chama a funcao
    cell.addEventListener('click', changeClick, { once: true })
}

startGame()

//funcao para o botao reiniciar
restartButton.addEventListener('click', startGame)
