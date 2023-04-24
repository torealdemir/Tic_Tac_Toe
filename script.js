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

        if(xCount >= 3 || oCount >= 3){
            condition.forEach(index => {
                _boxes[index].classList.add('win-box');
            })
        }
        });
        return winner;
    }

})();

const startButton = document.querySelector("#start-btn")
startButton.addEventListener("click", ()=> {
    //Game.start();
})