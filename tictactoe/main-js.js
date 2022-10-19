// Init Variables
const ttt = document.getElementById('ttt');
const turnDisplay = document.getElementById('turnDisplay');
const resetButton = document.getElementById('reset');

let lastPlayer;
let currentPlayer = 'X';
let turnCounter = 0;
let roundWon = false;

turnDisplay.textContent = `It's ${currentPlayer}'s turn`;

// Create Grid
function createGrid() {
    for (let r = 1; r <= 3; r++) {
        for (let c = 1; c <= 3; c++) {
            let gridItem = document.createElement("div")
            gridItem.setAttribute("class", "grid-item")
            gridItem.setAttribute("id", `${r}.${c}`)
            gridItem.textContent = '';

            ttt.append(gridItem);
        }
    }
}
createGrid();

// Gameplay
const tttB = document.querySelectorAll('div[class="grid-item"]');

for (let tttBIndex = 0; tttBIndex < tttB.length; tttBIndex++) {
    tttB[tttBIndex].addEventListener('click', handleClick);
}

function handleClick(e) {

    markBox(e)
    checkWinner();

    if (turnCounter == tttB.length && roundWon == false) {
        turnDisplay.textContent = "It's a tie!";
    }
}

function markBox(e) {
    if (e.target.textContent == '' && roundWon == false) {
        e.target.textContent = currentPlayer;
        changePlayer();
    }
}

function changePlayer() {
    if (roundWon == false) {
        lastPlayer = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnDisplay.textContent = `It's ${currentPlayer}'s turn`
        turnCounter++;
    }
}

resetButton.addEventListener('click', () => {
    turnCounter = 0;
    roundWon = false;
    currentPlayer = 'X';
    turnDisplay.textContent = `It's ${currentPlayer}'s turn`;
    tttB.forEach(e => { e.textContent = ''; })
})

function checkWinner() {
    for (let r = 0; r <= 2; r++) {
        for (let i = 0; i <= 2; i++) {
            if (tttB[r * 3].textContent != '' && tttB[r * 3 + 1].textContent != '' && tttB[r * 3 + 2].textContent != '') {
                if (
                    tttB[r * 3 + 1].textContent == tttB[r * 3].textContent
                    &&
                    tttB[r * 3 + 2].textContent == tttB[r * 3].textContent
                ) {
                    turnDisplay.textContent = `${lastPlayer} won the match!`;
                    roundWon = true;
                }
            }
        }
    }

    for (let c = 0; c <= 2; c++) {
        for (let i = 0; i <= 2; i++) {
            if (tttB[c].textContent != '' && tttB[c + 3].textContent != '' && tttB[c + 6].textContent != '') {
                if (
                    tttB[c + 3].textContent == tttB[c].textContent
                    &&
                    tttB[c + 6].textContent == tttB[c].textContent
                ) {
                    turnDisplay.textContent = `${lastPlayer} won the match!`;
                    roundWon = true;
                }
            }
        }
    }

    if (tttB[0].textContent != '' && tttB[4].textContent != '' && tttB[8].textContent != '') {
        if (tttB[4].textContent == tttB[0].textContent & tttB[8].textContent == tttB[0].textContent) {
            turnDisplay.textContent = `${lastPlayer} won the match!`;
            roundWon = true;
        }
    }

    if (tttB[2].textContent != '' && tttB[4].textContent != '' && tttB[6].textContent != '') {
        if (tttB[4].textContent == tttB[2].textContent & tttB[6].textContent == tttB[2].textContent) {
            turnDisplay.textContent = `${lastPlayer} won the match!`;
            roundWon = true;
        }
    }
}