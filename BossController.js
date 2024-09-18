import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class BossController {
    health = 25;
    bossObject = null;

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 15; //Amount of enemy movement downwards
    moveDownTimer = this.moveDownTimerDefault;
    fireBulletTimerDefault = 30; //Speed of enemy fire (time between bullets)
    fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.enemyHitSound = new Audio('./files/sounds/enemy-hit.ogg');
        this.enemyDeathSound = new Audio('./files/sounds/enemy-death.ogg'); //TODO: Use different death sound later
        this.enemyDeathSound.volume = 1 //full volume
        this.bossObject = new Enemy(0, 0, 4)
    }

    draw(ctx) {
    }

      //reset move down timer if it reaches zero
    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }
    //decrement move down timer when enemies moving down
    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight) {
            this.moveDownTimer--;
        }
    }
    //method to update velocity and direction based on enemy positions
    updateVelocityAndDirection() {
        if(this.currentDirection == MovingDirection.right) { //if moving right, vertical velocity zero
            this.xVelocity = this.defaultXVelocity;
            this.yVelocity = 0;
            const rightMostEnemy = this.bossObject
            if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
                this.currentDirection = MovingDirection.downLeft; //change direction to move down then left
            }
        } else if(this.currentDirection === MovingDirection.downLeft){  //if moving down after reaching right edge
            this.moveDown(MovingDirection.left)
        } else if (this.currentDirection === MovingDirection.left){
            this.xVelocity = -this.defaultXVelocity;
            this.yVelocity = 0;
            const leftMostEnemy = enemyRow[0];
            if(leftMostEnemy.x <=0) {
            this.currentDirection = MovingDirection.downRight;
            }
        } else if(this.currentDirection === MovingDirection.downRight) {
            this.moveDown(MovingDirection.right)
        }
    }
    //Method for moving enemies down and changing direction
    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if(this.moveDownTimer <= 0){
        this.currentDirection = newDirection;
        return true;
        }
        return false;
    }

    collisionDetection() {
        if(this.playerBulletController.collideWith(this.bossObject)){ //check if enemy is hit
            this.health--;    //decrement enemy health
            if (this.health <= 0) {
                this.enemyDeathSound.currentTime = 0; 
                this.enemyDeathSound.play();  //play enemy death sound
            }
        }

        this.playerBulletController.removeBullet(enemy);  //remove bullet after impact
    }


}