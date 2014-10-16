define(function(require, module, exports) {

    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function MiddleFinger(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, lengthOfSquare, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare),
            new Square(120, 0, lengthOfSquare)
        ];
    }

    /**
     * Inherit all functions from BasePiece
     */
    MiddleFinger.prototype = Object.create(BasePiece.prototype);

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    MiddleFinger.prototype.getColor = function() {
        return 'aliceblue';
    };

    return MiddleFinger;
});