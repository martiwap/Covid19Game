
// functions ------------------------

function detectCollision(gameObject, player) {
  let bottomOfGameObject = gameObject.position.y + gameObject.size;
  let topOfGameObject = gameObject.position.y;

  let topOfPlayer = player.position.y;
  let leftSideOfPlayer = player.position.x;
  let rightSideOfPlayer = player.position.x + player.width;
  let bottomOfPlayer = player.position.y + player.height;

  if (
    bottomOfGameObject >= topOfPlayer &&
    topOfGameObject <= bottomOfPlayer &&
    gameObject.position.x >= leftSideOfPlayer &&
    gameObject.position.x + player.size <= rightSideOfPlayer
  ) {
    return true;
  } else {
    return false;
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// end of functions ------------------


// InputHandler Class ----------------

class InputHandler {
  constructor(player, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          player.moveLeft();
          break;
        case 39:
          player.moveRight();
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (player.speed < 0) player.stop();
          break;
        case 39:
          if (player.speed > 0) player.stop();
          break;
        default:
          break;
      }
    });
  }
}
// end of InputHandler Class --------------


// Virus Class ----------------------

class Virus {
  constructor(game) {
    this.image = document.getElementById("image_virus");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 90;
    this.height = 70;
    this.bounceTimes = 0;

    this.game = game;
    this.size = 70;
    this.reset();
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    let randomX = randomInteger(0, this.speed.x);
    let randomY = randomInteger(0, this.speed.y + 2);
    this.position.x += randomX; // sideways
    this.position.y += randomY; //this.speed.y;

    // bouncing
    if (
      this.position.y + this.size > this.gameHeight &&
      this.bounceTimes === 5
    ) {
      this.bounceTimes = 0;
      this.reset();
    }
    if (this.position.y + this.size > this.gameHeight) {
      this.speed.y = -this.speed.y;
      this.bounceTimes++;
    }
    if (this.position.y < 0) this.speed.y = -this.speed.y;

    // check collition with paddle
    if (detectCollision(this, this.game.player)) {
      this.game.lives--;
      this.reset();
    }

    // hit wall left or right -> bounce
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0)
      this.speed.x = -this.speed.x;
  }

  reset() {
    let randomX = randomInteger(10, this.gameWidth);
    this.position = { x: randomX, y: 10 };
    this.speed = { x: 5, y: 7 };
  }
}
// end of Virus Class ---------------


// Red Virus Class ---------------------

class VirusRed {
  constructor(game) {
    this.image = document.getElementById("image_virusred");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 80;
    this.height = 60;
    this.bounceTimes = 0;

    this.game = game;
    this.size = 60;
    this.reset();
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    let randomX = randomInteger(0, this.speed.x);
    let randomY = randomInteger(0, this.speed.y + 2);
    this.position.x += randomX; // sideways
    this.position.y += randomY; //this.speed.y;

    // bouncing
    if (
      this.position.y + this.size > this.gameHeight &&
      this.bounceTimes === 5
    ) {
      this.bounceTimes = 0;
      this.reset();
    }
    if (this.position.y + this.size > this.gameHeight) {
      this.speed.y = -this.speed.y;
      this.bounceTimes++;
    }
    if (this.position.y < 0) this.speed.y = -this.speed.y;

    // check collition with paddle
    if (detectCollision(this, this.game.player)) {
      this.game.lives--;
      this.reset();
    }

    // hit wall left or right -> bounce
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0)
      this.speed.x = -this.speed.x;
  }

  reset() {
    let randomX = randomInteger(10, this.gameWidth);
    let randomY = randomInteger(10, 50);
    this.position = { x: randomX, y: 10 };
    this.speed = { x: 5, y: randomY };
  }
}
// end of Red Virus Class --------------


// Tube Blue Class

class TubeBlue {
  constructor(game) {
    this.image = document.getElementById("image_tubeblue");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 70;
    this.height = 50;

    this.game = game;
    this.size = 50;
    this.reset();
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    let randomX = randomInteger(1, this.speed.x);
    let randomY = randomInteger(1, this.speed.y);
    this.position.x += randomX; //this.speed.x; // sideways
    this.position.y += randomY; //this.speed.y;

    // check collition with paddle
    if (detectCollision(this, this.game.player)) {
      this.game.score++;
      this.reset();
    }

    // touch the ground
    if (this.position.y + this.size > this.gameHeight) this.reset();
  }

