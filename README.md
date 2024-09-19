# Space Invaders Style Game

**Summary**
- Classic "Space Invaders" style game where the ojective is to shoot invading aliens as they move down the screen while avoiding enemy fire. The player wins by eliminating all the enemies on the screen. 
- Player is represented by a spaceship at the bottom of screen (moves only along x axis)
- Enemies are arranged in rows moving together side to side and downwards toward player while shooting
- Boss appears after enemy rows are eliminated, player must defeat boss to win the game
- Game Over if player gets shot or collides with an enemy/boss 
- We will be using Javascript to draw on HTML canvas, with CSS for some simple styling

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
- play unique enemy shooting sound

**Enemy Health**
- There are three types of enemies: Green (1), Orange (2), and Blue (3)
- Each enemy has a different health value depending on its type (1, 2, or 3).
- Enemy health is reduced by 1 each time it gets hit by a player bullet. When health reaches 0, the enemy is removed from the game.
- When the enemy's health decreases, its image changes to reflect the remaining health value.
- Two sound effects are triggered: one when the enemy is hit and another when the enemy dies.

**Collision Detection**
- loop through enemy rows to detect if there are any collisions between enemy and bullet
- use splice method to remove enemy from the row using the index of the hit enemy
- collision detection method will effectively be two boxes ("axis-aligned bounding box")
- create audio object that will activate when the enemy is hit
- if enemy collides with player or if player gets hit, Game Over

**Boss Level**
- after all alien enemy rows are eliminated, boss (final enemy) enters the screen
- play boss entrance sound effect and boss music
- the boss moves in a similar fashion to the enemies, but at a faster speed
- boss hp has default value of 25
- each time boss is hit, the boss image flashes red and a sound is played
- once boss hp reaches zero, play death sound and display "You Win"

**Game Outcome**
- If boss is destroyed, "You Win"
- If player is either struck by enemy bullet or collides with enemy, display "Game Over"
- Restart game button resets gameplay

**Further Improvements**
- Add instructions page to the home screen start menu
- Randomize Boss movement (direction and velocity)
- Add boss hp meter which decreases with every hit
- Add multiple levels to game for increasing difficulty 
- Implement laser reload time with power indicator
- Add event listeners for mouse controls
- Bonus: Allow user to select different spaceships at home screen

<h4>References:</h4>
https://dev.to/codingwithadam/coding-space-invaders-in-javascript-complete-tutorial-every-step-explained-with-html5-canvas-45ja
https://codeheir.com/2019/03/17/how-to-code-space-invaders-1978-7/
https://betterprogramming.pub/create-the-classic-space-invaders-game-af087786d63b
https://codepen.io/tallulahh/pen/OJRdNOL
https://gamefromscratch.com/gamedev-math-recipes-collision-detection-using-an-axis-aligned-bounding-box/
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
https://www.freecodecamp.org/news/learn-javascript-game-development-full-course/
https://opengameart.org/
https://pixabay.com/sound-effects/search/game/
