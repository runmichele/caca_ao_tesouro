const gridSize = 5;
let treasureRow = Math.floor(Math.random() * gridSize);
let treasureCol = Math.floor(Math.random() * gridSize);
let timer;
let timeLeft = 30; // Tempo inicial em segundos

function createGrid() {
    const grid = document.getElementById('grid');
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => checkCell(row, col, cell));
            grid.appendChild(cell);
        }
    }
}

function checkCell(row, col, cell) {
    const message = document.getElementById('message');
    const distance = Math.abs(treasureRow - row) + Math.abs(treasureCol - col);
    const foundSound = document.getElementById('found-sound');

    if (row === treasureRow && col === treasureCol) {
        cell.classList.add('found');
        message.textContent = 'Você encontrou o tesouro!';
        clearInterval(timer);
        foundSound.play();
    } else {
        if (distance <= 1) {
            cell.classList.add('hot');
            message.textContent = 'Está muito quente!';
        } else if (distance <= 2) {
            cell.classList.add('warm');
            message.textContent = 'Está quente!';
        } else {
            cell.classList.add('cold');
            message.textContent = 'Está frio!';
        }

        // Reduzir o tempo em 2 segundos para cada clique incorreto
        timeLeft -= 2;
        if (timeLeft <= 0) {
            timeLeft = 0;
            clearInterval(timer);
            message.textContent = 'O tempo acabou! Você perdeu!';
        }

        document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
    }

    cell.removeEventListener('click', () => checkCell(row, col, cell));
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('message').textContent = 'O tempo acabou! Você perdeu!';
        }
    }, 1000);
}

createGrid();
startTimer();
