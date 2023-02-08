let startTime = 0;
let newTime = 0;
let theTimer = null;

$(function(){
    $("#timer").text("0.000");
    $("#start-btn").on("click", timerClick);
    $("#reset-btn").on("click", resetTimer);
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
        $("#timer").text(newTime.toFixed(3));
    }, 50);
    $("#start-btn").prop("value", "Stop Counter");
}

function stopTimer() {
    $("#start-btn").prop("value", "Start Counter");
    clearInterval(theTimer);
    theTimer = null;
}

function resetTimer() {
    stopTimer(theTimer);
    startTime = 0;
    newTime = 0;
    $("#timer").text(startTime.toFixed(3));
}