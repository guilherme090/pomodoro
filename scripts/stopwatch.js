let startTime = 0;
let newTime = 0;
let theTimer = null;

$(function(){
    //$("#timer").text("00:00:00.000");
    showTime(0);
    $("#start-btn").on("click", timerClick);
    $("#reset-btn").on("click", resetTimer);
    $("#start-time").text("");
    $("#end-time").text("");
});

function timerClick() {
    if (theTimer == null) {
        startTimer();
    } else {
        stopTimer(theTimer);
    }
}

function startTimer() {
    let alreadyComputedTime = newTime; // gets interval already computed
    startTime = Date.now();
    theTimer = setInterval(function() {
        newTime = (Date.now() - startTime) / 1000 + alreadyComputedTime;
        showTime(newTime);
    }, 50);
    if($("#start-time").text() === "") {
        $("#start-time").text(new Date());
    } 
    $("#start-btn").prop("value", "Stop Counter");
}

function stopTimer() {
    $("#end-time").text(new Date()); 
    $("#start-btn").prop("value", "Start Counter");
    clearInterval(theTimer);
    theTimer = null;
}

function resetTimer() {
    stopTimer(theTimer);
    startTime = 0;
    newTime = 0;
    showTime(startTime);
    $("#start-time").text("");
    $("#end-time").text("");
}

function showTime(time) {
    let integralPart = Math.floor(time);
    let seconds = time % 60;
    let minutes = Math.floor(integralPart / 60) % 60; 
    let hours = Math.floor(integralPart / 3600);

    let milliseconds = (seconds - integralPart).toFixed(3).substring(2);
    seconds = seconds.toFixed(0);
    seconds = pad(seconds); // add leading zeros
    minutes = minutes.toFixed(0);
    minutes = pad(minutes);
    hours = hours.toFixed(0);
    hours = pad(hours);

    let formattedTime = `${hours}:${minutes}:${seconds}`;
    document.title = `Stopwatch: ${formattedTime}`;
    formattedTime += `<span id="millis">.${milliseconds}</span>`;
    $("#timer").html(formattedTime);

}

/*
    Add leading zeros to format numbers that are lower than 10
*/
function pad (number) {
    if(number < 10) {
        return "0" + number;
    }
    return number;
}