const GameBoard = (function() {
    let gameBoard = new Array(9);

    const addX = function(i) {
        this.gameBoard[i] = 'X';
        let square = document.querySelector(`[data-squareNum="${i}"]`);
        square.textContent = 'X'
    }
    const addO = function(i) {
            this.gameBoard[i] = 'O';
            let square = document.querySelector(`[data-squareNum="${i}"]`);
            square.textContent = 'O'
        }
    return {gameBoard, addX, addO};
})();

const playGame = (function() {
    const gridSquare = document.querySelectorAll('.square');

    gridSquare.forEach(e => e.addEventListener('click', e => {
        let gridNum = e.target.attributes[0].value;
            GameBoard.addO(gridNum)
    }))
})();



// const player = function(name, playerNum) {
//     return {name, playerNum}
// }

// const playerOne = player('Lewis', 1);
// const playerTwo = player('Fraser', 2);
// console.log(playerOne)

