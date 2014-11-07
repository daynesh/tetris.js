define(function(require, module, exports) {
    
    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function LPiece(lengthOfSquare) {
        // Inherit BasePiece properties
        BasePiece.call(this);

        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, lengthOfSquare, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare),
            new Square(150, 0, lengthOfSquare)
        ];
    }

    /**
     * Inherit all functions from BasePiece
     */
    LPiece.prototype = Object.create(BasePiece.prototype);

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    LPiece.prototype.getColor = function() {
        return 'mediumblue';
    };

    /**
     *  Return square used as rotating origin
     */
    LPiece.prototype.findOriginSquare = function() {
        // Find square that's second from the top or left
        // depending on rotational state
        var sortedSquares;

        var groupedByRow = _.groupBy(this.indivSquares, function(square) { return square.x; });
        var groupedByColumn = _.groupBy(this.indivSquares, function(square) { return square.y; });

        var sameColumn = _.map(groupedByColumn, function(squares) { return squares[0]; });
        var sameRow = _.map(groupedByRow, function(squares) { return squares[0]; });

        // If this is a horizonally-rotated piece (___| or |---)
        if (sameRow.length === 3) {
            sortedSquares = _.sortBy(sameRow, function(square) { return square.x; });
        }
        else {
            sortedSquares = _.sortBy(sameColumn, function(square) { return square.y; }); 
        }

        return sortedSquares[1];
    };

    return LPiece;
});