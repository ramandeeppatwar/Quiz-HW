// *************** Grab DOM Elements ****************
const startBtn = document.getElementById("startButton");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const answers = document.getElementById("answers");
const questionText = document.getElementById("questionText");
const gameContainer = document.getElementById("game-div");
const timer = document.querySelector("#time");
const messageDiv = document.querySelector("#message");

// **************** Declare Variables *******************
let score = 0;
let time = 60;
let randQuestion = "";
let questionIndex = 0;
let savedScores;
let scoreList = [];
let correctSound = new Audio("sounds/green.mp3");
let incorrectSound = new Audio("sounds/red.mp3");

startButton.addEventListener("click", startGame);

// **************** Set Timer *******************
function setTime() {
  let timerInterval = setInterval(() => {
    time--;
    timer.textContent = `Timer: ${time}`;

    if (time === 0) {
      clearInterval(timerInterval);
      alert("You ran out of time!");
      endGame();
    } else if (questionIndex === questions.length) {
      clearInterval(timerInterval);
    }
  }, 1000);
  return score;
}

// **************** Start Game *******************
function startGame() {
  randQuestion = questions.sort(() => Math.random() - 0.5);
  questionIndex = 0;
  showNextQuestion();
}

// **************** Show Next Question *******************
function showNextQuestion() {
  showQuestion(randQuestion[questionIndex]);
}

// **************** Get New Question *******************
function showQuestion() {
  answer1.hidden = false;
  answer2.hidden = false;
  answer3.hidden = false;
  answer4.hidden = false;

  startButton.classList.add("hide");
  if (questionIndex === questions.length) {
    endGame();
  } else {
    questionText.innerText = questions[questionIndex].question;
    answer1.textContent = questions[questionIndex]["choices"][0];
    answer2.textContent = questions[questionIndex]["choices"][1];
    answer3.textContent = questions[questionIndex]["choices"][2];
    answer4.textContent = questions[questionIndex]["choices"][3];
  }
}

// ************ Select Answer Function *****************
function selectAnswer(answer) {
  if (
    questions[questionIndex].answer === questions[questionIndex].choices[answer]
  ) {
    messageDiv.textContent = "Correct!";
    score += 20;
    console.log(score);
    correctSound.play();
  } else {
    messageDiv.textContent = "Incorrect!";
    score -= 20;
    time -= 10;
    incorrectSound.play();
  }
  questionIndex++;
  showNextQuestion();
}

// Functions to pass in as values in the selectAnswer argument
function choice0() {
  selectAnswer(0);
}
function choice1() {
  selectAnswer(1);
}
function choice2() {
  selectAnswer(2);
}
function choice3() {
  selectAnswer(3);
}

// **************** End Game Function ********************
function endGame() {
  let scoreTag = document.createElement("h1");
  let inputTag = document.createElement("input");
  let submitButton = document.createElement("button");

  score += 20;

  messageDiv.classList.add("hide");
  questionText.textContent = "Game Over";

  answer1.remove();
  answer2.remove();
  answer3.remove();
  answer4.remove();

  document.body.children[1].appendChild(scoreTag);
  document.getElementsByTagName("h1")[0].setAttribute("id", "score");
  document.getElementById("score").textContent = `Your score is: ${score}`;
  document.body.children[1].appendChild(inputTag);
  document.getElementsByTagName("input")[0].setAttribute("id", "input-field");

  submitButton.textContent = "Submit";
  document.body.children[1].appendChild(submitButton);
  document.getElementsByTagName("button")[0].setAttribute("id", "btn");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    let highScoreText = new Object();
    highScoreText.name = inputTag.value.trim();
    highScoreText.newScore = score;
    storeScores(highScoreText);
    window.location.href = "highScores.html";
  });
}

// ***************** local storage function ***************

function storeScores(highScoreText) {
  tempArray = JSON.parse(localStorage.getItem("scores"));
  if (tempArray === null) {
    scoreList.push(highScoreText);
    localStorage.setItem("scores", JSON.stringify(scoreList));
  } else {
    tempArray.push(highScoreText);
    localStorage.setItem("scores", JSON.stringify(tempArray));
  }
}

// Add Boolean globally to hide the answer buttons on page load
answer1.hidden = true;
answer2.hidden = true;
answer3.hidden = true;
answer4.hidden = true;

// ************** Event Listeners ***************
startButton.addEventListener("click", showQuestion);
startButton.addEventListener("click", setTime);
startButton.addEventListener("click", () => {
  messageDiv.textContent = "";
});
answer1.addEventListener("click", choice0);
answer2.addEventListener("click", choice1);
answer3.addEventListener("click", choice2);
answer4.addEventListener("click", choice3);

// ************************* Questions ***********************
const questions = [
  {
    question: "How do you create a function in JavaScript",
    choices: [
      "function myFunction()",
      "function = myFunction()",
      "function:myFnction()",
      "function()",
    ],
    answer: "function myFunction()",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseclick", "onchange", "onclick", "onmouseover"],
    answer: "onclick",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Colorful Style Sheets",
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "How can you make a bulleted list in HTML?",
    choices: ["<ol>", "<ul>", "<dl>", "<list>"],
    answer: "<ul>",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choices: [
      "alert('Hello World')",
      "msg('Hello World')",
      "msgBox('Hello World')",
      "alertBox('Hello World')",
    ],
    answer: "alert('Hello World')",
  },
  {
    question: "Arrays in JavaScript can be used to store______",
    choices: [
      "Numbers and strings",
      "Other arrays",
      "Booleans",
      "All of the above",
    ],
    answer: "All of the above",
  },
];
