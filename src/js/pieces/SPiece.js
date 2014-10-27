define(function(require, module, exports) {
    
    var Square      = require('src/js/pieces/square');
    var BasePiece   = require('src/js/pieces/basePiece');

    function SPiece(lengthOfSquare) {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(120, 0, lengthOfSquare),
            new Square(150, 0, lengthOfSquare),
            new Square(90, lengthOfSquare, lengthOfSquare),
            new Square(120, lengthOfSquare, lengthOfSquare)
        ];

        this.lengthOfSquare = lengthOfSquare;
    }

    /**
     * Inherit all functions from BasePiece
     */
    SPiece.prototype = Object.create(BasePiece.prototype);

    /**
     * Return the color of individual squares that make
     * up this piece
     */
    SPiece.prototype.getColor = function() {
        return 'sienna';
    };

    SPiece.prototype.getSquaresAfterRotatingRight = function() {
        var squaresToReturn = BasePiece.prototype.getSquaresAfterRotatingRight.call(this, arguments);

        // If vertically-positioned
        if (this.isVerticallyPositioned()) {
            var that = this;
            // Also shift every piece down by one position
            var squaresShiftedDown = [];
            _.each(squaresToReturn, function(square) {
                var shiftedSquare = square;
                shiftedSquare.y = shiftedSquare.y + square.length;
                 squaresShiftedDown.push(shiftedSquare);
            });

            // var squaresShiftedDown = _.map(squaresToReturn, function(square) {
            //      square.y = square.y + that.lengthOfSquare;
            //      return square;
            // });

            // console.log('Shifted:');
            // _.each(squaresShiftedDown, function(s) {
            //     console.log('  s: ', s);
            // });

            // squaresToReturn = squaresShiftedDown;
        }
        
        return squaresToReturn;
    };

    SPiece.prototype.getSquaresAfterRotatingLeft = function() {
        
    };

    SPiece.prototype.isVerticallyPositioned = function() {
        var groupedByColumn = _.groupBy(this.indivSquares, function(square) { return square.x; });
        return _.keys(groupedByColumn).length === 2 ? true : false;
    };

    /**
     *  Return square used as rotating origin
     */
    SPiece.prototype.findOriginSquare = function() {
        // If this is vertically-positioned
        if (this.isVerticallyPositioned()) {
            var groupedByColumn = _.groupBy(this.indivSquares, function(square) { return square.x; });
            groupedByColumn = _.values(groupedByColumn);

            // Now figure out which group contains the rightmost squares
            var rightSquares = (groupedByColumn[0][0].x > groupedByColumn[1][0].x) ? groupedByColumn[0] : groupedByColumn[1];

            // Finally return first rightmost square
            return _.min(rightSquares, function(square) { return square.y; });
        }
        // If this is horizontally-positioned
        else {
            var groupedByRow = _.groupBy(this.indivSquares, function(square) { return square.y; });
            groupedByRow = _.values(groupedByRow);

            // Figure out which group contains the topmost squares
            var topSquares = (groupedByRow[0][0].y < groupedByRow[1][0].y) ? groupedByRow[0] : groupedByRow[1];

            // Finally return first topmost square
            return _.min(topSquares, function(square) { return square.x; });
        }
    };

    return SPiece;
});