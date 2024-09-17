// Import the Enemy and MovingDirection from their respective modules 
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {
  enemyMap = [ //Map representing the layout of enemies, number represent enemy type
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  enemyRows = []; //Array to hold arrays of enemy objects for each row

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 30; //Amount of enemy movement downwards
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100; //Speed of enemy fire (time between bullets)
  fireBulletTimer = this.fireBulletTimerDefault;

  //Initialize EnemyController with canvas and bullet controllers
  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;
    this.enemyDeathSound = new Audio('./files/sounds/enemy-death.wav'); //load enemy death sound effect
    this.enemyDeathSound.volume = .5 //half volume
    this.createEnemies();
  }
  //Method to update and draw enemies on each frame
  draw(ctx) {
    this.decrementMoveDownTimer(); 
    this.updateVelocityAndDirection(); 
    this.collisionDetection()
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }
  //Method to handle collision detection between enemies and player bullets
  collisionDetection() {
    this.enemyRows.forEach(enemyRow => {  //loop through each row of enemies
      enemyRow.forEach((enemy,enemyIndex)=>{ //loop through each enemy in the row
        if(this.playerBulletController.collideWith(enemy)){ //check if enemy is hit
          this.enemyDeathSound.currentTime = 0; 
          this.enemyDeathSound.play();  //play enemy death sound
          enemy.health--;    //decrement enemy health
          if (enemy.health <= 0) {
            enemyRow.splice(enemyIndex, 1); //remove enemy if health reaches zero
        }
        this.playerBulletController.removeBullet(enemy);  //remove bullet after impact
      }
      });
    });
    //remove empty rows from the array
    this.enemyRows = this.enemyRows.filter(enemyRow=>enemyRow.length > 0);
  }
  //Method for enemy bullet firing logic
  fireBullet(){
    this.fireBulletTimer--; //Decrement the bullet firing timer
    if(this.fireBulletTimer <=0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length); //fire bullet from random enemy 
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x + enemy.width/2-2.5,enemy.y,-3); //enemy fires bullet
      console.log(enemyIndex);
    }
  }
  //reset move down timer if it reaches zero
  resetMoveDownTimer(){
    if(this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }
  //decrement move down timer when enemies moving down
  decrementMoveDownTimer(){
    if(
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }
  //method to update velocity and direction based on enemy positions
  updateVelocityAndDirection() {
    for(const  enemyRow of this.enemyRows){ //loop through each row of enemies
      if(this.currentDirection == MovingDirection.right) { //if moving right, vertical velocity zero
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length -1]; //check if right most enemy has reached edge of canvas
        if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
          this.currentDirection = MovingDirection.downLeft; //change direction to move down then left
          break;
        }
      } else if(this.currentDirection === MovingDirection.downLeft){  //if moving down after reaching right edge
        if(this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left){
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if(leftMostEnemy.x <=0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if(this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
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
  //Method to move and draw enemies on canvas
  drawEnemies(ctx) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    });
  }
  //Method to create enemies based on enemyMap
  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
          if (enemyNumber > 0) {
              this.enemyRows[rowIndex].push(
                  new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
              );
      }
      })
    });
  }
//Check for collision with any enemy
  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy => enemy.collideWith(sprite)))
  }
    reset() {
        // Reset enemy variables
        this.enemyRows = [];
        this.currentDirection = MovingDirection.right;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.moveDownTimer = this.moveDownTimerDefault;
        this.fireBulletTimer = this.fireBulletTimerDefault;

        // Recreate enemies
        this.createEnemies();
    }
}
