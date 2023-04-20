let startTime = 0;
let newTime = 0;
let theTimer = null;

$(function(){
    newTime = getCookie("currentTime") != ""? getCookie("currentTime"): 0;
    showTime(newTime);
    $("#start-btn").on("click", timerClick);
    $("#reset-btn").on("click", resetTimer);
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
        setCookie("startTime", startTime, 30);
        $("#start-time").text(startTime);
    } 
    $("#start-btn").prop("value", "Stop Counter");
}

function stopTimer() {
    let endTime = new Date();
    setCookie("endTime", endTime, 30);
    $("#end-time").text(endTime); 
    $("#start-btn").prop("value", "Start Counter");
    clearInterval(theTimer);
    theTimer = null;

    // set current time cookie
    setCookie("currentTime", newTime, 30);
}

function resetTimer() {
    stopTimer(theTimer);
    startTime = 0;
    newTime = 0;
    showTime(startTime);
    $("#start-time").text("");
    $("#end-time").text("");
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