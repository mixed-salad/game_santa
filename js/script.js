const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const canvasWidth = canvasElement.width;
const canvasHeight = canvasElement.height;

// page div emelemts
const startPage = document.getElementById('before-game');
const playPage = document.getElementById('play');
const afterPage = document.getElementById('after-game');

//button elements
const startButton = document.getElementById('start');
const playAgainButton = document.getElementById('play-again');

//Listners

const game = new Game();
startButton.addEventListener('click', () => {
    startPage.style.display = 'none';
    playPage.style.display = 'initial';
    game.loop();
    game.timer.startTimer();
})

playAgainButton.addEventListener('click', () => {
    game.reset();
    afterPage.style.display = 'none';
    playPage.style.display = 'initial';
    game.loop();
    game.timer.startTimer();
    console.log('clicked');
})