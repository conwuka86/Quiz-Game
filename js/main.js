/*----- constants -----*/
const QUESTIONS = {
    general: [
      { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin"], correct: 0 },
      { question: "Which is the largest ocean?", answers: ["Atlantic", "Pacific", "Indian"], correct: 1 },
      { question: "which is the smallest continent?", answers: ["Africa", "Asia", "Australia"], correct: 2},
    ],
    math: [
      { question: "What is 5 + 3?", answers: ["8", "10", "6"], correct: 0 },
      { question: "What is 12 x 2?", answers: ["24", "20", "26"], correct: 0 },
      { question: "What is 10 - 3?", answers: ["13", "7", "30"], correct: 1 },
    ],
    science: [
      { question: "What planet is closest to the sun?", answers: ["Mercury", "Venus", "Mars"], correct: 0 },
      { question: "What is the chemical symbol for water?", answers: ["H2O2", "CO2", "H2O"], correct:  2},
      { question: "What is smallest element?", answers: ["Hydrogen", "Oxygen", "Helium"], correct: 2 },
    ],
  };
  
  /*----- state variables -----*/
  let category = null;
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
  

  