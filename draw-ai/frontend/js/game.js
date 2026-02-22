const timer = document.getElementById("timer")

class GameState {
    constructor(){
        this.score = 0;
        this.timeRemaining = 30;
        this.isDrawing = false;
        this.isGameOver = false;
        this.isCorrect = false;

        this.guessCooldown = 5;
        this.guessTimer = 0
    }

    update(dt) {
        this.timeRemaining -= dt;
        if (this.timeRemaining <= 0 || this.isCorrect) {
            this.isGameOver = true;
            this.isDrawing = false;
        }
    }
}

const game = new GameState();

let lastTime = 0;

function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    game.update(dt);
    updateUI();

    if(!game.isGameOver) {
        requestAnimationFrame(gameLoop);
    } else {
        endGame();
    }
}

function updateUI() {
    timer.textContent = Math.ceil(game.timeRemaining);
}