var quest = [
  {
    questionNumber: "Question #1",
    question: "What team drafted Kobe Bryant?",
    answers: {
      a: "Atlanta Hawks",
      b: "Charlotte Hornets",
      c: "Los Angeles Lakers",
      d: "Portland Trailblazers",
    },
    correctAnswer: "answer2",
  },
  {
    questionNumber: "Question #2",
    question: "Avatar Aang is originally from what nation?",
    answers: {
      a: "Air Nomads",
      b: "Water Tribe",
      c: "Earth Kingdom",
      d: "Fire Nation",
    },
    correctAnswer: "answer1",
  },
  {
    questionNumber: "Question #3",
    question: "Rapper Kendrick Lamar is from what city?",
    answers: {
      a: "Oakland, CA",
      b: "Atlanta, GA",
      c: "Compton, CA",
      d: "Brooklyn, NY",
    },
    correctAnswer: "answer3",
  },
  {
    questionNumber: "Question #4",
    question: "What year did Coloumbus sail the ocean blue?",
    answers: {
      a: "1492",
      b: "1462",
      c: "1392",
      d: "1776",
    },
    correctAnswer: "answer1",
  },
  {
    questionNumber: "Question #5",
    question: "How many feet are in a yard?",
    answers: {
      a: "4",
      b: "6",
      c: "5",
      d: "3",
    },
    correctAnswer: "answer4",
  },
];

// Quiz question variables

var highScoreNav = document.querySelector("#highScoreNav");
var quizCard = document.querySelector("#quizCard");
var questionNumber = document.querySelector("#quizCardTitle");
var quizQuestion = document.querySelector("#quizCardText");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var answerMessage = document.querySelector("#answerMessage");
var nextQuestionBtnEl = document.querySelector("#nextQuestionBtn");
var currentQuestion = 0;

// Empty arrays
var highScore = [];
var initials = [];

updateArrays();
// Update high score and initials array from local storage

function updateArrays() {
  var storedHighScore = JSON.parse(localStorage.getItem("highScore"));

  if (storedHighScore !== null) {
    highScore = storedHighScore;
  }

  var storedInitials = JSON.parse(localStorage.getItem("initials"));

  if (storedInitials !== null) {
    initials = storedInitials;
  }
}

//   Start Quiz Variables and Function
var startBtnEl = document.querySelector("#startBtn");
var welcMessageEl = document.querySelector("#welcomeMessage");

function startQuiz() {
  welcMessageEl.style.display = "none";
  setTime();
  quizQuestionFunct();
}

// Timer
var timeEl = document.querySelector("#timer");
var secondsLeft = 31;

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;
    if (secondsLeft < 0 || currentQuestion === quest.length) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Quiz card function

function quizQuestionFunct() {
  if (currentQuestion === quest.length) {
    return;
  } else {
    nextQuestionBtnEl.style.visibility = "hidden";
    document.getElementById("answer1").disabled = false;
    document.getElementById("answer2").disabled = false;
    document.getElementById("answer3").disabled = false;
    document.getElementById("answer4").disabled = false;
    quizCard.style.visibility = "visible";
    answerMessage.textContent = "";
    questionNumber.textContent = quest[currentQuestion].questionNumber;
    quizQuestion.textContent = quest[currentQuestion].question;
    answer1.textContent = quest[currentQuestion].answers.a;
    answer2.textContent = quest[currentQuestion].answers.b;
    answer3.textContent = quest[currentQuestion].answers.c;
    answer4.textContent = quest[currentQuestion].answers.d;
  }
}

// Check answer function

function checkAnswer() {
  if (event.target.id === quest[currentQuestion].correctAnswer) {
    answerMessage.textContent = "Correct Answer!";
  } else {
    answerMessage.textContent = "Wrong Answer!";
  }
  document.getElementById("answer1").disabled = true;
  document.getElementById("answer2").disabled = true;
  document.getElementById("answer3").disabled = true;
  document.getElementById("answer4").disabled = true;
  nextQuestionBtnEl.style.visibility = "visible";
}

// Next question function

function nextQuestionFunc() {
  currentQuestion++;
  quizQuestionFunct();
}

//   End of Game function

function endGame() {
  timeEl.textContent = "Game Over";
  quizCard.style.display = "none";
  highScoreForm();
}

// Storing initials in local storage

function storeInitials() {
  localStorage.setItem("initials", JSON.stringify(initials));
}

// High Score window

var highScoreEl = document.getElementById("highScore");
var highScoreTitleEl = document.getElementById("highScoreCardTitle");
var highScoreSubmitBtn = document.getElementById("highScoreSubmit");

function highScoreForm() {
  highScoreEl.style.display = "block";
  highScoreTitleEl.textContent = "GAME OVER! Your Score: " + secondsLeft;
  highScore.push(secondsLeft);
  localStorage.setItem("highScore", JSON.stringify(highScore));
}
// High score page elements
var restartBtnEl = document.getElementById("restartBtn");
var highScorePage = document.getElementById("highScorePage");
var initialsAndHighScore = document.getElementById("initialsAndHighScore");

// Show high scores page

function renderHighScores() {
  highScoreEl.style.display = "none";
  highScorePage.style.display = "block";
  for (var i = 0; i < initials.length; i++) {
    initialsAndHighScore.append(initials[i] + ": " + highScore[i] + "\n");
  }
}

// Event listeners

startBtnEl.addEventListener("click", startQuiz);
nextQuestionBtnEl.addEventListener("click", nextQuestionFunc);
quizCard.addEventListener("click", function (event) {
  if (
    event.target.id === "answer1" ||
    event.target.id === "answer2" ||
    event.target.id === "answer3" ||
    event.target.id === "answer4"
  ) {
    checkAnswer();
  } else {
    return;
  }
});
highScoreSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Push initials form input to initials array

  initials.push(document.getElementById("inlineFormInput").value);

  // Clear form

  document.getElementById("inlineFormInput").value = "";

  // Store updated initials and render high score page

  storeInitials();
  renderHighScores();
});
restartBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});

highScoreNav.addEventListener("click", function (event) {
  event.preventDefault();
  welcMessageEl.style.display = "none";
  quizCard.style.display = "none";
  renderHighScores();
});
