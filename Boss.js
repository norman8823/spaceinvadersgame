//Export Boss class 
export default class Boss {
    constructor(x, y, health ) { //constructor to initialize the Boss object with position and image
      this.x = x;
      this.y = y;
      this.width = 160;
      this.height = 197;
      this.health = 25
      this.image = new Image(); //create new image object 
      this.image.src = `./files/images/CatBoss.png`; //set source of image
      this.bossHitSound = new Audio('./files/sounds/Meow.ogg');
      this.bossDeathSound = new Audio('./files/sounds/boss-death.ogg');
    }

draw(ctx) { //draw boss on canvas
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
//method to update position
  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }
//method for collision detection using Axis Aligned Bounding Box method
  collideWith(sprite) {
    return (
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
    );
    }
    
    //method to reduce health when hit by bullet
    hit() {
        this.health -= 1;
        this.bossHitSound.play(); // Play sound when boss is hit
        if (this.health <= 0) {
            this.bossDeathSound.play(); // Play sound when boss is defeated
        }
    }
    isDefeated() {
        return this.health <=0;
    }

}