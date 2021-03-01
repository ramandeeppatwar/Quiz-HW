// *************** Grab DOM Elements ***************
let highScoreList = document.querySelector("highScores");
let clearScores = document.querySelector("#clear-highscores");

// ************* show scores function *****************
runScores();

function runScores() {
  storedScores = JSON.parse(localStorage.getItem("scores"));

  if (storedScores !== null) {
    scoreList = storedScores;
  }
  renderScores();
}

function clearAll() {
  window.localStorage.clear();
}

function renderScores() {
  if (storedScores !== null) {
    scoreList.sort((a, b) => {
      return a.newScore - b.newScore;
    });
    scoreList.reverse((a, b) => {
      return a.newScore - b.newScore;
    });

    for (i = 0; i < scoreList.length; i++) {
      let scoreListItem = scoreList[i];
      let tr = document.createElement("tr");
      let nameCell = document.createElement("td");
      let nameCellText = document.createTextNode(scoreListItem.name);
      let scoreCell = document.createElement("td");
      let scoreCellNum = document.createTextNode(scoreListItem.newScore);

      tr.setAttribute("tr-index", i);
      document.getElementById("highScores").appendChild(tr);
      tr.appendChild(nameCell);
      nameCell.appendChild(nameCellText);
      tr.appendChild(scoreCell);
      scoreCell.appendChild(scoreCellNum);
    }
  }
}

clearScores.addEventListener("click", () => {
  clearAll();
  window.location.href = "highScores.html";
});
