import Boss from "./Boss.js";
import MovingDirection from "./MovingDirection.js";

export default class BossController {
    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.originalImageSrc = './files/images/CatBoss.png';
        this.hitImageSrc = './files/images/CatBossHit.png';
        this.bossHitSound = new Audio('./files/sounds/Meow.ogg');
        this.bossDeathSound = new Audio('./files/sounds/boss-death.mp3');
        this.bossDeathSound.volume = 1 //full volume
        this.bossEnterSound = new Audio('./files/sounds/boss-enter.ogg');
        this.bossFireSound = new Audio('./files/sounds/boss-fire.wav'); // Custom firing sound for the boss
        this.bossMusic = new Audio('./files/sounds/boss-theme.mp3'); // Boss background music
        this.bossMusic.volume = .25
        this.bossWidth = 160
        this.bossHeight = 197
        this.bossObject = new Boss(-this.bossWidth, 50, 25) //boss with 25 health
        this.bossObject.image.src = this.originalImageSrc
        this.isEntering = true //Boss enters screen
        this.currentDirection = MovingDirection.right;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.defaultXVelocity = 2; 
        this.defaultYVelocity = 2; 
        this.moveDownTimerDefault = 30; //Amount of enemy movement downwards
        this.moveDownTimer = this.moveDownTimerDefault;
        this.fireBulletTimer = this.getRandomFireInterval(); // Initialize with a random firing interval
        this.bossHitImage = new Image();
        this.bossHitImage.src = this.hitImageSrc;
    }
 
    //Draw the boss and update movement
    draw(ctx) {
        if (this.isEntering) {
             // Play the boss-enter sound when the boss starts entering
             if (!this.hasPlayedEnterSound) {
                this.bossEnterSound.play();
            // Start the boss music after the enter sound finishes
            this.bossEnterSound.addEventListener('ended', () => {
            this.bossMusic.loop = true; // Make the boss music loop
            this.bossMusic.play(); // Play the boss music
            });

                this.hasPlayedEnterSound = true; // Ensure sound plays only once
             }

            // Move the boss right until it is fully visible
            this.bossObject.move(this.defaultXVelocity, 0);
            // Check if the boss has fully entered the screen
            if (this.bossObject.x >= 0) {
                this.bossObject.x = 0; // Align to the left edge
                this.isEntering = false; // Boss has entered the screen
                this.currentDirection = MovingDirection.right; // Start normal movement
            }
        } else {
            // Existing movement logic
            this.decrementMoveDownTimer();
            this.updateVelocityAndDirection();
            this.collisionDetection();
            this.bossObject.move(this.xVelocity, this.yVelocity); // Update boss position
            this.resetMoveDownTimer(); 
            this.fireBullet(); // Boss fires bullets
        }
    
        // Draw the boss on canvas
        this.bossObject.draw(ctx);
    }

    //reset move down timer if it reaches zero
    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }
    //decrement move down timer when boss moving down
    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight) {
            this.moveDownTimer--;
        }
    }
    //method to update velocity and direction based on boss position
    updateVelocityAndDirection() {
        if(this.currentDirection == MovingDirection.right) { //if moving right, vertical velocity zero
            this.xVelocity = this.defaultXVelocity;
            this.yVelocity = 0;

            if(this.bossObject.x + this.bossObject.width >= this.canvas.width){ //check if boss has reached right edge
                this.currentDirection = MovingDirection.downLeft; //change direction to move down then left
            }
        } else if(this.currentDirection === MovingDirection.downLeft){  //if moving down after reaching right edge
            this.moveDown(MovingDirection.left) //move down then left
        } else if (this.currentDirection === MovingDirection.left){
            this.xVelocity = -this.defaultXVelocity;
            this.yVelocity = 0;

            if(this.bossObject.x <=0) { //check if boss has reached left edge
            this.currentDirection = MovingDirection.downRight; //change direction
            }
        } else if(this.currentDirection === MovingDirection.downRight) {
            this.moveDown(MovingDirection.right) //move down then right
        }
    }
    //Method for moving boss down and changing direction
    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if(this.moveDownTimer <= 0){
        this.currentDirection = newDirection;
        return true;
        }
        return false;
    }

    //Collision detection between boss and player bullets
    collisionDetection() {
        if (this.isEntering) {
            // Do not detect collisions while entering
            return;
        }
    
        if (this.playerBulletController.collideWith(this.bossObject)) {
            this.bossObject.hit(); // Call the hit method on the boss object
            this.flashHitImage(); //  Flash red when hit
            if (this.bossObject.isDefeated()) {
                this.bossDeathSound.currentTime = 0;
                this.bossDeathSound.play();  // Play boss death sound
                this.bossMusic.pause(); //stop boss music when boss dies
            }
        }
        this.playerBulletController.removeBullet(this.bossObject);  // Remove bullet after impact
    }
        flashHitImage() {
            // Change to the hit image
            this.bossObject.image.src = this.hitImageSrc;
    
            // After a short delay, revert back to the original image
            setTimeout(() => {
                this.bossObject.image.src = this.originalImageSrc;
            }, 100); // Flash duration in milliseconds
        }
    
    // Method to generate a random firing interval
    getRandomFireInterval() {
        const minFireRate = 10;  // Minimum time between shots (in frames)
        const maxFireRate = 60; // Maximum time between shots (in frames)
        return Math.floor(Math.random() * (maxFireRate - minFireRate + 1)) + minFireRate;
    }
 // Method for boss bullet firing logic
 fireBullet() {
    if (this.isEntering) {
        // Do not fire bullets while entering
        return;
    }

    this.fireBulletTimer--; // Decrement the bullet firing timer
    if (this.fireBulletTimer <= 0) {
        this.fireBulletTimer = this.getRandomFireInterval(); // Reset timer with a new random value

        // Boss fires bullet from in front (bottom) of the boss object
        this.enemyBulletController.shoot(
            this.bossObject.x + this.bossObject.width / 2 - 2.5, // Centered horizontally
            this.bossObject.y + this.bossObject.height,          // From the bottom of the boss sprite
            -3 // negative velocity for shooting down
        );
          // Play the boss firing sound
          this.bossFireSound.currentTime = 0; // Reset the sound to start
          this.bossFireSound.play();          // Play the custom boss firing sound
      }
    }
}
