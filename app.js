//BOARD SETUP
const container = document.querySelector(".container");
const numOfSquares = 1360;

for (let i = 0; i < numOfSquares; i++) {
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

generateFood();

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
let movementIntervalFunc;
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

const getWalls = (start, end, increases) => {
    const walls = [];
    for (let i = start; i <= end; i += increases) {
        walls.push(i);
    }
    return walls;
}
const topWallSquareIds = getWalls(0, 39, 1);
const rightWallSquareIds = getWalls(39, 1359, 40);
const bottomWallSquareIds = getWalls(1320, 1358, 1);
const leftWallSquareIds = getWalls(40, 1280, 40);

const checkWall = () => {
    const singleWallCheck = (wall, nextSquare) => {
        wall.forEach(square => {
            if (previousHeadPosition === square && snakeHeadPosition === square + nextSquare) {
                gameOver();
            }
        })
    }

    singleWallCheck(topWallSquareIds, -40);
    singleWallCheck(rightWallSquareIds, 1);
    singleWallCheck(bottomWallSquareIds, 40);
    singleWallCheck(leftWallSquareIds, -1);
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
        const randomSquare = Math.floor(Math.random() * numOfSquares);
        
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
    if (score % 10 === 0) { //every ten pieces of food eaten, level increases
        updateLevel();
    }
}

const updateLevel = () => {
    level++;
    snakeSpeed -= 5;
    levelKeeper.innerHTML = level;
}