let startTime = 0;
let countdownSeconds = 0;
let initialTime = 0;
let newTime = 0;
let theTimer = null;
let timeToFinish = 100;
// pointers to intervals to be used when countdown ends.
let snoozeAlarm = null; 
let countdownZero = null;
const alarm = new Audio("./alarm.wav");

$(function(){
    // Show last time stored in cookies, if any

    initialTime = getCookie("initialTime");
    countdownSeconds = getCookie("remainingTime"); 
    $("#webhook").val(getCookie("webhook"));
    if(countdownSeconds == "" || countdownSeconds <= 0) {
        if(initialTime > 0){
            countdownSeconds = initialTime;
        } else {
            countdownSeconds = 1*60*60;
        }
    } else {
        countdownSeconds = parseInt(countdownSeconds);
    }
    if(initialTime == "" || initialTime <= 0 || initialTime < countdownSeconds) {
        initialTime = countdownSeconds;
    } else {
        initialTime = parseInt(initialTime);
    }
    showTime(countdownSeconds);

    // Show inputs stores in cookies, if any
    if(
        parseInt(getCookie("initialHours")) != NaN && 
        parseInt(getCookie("initialMinutes")) != NaN &&
        parseInt(getCookie("initialSeconds")) != NaN
    ) {
        $("#input-hours").val(getCookie("initialHours"));
        $("#input-minutes").val(getCookie("initialMinutes"));
        $("#input-seconds").val(getCookie("initialSeconds"));
    } else {
        $("#input-hours").val("1");
        $("#input-minutes").val("0");
        $("#input-seconds").val("0");
    }

    // configure press of "enter" button for all inputs
    $('#input-hours').keydown(search);
    $('#input-minutes').keydown(search);
    $('#input-seconds').keydown(search);

    function search(pressedKey){
        if(pressedKey.key === 'Enter'){
            loadTimer();
        }
    }

    $("#start-btn").on("click", timerClick);
    $("#start-btn-icon-2").on("click", timerClick);
    $("#reset-btn").on("click", resetTimer);
    $("#reset-btn-icon-2").on("click", resetTimer);
    $("#input-btn").on("click", loadTimer);
    alarm.loop = true;
});

function timerClick() {
    if (theTimer == null) {
        startTimer();
        sendWebhookMessage("Study session started.", "65301");
    } else {
        sendWebhookMessage("Study session paused.", "15924992");
        stopTimer(theTimer);
    }
}

function startTimer() {
    let alreadyComputedTime = newTime; // gets interval already computed
    startTime = Date.now();
    setCookie("webhook", $("#webhook").val(), 365);
    theTimer = setInterval(function() {
        newTime = (Date.now() - startTime) / 1000 + alreadyComputedTime;
        if(countdownSeconds > newTime){
            showTime(countdownSeconds - newTime);
        } else {
            showTime(0);
            clearInterval(theTimer);
            // clear current shown time's cookie
            clearCookie("remainingTime");
            clearCookie("initialTime"); 
            alarm.play();
            $(".timer-box").addClass("timeout");
            snoozeAlarm = setTimeout(stopAlarm, 20000);
            countdownZero = setInterval(countdownEndTitle, 500);
        }
    }, 50);
    $("#start-btn-label").text("Stop Counter");
    $("#start-btn-icon").text("stop");
    $("#start-btn-icon-2").text("stop");

    $("#timer").addClass("timer-running");
    $("#burndown-percent").addClass("burndown-running");

}

function stopTimer() {
    stopAlarm();
    $("#end-time").text(new Date()); 
    $("#start-btn").prop("value", "Start Counter");
    clearInterval(theTimer);
    clearInterval(countdownZero);
    theTimer = null;
    $(".timer-box").removeClass("timeout");

    $("#start-btn-label").text("Resume Counter");
    $("#start-btn-icon").text("play_arrow");
    $("#start-btn-icon-2").text("play_arrow");
    
    // remember this option for 30 days
    setCookie("remainingTime", countdownSeconds - newTime, 30); 

    $("#timer").removeClass("timer-running");
    $("#burndown-percent").removeClass("burndown-running");
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
    initialTime = countdownSeconds;

    resetTimer();

    $("#start-btn-label").text("Start Counter");
    $("#start-btn-icon").text("play_arrow");
    $("#start-btn-icon-2").text("play_arrow");

    // remember this option for 30 days
    setCookie("initialTime", initialTime, 30);
    setCookie("initialHours", $("#input-hours").val(), 30);
    setCookie("initialMinutes", $("#input-minutes").val(), 30);
    setCookie("initialSeconds", $("#input-seconds").val(), 30);

}

function resetTimer() {
    sendWebhookMessage("End of study session. Counter reset.", "16711680");
    stopAlarm();
    stopTimer(theTimer);
    clearInterval(countdownZero);
    startTime = 0;
    newTime = 0;
    countdownSeconds = initialTime;

    showTime(countdownSeconds);

    $("#start-btn-label").text("Start Counter");
    $("#start-btn-icon").text("play_arrow");
    $("#start-btn-icon-2").text("play_arrow");

    // clear current shown time's cookie
    clearCookie("remainingTime");
    clearCookie("initialTime"); 
    $("#timer").removeClass("timer-running");
    $("#burndown-percent").removeClass("burndown-running");
}

function showTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    let formattedTime = "".concat(hours.toString().padStart(2, '0'), ":").concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
    $("#timer").text(formattedTime);
    document.title = `Countdown: ${formattedTime}`;

    // update burndown bar
    timeToFinish = time / initialTime * 100;
    adjustTimeBar(timeToFinish);
}

function adjustTimeBar(newTime) {
    $("#burndown-percent").css({width: newTime + "%"});
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

function sendWebhookMessage(msg, color) {
    const url = $("#webhook").val();
    const data = { 
        username: "Countdown",
        content: msg,
        embeds: [
            {
                "title": "Study Session",
                "description": $("#subject").val(),
                color: color,
                "fields": [{
                        name:"Remaining time:",
                        value: $("#timer").text(),
                        inline:false
                    }
                ]
            }
        ] 
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data)) // Response from the server
    .catch(error => console.error('Error:', error));
}