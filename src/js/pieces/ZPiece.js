define(function(require, module, exports) {
    
    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function ZPiece(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, lengthOfSquare, lengthOfSquare),
            new Square(120, 0, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, 0, lengthOfSquare)
        ];
    }

    /**
     * Inherit all functions from BasePiece
     */
    ZPiece.prototype = Object.create(BasePiece.prototype);

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    ZPiece.prototype.getColor = function() {
        return 'skyblue';
    };

    return ZPiece;
});