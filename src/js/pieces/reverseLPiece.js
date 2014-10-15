define(function(require, module, exports) {
    
    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function ReverseLPiece(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, 0, lengthOfSquare),
            new Square(120, 0, lengthOfSquare),
            new Square(150, 0, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare)
        ];
    }

    /**
     * Inherit all functions from BasePiece
     */
    ReverseLPiece.prototype = Object.create(BasePiece.prototype);

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    ReverseLPiece.prototype.getColor = function() {
        return 'crimson';
    };

    return ReverseLPiece;
});