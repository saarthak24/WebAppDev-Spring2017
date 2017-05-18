var curTime = 30;
var timer;

function start() {
    clearInterval(timer);
	curTime = 30;
    startTimer();
};

function stop() {
    clearInterval(timer);
    stopTimer();
};

function stopTimer() {
    clearInterval();
    curTime = 30;
}

function startTimer() {
    timer = setInterval(decreaseTime, 1000)
    document.getElementById("timer").innerHTML = "Time Left: " + curTime.toString() + " seconds";
}

function decreaseTime() {
    curTime--;
    if (curTime < 0) {
        stop();
    } else {
        document.getElementById("timer").innerHTML = "Time Left: " + curTime.toString() + " seconds";
    }
}
