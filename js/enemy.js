const batImg = new Image();
batImg.src = '../img/bat_spritesheet.png';

class Enemy {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 62;
    this.height = 32;
    this.speed = speed;
    this.hit = false;
    this.dead = false;
    this.position = 0;
    this.loop = 'even';
    this.positionTimestamp = 0;
  }

  draw() {
    if (Date.now() > this.positionTimestamp + 100) {
      if (this.position === 9) {
        this.loop = 'odd';
      } else if (this.position === 0) {
        this.loop = 'even';
      }
      if (this.loop === 'even') {
        this.position = (this.position + 1) % 10;
        this.positionTimestamp = Date.now();
      } else {
        this.position = (this.position - 1) % 10;
        this.positionTimestamp = Date.now();
      }
    }
    this.game.context.drawImage(
      batImg,
      31 * this.position,
      0,
      31,
      16,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // this.game.context.fillStyle = "grey"
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
    // this.game.context.strokeStyle = "black";
    // this.game.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    if (!this.hit && !this.dead) {
      this.x -= this.speed;
    } else if (this.hit) {
      this.x -= 40;
      this.y -= 20;
    } else if (this.dead) {
      this.x -= 2;
      this.y += 20 + GRAVITY;
    }
  }
}
