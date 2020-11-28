const playerImg = new Image();
playerImageSrc = [
  '../img/santa/0001.png',
  '../img/santa/0002.png',
  '../img/santa/0003.png',
  '../img/santa/0004.png'
]

console.log(playerImg);
class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.height = 35;
    this.width = 35;
    this.maxY = 0;
    this.srcIndexTimestamp = 0;
    this.srcIndex = 0;
  }

  draw() {
    if(Date.now() > this.srcIxdexTimestamp + 200) {
      this.srcIndex++;
      this.srcIndex = this.srcIndex % 4;
      this.srcIndexTimestamp = Date.now();
    }
    playerImg.src = playerImageSrc[this.srcIndex];
    this.game.context.fillStyle = "red";
    this.game.context.fillRect(this.x, this.y, this.width, this.height)
    this.game.context.drawImage(playerImg, this.x, this.y)
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
      this.checkMaxY();
      this.y = Math.max(
        Math.min(this.y, this.maxY - this.height),
        0
      );
      this.x = Math.max(
        Math.min(this.x, canvasWidth - this.width),
        0
      );

    }
  }

  checkMaxY() {
    for (let house of this.game.houses) {
      if (this.x + this.width > house.x &&
        this.x < house.x + house.width) {
          const indexOfHouse = this.game.houses.indexOf(house);
          this.maxY = this.game.houses[indexOfHouse].y;
        } else if (this.x + this.width < this.game.houses[0].x){
          this.maxY = canvasHeight;
        }
    }
  }
}
