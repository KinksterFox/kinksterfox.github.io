// Screen
const startScreen = document.getElementById('startScreen');
const optionsScreen = document.getElementById('optionsScreen');
const gameScreen = document.getElementById('gameScreen');

// UI
const attemptsUI = document.getElementById('attemptsUI');
const currentScoreUI = document.getElementById('currentScoreUI');
const lastScoreUI = document.getElementById('lastScoreUI')
const highScoreUI = document.getElementById('highScoreUI');
const numberUI = document.getElementById('numberUI');
const wordsUI = document.getElementById('wordsUI');

// Options
const numberRangeOption = document.getElementById('numberRangeOption')
const fizzBuzzOption = document.getElementById('numfizzBuzzOptionberRange')
const fooBarOption = document.getElementById('fooBarOption')
const fizzBuzzFooBarOptions = document.getElementById('fizzBuzzFooBarOptions')

numberRangeOption.addEventListener('input', () => {
    gameState.numberRange = numberRangeOption.value;
    localStorage.setItem("numberRange", gameState.numberRange)
})

// Menu Buttons
const startButton = document.getElementById('startButton')
const optionsButton = document.getElementById('optionsButton')
const exitOptions = document.getElementById('exitOptions')
const exitGame = document.getElementById('exitGame');


// Game Buttons
const fizzButton = document.getElementById('fizzButton');
const buzzButton = document.getElementById('buzzButton');
const submitButton = document.getElementById('submitButton');
const nextButton = document.getElementById('nextButton');

startButton.addEventListener('click', switchScreen);
exitGame.addEventListener('click', switchScreen);

optionsButton.addEventListener('click', () => {
    startScreen.setAttribute("class", "hide");
    optionsScreen.removeAttribute("class");
});

exitOptions.addEventListener('click', () => {
    optionsScreen.setAttribute("class", "hide");
    startScreen.removeAttribute("class");
})

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

const gameState = {
    currentScreen: startScreen,
    currentScore: 0,
    currentHighScore: 0,
    attemptsLeft: 3,
    currentNumber: 0,
    numberRange: 30,
    words: "",
}

if (localStorage.getItem("currentHighScore")) {
    gameState.currentHighScore = localStorage.getItem("currentHighScore");
    highScoreUI.innerHTML = `High Score: ${gameState.currentHighScore}`;
}

if (localStorage.getItem("numberRange")) {
    gameState.numberRange = localStorage.getItem("numberRange");
    numberRangeOption.value = localStorage.getItem("numberRange");
}

fizzButton.addEventListener('click', () => {
    if (gameState.words.includes(fizzButton.value)){
        fizzButton.classList.toggle("toggled");
    } else {
        fizzButton.classList.toggle("toggled");
    }
    addWord(fizzButton.value);
});
buzzButton.addEventListener('click', () => {
    if (gameState.words.includes(buzzButton.value)){
        buzzButton.classList.toggle("toggled");
    } else {
        buzzButton.classList.toggle("toggled");
    }
    addWord(buzzButton.value);
});

submitButton.addEventListener('click', handleSubmit);
nextButton.addEventListener('click', nextNumber);

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

    fizzButton.disabled = true;
    buzzButton.disabled = true;
    submitButton.disabled = true;
    nextButton.disabled = false;
}

function nextNumber() {
    gameState.currentNumber = Math.ceil(Math.random() * gameState.numberRange);
    numberUI.innerHTML = gameState.currentNumber;

    gameState.words = "";
    wordsUI.innerHTML = "";
    wordsUI.removeAttribute("class");

    fizzButton.disabled = false;
    buzzButton.disabled = false;
    submitButton.disabled = false;
    nextButton.disabled = true;
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