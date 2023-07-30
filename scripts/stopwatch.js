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
    $("#webhook").val(getCookie("webhook"));
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
    let alreadyComputedTime = parseFloat(newTime); // gets interval already computed
    startTime = Date.now();
    theTimer = setInterval(function() {
        newTime = (Date.now() - startTime) / 1000 + alreadyComputedTime;
        showTime(newTime);
    }, 50);
    if($("#start-time").text() === "") {
        let startTime = new Date();
        setCookie("startTime", String(startTime).substring(0, ISO_CHARACTERS), 30);
        setCookie("webhook", $("#webhook").val(), 365);
        $("#start-time").text(String(startTime).substring(0, ISO_CHARACTERS));
    } 
    $("#start-btn-label").text("Stop Counter");
    $("#start-btn-icon").text("stop");
    $("#start-btn-icon-2").text("stop");

    $("#timer").addClass("timer-running");
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

    $("#timer").removeClass("timer-running");
}

function resetTimer() {
    sendWebhookMessage("End of study session. Counter reset.", "16711680");

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

    $("#timer").removeClass("timer-running");
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

function sendWebhookMessage(msg, color) {
    const url = $("#webhook").val();
    const data = { 
        username: "Stopwatch",
        content: msg,
        embeds: [
            {
                "title": "Study Session",
                "description": $("#subject").val(),
                color: color,
                "fields": [{
                        name:"Start time:",
                        value: $("#start-time").text(),
                        inline:false
                    }, {
                        name:"End time:",
                        value: $("#end-time").text(),
                        inline:false
                    }, {
                        name:"Study time:",
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