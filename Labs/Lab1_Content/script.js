var index = 0;
var score = 0;
var curTime = 60;
var timer;

var answers = ["Electronic Arts", "Nike", "Toyota", "Honda", "Twitter", "Instagram", "Pringles", "Lotto", "Dropbox", "GitHub", "McDonalds", "New Balance", "Hilton", "Pizza Hut", "Dominos", "Vodafone", "Pepsi", "NBC", "Monster", "Wikipedia", "Facebook", "Mercedes", "Gatorade", "Audi", "Adobe"];

var images = ["Electronic Arts.svg", "Nike.svg", "Toyota.png", "Honda.png", "Twitter.svg", "Instagram.png", "Pringles.png", "Lotto.jpg", "Dropbox.png", "GitHub.png", "McDonalds.png", "New Balance.png", "Hilton.png", "Pizza Hut.png", "Dominos.png", "Vodafone.png", "Pepsi.png", "NBC.png", "Monster.png", "Wikipedia.png", "Facebook.png", "Mercedes.png", "Gatorade.png", "Audi.png", "Adobe.png"];

function start() {
    clearInterval(timer);
	curTime = 60;
    index = 0;
    score = 0;
    document.getElementById('score').innerHTML = "Score: " + score.toString() + "/25";
    var beginButton = document.getElementById('beginGame');
    beginButton.style.display = 'none';
    var logo = document.getElementById('logo');
    logo.style.display = 'block';
    logo.src = images[index];
    logo.alt = answers[index] + " Logo";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("correctResponses").innerHTML = "Correct Answers: ";
    var input = document.getElementById('answer');
	input.value = "";
    document.getElementById("score").style.display = "block";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("correctResponses").style.display = "block";
    document.getElementById("skip").style.display = "inline";
    document.getElementById("restart").style.display = "inline";
    document.getElementById("quit").style.display = "inline";
    document.getElementById("timer").style.display = "block";
    document.getElementById("answerLabel").style.display = "inline";
    document.getElementById("answer").style.display = "inline";
    answer.focus();
    startTimer();
};

function stop() {
    clearInterval(timer);
    var beginButton = document.getElementById('beginGame');
    beginButton.style.display = 'block';
    var logo = document.getElementById('logo');
    logo.style.display = 'none';
    var input = document.getElementById('answer');
	input.value = "";
    document.getElementById("quit").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("correctResponses").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("skip").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("answerLabel").style.display = "none";
    document.getElementById("answer").style.display = "none";
    index = 0;
    score = 0;
    stopTimer();
    document.getElementById('score').innerHTML = "Score: " + score.toString() + "/25";
};

function stopTimer() {
    clearInterval();
    curTime = 60;
}

function startTimer() {
    timer = setInterval(decreaseTime, 1000)
    document.getElementById("timer").innerHTML = "Time Left: " + curTime.toString() + " seconds";
}

function decreaseTime() {
    curTime--;
    if (curTime < 0) {
        alert("Whoops, you ran out of time with a score of " + score.toString() + "/25!")
        stop();
    } else {
        document.getElementById("timer").innerHTML = "Time Left: " + curTime.toString() + " seconds";
    }
}

function check(input) {
    if ((answers[index].toLowerCase() === input.toLowerCase())) {
        next();
    }
}

function next() {
    if (index < 24) {
        document.getElementById('feedback').innerHTML = "Nice, " + answers[index] + " was correct!";
        var temp = document.createElement('p');
        temp.textContent = index + 1 + ". " + answers[index];
        document.getElementById("correctResponses").append(temp);
        index++;
        score++;
        document.getElementById('score').innerHTML = "Score: " + score.toString() + "/25";
        $('#answer').value = "";
        logo.src = images[index]
        logo.alt = answers[index] + " Logo"
        document.getElementById("answer").value = "";
    } else if (index == 24) {
        score++;
        document.getElementById('score').innerHTML = "Score: " + score.toString() + "/25";
        $('#answer').value = "";
        document.getElementById("answer").value = "";
        alert("Congratulations, you finished with a score of " + score.toString() + "/25!")
        stop();
    } else {
        alert("Congratulations, you finished with a score of " + score.toString() + "/25!")
        stop();
    }
}

function skip() {
    if (index < 24) {
        document.getElementById('feedback').innerHTML = "";
        index++;
        score--;
        answer.focus();
        document.getElementById('score').innerHTML = "Score: " + score.toString() + "/25";
        $('#answer').value = "";
        logo.src = images[index]
        logo.alt = answers[index] + " Logo"
        document.getElementById("answer").value = "";
    } else if (index == 24) {
        score--;
        document.getElementById('score').innerHTML = "Score: " + score.toString() + "/25";
        $('#answer').value = "";
        document.getElementById("answer").value = "";
        alert("Congratulations, you finished with a score of " + score.toString() + "/25!")
        stop();
    } else {
        alert("Congratulations, you finished with a score of " + score.toString() + "/25!")
        stop();
    }
}

$(document).ready(function() {
    $('#answer').on("input", function() {
        check($(this).val());
    });
});