  reset() {
    let randomX = randomInteger(50, this.gameWidth / 3);
    this.position = { x: randomX, y: 10 };
    this.speed = { x: 7, y: 8 };
  }
}
// end of Tube Blue Class


// Tube Pink Class

class TubePink {
  constructor(game) {
    this.image = document.getElementById("image_tubepink");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 70;
    this.height = 50;

    this.game = game;
    this.size = 50;
    this.reset();
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    //let randomX = randomInteger(1, -this.speed.x);
    let randomY = randomInteger(1, this.speed.y);
    //this.position.x += randomX; //this.speed.x; // sideways
    this.position.y += randomY; //this.speed.y;

    // check collition with paddle
    if (detectCollision(this, this.game.player)) {
      this.game.score++;
      this.reset();
    }

    // touch the ground
    if (this.position.y + this.size > this.gameHeight) this.reset();
  }

  reset() {
    let randomX = randomInteger(30, this.gameWidth - 20);
    let randomY = randomInteger(5, 15);
    this.position = { x: randomX, y: 10 };
    this.speed = { x: 7, y: randomY };
  }
}
// end of Tube Pink Class


// Tube Green Class

class TubeGreen {
  constructor(game) {
    this.image = document.getElementById("image_tubegreen");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 50;
    this.height = 40;

    this.game = game;
    this.size = 50;
    this.reset();
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    let randomX = randomInteger(1, this.speed.x);
    let randomY = randomInteger(1, this.speed.y);
    this.position.x += randomX; //this.speed.x; // sideways
    this.position.y += randomY; //this.speed.y;

    // check collition with paddle
    if (detectCollision(this, this.game.player)) {
      this.game.score++;
      this.reset();
    }

    // touch the ground
    if (this.position.y + this.size > this.gameHeight) this.reset();
  }

  reset() {
    let randomX = randomInteger(50, this.gameWidth / 3);
    let randomY = randomInteger(5, 15);
    this.position = { x: randomX, y: randomY };
    this.speed = { x: 7, y: randomY };
  }
}
// end of Tube Green Class


// Tube Violet Class

class TubeViolet {
  constructor(game) {
    this.image = document.getElementById("image_tubeviolet");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 70;
    this.height = 50;
    this.bounceTimes = 0;

    this.game = game;
    this.size = 40;
    this.reset();
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    let randomY = randomInteger(1, this.speed.y);
    //this.position.x += this.speed.x; // sideways
    this.position.y += randomY; //this.speed.y;

    // bouncing
    if (
      this.position.y + this.size > this.gameHeight &&
      this.bounceTimes === 2
    ) {
      this.bounceTimes = 0;
      this.reset();
    }
    if (this.position.y + this.size > this.gameHeight) {
      this.speed.y = -this.speed.y;
      this.bounceTimes++;
    }
    if (this.position.y < 0) this.speed.y = -this.speed.y;

    // check collition with paddle
    if (detectCollision(this, this.game.player)) {
      this.game.score++;
      this.reset();
    }

    // touch the ground
    if (this.position.y + this.size > this.gameHeight) this.reset();
  }

  reset() {
    let randomX = randomInteger(50, this.gameWidth);
    let random = randomInteger(5, 10);
    this.position = { x: randomX, y: 5 };
    this.speed = { x: random, y: random };
  }
}
// end of Tube Violet Class


// Player Class 

class Player {
  constructor(game) {
    this.image = document.getElementById("image_player");
    this.gameWidth = game.gameWidth;
    this.game = game;
    this.width = 170;
    this.height = 50;
    this.size = 90;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2, // middle horizontal
      y: game.gameHeight - this.height - 50 // vertical
    };

    this.maxSpeed = 7;
    this.speed = 0;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed;

