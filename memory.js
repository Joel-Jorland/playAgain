const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard , secondCard;
let lockBoard = false;

function flipCard(){ 
    if (lockBoard) return // empeche de cliquer a nouveau quand deux cartes sont deja retournees
    if (this === firstCard) return // empeche de cliquer deux fois sur la meme carte
        
    let audio = this.getElementsByClassName('sound')[0]
    audio.duration = 1
    audio.play() // joue un song au moment de retourner la carte
        setTimeout(() => {
            audio.pause()
        }, 2000);

        this.classList.toggle('flip'); // retourne la carte

    if (!hasFlippedCard) { // si on n'a pas deja retourne une carte
        hasFlippedCard = true; 
        firstCard = this;

        return

    } // sinon si on a deja retourne une carte 
    
    secondCard = this;
    checkForMatch() //on va pouvoir comparer les deux cartes

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
})(); //  = appeler la fonction\

cards.forEach(card => card.addEventListener('click', flipCard))

// fonction song au au click de chaque carte
// cards.forEach(card => card.addEventListener('click', playSong (){
//     song.play()
// }))

