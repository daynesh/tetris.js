define(function(require, module, exports) {
    
    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function ZPiece(lengthOfSquare) {
        // Inherit BasePiece properties
        BasePiece.call(this);

        // Initial positions of pieces
        this.indivSquares = [
            new Square(90, 0, lengthOfSquare),
            new Square(120, 0, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare),
            new Square(150, lengthOfSquare, lengthOfSquare)
        ];

        this.lengthOfSquare = lengthOfSquare;
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

    ZPiece.prototype.getSquaresAfterRotatingRight = function() {
        var squaresToReturn = BasePiece.prototype.getSquaresAfterRotatingRight.call(this, arguments);

        // If vertically-positioned
        if (this.isVerticallyPositioned()) {
            var that = this;
            // Also shift every piece down by one position
            var squaresShiftedDown = [];
            _.each(squaresToReturn, function(square) {
                var shiftedSquare = new Square(square.x, square.y + square.length, square.length);
                squaresShiftedDown.push(shiftedSquare);
            });

            squaresToReturn = squaresShiftedDown;
        }

        return squaresToReturn;
    };

    /**
     * Identical to getSquaresAfterRotatingRight()
     */
    ZPiece.prototype.getSquaresAfterRotatingLeft = function() {
        return this.getSquaresAfterRotatingRight();
    };

    ZPiece.prototype.isVerticallyPositioned = function() {
        var groupedByColumn = _.groupBy(this.indivSquares, function(square) { return square.x; });
        return _.keys(groupedByColumn).length === 2 ? true : false;
    };

    /**
     *  Return square used as rotating origin
     */
    ZPiece.prototype.findOriginSquare = function() {
        // If this is vertically-positioned
        if (this.isVerticallyPositioned()) {
            var groupedByColumn = _.groupBy(this.indivSquares, function(square) { return square.x; });
            groupedByColumn = _.values(groupedByColumn);

            // Now figure out which group contains the rightmost squares
            var rightSquares = (groupedByColumn[0][0].x > groupedByColumn[1][0].x) ? groupedByColumn[0] : groupedByColumn[1];

            // Finally return second rightmost square
            return _.max(rightSquares, function(square) { return square.y; });
        }
        // If this is horizontally-positioned
        else {
            var groupedByRow = _.groupBy(this.indivSquares, function(square) { return square.y; });
            groupedByRow = _.values(groupedByRow);

            // Figure out which group contains the topmost squares
            var topSquares = (groupedByRow[0][0].y < groupedByRow[1][0].y) ? groupedByRow[0] : groupedByRow[1];

            // Finally return second topmost square
            return _.max(topSquares, function(square) { return square.x; });
        }
    };

    return ZPiece;
});