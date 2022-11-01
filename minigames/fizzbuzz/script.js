// Screens
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
const gameMode = {
    fizzBuzz: ['FizzBuzz', 'Fizz', 'Buzz'],
    fooBar: ['FooBar', 'Foo', 'Bar'],
    fizzBuzzFooBar: ['FizzBuzzFooBar', 'Fizz', 'Buzz', 'Foo', 'Bar']
}

const gameOptions = {
    numberRange: 30,
    currentGameMode: gameMode.fizzBuzz
}

const numberRangeOption = document.getElementById('numberRangeOption')
const fizzBuzzOption = document.getElementById('fizzBuzzOption')
const fooBarOption = document.getElementById('fooBarOption')
const fizzBuzzFooBarOption = document.getElementById('fizzBuzzFooBarOptions')

if (localStorage.getItem("numberRange")) {
    gameOptions.numberRange = localStorage.getItem("numberRange");
    numberRangeOption.value = localStorage.getItem("numberRange");
}

numberRangeOption.addEventListener('input', () => {
    gameOptions.numberRange = numberRangeOption.value;
    localStorage.setItem("numberRange", gameOptions.numberRange);
})

const gameModeButtons = document.querySelectorAll(".gameModeButton");

gameModeButtons.forEach((b) => {
    if (b.value == gameOptions.currentGameMode[0]) {
        b.classList.add("toggled")
    }
})

fizzBuzzOption.addEventListener('click', () => {
    if (gameOptions.currentGameMode != gameMode.fizzBuzz) {
        gameModeButtons.forEach((b) => {
            b.classList.remove("toggled");
        })
        fizzBuzzOption.classList.toggle("toggled");
        gameOptions.currentGameMode = gameMode.fizzBuzz;
    }
})
fooBarOption.addEventListener('click', () => {
    if (gameOptions.currentGameMode != gameMode.fooBar) {
        gameModeButtons.forEach((b) => {
            b.classList.remove("toggled");
        })
        fooBarOption.classList.toggle("toggled");
        gameOptions.currentGameMode = gameMode.fooBar;
    }
})
fizzBuzzFooBarOption.addEventListener('click', () => {
    if (gameOptions.currentGameMode != gameMode.fizzBuzzFooBar) {
        gameModeButtons.forEach((b) => {
            b.classList.remove("toggled");
        })
        fizzBuzzFooBarOption.classList.toggle("toggled");
        gameOptions.currentGameMode = gameMode.fizzBuzzFooBar;
    }
})

// Menu Buttons
const startButton = document.getElementById('startButton')
const optionsButton = document.getElementById('optionsButton')
const exitOptions = document.getElementById('exitOptions')
const exitGame = document.getElementById('exitGame');

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
        createGameButtons();
    } else {
        gameScreen.setAttribute("class", "hide")
        startScreen.removeAttribute("class");
        gameState.currentScreen = startScreen;

        resetGame();
    }
}

// Gameplay
const gameState = {
    currentScreen: startScreen,
    currentScore: 0,
    currentHighScore: 0,
    attemptsLeft: 3,
    currentNumber: 0,
    currentWords: "",
    correctWords: ""
}

const gameButtons = document.getElementById('gameButtons');

function createGameButtons() {
    for (let i = 1; i < gameOptions.currentGameMode.length; i++) {
        e = gameOptions.currentGameMode[i];

        const gameButton = document.createElement("input");
        gameButton.type = "button"
        gameButton.id = e + "Button";
        gameButton.classList.add("gameButton");
        gameButton.value = e;

        gameButton.addEventListener('click', () => {
            if (gameState.currentWords.includes(gameButton.value)) {
                gameButton.classList.toggle("toggled");
            } else {
                gameButton.classList.toggle("toggled");
            }
            addWord(gameButton.value);
        })

        gameButtons.appendChild(gameButton);
    }
}

const submitButton = document.getElementById('submitButton');
const nextButton = document.getElementById('nextButton');

function addWord(word) {
    if (gameState.currentWords.includes(word)) {
        gameState.currentWords = gameState.currentWords.replace(word, "");
    } else {
        gameState.currentWords += word;

    }

    wordsUI.innerHTML = gameState.currentWords;
}

