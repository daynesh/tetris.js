define(function(require, module, exports) {
    
    var Square = require('src/js/square');

    function SPiece(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, 0, lengthOfSquare),
            new Square(120, 0, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare)
        ];
    }

    SPiece.prototype.getIndivSquares = function() {
        return this.indivSquares;
    };

    SPiece.prototype.setIndivSquares = function(squares) {
        this.indivSquares = squares;
    };

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    SPiece.prototype.getColor = function() {
        return 'green';
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can advance this piece DOWN one
     * position (we'll check if the next position of each of these
     * squares is not occupied)
     */
    SPiece.prototype.getBottomMostSquares = function() {
        var bottomMostSquares = [];

        _.each(this.indivSquares, function(square) {
            // if bottomMostSquares is empty then put square in it
            if (bottomMostSquares.length === 0) {
                bottomMostSquares.push(square);
            }
            else {
                //  if square.y > bottomMostSquares[0].y then clear bottomMostSquares and add this square
                if (square.y > bottomMostSquares[0].y) {
                    bottomMostSquares = [];
                    bottomMostSquares.push(square);
                }
                //  else if square.y === bottomMostSquares[0].y then push square to bottomMostSquares
                else if (square.y === bottomMostSquares[0].y) {
                    bottomMostSquares.push(square);
                }
            }
        });

        return bottomMostSquares;
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece LEFT one
     * position
     */
    SPiece.prototype.getLeftMostSquares = function() {
        var leftMostSquares = [];

        _.each(this.indivSquares, function(square) {
            // if leftMostSquares is empty then put square in it
            if (leftMostSquares.length === 0) {
                leftMostSquares.push(square);
            }
            else {
                //  if square.x < leftMostSquares[0].x then clear leftMostSquares and add this square
                if (square.x < leftMostSquares[0].x) {
                    leftMostSquares = [];
                    leftMostSquares.push(square);
                }
                //  else if square.x === leftMostSquares[0].x then push square to leftMostSquares
                else if (square.x === leftMostSquares[0].x) {
                    leftMostSquares.push(square);
                }
            }
        });
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece RIGHT one
     * position
     */
    SPiece.prototype.getRightMostSquares = function() {
        var rightMostSquares = [];

        _.each(this.indivSquares, function(square) {
            // if rightMostSquares is empty then put square in it
            if (rightMostSquares.length === 0) {
                rightMostSquares.push(square);
            }
            else {
                //  if square.x > rightMostSquares[0].x then clear rightMostSquares and add this square
                if (square.x > rightMostSquares[0].x) {
                    rightMostSquares = [];
                    rightMostSquares.push(square);
                }
                //  else if square.x === rightMostSquares[0].x then push square to rightMostSquares
                else if (square.x === rightMostSquares[0].x) {
                    rightMostSquares.push(square);
                }
            }
        });
    };

    return SPiece;
});