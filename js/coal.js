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
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.strokeStyle = 'white';
    context.stroke();
  }

  runLogic() {
      if(this.getReady){
          this.x = this.x;
          this.y = this.y;
      } else {
          this.x += this.speedX * this.strength * 2;
          this.y += this.speedY;
          this.speedX += 0.08;
          this.speedY += GRAVITY;  

      }     
  }

}
