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
            if (playerOne.active === true) {
                GameBoard.addO(gridNum)
                playerOne.toggleActive();
                playerTwo.toggleActive();
                return;
            }
            if (playerOne.active === false) {
                GameBoard.addX(gridNum)
                playerOne.toggleActive();
                playerTwo.toggleActive();
                return;
            }
    }))
})();


const player = function(active) {
    toggleActive = function() {
        this.active = !this.active;
    }
    return {active, toggleActive}
}

const playerOne = player(true);
const playerTwo = player(false);


