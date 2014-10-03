define(function(require, module, exports) {
    
    var Square = require('src/js/square');

    function BigSquare() {
        // Initial positions of pieces
        this.indivSquares = [
            new Square(120, 0, 30),
            new Square(150, 0, 30),
            new Square(120, 30, 30),
            new Square(150, 30, 30)
        ];
    }

    BigSquare.prototype.getIndivSquares = function() {
        return this.indivSquares;
    };

    BigSquare.prototype.setIndivSquares = function(squares) {
        this.indivSquares = squares;
    };

    BigSquare.prototype.getColor = function() {
        return 'purple';
    };

    /**
     * This function returns a subset of squares we will use
     * to determine whether we can advance this piece down one
     * position (we'll check if the next position of each of these
     * squares is not occupied)
     */
    BigSquare.prototype.getSquaresForAdvanceChecking = function() {
        var squaresMap = {};

        _.each(this.indivSquares, function(square) {
            // is square.x in squaresMap?
            if (square.x in squaresMap) {
                if (square.y > squaresMap[square.x].y) {
                    squaresMap[square.x] = square;
                }
            }
            else {
                squaresMap[square.x] = square;
            }
        });

        return _.values(squaresMap);
    };

    return BigSquare; 
});