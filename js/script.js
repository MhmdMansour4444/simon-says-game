const playButton = document.getElementById("play");
const infoText = document.getElementById("info");

playButton.addEventListener("click", function () {
  infoText.textContent = "Lets go! Try to keep up with the sequence.";
  function generateRandomSequence(length) {
    const colors = ["green", "red", "blue", "yellow"];
    const Colorsequence = [];

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      Colorsequence.push(colors[randomIndex]);
    }
    return Colorsequence;
  }
  const randomSequence = generateRandomSequence(12);
  console.log(randomSequence);

  displaySequence(randomSequence);
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
