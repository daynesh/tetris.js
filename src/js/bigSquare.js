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

    BigSquare.prototype.getSquaresForAdvanceChecking = function() {
        var squaresToReturn = [];

        // _.each(this.indivSquares, function(square) {
        //     square.y
        // });
    };

    return BigSquare; 
});