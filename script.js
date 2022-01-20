"use strict";

// Selecting Elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0Sec = document.querySelector(".player--0");
const player1Sec = document.querySelector(".player--1");

let currentPlayer, currentScore, scores, playing;

const init = function () {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0Sec.classList.remove("player--winner");
  player1Sec.classList.remove("player--winner");
  player0Sec.classList.add("player--active");
  player1Sec.classList.remove("player--active");
  diceEl.classList.add("hidden");
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer == 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  player0Sec.classList.toggle("player--active");
  player1Sec.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `images/dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    if (dice === 1) {
      switchPlayer();
    } else {
      currentScore += dice;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
