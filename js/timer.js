class Timer {
    constructor(game) {
        this.game = game;
    }
     
    startTimer() {
        this.timer = setInterval(() => {
            this.game.timeLeft -= 1;
        }, 1000);
    }

    draw() {
    this.game.context.fillStyle = 'white';
    this.game.context.font = '30px sans-serif';
    this.game.context.fillText(this.game.timeLeft, canvasElement.width * 3/4, 50);
    }
}