submitButton.addEventListener('click', () => {
    switch (gameOptions.currentGameMode[0]) {
        case "FizzBuzz":
            submitFizzBuzz();
            break;
        case "FooBar":
            submitFooBar();
            break;
        case "FizzBuzzFooBar":
            submitFizzBuzzFooBar();
            break;
    }

    for (let i = 0; i < gameButtons.children.length; i++) {
        gameButtons.children[i].disabled = true;
        gameButtons.children[i].classList.remove("toggled");
    }

    submitButton.disabled = true;
    nextButton.disabled = false;
});

function submitFizzBuzz() {
    if (gameState.correctWords.includes("Fizz") && gameState.correctWords.includes("Buzz")) {
        if (gameState.currentWords.includes("Fizz") && gameState.currentWords.includes("Buzz")) {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = gameState.correctWords;
        }
    } else if (gameState.correctWords.includes("Fizz")) {
        if (gameState.currentWords == "Fizz") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = gameState.correctWords;
        }
    } else if (gameState.correctWords.includes("Buzz")) {
        if (gameState.currentWords == gameState.correctWords) {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = gameState.correctWords;
        }
    }

    if (!gameState.currentWords.includes("Fizz") && !gameState.currentWords.includes("Buzz")) {
        if (gameState.currentWords == "") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "";
        }
    }
}

function submitFooBar() {
    if (gameState.correctWords.includes("Foo") && gameState.correctWords.includes("Bar")) {
        if (gameState.currentWords.includes("Foo") && gameState.currentWords.includes("Bar")) {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = gameState.correctWords;
        }
    } else if (gameState.correctWords.includes("Foo")) {
        if (gameState.currentWords == "Foo") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = gameState.correctWords;
        }
    } else if (gameState.correctWords.includes("Bar")) {
        if (gameState.currentWords == gameState.correctWords) {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = gameState.correctWords;
        }
    }
    
    if (!gameState.currentWords.includes("Foo") && !gameState.currentWords.includes("Bar")) {
        if (gameState.currentWords == "") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "";
        }
    }
}

function submitFizzBuzzFooBar() {
    if ((gameState.currentNumber % 3) == 0 && (gameState.currentNumber % 5) == 0) {
        if (gameState.currentWords.includes("Fizz") && gameState.currentWords.includes("Buzz")) {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "FizzBuzz";
        }
    } else if ((gameState.currentNumber % 3) == 0) {
        if (gameState.currentWords == "Fizz") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "Fizz";
        }
    } else if ((gameState.currentNumber % 5) == 0) {
        if (gameState.currentWords == "Buzz") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "Buzz";
        }
    }
    if ((gameState.currentNumber % 3) != 0 && (gameState.currentNumber % 5) != 0) {
        if (gameState.currentWords == "") {
            answerCorrect();
        } else {
            answerIncorrect();
            wordsUI.innerHTML = "";
        }
    }
}

nextButton.addEventListener('click', nextNumber);
function nextNumber() {
    gameState.currentNumber = Math.ceil(Math.random() * gameOptions.numberRange);
    numberUI.innerHTML = gameState.currentNumber;
    getCorrectWords();

    gameState.currentWords = "";
    wordsUI.innerHTML = "";
    wordsUI.removeAttribute("class");


    gameButtons.childNodes.forEach(e => {
        e.disabled = false;
    })

    submitButton.disabled = false;
    nextButton.disabled = true;
}

function getCorrectWords() {
    gameState.correctWords = "";

    if ((gameState.currentNumber % 3) == 0) {
        gameState.correctWords += "Fizz";
    }
    
    if ((gameState.currentNumber % 5) == 0) {
        gameState.correctWords += "Buzz";
    }
    
    if ((gameState.currentNumber % 7) == 0) {
        gameState.correctWords += "Foo";
    }
    
    if ((gameState.currentNumber % 11) == 0) {
        gameState.correctWords += "Bar";
    }
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

    for (let i = 0; i < gameButtons.childNodes.length; i++) {
        gameButtons.removeChild(gameButtons.lastChild);
    }
}

// Load Game State
if (localStorage.getItem("currentHighScore")) {
    gameState.currentHighScore = localStorage.getItem("currentHighScore");
    highScoreUI.innerHTML = `High Score: ${gameState.currentHighScore}`;
}

