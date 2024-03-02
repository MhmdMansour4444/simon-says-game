const playButton = document.getElementById("play");
const infoText = document.getElementById("info");
let gameStarted = false;
const maxSequenceLength = 12;

playButton.addEventListener("click", function () {
  if (!gameStarted) {
    infoText.textContent = "Let's go! Try to keep up with the sequence.";
    const randomSequence = generateRandomSequence(maxSequenceLength);
    displaySequence(randomSequence);
    gameStarted = true;

    console.log(randomSequence);
  }

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
  sequence.forEach(function (color, index) {
    setTimeout(function () {
      const tile = document.querySelector(`[data-tile="${color}"]`);
      tile.classList.remove("inactive");
      setTimeout(function () {
        tile.classList.add("inactive");
      }, 500);
    }, index * 1000);
  });
}
