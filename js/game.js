const GRAVITY = 0.4;

class Game {
  #score = 0;

  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.createControl();
    this.reset();
    this.timer = new Timer(this);
    this.scoreBoard = new ScoreBoard(this);
    this.highScore = 0;
  }

  reset() {
    this.player = new Player(this, 50, 100);
    this.enemies = [];
    this.houses = [];
    this.presents = [];
    this.coals = [];
    this.lastEnemyTimestamp = 0;
    this.timeLeft = 30;
    this.#score = 0;
    this.active = true;
    this.arrowSelected = 'ArrowRight';
    this.arrowKeydown = false;
    this.cKeydownTimestamp = 0;
    this.cKeydown;
    this.spaceKeydownTimestamp = 0;
  }

  get score() {
    return this.#score;
  }

  //draw everything
  drawAll() {
    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let house of this.houses) {
      house.draw();
    }
    for (let present of this.presents) {
      present.draw();
    }
    for (let enemy of this.enemies) {
      enemy.draw();
    }
    this.player.draw();
    for (let coal of this.coals) {
      coal.draw();
    }
    this.timer.draw();
    this.scoreBoard.draw();
  }

  //run everything
  runLogic() {
    this.erasePresents();
    this.eraseEnemy();
    this.eraseHouse();
    this.eraseCoal();
    this.addEnemy();
    this.addHouse();
    this.player.runLogic();
    for (let house of this.houses) {
      house.runLogic();
    }
    for (let enemy of this.enemies) {
      enemy.runLogic();
    }
    for (let present of this.presents) {
      present.runLogic();
    }
    for (let coal of this.coals) {
      coal.runLogic();
    }
    this.checkPresentDelivered();
    this.checkBatEncounter();
    this.coalHitBat();
    this.updateHighScore();
    if (this.score < 0 || this.timeLeft <= 0) {
      this.active = false;
    }
  }

  //control with keys
  createControl() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.code) {
        case 'ArrowDown':
        case 'KeyS':
          this.arrowSelected = 'ArrowDown';
          this.arrowKeydown = true;
          break;
        case 'ArrowUp':
        case 'KeyW':
          this.arrowSelected = 'ArrowUp';
          this.arrowKeydown = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.arrowSelected = 'ArrowRight';
          this.arrowKeydown = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.arrowSelected = 'ArrowLeft';
          this.arrowKeydown = true;
          break;
        case 'Space':
          this.spaceKeydownTimestamp = Date.now();
          this.setPresent();
          break;
        case 'KeyK':
          this.cKeydownTimestamp = Date.now();
          this.setCoal();
          break;
      }
      // this.player.y = Math.max(
      //   Math.min(this.player.y, canvasHeight - this.player.height),
      //   0
      // );
      // this.player.x = Math.max(
      //   Math.min(this.player.x, canvasWidth - this.player.width),
      //   0
      // );
    });

    window.addEventListener('keyup', (event) => {
      switch (event.code) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'KeyS':
        case 'KeyW':
        case 'KeyA':
        case 'KeyD':
          this.arrowKeydown = false;
          break;
        case 'Space':
          const keyupTime = Date.now();
          const keydownDuration = keyupTime - this.spaceKeydownTimestamp;
          const presentThrowStrength = Number(
            (keydownDuration / 1000).toFixed(2)
          );
          this.presents[this.presents.length - 1].getReady = false;
          this.throwPresent(presentThrowStrength);
          break;
        case 'KeyK':
          const cKeyupTime = Date.now();
          const cKeydownDuration = cKeyupTime - this.cKeydownTimestamp;
          const coalThrowStrength = Number(
            (cKeydownDuration / 1000).toFixed(2)
          );
          this.coals[this.coals.length - 1].getReady = false;
          this.throwCoal(coalThrowStrength);
          break;
      }
    });
  }

  //Erase all the elements that are out of the canvas

  erasePresents() {
    for (let present of this.presents) {
      if (
        present.y >= canvasElement.height ||
        present.x >= canvasElement.width
      ) {
        const indexOfPresent = this.presents.indexOf(present);
        this.presents.splice(indexOfPresent, 1);
      }
    }
  }

  eraseCoal() {
    for (let coal of this.coals) {
      if (coal.y >= canvasElement.height || coal.x >= canvasElement.width) {
        const indexOfCoal = this.coals.indexOf(coal);
        this.coals.splice(indexOfCoal, 1);
      }
    }
  }

  eraseEnemy() {
    for (let enemy of this.enemies) {
      if (enemy.x + enemy.width < 0) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
      }
    }
  }

  eraseHouse() {
    for (let house of this.houses) {
      if (house.x + house.img.width < 0) {
        const indexOfHouse = this.houses.indexOf(house);
        this.houses.splice(indexOfHouse, 1);
      }
    }
    this.addHouse();
  }

  //loop to keep refreshing the canvas
  loop() {
    if (this.active) {
      this.runLogic();
      this.drawAll();
      // setTimeout(() => {
      //     this.loop();
      // }, 1000 / 30);
      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      clearInterval(this.timer.timer);
      playPage.style.display = 'none';
      afterPage.style.display = 'initial';
      //Display score
      const displayScoreElement = document.querySelector('#player-score span');
      const displayHighScoreElement = document.querySelector(
        '#high-score span'
      );
      displayScoreElement.innerHTML = game.score;
      displayHighScoreElement.innerHTML = game.highScore;
    }
  }

  // Adding elements
  addEnemy() {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.lastEnemyTimestamp + 5000) {
      const enemy = new Enemy(
        this,
        canvasWidth,
        Math.random() * (canvasHeight / 2 - 25) + 25,
        Math.random() * 5
      );
      this.enemies.push(enemy);
      this.lastEnemyTimestamp = currentTimestamp;
    }
  }

  setPresent() {
    this.presents.push(new Present(this, this.player.x, this.player.y));
    this.presents[this.presents.length - 1].getReady = true;
  }

  throwPresent(strength) {
    this.presents[this.presents.length - 1].strength = strength;
  }

  setCoal() {
    this.coals.push(new Coal(this, this.player.x, this.player.y));
    this.coals[this.coals.length - 1].getReady = true;
  }

  throwCoal(strength) {
    this.coals[this.coals.length - 1].strength = strength;
  }

  addHouse() {
    if (this.houses.length === 0) {
      this.houses.push(
        new House(
          this,
          Math.random() * ((canvasHeight * 2) / 3 - canvasHeight / 4) +
            canvasHeight / 4
        )
      );
      this.houses[0].x = -100;
      this.houses.push(
        new House(
          this,
          Math.random() * (canvasHeight / 2 - canvasHeight / 4) +
            canvasHeight / 4
        )
      );
      this.houses[1].x = 250;
      this.houses.push(
        new House(
          this,
          Math.random() * (canvasHeight / 2 - canvasHeight / 4) +
            canvasHeight / 4
        )
      );
      this.houses[2].x = 500;
    }
    const lastHouse = this.houses[this.houses.length - 1];
    const lastHouseRightEdge = lastHouse.x + lastHouse.width;
    if (lastHouseRightEdge < canvasWidth && lastHouse.width !== 0) {
      this.houses.push(
        new House(
          this,
          Math.random() * (canvasHeight / 2 - canvasHeight / 8) +
            canvasHeight / 8
        )
      );
    }
    // if (this.houses.length < 5) {
    //   this.houses.push(
    //     new House(
    //       this,
    //       Math.random() * (canvasHeight / 2 - canvasHeight / 4) +
    //         canvasHeight / 4
    //     )
    //   );
    // }
  }

  checkPresentDelivered() {
    for (let present of this.presents) {
      for (let house of this.houses) {
        if (
          present.x >= house.x + house.targetX &&
          present.x + present.width <=
            house.x + house.targetX + house.targetWidth &&
          present.y > house.y
        ) {
          const indexOfPresent = this.presents.indexOf(present);
          this.presents.splice(indexOfPresent, 1);
          if (!house.delivered) {
            this.#score += 10;
            house.delivered = true;
          }
        }
      }
    }
  }

  coalHitBat() {
    for (let coal of this.coals) {
      for (let enemy of this.enemies) {
        if (
          coal.y + coal.radius >= enemy.y &&
          coal.y - coal.radius <= enemy.y + enemy.height &&
          coal.x + coal.radius >= enemy.x &&
          coal.x - coal.radius <= enemy.x + enemy.width
        ) {
          enemy.dead = true;
          this.#score += 5;
        }
      }
    }
  }

  checkBatEncounter() {
    for (let enemy of this.enemies) {
      if (
        this.player.x + this.player.width >= enemy.x &&
        this.player.x <= enemy.x + enemy.width &&
        this.player.y + this.player.height >= enemy.y &&
        this.player.y <= enemy.y + enemy.height
      ) {
        enemy.hit = true;
        this.#score -= 5;
      }
    }
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
  }
}
