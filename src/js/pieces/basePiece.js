define(function(require, module, exports) {
   
   var Square = require('src/js/pieces/square');

    function BasePiece() {
        this.indivSquares = [];
    }

    BasePiece.prototype.getIndivSquares = function() {
        return this.indivSquares;
    };

    BasePiece.prototype.setIndivSquares = function(squares) {
        this.indivSquares = squares;
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can advance this piece DOWN one
     * position (we'll check if the next position of each of these
     * squares is not occupied)
     */
    BasePiece.prototype.getBottomMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // If this square's x-coord is in squaresMap
            if (square.x in squaresMap) {
                // If this square is below what's in squaresMap
                // then replace square at this position of squaresMap
                if (square.y > squaresMap[square.x].y) {
                    squaresMap[square.x] = square;
                }
            }
            // If not in squaresMap, then add square to squaresMap
            else {
                squaresMap[square.x] = square;
            }
        });

        return _.values(squaresMap);
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece LEFT one
     * position
     */
    BasePiece.prototype.getLeftMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // If this square's y-coord is in squaresMap
            if (square.y in squaresMap) {
                // If this square is 'more' left than what's in squaresMap
                // then replace square at this position of squaresMap
                if (square.x < squaresMap[square.y].x) {
                    squaresMap[square.y] = square;
                }
            }
            // If not in squaresMap, then add square to squaresMap
            else {
                squaresMap[square.y] = square;
            }
        });

        return _.values(squaresMap);
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can move this piece RIGHT one
     * position
     */
    BasePiece.prototype.getRightMostSquares = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // If this square's y-coord is in squaresMap
            if (square.y in squaresMap) {
                // If this square is 'more' right than what's in squaresMap
                // then replace square at this position of squaresMap
                if (square.x > squaresMap[square.y].x) {
                    squaresMap[square.y] = square;
                }
            }
            // If not in squaresMap, then add square to squaresMap
            else {
                squaresMap[square.y] = square;
            }
        });

        return _.values(squaresMap);
    };


    BasePiece.prototype.getSquaresAfterRotatingRight = function() {
        // First find origin square
        var origin = this.findOriginSquare();
        console.debug('Origin: ', origin);

        // Next move all surrounding squares to new positions
        var otherSquares = _.reject(this.indivSquares, function(square) {
            return _.isEqual(origin, square);
        });

        var squaresToReturn = [origin];
        var that = this;
        // Now move squares to new rotated positions
        _.each(otherSquares, function(square) {
            var distXFromOrigin = Math.abs(square.x - origin.x);
            var distYFromOrigin = Math.abs(square.y - origin.y);
            var newSquare;

            // If square is in origin's I quadrant
            if ((square.x >= origin.x) && (square.y < origin.y)) {
                // Move square to IV quadrant
                newSquare = that.translateToQuadrantIV(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (I): ', square, ' to: ', newSquare);
            }
            // If square is in origin's II quadrant
            else if ((square.x < origin.x) && (square.y <= origin.y)) {
                // Move square to I quadrant
                newSquare = that.translateToQuadrantI(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (II): ', square, ' to: ', newSquare);
            }
            // If square is in origin's III quadrant
            else if ((square.x <= origin.x) && (square.y > origin.y)) {
                // Move square to II quadrant
                newSquare = that.translateToQuadrantII(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (III): ', square, ' to: ', newSquare);
            }
            // If square is in origin's IV quadrant
            else {
                // Move square to III quadrant
                newSquare = that.translateToQuadrantIII(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (IV): ', square, ' to: ', newSquare);
            }
        });

        return squaresToReturn;
    };

    BasePiece.prototype.getSquaresAfterRotatingLeft = function() {
        // First find origin square
        var origin = this.findOriginSquare();
        console.debug('Origin: ', origin);

        // Next move all surrounding squares to new positions
        var otherSquares = _.reject(this.indivSquares, function(square) {
            return _.isEqual(origin, square);
        });

        var squaresToReturn = [origin];
        var that = this;
        // Now move squares to new rotated positions
        _.each(otherSquares, function(square) {
            var distXFromOrigin = Math.abs(square.x - origin.x);
            var distYFromOrigin = Math.abs(square.y - origin.y);
            var newSquare;

            // If square is in origin's I quadrant
            if ((square.x >= origin.x) && (square.y < origin.y)) {
                // Move square to II quadrant
                newSquare = that.translateToQuadrantII(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (I): ', square, ' to: ', newSquare);
            }
            // If square is in origin's II quadrant
            else if ((square.x < origin.x) && (square.y <= origin.y)) {
                // Move square to III quadrant
                newSquare = that.translateToQuadrantIII(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (II): ', square, ' to: ', newSquare);
            }
            // If square is in origin's III quadrant
            else if ((square.x <= origin.x) && (square.y > origin.y)) {
                // Move square to IV quadrant
                newSquare = that.translateToQuadrantIV(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (III): ', square, ' to: ', newSquare);
            }
            // If square is in origin's IV quadrant
            else {
                // Move square to I quadrant
                newSquare = that.translateToQuadrantI(origin, distXFromOrigin, distYFromOrigin);
                squaresToReturn.push(newSquare);
                console.debug('Moving square (IV): ', square, ' to: ', newSquare);
            }
        });

        return squaresToReturn;
    };

    /**
     * Move square to I Quadrant using offsetX and offsetY
     */
    BasePiece.prototype.translateToQuadrantI = function(square, offsetX, offsetY) {
        return new Square(square.x + offsetY, square.y - offsetX, square.length);
    };

    /**
     * Move square to II Quadrant using offsetX and offsetY
     */
    BasePiece.prototype.translateToQuadrantII = function(square, offsetX, offsetY) {
        return new Square(square.x - offsetY, square.y - offsetX, square.length);
    };

    /**
     * Move square to III Quadrant using offsetX and offsetY
     */
    BasePiece.prototype.translateToQuadrantIII = function(square, offsetX, offsetY) {
        return new Square(square.x - offsetY, square.y + offsetX, square.length);
    };

    /**
     * Move square to IV Quadrant using offsetX and offsetY
     */
    BasePiece.prototype.translateToQuadrantIV = function(square, offsetX, offsetY) {
        return new Square(square.x + offsetY, square.y + offsetX, square.length);
    };

    return BasePiece;
});