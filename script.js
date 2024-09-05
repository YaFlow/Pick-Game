'use strict';
console.log('Merge');

//Selecting elements

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;
//Starting conditions

const init = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // if statement
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const rollButton = document.querySelector('.btn--roll');
const newButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');

//rolling dice functionality

rollButton.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.Display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    //3.Check for rolled 1
    if (dice !== 1) {
      //add dice to the current score
      currentScore = currentScore + dice;
      //currentScore+=dice;-- e varianta mai rapida de scris
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //Change later
    } else {
      //, switch to the next player
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to the active player score
    scores[activePlayer] = scores[activePlayer] + currentScore;

    //   scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if players score is >=100

    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

newButton.addEventListener('click', init);
