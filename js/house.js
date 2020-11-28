const houseImage = new Image();
const houseSrcPath = [
    '../img/houses/house1_purple.png',
    '../img/houses/house1_red.png',
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
  constructor(game, width, height) {
    this.game = game;
    this.x = canvasWidth;
    this.y = canvasHeight - height;
    this.width = width;
    this.height = height;
    this.delivered = false;
    this.img = new Image();
    this.houseIndex = Math.floor(Math.random() * 10)
    this.img.src = houseSrcPath[this.houseIndex];
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
