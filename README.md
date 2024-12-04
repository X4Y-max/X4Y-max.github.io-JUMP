https://x4y-max.github.io/X4Y-max.github.io-JUMP/
<html lang="en" data-color-mode="auto" data-light-theme="light" data-dark-theme="dark" data-a11y-animated-images="system" data-a11y-link-underlines="true" data-turbo-loaded="">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css">.turbo-progress-bar {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  height: 3px;
  background: #0076ff;
  z-index: 2147483647;
  transition:
    width 300ms ease-out,
    opacity 150ms 150ms ease-in;
  transform: translate3d(0, 0, 0);
}
</style>
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

  
