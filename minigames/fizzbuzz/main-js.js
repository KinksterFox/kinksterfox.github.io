const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');

const startButton = document.getElementById('startButton')
const exitButton = document.getElementById('exitButton');

const attemptsUI = document.getElementById('attemptsUI');
const currentScoreUI = document.getElementById('currentScoreUI');
const lastScoreUI = document.getElementById('lastScoreUI')
const highScoreUI = document.getElementById('highScoreUI');
const numberUI = document.getElementById('numberUI');
const wordsUI = document.getElementById('wordsUI');

const fizzButton = document.getElementById('fizzButton');
const buzzButton = document.getElementById('buzzButton');
const submitButton = document.getElementById('submitButton');
const nextButton = document.getElementById('nextButton');

startButton.addEventListener('click', switchScreen);
exitButton.addEventListener('click', switchScreen);

fizzButton.addEventListener('click', () => { addWord(fizzButton.value); });
buzzButton.addEventListener('click', () => { addWord(buzzButton.value); });
submitButton.addEventListener('click', handleSubmit);
nextButton.addEventListener('click', nextNumber);

const gameState = {
    currentScreen: startScreen,
    currentScore: 0,
    currentHighScore: 0,
    attemptsLeft: 3,
    currentNumber: 0,
    words: "",
}

if (localStorage.getItem("currentHighScore")) {
    gameState.currentHighScore = localStorage.getItem("currentHighScore");
    highScoreUI.innerHTML = `High Score: ${gameState.currentHighScore}`;
}

function switchScreen() {
    if (gameState.currentScreen == startScreen) {
        startScreen.setAttribute("class", "hide");
        gameScreen.removeAttribute("class");
        gameState.currentScreen = gameScreen;

        resetGame();
    } else {
        gameScreen.setAttribute("class", "hide")
        startScreen.removeAttribute("class");
        gameState.currentScreen = startScreen;

        resetGame();
    }
}

function nextNumber() {
    gameState.currentNumber = Math.ceil(Math.random() * 30);
    numberUI.innerHTML = gameState.currentNumber;

    gameState.words = "";
    wordsUI.innerHTML = "";
    wordsUI.removeAttribute("class");

    fizzButton.disabled = false;
    buzzButton.disabled = false;
    submitButton.disabled = false;
    nextButton.disabled = true;
}

function addWord(word) {
    if (gameState.words.includes(word)) {
        gameState.words = gameState.words.replace(word, "");
    } else {
        gameState.words += word;
    }

    wordsUI.innerHTML = gameState.words;
}

function handleSubmit() {
    if ((gameState.currentNumber % 3) == 0 && (gameState.currentNumber % 5) == 0) {
        if (gameState.words.includes("Fizz") && gameState.words.includes("Buzz")) {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "FizzBuzz";
        }
    } else if ((gameState.currentNumber % 3) == 0) {
        if (gameState.words == "Fizz") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "Fizz";
        }
    } else if ((gameState.currentNumber % 5) == 0) {
        if (gameState.words == "Buzz") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "Buzz";
        }
    }

    if ((gameState.currentNumber % 3) != 0 && (gameState.currentNumber % 5) != 0) {
        if (gameState.words == "") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "";
        }
    }

    /*     if ((gameState.currentNumber % 3) == 0 || (gameState.currentNumber % 5) == 0) {
            if (gameState.words == "") {
                answerIncorrect();
            }
        } */

    fizzButton.disabled = true;
    buzzButton.disabled = true;
    submitButton.disabled = true;
    nextButton.disabled = false;
}

function answerCorrect() {
    wordsUI.setAttribute("class", "correct");

    gameState.currentScore++;
    currentScoreUI.innerHTML = `Score: ${gameState.currentScore}`;
}

function answerIncorrect() {
    wordsUI.setAttribute("class", "incorrect");

    attemptsUI.innerHTML = attemptsUI.innerHTML.slice(1, attemptsUI.innerHTML.length);
    gameState.attemptsLeft--;

    if (gameState.attemptsLeft == 0) {
        switchScreen();
    }
}

function updateHighScore() {
    if (gameState.currentScore > gameState.currentHighScore) {
        gameState.currentHighScore = gameState.currentScore;
        highScoreUI.innerHTML = `New High Score: ${gameState.currentHighScore}!`;
        localStorage.setItem("currentHighScore", gameState.currentHighScore)
    } else {
        highScoreUI.innerHTML = `High Score: ${gameState.currentHighScore}`;
    }

    if (gameState.currentScore != 0) {
        lastScoreUI.innerHTML = `Last Score: ${gameState.currentScore}`;
        gameState.currentScore = 0;
        currentScoreUI.innerHTML = `Score: 0`;
    }
}

function resetGame() {
    nextNumber();
    updateHighScore();
    gameState.attemptsLeft = 3;
    attemptsUI.innerHTML = '♥♥♥';
}