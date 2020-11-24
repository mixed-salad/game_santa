const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const canvasWidth = canvasElement.width;
const canvasHeight = canvasElement.height;


const game = new Game();

game.loop();
game.timer;
