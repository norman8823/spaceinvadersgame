//Export Enemy class 
export default class Enemy {
  constructor(x, y, imageNumber) { //constructor to initialize the Enemy object with position and image
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 32;

    this.image = new Image(); //create new image object 
    this.image.src = `./files/images/enemy${imageNumber}.png`; //set source of image
  }
  draw(ctx) { //draw enemy on canvas
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
//method to update enemy position
  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }
//method for collision detection using Axis Aligned Bounding Box method
  collideWith(sprite) {
    if(
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
    ) {
        return true;
    }   else{
        return false;
    }
    }
}
