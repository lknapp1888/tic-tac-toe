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
        let announceBox = document.getElementById('announce-container');
        if (e === 'O') {
            resultBox.textContent = `${playerOne.name} wins!`;
            playerOne.result = 'winner';
            announceBox.textContent = '';
        }
        if (e === 'X') {
            resultBox.textContent = `${playerTwo.name} wins!`;
            playerTwo.result = 'winner';
            announceBox.textContent = '';
        }
        if (e === 'tie') {
            playerOne.result = 'tie';
            playerTwo.result = 'tie';
            resultBox.textContent = 'tie!'
            announceBox.textContent = '';
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
        playerOne.active = true;
        playerTwo.active = false;
        resultBox.textContent = ''
    }
    resetBtn.addEventListener('click', () => resetGame())

    return {gameBoard, addX, addO, checkWinner, result, resetGame};
})();

const playGame = (function() {
    const gridSquare = document.querySelectorAll('.square');
    const announceBox = document.getElementById('announce-container')
    const addPlayerBtn = document.querySelectorAll('.addPlayerBtn')
    const startBtn = document.getElementById('start-btn');
    let gameActive = false;

    const gameToggle = function() {
        if ((playerOne.name === '') || (playerTwo.name === '')) return;
        this.gameActive = !gameActive;
        announceBox.textContent = `${playerOne.name}'s turn (O)`;
    }

    startBtn.addEventListener('click', () => {
        if ((playerOne.name === '') || (playerTwo.name === '')) {
            let resultBox = document.getElementById('result-container');
            resultBox.textContent = 'Enter player names!';
        }
        if (this.gameActive) return;
        gameToggle()
        ;})

    gridSquare.forEach(e => e.addEventListener('click', e => {
        let gridNum = e.target.attributes[0].value;
            if (e.target.textContent.length > 0) return;
            if (!this.gameActive) return;
            if (playerOne.result !== '' || playerTwo.result !== '') return;
            if (playerOne.active === true) {
                announceBox.textContent = `${playerTwo.name}'s turn (X)`;
                GameBoard.addO(gridNum)
                playerOne.toggleActive();
                playerTwo.toggleActive();
                return;
            }
            if (playerOne.active === false) {
                announceBox.textContent = `${playerOne.name}'s turn (O)`;
                GameBoard.addX(gridNum)
                playerOne.toggleActive();
                playerTwo.toggleActive();
                return;
            }
    }))

    addPlayerBtn.forEach(e => e.addEventListener('click', e => {
        let btnNum = e.target.attributes[1].value;
        let player = document.querySelector(`[data-player-input="${btnNum}"]`);
        let playerDisp = document.querySelector(`[data-player-disp="${btnNum}"]`)
        if (player.id === 'player1') {
            if (player.value.length < 1) return;
            playerOne.name = player.value;
            player.value= '';}
            playerDisp.textContent = playerOne.name;
            //toggle start btn ready
            if (playerTwo.name.length > 1) {startBtn.classList.replace('inactive', 'active')}
        if (player.id === 'player2') {
            if (player.value.length < 1) return;
            playerTwo.name = player.value;
            player.value= '';
            playerDisp.textContent = playerTwo.name;
            //toggle start btn ready
            if (playerOne.name.length > 1) {startBtn.classList.replace('inactive', 'active')}}
    }))

})();

// player factory function
const player = function(name, active) {
    toggleActive = function() {
        this.active = !this.active;
    }
    return {name, active, toggleActive, result: ''}
}

const playerOne = player(``, true);
const playerTwo = player(``, false);


