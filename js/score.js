class ScoreBoard {
    constructor(game) {
        this.game = game;
    }

    draw() {
    context.fillStyle = 'white';
    context.font = '30px sans-serif';
    context.fillText(this.game.score, canvasElement.width / 4, 50);
    }
}