describe('Square', function() {
    var Square = require('src/js/pieces/square');
    var square;

    beforeEach(function() {
        square = new Square(120, 30, 30);
    });

    it('should be able to move square to the right', function() {
        var newSquare = Square.generateNewSquareToTheRight(square);

        expect(newSquare.x).toEqual(square.x+30);
        expect(newSquare.y).toEqual(square.y);
        expect(newSquare.length).toEqual(square.length);
    });

    it('should be able to move square to the left', function() {
        var newSquare = Square.generateNewSquareToTheLeft(square);

        expect(newSquare.x).toEqual(square.x-30);
        expect(newSquare.y).toEqual(square.y);
        expect(newSquare.length).toEqual(square.length);
    });

    it('should be able to move square down', function() {
        var newSquare = Square.generateNewSquareBelow(square);

        expect(newSquare.x).toEqual(square.x);
        expect(newSquare.y).toEqual(square.y+30);
        expect(newSquare.length).toEqual(square.length);
    });
});