document.addEventListener('DOMContentLoaded', () => {
    const playerXName = localStorage.getItem('playerXName') || 'Player X';
    const playerOName = localStorage.getItem('playerOName') || 'Player O';
    const playerXNameDiv = document.getElementById('playerXName');
    const playerONameDiv = document.getElementById('playerOName');
    const message = document.getElementById('message');
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const handleCellClick = (index) => {
        if (gameActive && boardState[index] === '') {
            boardState[index] = currentPlayer;
            renderBoard();
            if (checkWin()) {
                message.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} wins!`;
                gameActive = false;
            } else if (checkDraw()) {
                message.textContent = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `It's ${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
            }
        }
    };

    const checkWin = () => {
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    };

    const checkDraw = () => {
        return !boardState.includes('');
    };

    const renderBoard = () => {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.textContent = boardState[i];
            cellDiv.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cellDiv);

            if ((i + 1) % 3 === 0) {
                const breakDiv = document.createElement('div');
                breakDiv.classList.add('break');
                board.appendChild(breakDiv);
            }
        }
    };

    restartBtn.addEventListener('click', () => {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        renderBoard();
        message.textContent = `It's ${playerXName}'s turn`;
    });

    playerXNameDiv.textContent = `${playerXName}: X`;
    playerONameDiv.textContent = `${playerOName}: O`;
    renderBoard();
    message.textContent = `It's ${playerXName}'s turn`;
});
