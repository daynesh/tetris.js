define(function(require, module, exports) {
    
    function Square(x, y, length) {
        this.x      = x;
        this.y      = y;
        this.length  = length;
    }

    /**
     * Creates a new Square positioned directly to the left
     * of the specified square
     */
    Square.generateNewSquareToTheLeft = function(square) {
        return new Square(
            square.x - square.length,
            square.y,
            square.length
        );
    };

    /**
     * Creates a new Square positioned directly to the right
     * of the specified square
     */
    Square.generateNewSquareToTheRight = function(square) {
        return new Square(
            square.x + square.length,
            square.y,
            square.length
        );
    };

    /**
     * Creates a new Square positioned directly below
     * the specified square
     */
    Square.generateNewSquareBelow = function(square) {
        return new Square(
            square.x,
            square.y + square.length,
            square.length
        );
    };

    return Square;
});