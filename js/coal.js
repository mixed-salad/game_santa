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
    this.game.context.fillStyle = 'black';
    this.game.context.beginPath();
    this.game.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.game.context.closePath();
    this.game.context.fill();
    this.game.context.strokeStyle = 'white';
    this.game.context.stroke();
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
