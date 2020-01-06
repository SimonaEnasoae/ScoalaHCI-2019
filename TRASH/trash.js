var speaker = document.getElementById("speaker");


speaker.addEventListener("click", () => {
    var sound = new Audio();
    sound.src = "sounds/cerinta1.m4a";
    sound.play();
});

var scoalaArray = [
    "scoala/acuarele.jpg",
    "scoala/birou.jpg",
    "scoala/caiet.jpg",
    "scoala/camasa.jpg",
    "scoala/carte.jpg",
    "scoala/creion.jpg",
    "scoala/creta.jpg",
    "scoala/foarfeca.jpg",
    "scoala/ghiozdan.jpg",
    "scoala/minge.jpg",
    "scoala/penar.jpg",
    "scoala/sacou.jpg",
    "scoala/saltea.jpg",
    "scoala/scaun.jpg",
    "scoala/scoci.jpg",
    "scoala/socotitoare.jpg",
    "scoala/sonerie.jpg",
    "scoala/stilou.jpg",
    "scoala/tabla2.jpg"
];

var soundsScoalaArray = [
    "sounds/acuarele.m4a",
    "sounds/birou.m4a",
    "sounds/caiet.m4a",
    "sounds/camasa.m4a",
    "sounds/carte.m4a",
    "sounds/creion.m4a",
    "sounds/creta.m4a",
    "sounds/foarfeca.m4a",
    "sounds/ghiozdan.m4a",
    "sounds/minge.m4a",
    "sounds/penar.m4a",
    "sounds/sacou.m4a",
    "sounds/saltea.m4a",
    "sounds/victoryGame.m4a",
    "sounds/scoci.m4a",
    "sounds/socotitoare.m4a",
    "sounds/sonerie.m4a",
    "sounds/stilou.m4a",
    "sounds/tabla.m4a"
];

var nonScoalaArray = [
    "non-scoala/farfurie.jpg",
    "non-scoala/frigider.jpg",
    "non-scoala/lac_unghii.jpg",
    "non-scoala/masinuta.jpg",
    "non-scoala/mixer.jpg",
    "non-scoala/papusa.jpg",
    "non-scoala/pasta_de_dinti.jpg",
    "non-scoala/pat.jpg",
    "non-scoala/perna.jpg",
    "non-scoala/pijama.jpg",
    "non-scoala/robot.jpg",
    "non-scoala/sampon.jpg",
    "non-scoala/sezlong.jpg",
    "non-scoala/televizor.jpg",
    "non-scoala/uscator_par.jpg"
];

var soundsNonScoalaArray = [
    "sounds/farfurie.m4a",
    "sounds/frigider.m4a",
    "sounds/lac_de_unghii.m4a",
    "sounds/masinuta.m4a",
    "sounds/mixer.m4a",
    "sounds/papusa.m4a",
    "sounds/pasta_de_dinti.m4a",
    "sounds/pat.m4a",
    "sounds/perna.m4a",
    "sounds/pijamale.m4a",
    "sounds/robot.m4a",
    "sounds/sampon.m4a",
    "sounds/sezlong.m4a",
    "sounds/televizor.m4a",
    "sounds/uscator_de_par.m4a"
];
var correctImages = [];
var wrongImages = [];
var usedImages = [];
var usedImagesCount = 0;

function getImage(fromArr, toTarget, usedImages, usedImagesCount) {
    var num = Math.floor(Math.random() * (fromArr.length));
    if (!usedImages[num]) {
        var img = document.createElement("img");
        img.src = fromArr[num];
        toTarget.push(img);
        usedImages[num] = true;
        usedImagesCount++;
        if (usedImagesCount === fromArr.length) {
            usedImagesCount = 0;
            usedImages = [];
        }
    } else {
        getImage(fromArr, toTarget);
    }
}

function generateCorrectImages() {
    var i;
    for (i = 0; i < 8; i++) {
        getImage(scoalaArray, correctImages);
    }
    usedImages = [];
    usedImagesCount = 0;
}

function generateWrongImages() {
    var i;
    for (i = 0; i < 4; i++) {
        getImage(nonScoalaArray, wrongImages);
    }
    usedImages = [];
    usedImagesCount = 0;
}

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

function displayImages() {
    generateCorrectImages();
    generateWrongImages();
    var fullArray = correctImages.concat(wrongImages);
    var shuffledArray = shuffle(fullArray);
    var i;
    for (i = 0; i < shuffledArray.length; i++) {
        document.getElementById("imgs").appendChild(shuffledArray[i]);
    }


}

function isCorrect(image) {
    return scoalaArray.includes(image.getAttribute('src'));
}

function toggleActiveState() {
    this.classList.toggle('active');
}

displayImages();

var getDiv = document.getElementById('imgs');
var allImages = getDiv.getElementsByTagName('img');
var checkBtn = document.getElementById("check");
var k=0;
[].forEach.call(allImages, function (image) {
    image.addEventListener("click", () => {
        if (!isCorrect(image)) {
            var sound = new Audio();
            sound.src = "sounds/maiIncearca1.m4a"
            sound.play();
        }else{
            image.classList.toggle('active');
            k++;
            if(k===8){
                var victorie = new Audio();
                victorie.src = "sounds/victoryGame.mp3";
                victorie.play();
                [].forEach.call(allImages, function (image){
                    if(!image.classList.contains("active")){
                        image.style.display = "none";
                    }else{image.classList.toggle("active")}
                });
            }
        }
    })
});

checkBtn.addEventListener("click", ()=>{
   if(k===8){
       var sound = new Audio();
       sound.src = "sounds/victoryGame.mp3";
       sound.play();
       [].forEach.call(allImages, function (image){
            if(!image.classList.contains("active")){
                image.style.display = "none";
            }else{image.classList.toggle("active")}
       })
   }else{
       var sad = new Audio();
       sad.src = "sounds/maiIncearca1.m4a";
       sad.play();
   }
});



