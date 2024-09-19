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

    const handleTouchStart = (event) => {
      isTouching = true;
      const touch = event.touches[0];
      this.updatePlayerPosition(touch.clientX);
      
      // Start continuous shooting
      this.shoot();
      shootInterval = setInterval(() => this.shoot(), 100); // Adjust the interval as needed
    };

    const handleTouchMove = (event) => {
      if (isTouching) {
        const touch = event.touches[0];
        this.updatePlayerPosition(touch.clientX);
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      this.rightPressed = false;
      this.leftPressed = false;
      
      // Stop continuous shooting
      clearInterval(shootInterval);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Prevent default behavior like scrolling or zooming when interacting with the screen
    document.addEventListener('touchstart', (event) => {
      // Only prevent default if the touch is not on the restart button
      if (event.target.id !== 'restartButton') {
        event.preventDefault();
      }
    }, { passive: false });
  }

  updatePlayerPosition(touchX) {
    const screenWidth = window.innerWidth;
    const screenCenterX = screenWidth / 2;

    if (touchX < screenCenterX) {
      this.leftPressed = true;
      this.rightPressed = false;
    } else {
      this.rightPressed = true;
      this.leftPressed = false;
    }
  }

  shoot() {
    this.shootPressed = true;
  }
}
