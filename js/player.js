class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.height = 35;
    this.width = 35;
  }

  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeStyle = 'white';
    context.lineWidth = 3;
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    if (this.game.arrowKeydown) {
      switch (this.game.arrowSelected) {
        case 'ArrowDown':
          this.y += 5;
          break;
        case 'ArrowUp':
          this.y -= 5;
          break;
        case 'ArrowRight':
          this.x += 5;
          break;
        case 'ArrowLeft':
          this.x -= 5;
          break;
      }
    }
  }
}
