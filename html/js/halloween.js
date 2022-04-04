var ready = false
document.addEventListener("DOMContentLoaded", function(event) {
    ready = true
});
var jackWords = ['Harness','Im Jack','Ouch','Halloween','Candy?','Threats =D','Stop it','Booo'];
function randomWord(arr) {
    const crypto = window.crypto || window.msCrypto;
    var array = new Uint32Array(1);
    return arr[Math.floor(crypto.getRandomValues(array) * arr.length)];
}
var lock = false
var lockSong = false
$( function() {
    $( "#draggable" ).draggable();

    $('#draggable').click(function(){
    if (lock == false){
        lock = true
        $(".speech-bubble").css("visibility", "visible");
        $(".speech-bubble").text(randomWord(jackWords));
        setTimeout(() => {  $(".speech-bubble").css("visibility", "hidden");lock = false; }, 2000);

    }else{
        console.log("Ouch")
    }
    if (lockSong == false){
        lockSong = true
        var audio = new Audio('./songs/HalloweenThemeSong.mp3');
        var playPromise = audio.play();
        setTimeout(() => {  audio.pause();lockSong = false;}, 25000);

    }
}
)
} );