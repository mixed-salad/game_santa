
class ScoreBoard {
    constructor(game) {
        this.game = game;
    }

    draw() {
    this.game.context.fillStyle = 'white';
    this.game.context.font = '30px "Love Ya Like A Sister"';
    this.game.context.fillText(`Score: ${this.game.score}`, canvasElement.width / 5, 50);
    }
}