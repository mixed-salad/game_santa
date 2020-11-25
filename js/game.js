const GRAVITY = 0.6;

class Game {
  constructor() {
    this.createControl();
    this.reset(); 
    this.timer = new Timer(this);
    this.scoreBoard = new ScoreBoard(this);
  }
  
  reset() {
    this.player = new Player(50, 100);
    this.enemies = [];
    this.houses = [];
    this.presents = [];
    this.coals = [];
    this.lastEnemyTimestamp = 0;
    this.timeLeft = 60;
    this.score = 0;
    this.active = true;
    this.cKeydown = 0;
    this.spaceKeydown = 0;
  }
  //draw everything
  drawAll() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let house of this.houses) {
      house.draw();
    }
    for (let enemy of this.enemies) {
      enemy.draw();
    }
    for (let present of this.presents) {
      present.draw();
    }
    for (let coal of this.coals) {
      coal.draw();
    }
    this.player.draw();
    this.timer.draw();
    this.scoreBoard.draw();
  }

  //control with keys
  createControl() {
    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      switch (event.code) {
        case 'ArrowDown':
          this.player.y += 10;
          break;
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          break;
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
        case 'Space':
          this.spaceKeydown = Date.now();
          break;
        case 'KeyC':
          this.cKeydown = Date.now();
          break;      
      }
      this.player.y = Math.max(
        Math.min(this.player.y, canvasHeight - this.player.height),
        0
      );
      this.player.x = Math.max(
        Math.min(this.player.x, canvasWidth - this.player.width),
        0
      );
    });

    window.addEventListener('keyup', (event) => {
      switch (event.code) {
        case "Space":
          const keyupTime = Date.now();
          const keydownDuration = keyupTime - this.spaceKeydown;
          const presentThrowStrength = Number(keydownDuration / 1000).toFixed(2);
          this.throwPresent(presentThrowStrength);
          break;
        case "KeyC":
          const cKeyupTime = Date.now();
          const cKeydownDuration = cKeyupTime - this.cKeydown;
          const coalThrowStrength = Number(cKeydownDuration / 1000).toFixed(2);
          this.throwCoal(coalThrowStrength);
          break;
      }
    })
  }


  //run everything
  runLogic() {
    this.erasePresents();
    this.eraseEnemy();
    this.eraseCoal();
    this.addEnemy();
    this.addHouse();
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
    if(this.score < 0 || this.timeLeft <= 0) {
      this.active = false;
    }
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
      if (
        coal.y >= canvasElement.height ||
        coal.x >= canvasElement.width
      ) {
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
      if (house.x + house.width < 0) {
        const indexOfHouse = this.houses.indexOf(house);
        this.houses.splice(indexOfHouse, 1);
      }
    }
  }

  //loop to keep refreshing the canvas
  loop() {
    if(this.active){
        this.runLogic();
        this.drawAll();
        setTimeout(() => {
            this.loop();
        }, 1000 / 30);      
    } else {
      playPage.style.display = 'none';
      afterPage.style.display = 'initial';
    }

  }

  // Adding elements
  addEnemy() {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.lastEnemyTimestamp + 5000) {
      const enemy = new Enemy(
        canvasWidth,
        Math.random() * (canvasHeight / 2 - 25) + 25,
        Math.random() * 5
      );
      this.enemies.push(enemy);
      this.lastEnemyTimestamp = currentTimestamp;
    }
  }

  throwPresent(strength) {
    this.presents.push(new Present(this.player.x, this.player.y, strength));
  }

  throwCoal(strength) {
    this.coals.push(new Coal(this.player.x, this.player.y, strength));
  }

  addHouse() {
    if (this.houses.length === 0) {
      this.houses.push(
        new House(
          Math.random() * (canvasWidth / 4 - canvasWidth / 6) + canvasWidth / 6,
          Math.random() * (canvasHeight / 2 - canvasHeight / 4) +
            canvasHeight / 4
        )
      );
    }

    if (
      this.houses[this.houses.length - 1].x <
      canvasWidth - this.houses[this.houses.length - 1].width
    ) {
      const house = new House(
        Math.random() * (canvasWidth / 4 - canvasWidth / 6) + canvasWidth / 6,
        Math.random() * (canvasHeight / 2 - canvasHeight / 4) + canvasHeight / 4
      );
      this.houses.push(house);
    }
  }

  checkPresentDelivered () {
      for(let present of this.presents) {
          for(let house of this.houses){
              if(present.y + present.height > house.y && present.x + present.width >= house.x && present.x <= house.x + house.width) {
                  const indexOfPresent = this.presents.indexOf(present);
                  this.presents.splice(indexOfPresent, 1);
                  if(!house.delivered){
                      this.score += 10;
                      house.delivered = true;
                  }
                  console.log(this.score);
              }
          }
      }
  }

  coalHitBat () {
      for(let coal of this.coals) {
          for(let enemy of this.enemies){
              if(coal.y + coal.radius >= enemy.y && 
                coal.y - coal.radius <= enemy.y + enemy.height &&
                coal.x + coal.radius >= enemy.x && 
                coal.x - coal.radius <= enemy.x + enemy.width) {
                  enemy.dead = true;
                  this.score += 5;
                  console.log('coal hit the bat!');
                  }
              }
          }
      }

  checkBatEncounter () {
      for(let enemy of this.enemies) {
          if(this.player.x + this.player.width >= enemy.x &&
            this.player.x <= enemy.x + enemy.width &&
            this.player.y + this.player.height >= enemy.y &&
            this.player.y <= enemy.y + enemy.height){
            enemy.hit = true;
            this.score -= 5;
            }
        }
    }
}
