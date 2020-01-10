var schoolImgs = [
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
    {name: "sacou", src: "../resurse/scoala/sacou.jpg", sound: "../resurse/sounds/sacou.m4a"},
    {name: "saltea", src: "../resurse/scoala/saltea.jpg", sound: "../resurse/sounds/saltea.m4a"},
    {name: "scaun", src: "../resurse/scoala/scaun.jpg", sound: "../resurse/sounds/scaun.m4a"},
    {name: "scoci", src: "../resurse/scoala/scoci.jpg", sound: "../resurse/sounds/scoci.m4a"},
    {name: "socotitoare", src: "../resurse/scoala/socotitoare.jpg", sound: "../resurse/sounds/socotitoare.m4a"},
    {name: "sonerie", src: "../resurse/scoala/sonerie.jpg", sound: "../resurse/sounds/sonerie.m4a"},
    {name: "stilou", src: "../resurse/scoala/stilou.jpg", sound: "../resurse/sounds/stilou.m4a"},
    {name: "tabla", src: "../resurse/scoala/tabla2.jpg", sound: "../resurse/sounds/tabla.m4a"}
];

var nonSchoolImgs = [
    {name: "farfurie", src: "../resurse/non-scoala/farfurie.jpg", sound: "../resurse/sounds/farfurie.m4a"},
    {name: "frigider", src: "../resurse/non-scoala/frigider.jpg", sound: "../resurse/sounds/frigider.m4a"},
    {name: "lac_unghii", src: "../resurse/non-scoala/lac_unghii.jpg", sound: "../resurse/sounds/lac_de_unghii.m4a"},
    {name: "masinuta", src: "../resurse/non-scoala/masinuta.jpg", sound: "../resurse/sounds/masinuta.m4a"},
    {name: "mixer", src: "../resurse/non-scoala/mixer.jpg", sound: "../resurse/sounds/mixer.m4a"},
    {name: "papusa", src: "../resurse/non-scoala/papusa.jpg", sound: "../resurse/sounds/papusa.m4a"},
    {name: "pasta_de_dinti", src: "../resurse/non-scoala/pasta_de_dinti.jpg", sound: "../resurse/sounds/pasta_de_dinti.m4a"},
    {name: "pat", src: "../resurse/non-scoala/pat.jpg", sound: "../resurse/sounds/pat.m4a"},
    {name: "perna", src: "../resurse/non-scoala/perna.jpg", sound: "../resurse/sounds/perna.m4a"},
    {name: "pijama", src: "../resurse/non-scoala/pijama.jpg", sound: "../resurse/sounds/pijamale.m4a"},
    {name: "robot", src: "../resurse/non-scoala/robot.jpg", sound: "../resurse/sounds/robot.m4a"},
    {name: "sampon", src: "../resurse/non-scoala/sampon.jpg", sound: "../resurse/sounds/sampon.m4a"},
    {name: "sezlong", src: "../resurse/non-scoala/sezlong.jpg", sound: "../resurse/sounds/sezlong.m4a"},
    {name: "televizor", src: "../resurse/non-scoala/televizor.jpg", sound: "../resurse/sounds/televizor.m4a"},
    {name: "uscator_par", src: "../resurse/non-scoala/uscator_par.jpg", sound: "../resurse/sounds/uscator_de_par.m4a"}
];

var rows = ["firstRow", "secondRow", "thirdRow"];
var imgPerRow = 4;
var nrCorrectImgs = 8;
var nrIncorrectImgs = 4;
var totalImagesDisplayed = nrCorrectImgs + nrIncorrectImgs;


function getRandomImage(fromArr, toTarget, usedImages, usedImagesCount) {
    var num = Math.floor(Math.random() * (fromArr.length));
    if (!usedImages[num]) {
        toTarget.push(fromArr[num]);
        usedImages[num] = true;
        usedImagesCount++;
        if (usedImagesCount === fromArr.length) {
            usedImagesCount = 0;
            usedImages = [];
        }
    } else {
        getRandomImage(fromArr, toTarget, usedImages, usedImagesCount);
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
    var correctImgs = generateImages(schoolImgs, nrCorrectImgs);
    var incorrectImgs = generateImages(nonSchoolImgs, nrIncorrectImgs);
    var result = shuffle(correctImgs.concat(incorrectImgs));
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
    speakerSound.src = "../resurse/sounds/cerintaSunetS1.m4a";
    speaker.addEventListener("click", () => {
        if(speakerSound.paused && sample.paused) speakerSound.play();
    });
}
function imagesOnClick(){
    var acceptSound = new Audio();
    acceptSound.src = "../resurse/sounds/CorrectAnswer.mp3";
    var denySound = new Audio();
    denySound.src = "../resurse/sounds/maiIncearca1.m4a";
    for (var i = 0; i < doc.length; i++) {
        doc[i].addEventListener('click', function () {
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
                imgBox.getElementsByClassName('overlay')[0].classList.toggle('shadow');
                if(isCorrect(this)){
                    box.style.border = '4px solid #00ff0e';
                    imgBox.getElementsByClassName('overlay')[0].style.boxShadow = "inset 0 0 40px  #00ff0e";
                }else  {
                    box.style.border = '4px solid #FF0F00';
                    imgBox.getElementsByClassName('overlay')[0].style.boxShadow = "inset 0 0 40px  #FF0F00";
                }

                box.style.overflow = 'hidden';
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
    var nextBtn = document.getElementById("nextBtn");
    nextBtn.style.display = 'block';
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
    for (var i = 0; i < schoolImgs.length; i++) {
        if (image.id === schoolImgs[i].name) return true
    }
    return false;
}
function checkWinCondition() {
    return currentSelected === currentCorrect && currentSelected === nrCorrectImgs;
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









