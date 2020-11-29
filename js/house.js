const houseImage = new Image();
const houseSources = [
    {
        name: 'blue-left',
        src: '../img/houses/house2_blue.png',
        target: {
            x: 100,
            width: 28,
        },
    },
];
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
    console.dir(this.img);
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    this.delivered = false;
    this.houseIndex = Math.floor(Math.random() * 8)
    this.img.onload = () => {
        this.width = this.img.width;
        this.height = this.img.height;
    }
    this.img.src = houseSrcPath[this.houseIndex];
    this.width = this.img.width;
    this.height = this.img.height;
    this.checkHighestPoint();
    this.targetX = 0;
    this.targetWidth = 0;
  }

  checkHighestPoint() {
    if (this.houseIndex >= 2 && this.houseIndex < 5) {
        this.targetX = 100;
        this.targetWidth = 30;
    } else if (this.houseIndex >= 5 && this.houseIndex < 8) {
        this.targetX = 100;
        this.targetWidth = 60;
    }
    }



  draw() {
    if(this.game.debug) {
        this.game.context.fillStyle = 'brown';
        if (this.delivered) {
            this.game.context.strokeStyle = 'yellow';
        } else {
          this.game.context.strokeStyle = 'darkblue';
        }
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
        this.game.context.strokeRect(this.x, this.y, this.width, this.height);
    }
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
