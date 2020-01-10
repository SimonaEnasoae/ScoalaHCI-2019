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

var numberImgs = [
    {name: 3, src: "../resurse/numbers/3.png"},
    {name: 4, src: "../resurse/numbers/4"},
    {name: 5, src: "../resurse/numbers/5"}
];

var rows = ["firstRow", "secondRow", "thirdRow"];
var options = [3,4,5];
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
function addImages(result) {
    var k = 0;
    for (var i = 0; i < rows.length; i++) {
        var div = document.getElementById(rows[i]);
        for (var j = 0; j < imgPerRow; j++) {
            var image = result[k++];
            div.innerHTML += "<div class=\"box\"><div class=\"imgBox\" id=\"imgBox\"><img src=\"" + image.src + '\"' +
                ' id=\"' + image.name + '\" ' + "alt=\"" + image.sound + '\"' + ">"+ "<div class=\"overlay\" id=\"overlay\"></div></div>";
        }
    }
} //concatenates 2 arrays of correct and incorrect Images, shuffles and display them
function main() {
    var correctImages = generateImages(correctImgs, nrCorrectImgs);
    var wrongImages = generateImages(wrongImgs, nrWrongImgs);
    var result = shuffle(correctImages.concat(wrongImages));
    addImages(result);
}

main();

var doc = document.getElementById("container").getElementsByTagName("img");
var hiddenDoc = document.getElementById("list").getElementsByTagName("img");
var currentCorrect = 0;
var currentSelected = 0;
var currentSrc = "../resurse/sounds/cerintaSunetS2.m4a";
var currentSound = new Audio();
currentSound.src = currentSrc;

function speakerEventListener(){
    var speaker = document.getElementById("speaker");
    var sample = document.getElementById("foobar");
    speaker.addEventListener("click", () => {
        if(currentSound.paused && sample.paused) currentSound.play();
    });
}
function imagesOnClick(){

    for (var i = 0; i < doc.length; i++) {
        doc[i].addEventListener('click', function () {
            var acceptSound = new Audio();
            acceptSound.src = "../resurse/sounds/CorrectAnswer.mp3";
            var denySound = new Audio();
            denySound.src = "../resurse/sounds/maiIncearca1.m4a";
            if (!this.classList.contains("select")){
                if(isCorrect(this)){
                    acceptSound.currentTime = 0;
                    acceptSound.play();
                }else{
                    denySound.currentTime = 0;
                    denySound.play();
                }
            }

            this.classList.toggle("select");
            var box = this.parentElement.parentElement;
            var imgBox = this.parentElement;
            if (this.classList.contains("select")) {
                box.style.border = '4px solid #00ff0e';
                box.style.overflow = 'hidden';
                imgBox.getElementsByClassName('overlay')[0].classList.toggle('shadow');
                currentSelected++;
            } else {
                box.style.removeProperty('border');
                imgBox.getElementsByClassName('overlay')[0].classList.toggle('shadow');
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
    var list = document.getElementById("list");
    list.style.display = 'block';
    console.log("YOU WON");
    var sound = new Audio();
    sound.src = "../resurse/sounds/victoryGame.mp3";
    sound.play();

    var correctImages = [];

    for (var j = 0; j < doc.length; j++) {
        if (isCorrect(doc[j])) {
            correctImages.push(doc[j]);
        }

    }
    document.getElementById("container").style.cursor = 'default';
    document.getElementById("imgBox").style.cursor = 'default';

    removeImages();
    hiddenImagesOnClick();
    leaveCorrectImages(correctImages);
    var speakerSound = new Audio();
    setTimeout(function()
    {

        speakerSound.src = "../resurse/sounds/cerintaSunetS3.m4a";
        speakerSound.play();
    }, 3000);
    currentSound.src = "../resurse/sounds/cerintaSunetS3.m4a";

}


function leaveCorrectImages(result){
    var div = document.getElementById("firstRow");
    for (var j = 0; j < result.length; j++) {
        var image = result[j];
        div.innerHTML += "<div class=\"box\"><div class=\"imgBox\" id=\"imgBox\"><img src=\"" + image.src + '\"' + ' id=\"' + image.id + '\" ' + "alt=\"" + image.alt + '\"' + "></div></div>";
    }
}
function removeImages(){
    var docs = document.getElementsByClassName("box");
    for (var i= docs.length; i-->0;)
       docs[i].parentNode.removeChild(docs[i]);
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

var soundFail = new Audio();
soundFail.src = "../resurse/sounds/maiIncearca1.m4a";
function hiddenImagesOnClick(){
    for (var i = 0; i < hiddenDoc.length; i++) {
        hiddenDoc[i].addEventListener('click', function () {
            if (Number(this.id) === doc.length){
                secondWinEffect();
            }else{

                if(soundFail.paused)  soundFail.play();
            }
        });
    }
}

function secondWinEffect(){
    var sound = new Audio();
    sound.src = "../resurse/sounds/victoryGame.mp3";
    sound.play();
    toggleVisablity("Message-Container");
    return true;


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
function toggleVisablity(id) {
    if (document.getElementById(id).style.visibility === "visible") {
        document.getElementById(id).style.visibility = "hidden";
    } else {
        document.getElementById(id).style.visibility = "visible";
    }
}

playAuto();
speakerEventListener();
imagesEventListener();
imagesOnClick();









