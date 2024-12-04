const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: 50,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  color: 'red',
  velocityY: 0,
  gravity: 1,
  jumpStrength: -20,
};

const obstacles = [];
let frame = 0;
let gameOver = false;

// Draw the player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw obstacles
function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.x -= 5; // Move obstacles to the left
  });
}

// Add obstacles
function addObstacle() {
  if (frame % 120 === 0) {
    const height = 50 + Math.random() * 100;
    obstacles.push({
      x: canvas.width,
      y: canvas.height - height,
      width: 20,
      height: height,
    });
  }
}

// Check for collisions
function checkCollision() {
  obstacles.forEach((obstacle) => {
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    ) {
      gameOver = true;
    }
  });
}

// Update game state
function update() {
  if (gameOver) {
    alert('Game Over! Reload the page to play again.');
    document.location.reload();
  }

  player.velocityY += player.gravity;
  player.y += player.velocityY;

  // Prevent player from falling below the ground
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
  }

  // Add obstacles and check for collisions
  addObstacle();
  checkCollision();

  // Remove off-screen obstacles
  obstacles.filter((obstacle) => obstacle.x + obstacle.width > 0);
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawObstacles();
  update();

  frame++;
  requestAnimationFrame(gameLoop);
}

// Handle jump
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && player.y + player.height === canvas.height) {
    player.velocityY = player.jumpStrength;
  }
});

// Start the game
gameLoop();
