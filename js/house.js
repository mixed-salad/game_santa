const houseImage = new Image();
const houseSrcPath = [
    '../img/houses/house2_blue.png',
    '../img/houses/house2_lightblue.png',
    '../img/houses/house2_brown.png',
    '../img/houses/house2_red.png',
    '../img/houses/house2_yellow.png',
    '../img/houses/house3_green.png',
    '../img/houses/house3_navy.png',
    '../img/houses/house3_teal.png'
];

class House {
  constructor(game, height) {
    this.game = game;
    this.img = new Image();
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    this.width = this.img.width;
    this.height = this.img.height;
    this.delivered = false;
    this.houseIndex = Math.floor(Math.random() * 8)
    this.img.src = houseSrcPath[this.houseIndex];
    this.checkHighestPoint();
    this.targetX = 0;
    this.targetWidth = 0;
  }

  checkHighestPoint() {
    if(this.houseIndex >= 0 && this.houseIndex < 2){
        console.log( 'house #1');
    } else if (this.houseIndex >= 2 && this.houseIndex < 7) {
        console.log('house #2');
        this.targetX = 100;
        console.log(this.targetX);
        this.targetWidth = 30;
    } else if (this.houseIndex >= 7 && this.houseIndex < 10) {
        console.log('house #3');
        this.targetX = 100;
        console.log(this.targetX);
        this.targetWidth = 60;
    }
    }



  draw() {
    // this.game.context.fillStyle = 'brown';
    // if (this.delivered) {
    //     this.game.context.strokeStyle = 'yellow';
    // } else {
    //   this.game.context.strokeStyle = 'darkblue';
    // }
    // this.game.context.fillRect(this.x, this.y, this.width, this.height);
    // this.game.context.strokeRect(this.x, this.y, this.width, this.height);
    //houseImage.src = houseSrcPath[this.houseIndex];
    this.game.context.drawImage(
        this.img,
        this.x,
        this.y,
        this.img.width,
        this.img.height,
        );
  }

  runLogic() {
    this.x -= 1;
  }
}
