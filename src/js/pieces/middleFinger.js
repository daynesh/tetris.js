define(function(require, module, exports) {

    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function MiddleFinger(lengthOfSquare) {
        // Inherit BasePiece properties
        BasePiece.call(this);

        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, lengthOfSquare, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare),
            new Square(120, 0, lengthOfSquare)
        ];

        this.lengthOfSquare = lengthOfSquare;
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

    /**
     *  Return square used as rotating origin
     */
    MiddleFinger.prototype.findOriginSquare = function() {
        var candidateSquares = [];
        var that = this;

        // Find square where other squares are surrounding this one
        _.each(this.indivSquares, function(square) {
            if (candidateSquares.length) {
                // Is square adjacent to candidateSquare?
                if (((square.x === candidateSquares[0].x) && (Math.abs(square.y - candidateSquares[0].y) === that.lengthOfSquare)) ||
                    ((square.y === candidateSquares[0].y) && (Math.abs(square.x - candidateSquares[0].x) === that.lengthOfSquare))) {
                        candidateSquares.push(square);
                }
                else {
                    // Remove first element in candidateSquares array
                    candidateSquares.shift();
                }
            }
            else {
                candidateSquares.push(square);
            }
        });

        return candidateSquares[0];
    };

    return MiddleFinger;
});