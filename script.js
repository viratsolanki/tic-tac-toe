//selecting all the places
const cells = document.querySelectorAll('.col');
const restartBtn = document.getElementById('restart-btn')
var message = document.getElementById('status')
//all the winning combinations
const winningCombinations = [
    ['0', '1', '2'],
    ['0', '4', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['2', '4', '6'],
    ['3', '4', '5'],
    ['6', '7', '8']
];

const x_class = 'x'
const circle_class = 'circle'
const board = document.getElementById('board')
let xTurn = true

//sets the class on the board to change the cursor according to turns
const setClass = () => {
    board.classList.remove(x_class)
    board.classList.remove(circle_class)
    if (xTurn) {
        board.classList.add(x_class)
    } else {
        board.classList.add(circle_class)
    }
}

//function to start and restart the game
const startGame = () => {
    xTurn = true
    message.textContent = ""
    cells.forEach(cell => {
        cell.classList.remove(x_class)
        cell.classList.remove(circle_class)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setClass()
}

//it handles where to click
const handleClick = (e) => {
    const cell = e.target
    const currentClass = xTurn ? x_class : circle_class
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false, currentClass)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
    }
}

//it places the mark either x or o
const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

//it swaps turns
const swapTurns = () => {
    xTurn = !xTurn
    setClass()
}

//returns true if the combination of same marks is present in the winning combinations
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass)
      })
    })
}

//declares if it's a win or a draw
function endGame(draw, currentClass){
    if(draw){
        message.textContent = "It's a draw!!!"
    }
    else{
        message.textContent = currentClass + " is the winner!!!"
        cells.forEach(cell =>{
            cell.removeEventListener('click', handleClick)
        })
    }
}

//this function checks for a draw
function isDraw(){
    return [...cells].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

startGame()

restartBtn.addEventListener('click', startGame)