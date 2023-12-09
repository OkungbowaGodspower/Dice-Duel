'use strict';
// Selecting elements
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');
const scoreElement0 = document.querySelector('#score--0');
const scoreElement1 = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting value
scoreElement0.textContent = 0;
scoreElement1.textContent = 0;
diceElement.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Swith Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

// Implementing roll dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random number between 1 and 6
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNumber);

    // Display the result on the dice
    diceElement.src = `images/dice-${randomNumber}.png`;
    diceElement.classList.remove('hidden');

    // Check for rolled 1
    if (randomNumber !== 1) {
      // Display the current score
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Impleting the hold score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //   Check if score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      //   finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// Reset game
btnNew.addEventListener('click', function () {
  const scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceElement.classList.add('hidden');
  document;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
  scores[0] = 0;
  document.getElementById('score--0').textContent = scores[0];
  scores[1] = 0;
  document.getElementById('score--1').textContent = scores[0];
});

