define(function(require, module, exports) {
   
   var Square       = require('src/js/pieces/square');
   var BasePiece    = require('src/js/pieces/basePiece');

   function LongRectangle(lengthOfSquare) {
        // Inherit BasePiece properties
        BasePiece.call(this);

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

        switch (this.rotationState) {
            case 0:
                // Find 2nd from the left-most square
                sortedSquares = _.sortBy(this.indivSquares, function(square) { return square.x; });
                return sortedSquares[1];
            case 1:
                // Find 2nd from the bottom
                sortedSquares = _.sortBy(this.indivSquares, function(square) { return square.y; });
                return sortedSquares[2];
            case 2:
                // Find 2nd from the right-most square
                sortedSquares = _.sortBy(this.indivSquares, function(square) { return square.x; });
                return sortedSquares[2];
            case 3:
                // Find 2nd from the top
                sortedSquares = _.sortBy(this.indivSquares, function(square) { return square.y; });
                return sortedSquares[1];
        }
    };

    return LongRectangle;
});