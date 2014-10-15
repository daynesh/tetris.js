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

    return LongRectangle;
});