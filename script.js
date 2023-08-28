const input = document.querySelector(".input");
const btn = document.getElementById("btn");
const hint = document.getElementById("hint");
const typed_input = document.getElementById("typed-input");
const wrong_letter = document.getElementById("wrong-letter");
const guess_remaining = document.getElementById("guess-remaining");
let word = "";
let hints = "";
let wrong = [];
let right = [];
let maxGuess;

function generateRandomWord() {
  let object = words[Math.floor(Math.random() * words.length)];
  word = object.word;
  hints = object.hint;
  maxGuess = 10;
  wrong = [];
  right = [];

  // console.log(word);
  hint.innerText = hints;
  guess_remaining.innerText = maxGuess;
  wrong_letter.innerText = wrong;

  let text = "";
  for (let i = 0; i < word.length; i++) {
    text += `<input type="text" disabled />`;
    input.innerHTML = text;
  }
}
generateRandomWord();

function Game(element) {
  let key = element.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !wrong.includes(key) &&
    !right.includes(key)
  ) {
    // matches with lowercase or uppercase
    // console.log(key);
    if (word.includes(key)) {
      //if a letter is found in the word
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          right += key;
          input.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      wrong.push(key);
      maxGuess--;
    }
    guess_remaining.innerText = maxGuess;
    wrong_letter.innerText = wrong;
  }

  typed_input.value = "";

  setTimeout(() => {
    if (right.length === word.length) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      return generateRandomWord(); // Reset after winning
    } else if (maxGuess < 1) {
      alert("Game Over! You lose");
      for (let i = 0; i < word.length; i++) {
        // Show answer after losing
        input.querySelectorAll("input")[i].value = word[i];
      }
    }
  }, 100);
}

btn.addEventListener("click", generateRandomWord);
typed_input.addEventListener("input", Game);
input.addEventListener("click", function () {
  typed_input.focus();
});
document.addEventListener("keydown", function () {
  typed_input.focus();
});
