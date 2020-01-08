var correctImgs = [
    {name: "sacou", src: "../resurse/scoala/sacou.jpg", sound: "../resurse/sounds/sacou.m4a"},
    {name: "saltea", src: "../resurse/scoala/saltea.jpg", sound: "../resurse/sounds/saltea.m4a"},
    {name: "scaun", src: "../resurse/scoala/scaun.jpg", sound: "../resurse/sounds/scaun.m4a"},
    {name: "scoci", src: "../resurse/scoala/scoci.jpg", sound: "../resurse/sounds/scoci.m4a"},
    {name: "socotitoare", src: "../resurse/scoala/socotitoare.jpg", sound: "../resurse/sounds/socotitoare.m4a"},
    {name: "sonerie", src: "../resurse/scoala/sonerie.jpg", sound: "../resurse/sounds/sonerie.m4a"},
    {name: "stilou", src: "../resurse/scoala/stilou.jpg", sound: "../resurse/sounds/stilou.m4a"}
];

var wrongImgs = [
    {name: "acuarele", src: "../resurse/scoala/acuarele.jpg", sound: "../resurse/sounds/acuarele.m4a"},
    {name: "birou", src: "../resurse/scoala/birou.jpg", sound: "../resurse/sounds/banca.m4a"},
    {name: "caiet", src: "../resurse/scoala/caiet.jpg", sound: "../resurse/sounds/caiet.m4a"},
    {name: "camasa", src: "../resurse/scoala/camasa.jpg", sound: "../resurse/sounds/camasa.m4a"},
    {name: "carte", src: "../resurse/scoala/carte.jpg", sound: "../resurse/sounds/carte.m4a"},
    {name: "creion", src: "../resurse/scoala/creion.jpg", sound: "../resurse/sounds/creion.m4a"},
    {name: "creta", src: "../resurse/scoala/creta.jpg", sound: "../resurse/sounds/creta.m4a"},
    {name: "foarfeca", src: "../resurse/scoala/foarfeca.jpg", sound: "../resurse/sounds/foarfeca.m4a"},
    {name: "ghiozdan", src: "../resurse/scoala/ghiozdan.jpg", sound: "../resurse/sounds/ghiozdan.m4a"},
    {name: "minge", src: "../resurse/scoala/minge.jpg", sound: "../resurse/sounds/minge.m4a"},
    {name: "penar", src: "../resurse/scoala/penar.jpg", sound: "../resurse/sounds/penar.m4a"},
    {name: "tabla", src: "../resurse/scoala/tabla2.jpg", sound: "../resurse/sounds/tabla.m4a"}
];

var rows = ["firstRow", "secondRow", "thirdRow"];
var options = [4,5,6];
var imgPerRow = 4;
var nrCorrectImgs = options[Math.floor(Math.random() * options.length)];
var nrWrongImgs = 12 - nrCorrectImgs;

console.log("Correct: " + nrCorrectImgs);
console.log("Wrong: " + nrWrongImgs);

function getRandomImage(fromArray, toTarget, usedImages, usedImagesCount) {
    var num = Math.floor(Math.random() * (fromArray.length));
    if (!usedImages[num]) {
        toTarget.push(fromArray[num]);
        usedImages[num] = true;
        usedImagesCount++;
        if (usedImagesCount === fromArray.length) {
            usedImagesCount = 0;
            usedImages = [];
        }
    } else {
        getRandomImage(fromArray, toTarget, usedImages, usedImagesCount);
    }
}

function generateImages(targetArray, nrOfImages) {
    var usedImages = [];
    var usedImagesCount = 0;
    var result = [];
    for (var i = 0; i < nrOfImages; i++) {
        getRandomImage(targetArray, result, usedImages, usedImagesCount);
    }
    return result;
} //generate N number of images from targetArray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function addImages() {
    var correctImages = generateImages(correctImgs, nrCorrectImgs);
    var wrongImgages = generateImages(wrongImgs, nrWrongImgs);
    var result = shuffle(correctImages.concat(wrongImgages));
    var k = 0;
    for (var i = 0; i < rows.length; i++) {
        var div = document.getElementById(rows[i]);
        for (var j = 0; j < imgPerRow; j++) {
            var image = result[k++];
            div.innerHTML += "<div class=\"box\"><div class=\"imgBox\" id=\"imgBox\"><img src=\"" + image.src + '\"' + ' id=\"' + image.name + '\" ' + "alt=\"" + image.sound + '\"' + "></div></div>";
        }
    }
} //concatenates 2 arrays of correct and incorrect Images, shuffles and display them

function main() {
    addImages();
}

main();

var doc = document.getElementById("container").getElementsByTagName("img");
var currentCorrect = 0;
var currentSelected = 0;


function speakerEventListener(){
    var speaker = document.getElementById("speaker");
    var speakerSound = new Audio();
    var sample = document.getElementById("foobar");
    speakerSound.src = "../resurse/sounds/cerintaSunetS2.m4a";
    speaker.addEventListener("click", () => {
        if(speakerSound.paused && sample.paused) speakerSound.play();
    });
}
function imagesOnClick(){
    for (var i = 0; i < doc.length; i++) {
        doc[i].addEventListener('click', function () {
            this.classList.toggle("select");
            if (this.classList.contains("select")) {
                this.style.opacity = "0.6";
                currentSelected++;
            } else {
                this.style.opacity = "1";
                currentSelected--;
            }

            if (this.classList.contains("select") && isCorrect(this)) {
                currentCorrect++;
            } else if (!this.classList.contains("select") && isCorrect(this)) {
                currentCorrect--;
            }

            if (checkWinCondition()) {
                winEffect();
            }

        });
    }
}
function winEffect(){
    console.log("YOU WON");
    var sound = new Audio();
    sound.src = "../resurse/sounds/victoryGame.mp3";
    sound.play();
    for (var j = 0; j < doc.length; j++) {
        if (!isCorrect(doc[j])) {
            doc[j].style.visibility = 'hidden';
        }else{
            doc[j].style.opacity = '1';
        }
    }
    imagesUnclickable();
}
function imagesEventListener(){
    var sound = new Audio();
    for (var j = 0; j < doc.length; j++) {
        doc[j].addEventListener('mouseover', function () {
            sound.src = this.alt;
            sound.play();
        });
        doc[j].addEventListener('mouseout', function () {
            sound.pause();
            sound.currentTime = 0;
        })
    }
}
function isCorrect(image) {
    return image.id.charAt(0).toLowerCase() === 's';

}

function getNumberOfImagesWithS(){
    var counter = 0;
    for (var i = 0; i < doc.length; i++){
        if (doc[i].id.charAt(0).toLowerCase() === 's') counter++;
    }
    return counter;
}
function checkWinCondition() {
    return currentSelected === currentCorrect && currentSelected === getNumberOfImagesWithS();
}
function playAuto(){
    var sample = document.getElementById("foobar");
    sample.play();
}
function imagesUnclickable(){
    for (var i = 0; i < doc.length; i++){
        doc[i].style.pointerEvents = "none";
    }
}

playAuto();
speakerEventListener();
imagesEventListener();
imagesOnClick();









