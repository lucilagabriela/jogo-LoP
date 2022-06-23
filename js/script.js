// utilizar o DOM para pegar o datacell do HTML e guardar em uma const (semelhante à variável)
const elementosCelula = document.querySelectorAll('[data-cell');
const board = document.querySelector("[data-board]")
const mensagemTextoVencedor = document.querySelector('[data-mensagem-vencedor-texto')

let isCircleTurn;

const combinacaoVitorias = [ //em listas/array
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const checkParaVencer = (currentPlayer) => {
    return combinacaoVitorias.some(combinacao => { //se algumas das combinacoes estao inteiramente preenchidas
        return combinacao.every(index => {
            return elementosCelula[index].classList.contains(currentPlayer)
        })
    })
}

const placeMark = (cell, classAdicionar) => {
    cell.classList.add(classAdicionar)
}

const fimDeJogo = (empate) => {

}

const trocaDeSimbolo = () => {
    isCircleTurn = !isCircleTurn //define o inverso do circleturn, ou seja, é falso

    board.classList.remove("circle")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

const handleClick = (e) => { // vai checar se é a vez do circulo
    // colocar X ou circulo
    const cell = e.target;
    const classAdicionar = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classAdicionar)

    //verificar por vitoria
    const vencedor = checkParaVencer(classAdicionar)

    //verificar por empate

    //mudar o símbolo
    trocaDeSimbolo() // chamada da funcao
}

for (const cell of elementosCelula) {
    cell.addEventListener("click", handleClick, { once: true});

}

