define(function(require, module, exports) {
    
    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function BigSquare(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(120, 0, lengthOfSquare),
            new Square(150, 0, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare)
        ];

        this.lengthOfSquare = lengthOfSquare;
    }

    /**
     * Inherit all functions from BasePiece
     */
    BigSquare.prototype = Object.create(BasePiece.prototype);

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    BigSquare.prototype.getColor = function() {
        return 'purple';
    };

    BigSquare.prototype.getSquaresAfterRotatingRight = function() {
        return this.getIndivSquares();
    };

    return BigSquare; 
});