    // stop at the wall on the left
    if (this.position.x < 0) this.position.x = 0;
    // stop at the wall on the right
    if (this.position.x + this.size > this.gameWidth)
      this.position.x = this.gameWidth - this.size;
  }

  reset() { }
}
// end of Player Class


// Game Class --------------------

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

class Game {
  constructor(gameWidth, gameHeight) {
    this.image = document.getElementById("image_player");
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.MENU;
    this.virus = [];
    this.secondVirus = null;
    this.player = new Player(this);
    this.tubes = [];
    this.gameObjects = [];
    this.lives = 5;
    this.score = 0;
    this.addPink = false;
    this.addGreen = false;
    this.addViolet = false;
    this.addSecondVirus = false;
    this.addThirdVirus = false;
    this.addFourfthVirus = false;

    this.virus.push(new Virus(this));
    this.tubes.push(new TubeBlue(this));

    this.currentLevel = 0;

    new InputHandler(this.player, this);
  }

  start() {
    if (
      this.gameState !== GAMESTATE.MENU &&
      this.gameState !== GAMESTATE.NEWLEVEL
    )
      return;

    this.player.reset();
    // this.virus.reset();

    this.gameObjects = [this.player, ...this.virus, ...this.tubes];

    this.gameState = GAMESTATE.RUNNING;
  }

  update(deltaTime, score) {
    if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    )
      return;

    // first upgrade
    if (score === 4 && !this.addPink) {
      this.gameState = GAMESTATE.NEWLEVEL;
      this.tubes.push(new TubePink(this));
      this.addPink = true;
      this.start();
    }

    // second upgrade
    if (score === 10 && !this.addSecondVirus) {
      this.gameState = GAMESTATE.NEWLEVEL;
      this.virus.push(new VirusRed(this));
      this.addSecondVirus = true;
      this.start();
    }

    // third upgrade
    if (score === 15 && !this.addGreen) {
      this.gameState = GAMESTATE.NEWLEVEL;
      this.tubes.push(new TubeGreen(this));
      this.addGreen = true;
      this.start();
    }

    // fourth upgrade
    if (score === 20 && !this.addThirdVirus) {
      this.gameState = GAMESTATE.NEWLEVEL;
      this.virus.push(new Virus(this));
      this.addThirdVirus = true;
      this.start();
    }

    // fifth upgrade
    if (score === 25 && !this.addViolet) {
      this.gameState = GAMESTATE.NEWLEVEL;
      this.tubes.push(new TubeViolet(this));
      this.addViolet = true;
      this.start();
    }

    // sixth upgrade
    if (score === 30 && !this.addFourfthVirus) {
      this.gameState = GAMESTATE.NEWLEVEL;
      this.virus.push(new VirusRed(this));
      this.addFourfthVirus = true;
      this.start();
    }

    [...this.gameObjects, ...this.tubes, ...this.virus].forEach(object =>
      object.update(deltaTime)
    );
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "1rem 'Press Start 2P', cursive";
      ctx.fillStyle = "rgba(255,255,255)";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.fill();

      ctx.font = "1rem 'Press Start 2P', cursive";
      ctx.fillStyle = "rgba(255,255,255)";
      ctx.fillText(
        "Press SPACEBAR to start the game",
        180,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.9";
      ctx.fill();

      ctx.font = "1rem 'Press Start 2P', cursive";
      ctx.fillStyle = "rgba(255,255,255)";
      ctx.fillText("SHIT! YOU GOT INFECTED!", 200, this.gameHeight / 2.8);
      ctx.fillText(
        "You scored :" + this.score + " Well Done!",
        200,
        this.gameHeight / 2
      );
      ctx.font = "0.8rem 'Press Start 2P', cursive";
      ctx.fillText(
        "To start again, refresh the page :)",
        200,
        this.gameHeight / 1.8
      );
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}
// end of Game Class --------------------

// Index.js ----------------

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = document.getElementById("gameScreen").getAttribute("width");
const GAME_HEIGHT = document
  .getElementById("gameScreen")
  .getAttribute("height");

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  // clear the whole screen from corner 0,0 to the whole size of the canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  document.getElementById("score").innerHTML = game.score;

  game.update(deltaTime, game.score);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// end of Index.js ----------------