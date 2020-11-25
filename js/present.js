class Present {
  constructor(x, y, strength) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.speedX = 20;
    this.speedY = -6;
    this.strength = strength;
  }

  draw() {
    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeStyle = 'green';
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    this.x += this.speedX * this.strength;
    this.y += this.speedY;
    this.speedX += 0.08;
    this.speedY += GRAVITY;
  }
}
