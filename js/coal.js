const coalImg = new Image();
coalImg.src = '../img/coal2.png';

class Coal {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.speedX = 30;
    this.speedY = -5;
    this.strength = 0;
    this.getReady = false;
  }

  draw() {
    if(this.game.debug) {
      this.game.context.fillStyle = 'black';
      this.game.context.beginPath();
      this.game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.game.context.closePath();
      this.game.context.fill();
      this.game.context.strokeStyle = 'white';
      this.game.context.stroke();      
    }
    this.game.context.drawImage(
      coalImg,
      this.x,
      this.y,
      25,
      25
    );
  }

  runLogic() {
      if(this.getReady){
        this.x = this.game.player.x;
        this.y = this.game.player.y;
      } else {
          this.x += this.speedX * this.strength * 2;
          this.y += this.speedY;
          this.speedX += 0.08;
          this.speedY += GRAVITY;  

      }     
  }

}
