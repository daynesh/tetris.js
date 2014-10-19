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

    MiddleFinger.prototype.getSquaresAfterRotatingRight = function() {
        // First find origin square
        var origin = this.findOriginSquare();

        // Next move all surrounding squares to new positions
        var otherSquares = _.reject(this.indivSquares, function(square) {
            return _.isEqual(origin, square);
        });

        var squaresToReturn = [origin];
        var that = this;
        // Now move squares to new rotated positions
        _.each(otherSquares, function(square) {
            if (square.y === origin.y) {
                // square is to the right of origin
                if (square.x - origin.x === that.lengthOfSquare) {
                    squaresToReturn.push(new Square(origin.x, origin.y+that.lengthOfSquare, that.lengthOfSquare));
                }
                // square is to the left of origin
                else if (origin.x - square.x === that.lengthOfSquare) {
                    squaresToReturn.push(new Square(origin.x, origin.y-that.lengthOfSquare, that.lengthOfSquare));
                }
            }
            else if (square.x === origin.x) {
                // square is above origin
                if (origin.y - square.y === that.lengthOfSquare) {
                    squaresToReturn.push(new Square(origin.x+that.lengthOfSquare, origin.y, that.lengthOfSquare));
                }
                // square is below origin
                else if (square.y - origin.y === that.lengthOfSquare) {
                    squaresToReturn.push(new Square(origin.x-that.lengthOfSquare, origin.y, that.lengthOfSquare));
                }
            }
        });

        return squaresToReturn;
    };

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