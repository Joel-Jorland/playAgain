const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard , secondCard;
let lockBoard = false;

function flipCard(){ 
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return

    } //else
    
    secondCard = this;
    checkForMatch()

}

function checkForMatch(){
    let isMatch = firstCard.dataset.instru === secondCard.dataset.instru ;
    isMatch ? disableCards() : unflipCards();
}


function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

}

function unflipCards(){
    lockBoard=true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();

        },1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 8);
        card.style.order = randomPos;
    });
})(); //  = appeler la fonction

cards.forEach(card => card.addEventListener('click', flipCard))
