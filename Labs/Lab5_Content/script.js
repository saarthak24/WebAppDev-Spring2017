var curTime = 3;
var timer;
var socket = io();
var choice;

function rockFunction() {
    socket.emit("choice", {
        selection: 1
    });
    choice = 1;
    $("#rockButton").toggleClass('clicked');
    $("#rockButton").prop("onclick", false);
    $("#paperButton").prop("onclick", false);
    $("#scissorsButton").prop("onclick", false);
}

function paperFunction() {
    socket.emit("choice", {
        selection: 2
    })
    choice = 2;
    $("#paperButton").toggleClass('clicked');
    $("#rockButton").prop("onclick", false);
    $("#paperButton").prop("onclick", false);
    $("#scissorsButton").prop("onclick", false);
}

function scissorsFunction() {
    socket.emit("choice", {
        selection: 3
    })
    choice = 3;
    $("#scissorsButton").toggleClass('clicked');
    $("#rockButton").prop("onclick", false);
    $("#paperButton").prop("onclick", false);
    $("#scissorsButton").prop("onclick", false);
}

socket.on("start", function(data) {
    if (data.start) {
        start()
    }
})

socket.on("outcome", function(data) {
    stop()
    var winner = data.winnerChoice;
    var loser = data.loserChoice;
    if (winner != loser) {
        if (choice == winner) {
            document.getElementById("timer").innerHTML = "You won!";
            if (winner == 1) {
                $("#rockButton").toggleClass('won');
            } else if (winner == 2) {
                $("#paperButton").toggleClass('won');
            } else {
                $("#scissorsButton").toggleClass('won');
            }
            if (loser == 1) {
                $("#oppRockButton").toggleClass('lost');
                $("#oppRockButton").toggleClass('clicked');
            } else if (loser == 2) {
                $("#oppPaperButton").toggleClass('lost');
                $("#oppPaperButton").toggleClass('clicked');
            } else {
                $("#oppScissorsButton").toggleClass('lost');
                $("#oppScissorsButton").toggleClass('clicked');
            }
        } else if (choice == loser) {
            document.getElementById("timer").innerHTML = "You lost!";
            if (winner == 1) {
                $("#oppRockButton").toggleClass('won');
                    $("#oppRockButton").toggleClass('clicked');
            } else if (winner == 2) {
                $("#oppPaperButton").toggleClass('won');
                $("#oppPaperButton").toggleClass('clicked');
            } else {
                $("#oppScissorsButton").toggleClass('won');
                $("#oppScissorsButton").toggleClass('clicked');
            }
            if (loser == 1) {
                $("#rockButton").toggleClass('lost');
            } else if (loser == 2) {
                $("#paperButton").toggleClass('lost');
            } else {
                $("#scissorsButton").toggleClass('lost');
            }
        }
        else if (choice == 0) {
            
        }
    } else {
        document.getElementById("timer").innerHTML = "You tied!";
        if (winner == 1) {
            $("#oppRockButton").toggleClass('tie');
            $("#oppRockButton").toggleClass('clicked');
            $("#rockButton").toggleClass('tie');
        } else if (winner == 2) {
            $("#oppPaperButton").toggleClass('tie');
            $("#oppPaperButton").toggleClass('clicked');
            $("#paperButton").toggleClass('tie');
        } else {
            $("#oppScissorsButton").toggleClass('tie');
            $("#oppScissorsButton").toggleClass('clicked');
            $("#scissorsButton").toggleClass('tie');
        }
    }
})

function start() {
    clearInterval(timer);
	curTime = 3;
    startTimer();
};

function stop() {
    clearInterval(timer);
    stopTimer();
};

function stopTimer() {
    clearInterval();
    curTime = 3;
}

function startTimer() {
    timer = setInterval(decreaseTime, 1000)
    document.getElementById("timer").innerHTML = "Time Left: " + curTime.toString() + " seconds";
}

function decreaseTime() {
    curTime--;
    if (curTime < 0) {
        stop();
        socket.emit("choice", {
            selection: 2
        })
        choice = 2;
        $("#rockButton").prop("onclick", false);
        $("#paperButton").prop("onclick", false);
        $("#scissorsButton").prop("onclick", false);
    } else {
        document.getElementById("timer").innerHTML = "Time Left: " + curTime.toString() + " seconds";
    }
}
