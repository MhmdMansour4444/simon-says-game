window.onload = function () {
  const playButton = document.getElementById("play");
  const infoText = document.getElementById("info");
  const board = document.querySelector(".board");
  const levelElt = document.getElementById("level");
  const highScoreElt = document.getElementById("high-score");
  const maxSequenceLength = 12;
  const audioFiles = {
    blueSound: "../sounds/blue.mp3",
    redSound: "../sounds/red.mp3",
    yellowSound: "../sounds/yellow.mp3",
    greenSound: "../sounds/green.mp3",
    loseSound: "../sounds/game-over.wav",
    winSound: "../sounds/game-win.wav",
    wrongSound: "../sounds/wrong.mp3",
  };
  let sequence = [];
  let tilesSelected = [];
  const colors = ["green", "red", "blue", "yellow"];
  let score = 0;
  let highestScore = 0;

  let tiles = document.querySelectorAll(".tile");
  tiles.forEach((el, index) => {
    el.addEventListener("click", (e) => {
      playerClicks(colors[index]);
    });
  });

  playButton.addEventListener("click", function () {
    infoText.textContent =
      "Let's go! Try to keep up with the sequence until 12 to win!!";
    resetScore();
    resetSequence();
    extendSequence();
    displaySequence(sequence);
  });

  function displaySequence(sequence) {
    board.classList.add("unclickable");
    sequence.forEach(function (color, index) {
      setTimeout(function () {
        const tile = document.querySelector(`[data-tile="${color}"]`);
        tile.classList.remove("inactive");
        setTimeout(function () {
          tile.classList.add("inactive");
          board.classList.remove("unclickable");
          if (
            sequence.length === maxSequenceLength &&
            sequence[index] === sequence[sequence.length - 1]
          ) {
            GameEnded(true);
          }
        }, 500);
      }, index * 1300);
    });
  }

  //// new functions

  function resetSelection() {
    tilesSelected.splice(0, tilesSelected.length);
  }

  function resetSequence() {
    sequence.splice(0, sequence.length);
  }

  function isSequenceComplete() {
    return sequence.length === tilesSelected.length;
  }

  function extendSequence() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    sequence.push(colors[randomIndex]);
    levelElt.innerHTML = sequence.length;
  }

  function isSequenceCorrect() {
    for (let i = 0; i < tilesSelected.length; i++) {
      const colorSelected = tilesSelected[i];
      const seqColor = sequence[i];
      if (colorSelected != seqColor) return false;
    }
    return true;
  }

  function increaseScore() {
    score++;
    if (score > highestScore) highestScore = score;
    highScoreElt.innerHTML = highestScore;
  }

  function resetScore() {
    score = 0;
  }

  function GameEnded(winState) {
    if (winState) {
      alert("You Won :)");
    } else {
      alert("You Lost!");
    }
    resetSelection();
    resetSequence();
    resetScore();
    if (winState) {
      extendSequence();
      levelElt.innerHTML = sequence.length;
      displaySequence(sequence);
    }
  }

  function playerClicks(selection) {
    tilesSelected.push(selection);
    var audio = new Audio(audioFiles[selection]);
    audio.play();
    console.log("PlayerSelected");
    console.log(tilesSelected);

    if (isSequenceCorrect()) {
      // Sequence is Correct
      if (isSequenceComplete()) {
        extendSequence();
        resetSelection();
        increaseScore();
        displaySequence(sequence);
      }
    } else {
      //Sequence is Wrong
      GameEnded(false);

      return;
    }
  }
};
