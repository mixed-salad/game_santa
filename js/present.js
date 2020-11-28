const presentImg = new Image();
presentImg.src = '../img/presents.png';
class Present {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.speedX = 20;
    this.speedY = -6;
    this.strength = 0;
    this.getReady = false;
    this.position = {
      row: Math.floor(Math.random() * 3),
      col: Math.floor(Math.random() * 3)
    }
  }

  draw() {
    this.game.context.drawImage(
      presentImg,
      this.position.row * 500,
      this.position.col * 495,
      500,
      495,
      this.x,
      this.y,
      this.width,
      this.height);
    }
  
  runLogic() {
    if(this.getReady){
      this.x = this.game.player.x;
      this.y = this.game.player.y;
    } else {
      this.x += this.speedX * this.strength;
      this.y += this.speedY;
      this.speedX += 0.08;
      this.speedY += GRAVITY;
    }
  }
}
