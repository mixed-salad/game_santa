class ScoreBoard {
    constructor(game) {
        this.game = game;
    }

    draw() {
    this.game.context.fillStyle = 'white';
    this.game.context.font = '30px sans-serif';
    this.game.context.fillText(this.game.score, canvasElement.width / 4, 50);
    }
}