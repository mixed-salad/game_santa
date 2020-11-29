const canvasElement = document.querySelector('canvas');

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

const game = new Game(canvasElement);
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
})

window.game = game;