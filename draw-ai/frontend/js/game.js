const timerLabel = document.getElementById("timer");
const overlay = document.getElementById("round-overlay");
const wordText = document.getElementById("target-word");
const scoreLabel = document.getElementById("score-display");

let currentTarget = "";
let score = 0;
let timeRemaining = 20;
let isGameActive = false;
let countdown;

function nextRound() {
    isGameActive = false;
    clearInterval(countdown);

    currentTarget = categories[Math.floor(Math.random()* categories.length)];
    wordText.textContent = `Draw: ${currentTarget}`;

    overlay.style.display = "flex";
    clearCanvas();

    timeRemaining = 20;
    timerLabel.textContent = `Time: ${timeRemaining}`;
}

function startRound() {
    overlay.style.display = "none";
    isGameActive = true;

    countdown = setInterval(() => {
        timeRemaining--;
        timerLabel.textContent = `Time: ${timeRemaining}`;

        if (timeRemaining <= 0) {
            endRound(false);
        }
    }, 1000)
}

function endRound(isSuccess) {
    clearInterval(countdown);

    if(isSuccess) {
        score++;
        scoreLabel.textContent = `Score: ${score}`;
    }
    nextRound();
}

window.onload = nextRound;