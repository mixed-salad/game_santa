const playerImg = new Image();
const playerImageSrc = [
  '../img/santa/0001.png',
  '../img/santa/0002.png',
  '../img/santa/0003.png',
  '../img/santa/0004.png'
];
playerImg.src = playerImageSrc[0];

class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 120;
    this.maxY = 0;
    this.maxX = canvasWidth;
    this.srcIndexTimestamp = 0;
    this.srcIndex = 0;
    this.canGoForward = true;
  }

  draw() {
    if (Date.now() > this.srcIndexTimestamp + 200) {
      this.srcIndex++;
      this.srcIndex = this.srcIndex % 4;
      playerImg.src = playerImageSrc[this.srcIndex];
      this.srcIndexTimestamp = Date.now();
    }
    // this.game.context.fillStyle = "red";
    // this.game.context.fillRect(this.x, this.y, this.width, this.height)
    this.game.context.drawImage(
      playerImg,
      this.x,
      this.y,
      this.width,
      this.height
    );
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
            if(this.x + this.width < canvasWidth &&
              this.game.canGoForward) {
                this.x += 5;
            }
            break;
          case 'ArrowLeft':
            if(this.x > 0) {
              this.x -= 5;
            }
            break;
        }
      }
      this.checkMaxY();
      this.y = Math.max(Math.min(this.y, this.maxY - this.height), 0);

      // this.checkMaxX();
      // this.x = Math.max(Math.min(this.x, this.maxX - this.width), 0);
      // console.log(this.maxX);
    
  }

  checkMaxY() {
    for (let house of this.game.houses) {
      if (this.x + this.width > house.x + 10 && 
        this.x < house.x + house.img.width) {
        const indexOfHouse = this.game.houses.indexOf(house);
        this.maxY = this.game.houses[indexOfHouse].y;
      } else if (this.x + this.width < this.game.houses[0].x) {
        this.maxY = canvasHeight;
      }
    }
  }

  checkMaxX() {
    for (let house of this.game.houses) {
      if(this.x + this.width < house.x &&
        this.y + this.height > house.y) {
          this.MaxX = house.x - 20;
        } else {
          this.MaxX = canvasWidth;
        }
    }
  }
}
