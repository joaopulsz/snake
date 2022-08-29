//BOARD SETUP
const container = document.querySelector(".container");

for (let i = 0; i < 1360; i++) {
    const newSquare = document.createElement("div");
    newSquare.setAttribute("id", `square${i}`);
    newSquare.setAttribute("class", "squares");
    container.appendChild(newSquare);
}

const scoreKeeper = document.querySelector("#score");
let score = 0;
scoreKeeper.innerHTML = score;
const levelKeeper = document.querySelector("#level");
let level = 1;
let snakeSpeed = 110;
levelKeeper.innerHTML = level;

//SNAKE SETUP
let currentDirection; //defines the direction that the snake is currently moving towards
let snakeHeadPosition = 659; //starting value is the center of the board
let currentSnakeHead = document.querySelector(`#square${snakeHeadPosition}`);
let previousHeadPosition;
let previousSnakeTailSquare;
let tailLength = 5; //starting length
const snakeTail = [];

const paintSnake = () => {
    currentSnakeHead.setAttribute("class" , "snake");
    snakeTail.forEach(square => {
        const tailSquare = document.querySelector(`#square${square}`);
        tailSquare.setAttribute("class" , "snake");
    })
    previousSnakeTailSquare.removeAttribute("class" , "snake"); 
    previousSnakeTailSquare.setAttribute("class", "squares"); 
}

//CONTROLS SETUP
let movementIntervalFunc;

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (currentDirection !== "right" && currentDirection !== "left" && snakeHeadPosition !== "dead") {
                moveSnake(-1);
                currentDirection = "left";
            }
            break;
        case "ArrowUp":
            if (currentDirection !== "down" && currentDirection !== "up" && snakeHeadPosition !== "dead") {
                moveSnake(-40);
                currentDirection = "up";
            }
            break;
        case "ArrowRight":
            if (currentDirection !== "left" && currentDirection !== "right" && snakeHeadPosition !== "dead") {
                moveSnake(1);
                currentDirection = "right";
            }
            break;
        case "ArrowDown":
            if (currentDirection !== "up" && currentDirection !== "down" && snakeHeadPosition !== "dead") {
                moveSnake(40);
                currentDirection = "down";
            }
            break;
    }
})

//GAME SETUP
const moveSnake = (directionValue) => {
    clearInterval(movementIntervalFunc);

    movementIntervalFunc = setInterval(() => {
        previousHeadPosition = snakeHeadPosition;
        checkFood();
        while (tailLength > snakeTail.length) {
            snakeTail.unshift(previousHeadPosition);
        }
        previousSnakeTailSquare = document.querySelector(`#square${snakeTail.pop()}`);
        snakeHeadPosition += directionValue;
        checkWall();
        checkTail();
        currentSnakeHead = document.querySelector(`#square${snakeHeadPosition}`);
        if (snakeHeadPosition !== "dead") {
            paintSnake();
        }
    }, snakeSpeed)
}

const topWallDivIds = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const rightWallDivIds = [ 39, 79, 119, 159, 199, 239, 279, 319, 359, 399, 439, 479, 519, 559, 599, 639, 679, 719, 759, 799, 839, 879, 919, 959, 999, 1039, 1079, 1119, 1159, 1199, 1239, 1279, 1319, 1359]; 
const bottomWallDivIds = [1358, 1357, 1356, 1355, 1354, 1353, 1352, 1351, 1350, 1349, 1348, 1347, 1346, 1345, 1344, 1343, 1342, 1341, 1340, 1339, 1338, 1337, 1336, 1335, 1334, 1333, 1332, 1331, 1330, 1329, 1328, 1327, 1326, 1325, 1324, 1323, 1322, 1321, 1320];
const leftWallDivIds = [1280, 1240, 1200, 1160, 1120, 1080, 1040, 1000, 960, 920, 880, 840, 800, 760, 720, 680, 640, 600, 560, 520, 480, 440, 400, 360, 320, 280, 240, 200, 160, 120, 80, 40];
const checkWall = () => {
    topWallDivIds.forEach(square => {
        if (previousHeadPosition === square && snakeHeadPosition === square - 40) {
            gameOver();
        }
    })
    rightWallDivIds.forEach(square => {
        if (previousHeadPosition === square && snakeHeadPosition === square + 1) {
            gameOver();
        }
    })
    bottomWallDivIds.forEach(square => {
        if (previousHeadPosition === square && snakeHeadPosition === square + 40) {
            gameOver();
        }
    })
    leftWallDivIds.forEach(square => {
        if (previousHeadPosition === square && snakeHeadPosition === square - 1) {
            gameOver();
        }
    })
}

const checkTail = () => {
    snakeTail.forEach(square => {
        if (snakeHeadPosition === square) {
            gameOver();
        }
    })
}

const gameOver = () => {
    snakeHeadPosition = "dead";
    clearInterval(movementIntervalFunc);
}

function generateFood() {
    const getRandomWhiteSquare = () => {
        const randomSquare = Math.floor(Math.random() * 1360);
        
        if (document.querySelector(`#square${randomSquare}`).getAttribute("class") === "snake") {
            return getRandomWhiteSquare();
        } else {
            return randomSquare;
        }
    }

    const randomWhiteSquare = getRandomWhiteSquare();

    const foodSquare = document.querySelector(`#square${randomWhiteSquare}`);
    foodSquare.setAttribute("class", "food");
}

function checkFood() {
    if (document.querySelector(".food") === null) {
        tailLength++;
        updateScore();
        generateFood();
    }
}

const updateScore = () => {
    score++;
    scoreKeeper.innerHTML = score;
    if (score % 10 === 0) {
        updateLevel();
    }
}

const updateLevel = () => {
    level++;
    snakeSpeed -= 5;
    levelKeeper.innerHTML = level;
}