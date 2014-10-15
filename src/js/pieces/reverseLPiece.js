define(function(require, module, exports) {
    
    var Square = require('src/js/pieces/square');

    function reverseLPiece(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, 0, lengthOfSquare),
            new Square(120, 0, lengthOfSquare),
            new Square(150, 0, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare)
        ];
    }

    reverseLPiece.prototype.getIndivSquares = function() {
        return this.indivSquares;
    };

    reverseLPiece.prototype.setIndivSquares = function(squares) {
        this.indivSquares = squares;
    };

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    reverseLPiece.prototype.getColor = function() {
        return 'crimson';
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can advance this piece DOWN one
     * position (we'll check if the next position of each of these
     * squares is not occupied)
     */
    reverseLPiece.prototype.getBottomMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // If this square's x-coord is in squaresMap
            if (square.x in squaresMap) {
                // If this square is below what's in squaresMap
                // then replace square at this position of squaresMap
                if (square.y > squaresMap[square.x].y) {
                    squaresMap[square.x] = square;
                }
            }
            // If not in squaresMap, then add square to squaresMap
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
    reverseLPiece.prototype.getLeftMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // If this square's y-coord is in squaresMap
            if (square.y in squaresMap) {
                // If this square is 'more' left than what's in squaresMap
                // then replace square at this position of squaresMap
                if (square.x < squaresMap[square.y].x) {
                    squaresMap[square.y] = square;
                }
            }
            // If not in squaresMap, then add square to squaresMap
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
    reverseLPiece.prototype.getRightMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // If this square's y-coord is in squaresMap
            if (square.y in squaresMap) {
                // If this square is 'more' right than what's in squaresMap
                // then replace square at this position of squaresMap
                if (square.x > squaresMap[square.y].x) {
                    squaresMap[square.y] = square;
                }
            }
            // If not in squaresMap, then add square to squaresMap
            else {
                squaresMap[square.y] = square;
            }
        });

        return _.values(squaresMap);
    };

    return reverseLPiece;
});