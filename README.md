# Pathify

Work in progress! Most of the work done is in src/scripts.

## Project log

### 2021-11-14:

Painting and erasing squares on the grid is now complete. After the latest commit I realize things have gotten very messy. To implement animations, I suspect a complete rewrite is neccesary.

### 2021-11-15:

After some small code structure changes (and thought), I was able to implement animations on the buttons. The implementation needs more work as there is a bug where if you hover between different buttons too quickly, the animation does not complete. Other than this I would also like to extend the functionality of animation by:

-   Generalizing the code for animation, as it (currently) is very specific to the Button class. This could be done by defining a superclass "Animateable".
-   Making definition of animation behaviours in child classes very declarative.
-   Allowing for other animation timing functions than just linear functions.
