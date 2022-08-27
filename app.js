//BOARD SETUP
const container = document.querySelector(".container");

for (let i = 0; i < 1360; i++) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", `square${i}`);
    newDiv.setAttribute("class", "squares")
    container.appendChild(newDiv);
}

//SNAKE SETUP
let currentDirection; //defines the direction that the snake is currently moving to
let snakeHeadPosition = 659; //starting value is the center of the board
let currentSnakeHeadDiv = document.querySelector("#square" + snakeHeadPosition);
let previousHeadPosition;
let previousSnakeTailDiv;
let snakeTail = [];

const paintSnake = () => {
    currentSnakeHeadDiv.setAttribute("class" , "snake");
    previousSnakeTailDiv.removeAttribute("class" , "snake");
}

//CONTROLS SETUP
let movementIntervalVariable;

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (currentDirection !== "right") {
                currentDirection = "left";
                changeDirection(-1);
            }
            break;
        case "ArrowUp":
            if (currentDirection !== "down") {
                currentDirection = "up";
                changeDirection(-40);
            }
            break;
        case "ArrowRight":
            if (currentDirection !== "left") {
                currentDirection = "right";
                changeDirection(1);
            }
            break;
        case "ArrowDown":
            if (currentDirection !== "up") {
                currentDirection = "down";
                changeDirection(40);
            }
            break;
    }
})

const changeDirection = (directionValue) => {
    clearInterval(movementIntervalVariable);

        movementIntervalVariable = setInterval(() => {
            previousHeadPosition = snakeHeadPosition;
            previousSnakeTailDiv = currentSnakeHeadDiv //change this when food is eaten and tail grows;
            snakeHeadPosition += directionValue;
            currentSnakeHeadDiv = document.querySelector("#square" + snakeHeadPosition);
            paintSnake();
        }, 100)

        movementIntervalVariable();
}

//GAME FUNCTIONS
const checkWall = () => {

}