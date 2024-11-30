/*----- constants -----*/
// main.js

// Global Variables
let score = 0;
const winningScore = 3; // Change as needed
let timer;
let timeLeft = 10;
let currentQuestionIndex = 0;


/*----- state variables -----*/


/*----- cached elements  -----*/
// Quiz Data
const quizData = {
    general: [
        { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: 1 },
        { question: "Which color is in a rainbow?", answers: ["Pink", "Orange", "Brown"], correct: 1 },
    ],
    science: [
        { question: "What is the chemical symbol for water?", answers: ["O2", "H2O", "CO2"], correct: 1 },
        { question: "What planet is closest to the sun?", answers: ["Venus", "Mercury", "Earth"], correct: 1 },
    ],
    history: [
        { question: "Who was the first President of the United States?", answers: ["Lincoln", "Washington", "Jefferson"], correct: 1 },
        { question: "What year did WW2 end?", answers: ["1945", "1939", "1918"], correct: 0 },
    ],
};

/*----- event listeners -----*/
// Event Listeners

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function startGame() {
    const category = categoriesDropdown.value;
    if (!quizData[category]) return;

    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 30;
    categorySelection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    startTimer();
    loadQuestion(category);
}


/*----- functions -----*/
function restartGame() {
    categorySelection.classList.remove("hidden");
    quizSection.classList.add("hidden");
    resultSection.classList.add("hidden");
}

function loadQuestion(category) {
    const questionData = quizData[category][currentQuestionIndex];
    if (!questionData) {
        endGame("You answered all questions!");
        return;
    }

    questionEl.textContent = questionData.question;
    answersEl.innerHTML = ""; // Clear previous answers

    questionData.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.addEventListener("click", () => checkAnswer(index, category));
        answersEl.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, category) {
    const questionData = quizData[category][currentQuestionIndex];

    if (selectedIndex === questionData.correct) {
        score++;
        if (score >= winningScore) {
            endGame("You won!");
            return;
        }
    }

    currentQuestionIndex++;
    loadQuestion(category);
}

function startTimer() {
    timerEl.textContent = `Time: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame("Time's up!");
        }
    }, 1000);
}

function endGame(message) {
    clearInterval(timer);
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    resultMessage.textContent = message;

    // Persist score in localStorage
    localStorage.setItem("quizScore", score);
}
