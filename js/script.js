const playButton = document.getElementById("play");
const infoText = document.getElementById("info");
const maxSequenceLength = 4;
const board = document.querySelector(".board");

const audioFiles = {
  blueSound: "sounds/blue.mp3",
  redSound: "sounds/red.mp3",
  yellowSound: "sounds/yellow.mp3",
  greenSound: "sounds/green.mp3",
  loseSound: "sounds/game-over.wav",
  winSound: "sounds/game-win.wav",
  wrongSound: "sounds/wrong.mp3",
};
let gameStarted = false;
let playerSequence = [];
let currentStep = 0;
let highScore = 0;
let currentLevel = 0;
let randomSequence = [];
let sequenceIndex = 1;

let sequence = [];
let tilesSelected = [];
const colors = ["green", "red", "blue", "yellow"];
let score = 0;

let tiles = document.querySelectorAll(".tile");
tiles.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    playerClicks(colors[index]);
  });
});

playButton.addEventListener("click", function () {
  infoText.textContent = "Let's go! Try to keep up with the sequence.";
  resetSequence();
  extendSequence();
  displaySequence(sequence);
  

  function generateRandomSequence(length) {
    const colors = ["green", "red", "blue", "yellow"];
    const colorSequence = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      colorSequence.push(colors[randomIndex]);
    }
    return colorSequence;
  }
});

function displaySequence(sequence) {
  const board = document.querySelector(`.board`);
  board.classList.add("unclickable");

  sequence.forEach(function (color, index) {
    setTimeout(function () {
      const tile = document.querySelector(`[data-tile="${color}"]`);
      tile.classList.remove("inactive");
      const audio = new Audio(audioFiles[color]);
      setTimeout(function () {
        tile.classList.add("inactive");
        board.classList.remove("unclickable");
      }, 500);
    }, index * 700);
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
}

function isSequenceCorrect() {
  for (let i = 0; i < tilesSelected.length; i++) {
    const colorSelected = tilesSelected[i];
    const seqColor = sequence[i];
    if (colorSelected != seqColor) return false;
  }
  return true;
}

function GameEnded(winState) {
  if (winState) alert("You Won :)");
  else alert("You Lost!");
  resetSelection();
  resetSequence();
}

function playerClicks(selection) {
  tilesSelected.push(selection);
  console.log("PlayerSelected");
  console.log(tilesSelected);

  if (isSequenceCorrect()) {
    // Sequence is Correct

    if (isSequenceComplete()) {
      extendSequence();
      resetSelection();
      displaySequence(sequence);
    }
  } else {
    //Sequnce is Wrong
    GameEnded(false);
    return;
  }
}
