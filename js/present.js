class Present {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.speedX = 20;
    this.speedY = -6;
    this.strength = 0;
  }

  draw() {
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeStyle = 'green';
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    if(this.game.spaceKeydown){
      this.x = this.x;
      this.y = this.y;
    } else if(!this.game.spaceKeydown) {
      console.log(`I'm here and the strength is ${this.strength}`);
      this.x += this.speedX * this.strength;
      this.y += this.speedY;
      this.speedX += 0.08;
      this.speedY += GRAVITY;
    }
  }
}
