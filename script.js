const GameBoard = (function() {
    let gameBoard = ['', '', '', '', '', '', '', '', '',];
    const resetBtn = document.getElementById('reset-btn')

    const addX = function(i) {
        this.gameBoard[i] = 'X';
        let square = document.querySelector(`[data-squareNum="${i}"]`);
        square.textContent = 'X'
        this.checkWinner()
    }
    const addO = function(i) {
        this.gameBoard[i] = 'O';
        let square = document.querySelector(`[data-squareNum="${i}"]`);
        square.textContent = 'O'
        this.checkWinner()
    }

    const checkWinner = function() {
        let arr = this.gameBoard;
        for (let i = 0; i < arr.length; i += 3) {
            if (arr[i] === undefined) continue;
            if ((arr[i] === arr[i + 1]) && (arr[i] === arr[i + 2])) {
              result(arr[i]);
              return;
            }
          }
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) continue;
            if ((arr[i] === arr[i + 3]) && (arr[i] === arr[i + 6])) {
                result(arr[i]);
              return;
            }
          }
          for (let i = 2; i <= 4; i+= 2) {
            if (arr[i] === undefined) continue;
            if ((arr[4] === arr[4 + i]) && (arr[4] === arr[4 - i])) {
                result(arr[i]);
              return;
            }
          }
          if (!(arr.some(function(e) {return e === '';}))) {this.result('tie')}
    }

    const result = function(e) {
        const resultBox = document.getElementById('result-container');
        if (e === 'O') {
            resultBox.textContent = `${playerOne.name} win!`;
            playerOne.result = 'winner';
        }
        if (e === 'X') {
            resultBox.textContent = `${playerTwo.name} win!`;
            playerTwo.result = 'winner';
        }
        if (e === 'tie') {
            playerOne.result = 'tie';
            playerTwo.result = 'tie';
            resultBox.textContent = 'tie!'
        }
    }
    const resetGame = function() {
        GameBoard.gameBoard = ['', '', '', '', '', '', '', '', '',];
        let gridSquare = document.querySelectorAll('.square');
        let announceBox = document.getElementById('announce-container');
        let resultBox = document.getElementById('result-container');
        gridSquare.forEach(e => e.textContent = '')
        announceBox.textContent = `${playerOne.name}'s turn (O)`;
        playerOne.result = '';
        playerTwo.result = '';
        resultBox.textContent = ''
    }
    resetBtn.addEventListener('click', () => resetGame())

    return {gameBoard, addX, addO, checkWinner, result, resetGame};
})();

const playGame = (function() {
    let gridSquare = document.querySelectorAll('.square');
    let announceBox = document.getElementById('announce-container')
    let addPlayerBtn = document.querySelectorAll('.addPlayerBtn')
    gridSquare.forEach(e => e.addEventListener('click', e => {
        let gridNum = e.target.attributes[0].value;
            if (e.target.textContent.length > 0) return;
            if (playerOne.result !== '' || playerTwo.result !== '') return;
            if (playerOne.active === true) {
                GameBoard.addO(gridNum)
                playerOne.toggleActive();
                playerTwo.toggleActive();
                announceBox.textContent = `${playerTwo.name}'s turn (X)`;
                return;
            }
            if (playerOne.active === false) {
                GameBoard.addX(gridNum)
                playerOne.toggleActive();
                playerTwo.toggleActive();
                announceBox.textContent = `${playerOne.name}'s turn (O)`;
                return;
            }
    }))
    addPlayerBtn.forEach(e => e.addEventListener('click', e => {
        let btnNum = e.target.attributes[1].value;
        let player = document.querySelector(`[data-player-input="${btnNum}"]`);
        if (player.id === 'player1') {playerOne.name = player.value}
        if (player.id === 'player2') {playerTwo.name = player.value}
    }))

})();

// player factory function
const player = function(name, active) {
    toggleActive = function() {
        this.active = !this.active;
    }
    return {name, active, toggleActive, result: ''}
}

const playerOne = player(`player 1`, true);
const playerTwo = player(`player 2`, false);


