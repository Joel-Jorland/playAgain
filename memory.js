const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let cardsDone = 0; // let us check when we finished the game (if (cardsDone ===  cards.length))

let startTime = new Date().getTime(); // time when the page loads (in ms) used for the timer function

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  } //else

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.instru === secondCard.dataset.instru;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  cardsDone += 2;
  score += 2;
  printScore();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    score--;
    printScore();
    resetBoard();
  }, 1500);
}
function printScore(){
let elemScore = document.getElementById("score");
elemScore.innerHTML = `Score : ${score}`
}

function timer(){
    let timeSpent =  Math.floor( (new Date().getTime() - startTime)/1000) // time spent since the page loaded (in seconds)
    let timerElem = document.getElementById("timer");
    timerElem.innerHTML = `Temps écoulé : ${timeSpent} secondes`

    if (cardsDone === cards.length) clearInterval(time); // if we found all cards, stop the timer
    }

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 8);
    card.style.order = randomPos;
  });
})(); //  = appeler la fonction

let time = setInterval(timer, 1000)

cards.forEach((card) => card.addEventListener("click", flipCard));
