/* eslint-disable no-unused-vars */
const _playerFactory = (shape) => {
    const playerShape = shape;

    return {playerShape};
}

const _playerOne = _playerFactory("x");
const _playerTwo = _playerFactory("o");

const gameBoard =(() => {
    let _boardArray = ["", "", "", "", "", "", "", "", ""];


    const _message = document.getElementsByClassName("message")[0];
    const _board = document.querySelector(".container-div");
    const _boxes = document.querySelectorAll(".game-item");
    const _restartButton = document.getElementById("reset-btn");
    let _gameWinner = '';

    const renderBoard = () => {
        for(let i = 0; i < _boardArray.length; i++){
            _boxes[i].textContent = _boardArray[i];
        }
    };

    let turn = 0;

    const _checkWinner = () => {
        if(turn == 9) return "Its a draw!";

        let winner = '';

        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winConditions.forEach(condition => {
            let xCount = 0;
            let oCount = 0;
            condition.forEach(index => {
                if(_boardArray[index] == 'x'){
                    xCount++;
                }
                else if(_boardArray[index] == 'o'){
                    oCount++;
                }
            });

        (xCount >= 3) ? winner = 'x' : (oCount >= 3) ? winner = 'o' : winner;
        });

        return winner;
    }

    const _makeMove = (box_index) => {
        if(_boardArray[box_index] == '' && turn < 9 && _gameWinner == '') {
            if(turn %2 == 0) {
                _boardArray[box_index] = _playerOne.playerShape;
                _message.textContent = `Player ${_playerTwo.playerShape}'s turn`;
            }
            else {
                _boardArray[box_index] = _playerTwo.playerShape;
                _message.textContent = `Player ${_playerOne.playerShape}'s turn`;
            }

            turn++;

            renderBoard();

            _gameWinner = _checkWinner();

            if(_gameWinner != '') _announceWinner(_gameWinner);
        }
    }

    const _announceWinner = (winner) => {
        if(winner == _playerOne.playerShape || winner == _playerTwo.playerShape)
            _message.textContent = `Player ${winner} has won!`;
        else
            _message.textContent = `It's a draw!`;
    }

    const _restartGame = () => {
        turn = 0;
        _message.textContent = `Player ${_playerOne.playerShape}'s turn`;
        _boardArray = ["", "", "", "", "", "", "", "", ""];

        _gameWinner = '';

        renderBoard();
    }

    const _binding = () => {
        for(let i = 0; i < _boxes.length; i++){
            _boxes[i].setAttribute('data-index', i);
            
            // eslint-disable-next-line no-undef
            _boxes[i].addEventListener('click', _makeMove.bind(this, box_index = i));
        }

        _restartButton.addEventListener('click', _restartGame);
    };

    const init = () => {
        _restartGame();
        _binding();
    }

    return{init};

})();

gameBoard.init();

