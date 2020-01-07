const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
    let end =checkForEnd();
    if(end===true){
        document.getElementById("myBtn").style.visibility= 'visible' ;
    }
    console.log(end);
}
function checkForEnd() {
    let ok =true;
    cards.forEach(card => {
        if(hasClass(card,'flip')===false){
            ok=false;
        }
    });
    return ok;
}
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
function myFunction(){
    window.location.assign("memoryGame.html");
}
cards.forEach(card => card.addEventListener('click', flipCard));

function playAuto(){
    var sample = document.getElementById("foobar");
    sample.play();
}

playAuto();

function speakerEventListener(){
    var speaker = document.getElementById("speaker");
    var speakerSound = new Audio();
    var sample = document.getElementById("foobar");
    speakerSound.src = "../resurse/sounds/cerintaPerechi.m4a";
    speaker.addEventListener("click", () => {
        if(speakerSound.paused && sample.paused) speakerSound.play();
    });
}

speakerEventListener();