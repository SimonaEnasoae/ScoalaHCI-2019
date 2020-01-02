var schoolImgs = [
    {name: "acuarele", src: "scoala/acuarele.jpg"},
    {name: "birou", src: "scoala/birou.jpg"},
    {name: "caiet", src: "scoala/caiet.jpg"},
    {name: "camasa", src: "scoala/camasa.jpg"},
    {name: "carte", src: "scoala/carte.jpg"},
    {name: "creion", src: "scoala/creion.jpg"},
    {name: "creta", src: "scoala/creta.jpg"},
    {name: "foarfeca", src: "scoala/foarfeca.jpg"},
    {name: "ghiozdan", src: "scoala/ghiozdan.jpg"},
    {name: "minge", src: "scoala/minge.jpg"},
    {name: "penar", src: "scoala/penar.jpg"},
    {name: "sacou", src: "scoala/sacou.jpg"},
    {name: "saltea", src: "scoala/saltea.jpg"},
    {name: "scaun", src: "scoala/scaun.jpg"},
    {name: "scoci", src: "scoala/scoci.jpg"},
    {name: "socotitoare", src: "scoala/socotitoare.jpg"},
    {name: "sonerie", src: "scoala/sonerie.jpg"},
    {name: "stilou", src: "scoala/stilou.jpg"},
    {name: "tabla", src: "scoala/tabla2.jpg"}
];

var nonSchoolImgs = [
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

var rows = ["firstRow", "secondRow", "thirdRow"];
for (var i = 0; i < rows.length; i++) {
    var div = document.getElementById(rows[i]);
    for (var j = 0; j < 4; j++) {
        var image = schoolImgs[j];
        div.innerHTML += "<div class=\"box\">" + "<div class=\"imgBox\">" + '<img src=\"' + image.src + '\"' + " alt=\"\">" + "</div>" + "</div>";
    }
}
