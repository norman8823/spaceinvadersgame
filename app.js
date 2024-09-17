// Import classes from other modules
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import Bullet from "./Bullet.js";

//get canvas element from HTML document 
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")

canvas.width = 600;
canvas.height = 600;

//create a new image object for the background and reference source file
const background = new Image(); 
background.src = "./files/images/space.png";

// Create bullet controllers for the player and the enemies, which manages the bullets fired
const playerBulletController = new BulletController(canvas, 10,"red", true,'./files/sounds/shoot.wav') 
const enemyBulletController = new BulletController(canvas, 10, "white", false,'./files/sounds/enemy-shoot.wav');
// Create an instance of EnemyController to manage enemies, pass canvas and bullet controllers as arguments
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
// Create instance of Player class with specified velocity
const player = new Player(canvas,4, playerBulletController); 

//Variables to keep track of game state, default to false
let isGameOver = false;
let didWin = false;
let isGameStarted = false;
let gameOverSoundPlayed = false;

// Load the game over sound
const gameOverSound = new Audio('./files/sounds/game-over.mp3');
gameOverSound.volume = 1;

// Load the win sound
const winSound = new Audio('./files/sounds/winner.ogg');
winSound.volume = 1;

// Load the game start sound
const gameStartSound = new Audio('./files/sounds/game-start.mp3');
gameStartSound.volume = 1;

// Load the shooting sounds
const playerShootSoundSrc = "./files/sounds/shoot.wav";
const enemyShootSoundSrc = "./files/sounds/enemy-shoot.wav";

// Get the DOM elements
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const homeScreen = document.getElementById('homeScreen');
const gameContainer = document.getElementById('gameContainer');

//Event Listenters
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

//Main game function that updates the game state
function game() {
    if (!isGameStarted) {
        return; // Do nothing if the game hasn't started
    }
    checkGameOver(); //check if game is over
    ctx.drawImage(background,0,0, canvas.width, canvas.height); //effectively clears the canvas
    displayGameOver(); //if game is over, display game over message, if not over, continue game
    if(!isGameOver){
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    }
}

//Start the game when the "Start Game" button is clicked
function startGame() {
    gameStartSound.currentTime = 0;
    gameStartSound.play();
    homeScreen.style.display = 'none';  //Hide the home screen
    gameContainer.style.display = 'block';  //Show the game container
    isGameStarted = true;   //Set the game started flag to true
}

//Detect "Game Over" or "You Win" depending on outcome
function displayGameOver(){
    if (isGameOver) {
        if (!gameOverSoundPlayed) {
            if (didWin) {
                winSound.currentTime = 0;
                winSound.play();
            } else {
            gameOverSound.currentTime = 0; // Reset sound to start
            gameOverSound.play(); //play game over sound
            }
            gameOverSoundPlayed = true; // Set flag to prevent replay
        }
        let text = didWin ? "You Win" : "Game Over";
        ctx.fillStyle = didWin ? "white" : "red";
        ctx.font = "48px 'Press Start 2P', sans-serif";
        const textWidth = ctx.measureText(text).width;
        const xPosition = (canvas.width - textWidth) /2;
        const yPosition = canvas.height / 2;
        ctx.fillText(text, xPosition, yPosition);
        restartButton.style.display = 'block';
        const buttonTop = yPosition + 30;
        restartButton.style.top = `${buttonTop}px`;
    }
}

//Check if game has ended
function checkGameOver(){
    if(isGameOver) {
        return;
    } 
//Check if player has been hit by enemy bullet 
    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }
//Check if enemey has collided with player
    if(enemyController.collideWith(player)) {
        isGameOver = true;
    }
//Check if all enemies have been eliminated
    if(enemyController.enemyRows.length === 0 ) {
        didWin = true;
        isGameOver = true;
    }
}
// Function to restart the game
function restartGame() {
    // Hide the restart button
    restartButton.style.display = 'none';

    // Reset game state variables
    isGameOver = false;
    didWin = false;
    gameOverSoundPlayed = false;

    // Reinitialize game objects
    player.x = canvas.width / 2;
    player.y = canvas.height - 75;
    player.isHit = false;

    // Clear bullets from controllers
    playerBulletController.bullets = [];
    enemyBulletController.bullets = [];

    // Reset enemy controller and recreate enemies
    enemyController.reset();
}
//Start game loop by calling the game function at 60FPS (1000/60 ms per frame)
setInterval(game, 1000/60)

