let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");

let speed = 5;
let lastpaintTime = 0;
let score = 0;
let level = 0;
let hiscoreval = 0;
let snakeArr = [
  {
    x: 12,
    y: 4,
  },
];
food = {
  x: 4,
  y: 16,
};

//this we need t oinclude while creating any game (game loop)
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastpaintTime = ctime;
  gameEngine();
}

function isCollide(sarr) {
  //in two casee collision occur
  //1st when snake bup itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  //2nd , hit the wall
  if (
    snakeArr[0].x >= 20 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 20 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  //update the snake value...

  //colide..
  if (isCollide(snakeArr)) {
    score = 0;
    level = 0;
    speed = 5;

    scoreBox.innerHTML = "Score: " + score;
    levelBox.innerHTML = "Level: " + level;
    gameoverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game is Over press any key to continue");
    snakeArr = [{ x: 12, y: 4 }];
    musicSound.play();
  }

  ///if u have  eaten the food increment the array and regenerte the food;
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    musicSound.play();
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    levelBox.innerHTML = "Level: " + level;

    // localStorage.setItem('score', JSON.stringify(score));
    if (score > hiscoreval) {
      localStorage.setItem("score", JSON.stringify(score));
      hiscoreval = score;
      HighScoreBox.innerHTML = "HighScore: " + hiscoreval;
    }

    //this unshify helps to add an elemnt
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 18;

    //to genetate a random no. between two vriabke ,.this is the formule..
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };

    //this is optional...if u want to increase spped
    switch (score) {
      case 1:
        level = 1;
        break;

      case 9:
        speed = 8;
        level = 2;
        break;
      case 19:
        speed = 15;
        level = 3;
        break;
      case 29:
        speed = 20;
        level = 4;
        break;
      case 39:
        speed = 25;
        level = 5;
        break;
    }
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //display snake head

  board.innerHTML = ""; //initially our id board div is empty..
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //disply food element
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic..

let count = JSON.parse(localStorage.getItem("score"));
musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
  }
});

document.querySelector(".left").addEventListener("click", () => {
  inputDir.x = -1;
  inputDir.y = 0;
});
document.querySelector(".right").addEventListener("click", () => {
  inputDir.x = 1;
  inputDir.y = 0;
});
document.querySelector(".up").addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = -1;
});
document.querySelector(".down").addEventListener("click", () => {
  inputDir.x = 0;
  inputDir.y = 1;
});
