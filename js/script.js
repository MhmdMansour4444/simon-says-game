window.onload = function () {
  const playButton = document.getElementById("play");
  const infoText = document.getElementById("info");
  const board = document.querySelector(".board");
  const levelElt = document.getElementById("level");
  const highScoreElt = document.getElementById("high-score");
  const maxSequenceLength = 12;
  const audioFiles = {
    blue: "sounds/blue.mp3",
    red: "sounds/red.mp3",
    yellow: "sounds/yellow.mp3",
    green: "sounds/green.mp3",
    gameOver: "sounds/game-over.wav",
    gameWin: "sounds/game-win.wav",
    wrong: "sounds/wrong.mp3",
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
    setBoardState(false);
    sequence.forEach(function (color, index) {
      setTimeout(function () {
        const tile = document.querySelector(`[data-tile="${color}"]`);
        tile.classList.remove("inactive");
        setTimeout(function () {
          tile.classList.add("inactive");
          setBoardState(true);
        }, 500);
      }, index * 1300);
    });
  }

  //// new functions
  function setBoardState(clickableState){
    if(clickableState){
      board.classList.remove("unclickable");
    }
    else{
      board.classList.add("unclickable")
    }
  }

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
    if (sequence.length === maxSequenceLength) {
      GameEnded(true);
    }
   
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
    highScoreElt.innerHTML = highestScore ;
  }

  function resetScore() {
    score = 0;
  }

  function GameEnded(winState) {
    if (winState) {
      setTimeout(() => {
      var audio = new Audio(audioFiles.gameWin);
      audio.play();
      }, 1000);
      infoText.textContent =
      "YOU WON!! Press PLAY to start again";

    } else {
      var audio = new Audio(audioFiles.wrong);
      audio.play();
      infoText.textContent =
      "GAME OVER!";

    }
    resetSelection();
    resetSequence();
    resetScore();
    
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
        //stop if ended
        resetSelection();
        increaseScore();
        displaySequence(sequence);
      }
    } else  {
      //Sequence is Wrong
      GameEnded(false);
    }
  }
};
