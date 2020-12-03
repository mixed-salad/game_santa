const presentCountImg = new Image();
presentCountImg.src = '../img/presents.png';

class PresentBoard {
  constructor(game) {
    this.game = game;
  }

  draw() {
    this.game.context.drawImage(
      presentCountImg,
      500,
      495,
      500,
      495,
      canvasWidth / 2 - 35,
      20,
      35,
      35
    );
    if(this.game.presentLeft){
        this.game.context.fillStyle = 'white';
    } else {
        this.game.context.fillStyle = 'red';
    }
    this.game.context.font = '30px "Love Ya Like A Sister"';
    this.game.context.fillText(this.game.presentCount,
      canvasElement.width / 2 + 5,
      50
    );
  }
}
