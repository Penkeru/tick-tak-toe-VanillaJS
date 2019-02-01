class GameBoard {
    constructor() {
        this.player1 = 'X';
        this.player2 = 'O';
        this.currentPlayer = this.player1;
        this.boardState = [];
        this.gameResult = '';
        this.boardTemplate = null;
        this.winnerBoard = null;
    }

    drawBoard(container) {
        let content = document.querySelector('link[rel="import"]').import;
        if (content) {
            this.boardTemplate = content.getElementById('gameboard-template').content.cloneNode(true);
            this.initializeBoardState();
            container.appendChild(this.boardTemplate);
        }
        else {
            alert('Browser not support imports')
        }
    }

    initializeBoardState() {
        this.boardTemplate.querySelector('#game-board').addEventListener('click', this.onBoxClicked.bind(this));
        this.boardTemplate.querySelector('#reset-button').addEventListener('click', this.resetGame.bind(this));
        this.boardState = this.boardTemplate.querySelectorAll('.box');
        this.winnerBoard = this.boardTemplate.querySelector('#winner-box');
    }

    onBoxClicked(event) {
        if (this.gameResult === '') {
            if (event.srcElement) {
                if (event.srcElement.innerHTML === '') {
                    this.updateBoard(event.srcElement);
                }
            }
            event.stopPropagation();
        }
    }

    updateBoard(box) {
        this.setPlayerSymbol(box);
        if (this.checkWin()) {
            this.reportWinner();
        }
        else {
            if(this.checkForTie()){
                this.gameResult = 'TIE';
                this.winnerBoard.innerHTML = this.gameResult;
            }
            else{
                this.switchPlayer();
            }

        }
    }

    setPlayerSymbol(box) {
        box.innerHTML = this.currentPlayer;
    }

    checkWin() {
        return this.checkRows() || this.checkCols() || this.checkDiagonal();
    }

    checkRows() {
        return (this.boardState[0].innerHTML === this.currentPlayer &&
            this.boardState[0].innerHTML === this.boardState[1].innerHTML &&
            this.boardState[0].innerHTML === this.boardState[2].innerHTML) ||
            (this.boardState[3].innerHTML === this.currentPlayer &&
                this.boardState[3].innerHTML === this.boardState[4].innerHTML &&
                this.boardState[3].innerHTML === this.boardState[5].innerHTML) ||
            (this.boardState[6].innerHTML === this.currentPlayer &&
                this.boardState[6].innerHTML === this.boardState[7].innerHTML &&
                this.boardState[6].innerHTML === this.boardState[8].innerHTML);
    }

    checkCols() {
        return (this.boardState[0].innerHTML === this.currentPlayer &&
            this.boardState[0].innerHTML === this.boardState[3].innerHTML &&
            this.boardState[0].innerHTML === this.boardState[6].innerHTML) ||
            (this.boardState[1].innerHTML === this.currentPlayer &&
                this.boardState[1].innerHTML === this.boardState[4].innerHTML &&
                this.boardState[1].innerHTML === this.boardState[7].innerHTML) ||
            (this.boardState[2].innerHTML === this.currentPlayer &&
                this.boardState[2].innerHTML === this.boardState[5].innerHTML &&
                this.boardState[2].innerHTML === this.boardState[8].innerHTML);
    }

    checkDiagonal() {
        return (this.boardState[0].innerHTML === this.currentPlayer &&
            this.boardState[0].innerHTML === this.boardState[4].innerHTML &&
            this.boardState[0].innerHTML === this.boardState[8].innerHTML) ||
            (this.boardState[2].innerHTML === this.currentPlayer &&
                this.boardState[2].innerHTML === this.boardState[4].innerHTML &&
                this.boardState[2].innerHTML === this.boardState[6].innerHTML);

    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    reportWinner() {
        if (this.currentPlayer === this.player1) {
            this.gameResult = 'Player 1 wins';
        }
        else {
            this.gameResult = 'Player 2 wins';
        }
        this.winnerBoard.innerHTML = this.gameResult;
    }

    checkForTie() {
        let tie = true;
        this.boardState.forEach((box)=>{
            if(box.innerHTML === ''){
                tie = false;
            }
        });
        return tie;
    }


    resetGame() {
        this.boardState.forEach((box) => {
            box.innerHTML = '';
        });
        this.gameResult = '';
        this.winnerBoard.innerHTML = '';
    }
}