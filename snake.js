// Define the initial position of the snake
let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
];

// Set the initial direction of the snake
let direction = "right";

// Get the game board element from the HTML document
const gameBoard = document.getElementById("game-board");

const restartButton = document.getElementById("restart-button");

// function to render the snake and food on the game board
function render() {
  gameBoard.innerHTML = "";
  // loop through the snake array to add each segment to the game board
  for (let i = 0; i < snake.length; i++) {
    let segment = document.createElement("div");
    segment.classList.add("snake-segment");
    segment.style.left = snake[i].x + "px";
    segment.style.top = snake[i].y + "px";
    gameBoard.appendChild(segment);
  }
      // Create a new food element and add it to the game board
	  let foodElement = document.createElement("div");
	  foodElement.classList.add("food");
	  foodElement.style.left = food.x + "px";
	  foodElement.style.top = food.y + "px";
	  gameBoard.appendChild(foodElement);
}

// event listener to change direction of snake based on arrow key press
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});
// function to check if snake has collided with the walls or itself
function checkCollision() {
    let x = snake[0].x;
    let y = snake[0].y;

    if (x < 0 || x >= gameBoard.clientWidth || y < 0 || y >= gameBoard.clientHeight) {
        // Display game over message and stop the game loop
        alert("Game Over!");
        clearInterval(intervalId);
		
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
          // Display game over message and stop the game loop
            alert("Game Over!");
            clearInterval(intervalId);
			
        }
    }
}
// function to create random food location
let food = { x: 0, y: 0 };
function createFood() {
    food.x = Math.floor(Math.random() * (gameBoard.clientWidth / 10)) * 10;
    food.y = Math.floor(Math.random() * (gameBoard.clientHeight / 10)) * 10;
}
createFood();

// function to update the score
let score = 0;
function updateScore() {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
}

// main game loop to update snake position and check for collisions
let intervalId = setInterval(() => {
  // Create a new head for the snake based on the current direction
  let head = {...snake[0]};
  switch (direction) {
    case "up":
      head.y -= 10;
      break;
    case "down":
      head.y += 10;
      break;
    case "left":
      head.x -= 10;
      break;
	case "right":
		head.x += 10;
		break;
    }
    // Add the new head to the beginning of the snake array
	snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
     // Create a new food location, update the score, and add a new segment to the snake
	 createFood();
	 updateScore();
      snake.push({ ...snake[snake.length - 1] });
    } else {
         // Remove the last segment of the snake
		snake.pop();
	}
    // Check for collisions and render the game board
	checkCollision();
	render();
    }, 100);
	
// Add an event listener to the restart button that calls the restartGame function
restartButton.addEventListener("click", () => {
  restartGame();
});

// Define the restartGame function to reset the game state
function restartGame() {
  // Reset the snake position
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
  ];
  // Reset the direction
  direction = "right";
  // Reset the score
  score = 0;
  document.getElementById("score").innerText = "Score: " + score;
  // Reset the food location
  createFood();
  // Restart the game loop
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    // code for game loop
  }, GAME_LOOP_INTERVAL);
  // Get the restart button element from the HTML document
}

			   



