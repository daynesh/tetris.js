define(function(require, module, exports) {
    
    var Square = require('src/js/pieces/square');

    function BigSquare(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(120, 0, lengthOfSquare),
            new Square(150, 0, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare)
        ];
    }

    BigSquare.prototype.getIndivSquares = function() {
        return this.indivSquares;
    };

    BigSquare.prototype.setIndivSquares = function(squares) {
        this.indivSquares = squares;
    };

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    BigSquare.prototype.getColor = function() {
        return 'purple';
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can advance this piece DOWN one
     * position (we'll check if the next position of each of these
     * squares is not occupied)
     */
    BigSquare.prototype.getBottomMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // is square.x in squaresMap?
            if (square.x in squaresMap) {
                if (square.y > squaresMap[square.x].y) {
                    squaresMap[square.x] = square;
                }
            }
            else {
                squaresMap[square.x] = square;
            }
        });

        return _.values(squaresMap);
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece LEFT one
     * position
     */
    BigSquare.prototype.getLeftMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // is square.y in squaresMap?
            if (square.y in squaresMap) {
                if (square.x < squaresMap[square.y].x) {
                    squaresMap[square.y] = square;
                }
            }
            else {
                squaresMap[square.y] = square;
            }
        });

        return _.values(squaresMap);
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece RIGHT one
     * position
     */
    BigSquare.prototype.getRightMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // is square.y in squaresMap?
            if (square.y in squaresMap) {
                if (square.x > squaresMap[square.y].x) {
                    squaresMap[square.y] = square;
                }
            }
            else {
                squaresMap[square.y] = square;
            }
        });

        return _.values(squaresMap);
    };

    return BigSquare; 
});