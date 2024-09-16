# Space Invaders (base case psuedocode)

**Enemy Movement**
- create an array of enemies to represent the rows of enemies we have in the game
- tile map in the form of an array within an array; each inner array is a row 
- each number in the array represents the different types of enemies 
- create new array and map enemy objects onto it
- turn that array into one flat structure
- use "drawimage" method to place saved images of each enemy type onto the canvas
- position of each enemy type is mapped onto the array
- define all the directions the space invaders can move
- the first space invader to hit the edge will cause the group to switch direction
- group of space invaders move down then to the left/right

**Player Movement**
- "draw" player on canvas using spaceship image
- define player movements through variables
- (event.code) to detect key press, right arrow and left arrow
- key press will move player left or right at predetermined velocity
- implement boundary check to make sure player does not move off screen

**Player Shooting** 
- Wire up keyboard event for shooting bullets
- activate shoot upon Spacebar keypress
- constructor takes in bullet controller
- bullet controller has a "shoot" method which shoots bullets at a defined velocity
- define bullet parameters: shape, color of bullet, simultaneous number of bullets at a time, 
 time/gap between bullets,  sound
- y position of the bullet is negative to move upwards from player

**Enemy Shooting**
- define enemy bullet parameters: shoot 4 bullets at a time, white color, no sound
- Enemy is shooting from random position
- bullets travel from top to bottom

**Collision Detection**
- loop through enemy rows to detect if there are any collisions between enemy and bullet
- use splice method to remove enemy from the row using the index of the hit enemy
- collision detection method will effectively be two boxes ("axis-aligned bounding box")
- create audio object that will activate when the enemy is hit
- if enemy collides with player or if player gets hit, Game Over

**Game Outcome**
- if all enemies are destroyed, display "You Win"
- if player is either struck by enemy bullet or collides with enemy, display "Game Over"
