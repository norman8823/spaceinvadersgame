// Import the Bullet class so we can create bullet instances
import Bullet from "./Bullet.js"

// Export the BulletController class so it can be used in other files
export default class BulletController {
    bullets = [] //declare the array to store the bullets
    timeTillNextBulletAllowed = 0; //timer that controls how often bullets can be fired
    
    //Initialize new BulletController object
    constructor(canvas,maxBulletsAtATime, bulletColor, soundEnabled){
        this.canvas = canvas;     // Store a reference to the canvas where bullets will be drawn
        this.maxBulletsAtATime = maxBulletsAtATime; // Set the maximum number of bullets that can be on screen at once
        this.bulletColor = bulletColor; // Set the color of the bullets managed by this controller
        this.soundEnabled = soundEnabled; // Determine whether shooting sound effects are enabled
        this.shootSound = new Audio("./files/sounds/shoot.wav") // Create a new Audio object for the shooting sound effect
        this.shootSound.volume = 0.5;    // Set the volume of the shooting sound effect to 50%

    }
  // Method to update and draw all bullets managed by this controller
    draw(ctx) {
        this.bullets = this.bullets.filter( // Filter out bullets that have moved off the screen
            (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);
        
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if(this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }


    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
            bullet.collideWith(sprite)
    );

    if(bulletThatHitSpriteIndex >=0){
        this.bullets.splice(bulletThatHitSpriteIndex, 1);
        return true;
    }

    return false;
}

    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if(this.timeTillNextBulletAllowed <=0 && this.bullets.length < this.maxBulletsAtATime)
        {
        const bullet = new Bullet(this.canvas,x,y,velocity,this.bulletColor)
        this.bullets.push(bullet);
        if(this.soundEnabled){
            this.shootSound.currentTime = 0;
            this.shootSound.play();
        }
        this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }
}