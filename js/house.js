//const houseImage = new Image();
//const deliveredImg = new Image();

const houseSrcPath = [
  '../img/houses/house2_blue.png',
  '../img/houses/house2_lightblue.png',
  '../img/houses/house2_brown.png',
  '../img/houses/house2_red.png',
  '../img/houses/house2_yellow.png',
  '../img/houses/house3_green.png',
  '../img/houses/house3_navy.png',
  '../img/houses/house3_red.png',
  '../img/houses/house3_teal.png'
];

class House {
  constructor(game, height) {
    this.game = game;
    this.img = new Image();
    this.deliveredImg = new Image();
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    this.houseIndex = Math.floor(Math.random() * 9);
    this.img.onload = () => {
      this.width = this.img.width;
      this.height = this.img.height;
    };
    this.delivered = false;
    this.houseLight = false;
    this.img.src = houseSrcPath[this.houseIndex];
    // this.width = this.img.width;
    // this.height = this.img.height;
    this.targetX = 0;
    this.targetWidth = 0;
    this.checkTarget();
  }

  checkTarget() {
    if (this.houseIndex < 5) {
      this.targetX = 60;
      this.targetWidth = 80;
    } else if (this.houseIndex >= 5 && this.houseIndex < 9) {
      this.targetX = 175;
      this.targetWidth = 70;
    }
  }

  draw() {
    // if (this.game.debug) {
    //   this.game.context.fillStyle = 'brown';
    //   if (this.delivered) {
    //     this.game.context.strokeStyle = 'yellow';
    //   } else {
    //     this.game.context.strokeStyle = 'darkblue';
    //   }
    //   this.game.context.fillRect(this.x, this.y, this.width, this.height);
    //   this.game.context.strokeRect(this.x, this.y, this.width, this.height);
    // }
    this.game.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.img.width,
      this.img.height
    );
    if (this.delivered) {
      // if (this.houseIndex < 5) {
      //   this.deliveredImg.src = '../img/houses/house2_delivered.png';
      // } else if (this.houseIndex >= 5 && this.houseIndex < 9) {
      //   this.deliveredImg.src = '../img/houses/house3_delivered.png';
      // }
      if (!this.houseLight) {
        if(this.houseIndex < 5) {
          this.deliveredImg.src = '../img/houses/house2_delivered.png';
        } else {
          this.deliveredImg.src = '../img/houses/house3_delivered.png';
        }
        this.houseLight = true;
      }
      this.game.context.drawImage(
        this.deliveredImg,
        this.x,
        this.y,
        this.img.width,
        this.img.height
      );
    }
  }

  runLogic() {
    this.x -= 1;
  }
}
