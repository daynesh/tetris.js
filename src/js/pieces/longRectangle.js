define(function(require, module, exports) {
   
   var Square = require('src/js/pieces/square');

   function LongRectangle(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, 0, lengthOfSquare),
            new Square(120, 0, lengthOfSquare),
            new Square(150, 0, lengthOfSquare),
            new Square(180, 0, lengthOfSquare)
        ];
    }

    LongRectangle.prototype.getIndivSquares = function() {
        return this.indivSquares;
    };

    LongRectangle.prototype.setIndivSquares = function(squares) {
        this.indivSquares = squares;
    };

    LongRectangle.prototype.getColor = function() {
        return 'orange';
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can advance this piece DOWN one
     * position (we'll check if the next position of each of these
     * squares is not occupied)
     */
    LongRectangle.prototype.getBottomSquares = function() {
        // If any two individual squares have identical y-values,
        // then we don't have to find the bottom most square cuz
        // everything is bottom most!
        if (this.indivSquares[0].y != this.indivSquares[1].y) {
            // Find the square with the largest  y-value
            var bottomMostSquare = _.max(this.indivSquares, function(square) {
                return square.y;
            });

            return [bottomMostSquare];
        }
        else {
            return this.indivSquares;
        }
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece LEFT one
     * position
     */
    LongRectangle.prototype.getLeftMostSquares = function() {
        // If any two individual squares have identical x-values,
        // then we don't have to find the left most square cuz
        // everything is left most!
        if (this.indivSquares[0].x != this.indivSquares[1].x) {
            // Find the square with the smallest x-value
            var leftMostSquare = _.min(this.indivSquares, function(square) {
                return square.x;
            });

            return [leftMostSquare];
        }
        else {
            return this.indivSquares;
        }
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece RIGHT one
     * position
     */
    LongRectangle.prototype.getRightMostSquares = function() {
        // If any two individual squares have identical x-values,
        // then we don't have to find the right most square cuz
        // everything is right most!
        if (this.indivSquares[0].x != this.indivSquares[1].x) {
            // Find the square with the smallest x-value
            var leftMostSquare = _.max(this.indivSquares, function(square) {
                return square.x;
            });

            return [leftMostSquare];
        }
        else {
            return this.indivSquares;
        }
    };
});