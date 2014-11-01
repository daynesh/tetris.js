define(function(require, module, exports) {
   
   var Square       = require('src/js/pieces/square');
   var BasePiece    = require('src/js/pieces/basePiece');

   function LongRectangle(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, 0, lengthOfSquare),
            new Square(120, 0, lengthOfSquare),
            new Square(150, 0, lengthOfSquare),
            new Square(180, 0, lengthOfSquare)
        ];

        this.lengthOfSquare = lengthOfSquare;
    }

    /**
     * Inherit all functions from BasePiece
     */
    LongRectangle.prototype = Object.create(BasePiece.prototype);

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    LongRectangle.prototype.getColor = function() {
        return 'orange';
    };

    /**
     *  Return square used as rotating origin
     */
    LongRectangle.prototype.findOriginSquare = function() {
        var sortedSquares;

        // If this is a vertical rectangle
        if (this.indivSquares[0].x === this.indivSquares[1].x) {
            // Find 2nd from the topmost square
            sortedSquares = _.sortBy(this.indivSquares, function(square) { return square.y; });
        }
        // If this is a horizontal rectangle
        else {
            // Find 2nd from the leftmost square
            sortedSquares = _.sortBy(this.indivSquares, function(square) { return square.x; });
        }

        return sortedSquares[1];
    };

    return LongRectangle;
});