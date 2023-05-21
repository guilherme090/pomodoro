let startTime = 0;
let newTime = 0;
let theTimer = null;
const ISO_CHARACTERS = 24; // first characters that form time without the time zone specification

$(function(){
    newTime = getCookie("currentTime") != ""? getCookie("currentTime"): 0;
    showTime(newTime);
    $("#start-btn").on("click", timerClick);
    $("#start-btn-icon-2").on("click", timerClick);
    $("#reset-btn").on("click", resetTimer);
    $("#reset-btn-icon-2").on("click", resetTimer);
    $("#start-time").text(getCookie("startTime"));
    $("#end-time").text(getCookie("endTime"));
});

function timerClick() {
    if (theTimer == null) {
        startTimer();
    } else {
        stopTimer(theTimer);
    }
}

function startTimer() {
    let alreadyComputedTime = parseFloat(newTime); // gets interval already computed
    startTime = Date.now();
    theTimer = setInterval(function() {
        newTime = (Date.now() - startTime) / 1000 + alreadyComputedTime;
        showTime(newTime);
    }, 50);
    if($("#start-time").text() === "") {
        let startTime = new Date();
        setCookie("startTime", String(startTime).substring(0, ISO_CHARACTERS), 30);
        $("#start-time").text(String(startTime).substring(0, ISO_CHARACTERS));
    } 
    $("#start-btn-label").text("Stop Counter");
    $("#start-btn-icon").text("stop");
    $("#start-btn-icon-2").text("stop");
}

function stopTimer() {
    let endTime = new Date();

    setCookie("endTime", String(endTime).substring(0, ISO_CHARACTERS), 30);
    $("#end-time").text(String(endTime).substring(0, ISO_CHARACTERS)); 
    $("#start-btn-label").text("Resume Counter");
    $("#start-btn-icon").text("play_arrow");
    $("#start-btn-icon-2").text("play_arrow");

    clearInterval(theTimer);
    theTimer = null;

    // set current time cookie
    setCookie("currentTime", String(newTime).substring(0, ISO_CHARACTERS), 30);
}

function resetTimer() {
    stopTimer(theTimer);
    startTime = 0;
    newTime = 0;
    showTime(startTime);
    $("#start-time").text("");
    $("#end-time").text("");
    $("#start-btn-label").text("Start Counter");
    $("#start-btn-icon").text("play_arrow");
    $("#start-btn-icon-2").text("play_arrow");
    // clear cookies
    clearCookie("startTime");
    clearCookie("endTime");
    clearCookie("currentTime");
}

function showTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    let milliseconds = Math.floor((time % 1) * 1000);
    let formattedTime = "".concat(hours.toString().padStart(2, '0'), ":").concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
    document.title = "Stopwatch: ".concat(formattedTime);
    formattedTime += "<span id=\"millis\">.".concat(milliseconds.toString().padStart(3, '0'), "</span>");
    $("#timer").html(formattedTime);
}