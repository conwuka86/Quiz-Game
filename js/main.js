/*----- constants -----*/
const QUESTIONS = {
    general: [
      { question: "What is the capital of France?", answers: ["London", "Berlin", "Paris"], correct: 2 },
      { question: "Which is the largest ocean?", answers: ["Atlantic", "Pacific", "Indian"], correct: 1 },
      { question: "Who wrote 'Romeo and Juliet'?", answers: ["Shakespeare", "Dickens", "Tolkien"], correct: 0 },
      { question: "What is the smallest country in the world?", answers: ["Vatican City", "Monaco", "San Marino"], correct: 0 },
      { question: "What is the national animal of India?", answers: ["Elephant", "Peacock", "Tiger"], correct: 2 },
      { question: "Which planet is known as the Red Planet?", answers: ["Mars", "Jupiter", "Saturn"], correct: 0 },
      { question: "Who painted the Mona Lisa?", answers: ["Da Vinci", "Van Gogh", "Picasso"], correct: 0 },
      { question: "Which country gifted the Statue of Liberty to the USA?", answers: ["Italy", "Germany", "France"], correct: 0 },
      { question: "What is the hardest natural substance on Earth?", answers: ["Gold", "Diamond", "Iron"], correct: 1 },
      { question: "What is the longest river in the world?", answers: ["Nile", "Amazon", "Yangtze"], correct: 0 },
    ],
    math: [
      { question: "What is 5 + 3?", answers: ["10", "8", "6"], correct: 1 },
      { question: "What is 12 x 2?", answers: ["24", "20", "26"], correct: 0 },
      { question: "What is the square root of 81?", answers: ["7", "8", "9"], correct: 2 },
      { question: "What is 100 divided by 4?", answers: ["30", "20", "25"], correct: 2 },
      { question: "What is 7 x 6?", answers: ["42", "36", "48"], correct: 0 },
      { question: "What is 15% of 200?", answers: ["30", "20", "25"], correct: 0 },
      { question: "What is 11 squared?", answers: ["100", "121", "101"], correct: 1 },
      { question: "What is the value of π (pi) rounded to 2 decimal places?", answers: ["3.14", "3.15", "3.16"], correct: 0 },
      { question: "What is 18 - 9?", answers: ["9", "8", "7"], correct: 0 },
      { question: "What is the cube root of 27?", answers: ["5", "4", "3"], correct: 2 },
    ],
    science: [
      { question: "What planet is closest to the sun?", answers: ["Mercury", "Venus", "Mars"], correct: 0 },
      { question: "What is the chemical symbol for water?", answers: ["H2O", "CO2", "O2"], correct: 0 },
      { question: "What gas do plants absorb from the atmosphere?", answers: ["Air", "CO2", "Nitrogen"], correct: 1 },
      { question: "What is the center of an atom called?", answers: ["Nucleus", "Centrum", "Electron"], correct: 0 },
      { question: "What is the largest organ in the human body?", answers: ["Heart", "Skin", "Liver"], correct: 1 },
      { question: "What force keeps us on the ground?", answers: ["Love", "Magnetism", "Gravity"], correct: 2},
      { question: "What is the chemical symbol for gold?", answers: ["Au", "Ag", "Fe"], correct: 0 },
      { question: "What is the powerhouse of the cell?", answers: ["Mitochondria", "Nucleus", "Ribosome"], correct: 0 },
      { question: "What do bees collect from flowers?", answers: ["Pollen", "Necter", "Honey"], correct: 1 },
      { question: "Which planet has the most moons?", answers: ["Saturn", "Jupiter", "Uranus"], correct: 0 },
    ],
  };
  
  /*----- state variables -----*/
  let category = null;
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 20;
  let intervalId = null;
  
  /*----- cached elements -----*/
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const endScreen = document.getElementById("end-screen");
  const categorySelect = document.getElementById("category-select");
  const startBtn = document.getElementById("start-btn");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const timerEl = document.getElementById("timer");
  const resultMessage = document.getElementById("result-message");
  const finalScore = document.getElementById("final-score");
  const restartBtn = document.getElementById("restart-btn");
  const lastScoreEl = document.getElementById("last-score");
  
  /*----- event listeners -----*/
  startBtn.addEventListener("click", startQuiz);
  answersEl.addEventListener("click", checkAnswer);
  restartBtn.addEventListener("click", restartQuiz);
  
  /*----- functions -----*/
  function startQuiz() {
    category = categorySelect.value;
    score = 0;
    currentQuestionIndex = 0;
    timer = 20;
    lastScoreEl.textContent = "";
  
    // Shuffle and select 5 random questions
    currentQuestions = shuffleArray(QUESTIONS[category]).slice(0, 5);
  
    displayQuestion();
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    startTimer();
  }
  
  function startTimer() {
    intervalId = setInterval(() => {
      timer--;
      timerEl.textContent = timer;
      if (timer <= 0) {
        endGame("Time up!");
      }
    }, 1000);
  }
  
  function displayQuestion() {
    const questionData = currentQuestions[currentQuestionIndex];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = questionData.answers
      .map((answer, index) => `<button data-index="${index}">${answer}</button>`)
      .join("");
  }
  
  function checkAnswer(event) {
    if (!event.target.matches("button")) return;
    const selectedIndex = parseInt(event.target.dataset.index, 10);
    const questionData = currentQuestions[currentQuestionIndex];
    if (selectedIndex === questionData.correct) {
      score++;
    }
    if (currentQuestionIndex < currentQuestions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      endGame(score >= 5 ? "Pass" : "Fail");
    }
  }
  
  function endGame(message) {
    clearInterval(intervalId);
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    resultMessage.textContent = message;
    finalScore.textContent = score;
    localStorage.setItem("lastScore", score);
  }
  
  function restartQuiz() {
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    const lastScore = localStorage.getItem("lastScore");
    lastScoreEl.textContent = lastScore ? `Last Score: ${lastScore}` : "";
  }
  
  // function to shuffle an array
  function shuffleArray(array) {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }
  