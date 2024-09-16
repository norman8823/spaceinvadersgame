//Export bullet class and use constructor to initialize bullet object
//The bullet class includes the properties of bullet: position, size, speed, shape, color
export default class Bullet{
    constructor(canvas,x,y,velocity,bulletColor){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;

        this.width = 5;
        this.height = 20;
    }

//Method to draw the bullet on the canvas
draw(ctx) {
    this.y -= this.velocity; 
    ctx.fillStyle = this.bulletColor; 
    ctx.fillRect(this.x, this.y, this.width, this.height); 
    }


//Collision detection using Axis Aligned Bounding Box method (AABB)
collideWith(sprite) { //"sprite" is a placeholder for any game object that we are checking collision against
    if(
        this.x + this.width > sprite.x &&    // Right side of bullet is past left side of sprite
        this.x < sprite.x + sprite.width &&  // Left side of bullet is before right side of sprite
        this.y + this.height > sprite.y &&   // Bottom of bullet is below top of sprite
        this.y < sprite.y + sprite.height    // Top of bullet is above bottom of sprite
    ) {
        return true; // If all conditions are true, there is an overlap (collision detected)
    }   else{
        return false;
    }
}
}