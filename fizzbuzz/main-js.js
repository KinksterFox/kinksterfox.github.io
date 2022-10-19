const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
let currentScreen = "startscreen";

const startButton = document.getElementById('startButton')
const exitButton = document.getElementById('exitButton');

const currentScoreDisplay = document.getElementById('currentScoreDisplay');
const highScoreDisplay = document.getElementById('highScoreDisplay');
let currentScore = 0;
let currentHighScore = 0;

const attemptsDisplay = document.getElementById('attemptsDisplay');
let attemptsLeft = 3;

const numberDisplay = document.getElementById('numberDisplay');
let currentNumber = 0;

const wordsDisplay = document.getElementById('wordsDisplay');
let words = "";

const fizzButton = document.getElementById('fizzButton');
const buzzButton = document.getElementById('buzzButton');
const submitButton = document.getElementById('submitButton');
const nextButton = document.getElementById('nextButton');

startButton.addEventListener('click', switchScreen);
exitButton.addEventListener('click', switchScreen);

fizzButton.addEventListener('click', () => { addWord('Fizz'); });
buzzButton.addEventListener('click', () => { addWord('Buzz'); });
submitButton.addEventListener('click', handleSubmit);
nextButton.addEventListener('click', nextNumber);

window.addEventListener('load', () => {
    submitButton.disabled = true;
})

function switchScreen() {
    if (currentScreen == "startscreen") {
        startScreen.setAttribute("class", "hide");
        gameScreen.removeAttribute("class");
        currentScreen = "gamescreen";
    } else {
        gameScreen.setAttribute("class", "hide")
        startScreen.removeAttribute("class");
        currentScreen = "startscreen";

        updateHighScore()
    }
}

function addWord(word) {
    words += word;
    wordsDisplay.innerHTML = words;

    submitButton.disabled = false;
}

function handleSubmit() {
    

    words = "";
    wordsDisplay.innerHTML = "";

    nextButton.disabled = false;
}

function nextNumber() {
    currentNumber = Math.round(Math.random() * 30);
    numberDisplay.innerHTML = currentNumber;

    wordsDisplay.removeAttribute("class");
    submitButton.disabled = true;
}

function answerIncorrect() {
    wordsDisplay.setAttribute("class", "incorrect");
}

function answerCorrect() {
    wordsDisplay.setAttribute("class", "correct");

    currentScore++;
    currentScoreDisplay.innerHTML = `Score: ${currentScore}`;
}

function updateHighScore() {
    if (currentScore > currentHighScore) {
        currentHighScore = currentScore;
        highScoreDisplay.innerHTML = `High Score: ${currentHighScore}`;
    }

    currentScore = 0;
    currentScoreDisplay.innerHTML = `Score: ${currentScore}`;
}