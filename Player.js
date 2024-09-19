//Export Player class 
export default class Player {  //initialize control flags to track key press
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  //Constructor to initialize player object with canvas, velocity, and bullet controller
  constructor(canvas, velocity, bulletController) {
    this.canvas = canvas;
    this.velocity = velocity;
    this.bulletController = bulletController

  //Set initial position of player at the bottom center of canvas
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = `./files/images/player.png`;

    //Event listeners for keydown and keyup events
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);

    //Mobile event listeners
    this.addMobileEventListeners();
  }

  draw(ctx) {
        if(this.shootPressed){ //fire bullet if shootPressed = true
            this.bulletController.shoot(
              this.x + this.width/2, 
              this.y, 
              4,      //bullet velocity
              10      //time until next bullet
            );
        } 
    this.move();
    this.collideWithWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height); //draw Player
  }

  collideWithWalls() {
    //Prevent player from moving past left boundary
    if(this.x <0){
        this.x = 0;
    }

    //Prevent player from moving past left boundary
    if(this.x > this.canvas.width - this.width){
        this.x = this.canvas.width - this.width;
    }
  }
  move() {
    if (this.rightPressed) {
      this.x += this.velocity; //Move Right
    } else if (this.leftPressed) {
      this.x += -this.velocity; //Move Left
    }
  }
  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = true;
    }
    if(event.code == "Space") {
        this.shootPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPressed = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPressed = false;
    }
    if(event.code == "Space") {
        this.shootPressed = false;
    }
  };

  addMobileEventListeners() {
    let isTouching = false;
    let shootInterval;

function addMobileEventListeners() {
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Prevent default behavior like scrolling or zooming when interacting with the screen
    document.addEventListener('touchstart', function (event) {
        // Only prevent default if the touch is not on the restart button
        if (event.target !== restartButton) {
            event.preventDefault();
        }
    }, { passive: false });
}

function handleTouchStart(event) {
    isTouching = true;
    const touch = event.touches[0];
    updatePlayerPosition(touch.clientX);
    
    // Start continuous shooting
    shoot();
    shootInterval = setInterval(shoot, 100); // Adjust the interval as needed
}

function handleTouchMove(event) {
    if (isTouching) {
        const touch = event.touches[0];
        updatePlayerPosition(touch.clientX);
    }
}

function handleTouchEnd(event) {
    isTouching = false;
    Player.rightPressed = false;
    Player.leftPressed = false;
    
    // Stop continuous shooting
    clearInterval(shootInterval);
}

function updatePlayerPosition(touchX) {
    const screenWidth = window.innerWidth;
    const screenCenterX = screenWidth / 2;

    if (touchX < screenCenterX) {
        Player.leftPressed = true;
        Player.rightPressed = false;
    } else {
        Player.rightPressed = true;
        Player.leftPressed = false;
    }
  }
function shoot() {
    if (!isGameOver && isGameStarted) {
        playerBulletController.shoot(player.x + player.width / 2, Player.y, 4, 10);
    }
  }
  }
}
