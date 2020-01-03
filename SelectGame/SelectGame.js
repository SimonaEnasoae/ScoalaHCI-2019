var schoolImgs = [
    {name: "acuarele", src: "scoala/acuarele.jpg", sound: "sounds/acuarele.m4a"},
    {name: "birou", src: "scoala/birou.jpg", sound: "sounds/birou.m4a"},
    {name: "caiet", src: "scoala/caiet.jpg", sound: "sounds/caiet.m4a"},
    {name: "camasa", src: "scoala/camasa.jpg", sound: "sounds/camasa.m4a"},
    {name: "carte", src: "scoala/carte.jpg", sound: "sounds/carte.m4a"},
    {name: "creion", src: "scoala/creion.jpg", sound: "sounds/creion.m4a"},
    {name: "creta", src: "scoala/creta.jpg", sound: "sounds/creta.m4a"},
    {name: "foarfeca", src: "scoala/foarfeca.jpg", sound: "sounds/foarfeca.m4a"},
    {name: "ghiozdan", src: "scoala/ghiozdan.jpg", sound: "sounds/ghiozdan.m4a"},
    {name: "minge", src: "scoala/minge.jpg", sound: "sounds/minge.m4a"},
    {name: "penar", src: "scoala/penar.jpg", sound: "sounds/penar.m4a"},
    {name: "sacou", src: "scoala/sacou.jpg", sound: "sounds/sacou.m4a"},
    {name: "saltea", src: "scoala/saltea.jpg", sound: "sounds/saltea.m4a"},
    {name: "scaun", src: "scoala/scaun.jpg", sound: "sounds/sezlong.m4a"},
    {name: "scoci", src: "scoala/scoci.jpg", sound: "sounds/scoci.m4a"},
    {name: "socotitoare", src: "scoala/socotitoare.jpg", sound: "sounds/socotitoare.m4a"},
    {name: "sonerie", src: "scoala/sonerie.jpg", sound: "sounds/sonerie.m4a"},
    {name: "stilou", src: "scoala/stilou.jpg", sound: "sounds/stilou.m4a"},
    {name: "tabla", src: "scoala/tabla2.jpg", sound: "sounds/tabla.m4a"}
];

var nonSchoolImgs = [
    {name: "farfurie", src: "non-scoala/farfurie.jpg", sound: "sounds/farfurie.m4a"},
    {name: "frigider", src: "non-scoala/frigider.jpg", sound: "sounds/frigider.m4a"},
    {name: "lac_unghii", src: "non-scoala/lac_unghii.jpg", sound: "sounds/lac_de_unghii.m4a"},
    {name: "masinuta", src: "non-scoala/masinuta.jpg", sound: "sounds/masinuta.m4a"},
    {name: "mixer", src: "non-scoala/mixer.jpg", sound: "sounds/mixer.m4a"},
    {name: "papusa", src: "non-scoala/papusa.jpg", sound: "sounds/papusa.m4a"},
    {name: "pasta_de_dinti", src: "non-scoala/pasta_de_dinti.jpg", sound: "sounds/pasta_de_dinti.m4a"},
    {name: "pat", src: "non-scoala/pat.jpg", sound: "sounds/pat.m4a"},
    {name: "perna", src: "non-scoala/perna.jpg", sound: "sounds/perna.m4a"},
    {name: "pijama", src: "non-scoala/pijama.jpg", sound: "sounds/pijamale.m4a"},
    {name: "robot", src: "non-scoala/robot.jpg", sound: "sounds/robot.m4a"},
    {name: "sampon", src: "non-scoala/sampon.jpg", sound: "sounds/sampon.m4a"},
    {name: "sezlong", src: "non-scoala/sezlong.jpg", sound: "sounds/sezlong.m4a"},
    {name: "televizor", src: "non-scoala/televizor.jpg", sound: "sounds/televizor.m4a"},
    {name: "uscator_par", src: "non-scoala/uscator_par.jpg", sound: "sounds/uscator_de_par.m4a"}
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
            div.innerHTML += "<div class=\"box\"><div class=\"imgBox\" id=\"imgBox\"><img src=\"" + image.src + '\"' + ' id=\"' + image.name + '\" ' + "alt=\"" + image.sound + '\"' + "></div></div>";
        }
    }
} //concatenates 2 arrays of correct and incorrect Images, shuffles and display them

function main() {
    addImages();
}

main();

var doc = document.getElementById("container").getElementsByTagName("img");
var speaker = document.getElementById("speaker");
var currentCorrect = 0;
var currentSelected = 0;

speaker.addEventListener("click", () => {
    var sound = new Audio();
    sound.src = "sounds/cerinta1.m4a";
    sound.play();
});

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
            console.log("YOU WON");
            var sound = new Audio();
            sound.src = "sounds/victoryGame.mp3"
            sound.play();
            for (var j = 0; j < doc.length; j++) {
                if (!isCorrect(doc[j])) {
                    doc[j].style.visibility = 'hidden';
                }
            }
        }

    });
}

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


function isCorrect(image) {
    for (var i = 0; i < schoolImgs.length; i++) {
        if (image.id === schoolImgs[i].name) return true
    }
    return false;
}


function checkWinCondition() {
    return currentSelected === currentCorrect && currentSelected === nrCorrectImgs;
}







