let startTime = 0;
let countdownSeconds = 0;
let newTime = 0;
let theTimer = null;
// pointers to intervals to be used when countdown ends.
let snoozeAlarm = null; 
let countdownZero = null;
const alarm = new Audio("./alarm.wav");

$(function(){
    $("#timer").text("01:00:00");
    countdownSeconds = 1 * 60 * 60;
    $("#start-btn").on("click", timerClick);
    $("#reset-btn").on("click", resetTimer);
    $("#input-btn").on("click", loadTimer);
    $("#start-time").text("");
    $("#end-time").text("");
    alarm.loop = true;
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
        if(countdownSeconds > newTime){
            showTime(countdownSeconds - newTime);
        } else {
            showTime(0);
            clearInterval(theTimer);
            alarm.play();
            $(".timer-box").addClass("timeout");
            snoozeAlarm = setTimeout(stopAlarm, 20000);
            countdownZero = setInterval(countdownEndTitle, 500);
        }
    }, 50);
    $("#start-btn").prop("value", "Stop Counter");
}

function stopTimer() {
    stopAlarm();
    $("#end-time").text(new Date()); 
    $("#start-btn").prop("value", "Start Counter");
    clearInterval(theTimer);
    clearInterval(countdownZero);
    theTimer = null;
    $(".timer-box").removeClass("timeout");
}

function loadTimer() {
    let hours = parseInt($("#input-hours").val());
    if (isNaN(hours)) hours = 0;

    let minutes = parseInt($("#input-minutes").val());
    if (isNaN(minutes)) minutes = 0;

    let seconds = parseInt($("#input-seconds").val()); 
    if (isNaN(seconds)) seconds = 0;

    countdownSeconds = 
        hours * 3600 + minutes * 60 + seconds;
    resetTimer();
}

function resetTimer() {
    stopAlarm();
    stopTimer(theTimer);
    clearInterval(countdownZero);
    startTime = 0;
    newTime = 0;

    showTime(countdownSeconds - startTime);
}

function showTime(time) {
    let integralPart = Math.floor(time);
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(integralPart / 60) % 60; 
    let hours = Math.floor(integralPart / 3600);

    seconds = seconds.toFixed(0);
    seconds = pad(seconds);
    minutes = minutes.toFixed(0);
    minutes = pad(minutes);
    hours = hours.toFixed(0);
    hours = pad(hours);

    let formattedTime = `${hours}:${minutes}:${seconds}`;
    $("#timer").text(formattedTime);
    document.title = `Countdown: ${formattedTime}`;
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

function stopAlarm() {
    alarm.pause();
    clearInterval(snoozeAlarm);
    alarm.currentTime = 0;
}

function countdownEndTitle() {
    if(document.title === "COUNTDOWN ENDED!"){
        document.title = "COUNTDOWN";
    } else document.title = "COUNTDOWN ENDED!";
}