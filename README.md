# Pathify

Work in progress! Most of the work done is in src/scripts.

## Installation instructions

1. Make sure node and npm are installed.
2. `git clone https://github.com/ChristofferBillman/Pathify` where you want the project.
3. `cd Pathify`
4. `npm install`
5. `npm run start`
6. Done!

## Project log

### 2021-11-14:

Painting and erasing squares on the grid is now complete. After the latest commit I realize things have gotten very messy. To implement animations, I suspect a complete rewrite is neccesary.

### 2021-11-15:

After some small code structure changes (and thought), I was able to implement animations on the buttons. The implementation needs more work as there is a bug where if you hover between different buttons too quickly, the animation does not complete. Other than this I would also like to extend the functionality of animation by:

-   Generalizing the code for animation, as it (currently) is very specific to the Button class. This could be done by defining a superclass "Animateable".
-   Making definition of animation behaviours in child classes very declarative.
-   Allowing for other animation timing functions than just linear functions.

### 2021-11-26:

Implemented classes Tween, colorTween and Cursor. Tween smoothly changes one value to another, with a given timing function. I feel like the first and third goal from last time are mostly fulfilled. I am not satisfied with the second goal. It is still tricky to implement animations on objects, so there is definitley room for improvement in Tween.

Now the buttons pop out on hover and the color change on hover for each square, has been replaced with an independet square, called the cursor. This square can move, and it's position is not bound by the grid, making its position animateable.

Goals for the next session would be to implement the grid properly, as it is not really a grid currently. It is only some squares drawn on the canvas at certain coordinates. Im thinking that the grid should be represented by a graph. Why? Because I only have experience of implementing pathfinding algorithms for graphs.
