describe('Square', function() {
    var Square = require('src/js/pieces/square');
    var square;

    beforeEach(function() {
        square = new Square(120, 30, 30);
    });

    it ('should be able to move square to the right', function() {
        var squaresToTheRight = Square.generateNewSquareToTheRight(square);

        expect(squaresToTheRight.x).toEqual(square.x+30);
        expect(squaresToTheRight.y).toEqual(square.y);
        expect(squaresToTheRight.length).toEqual(square.length);
    });
});