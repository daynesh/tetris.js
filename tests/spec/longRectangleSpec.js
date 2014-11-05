describe('Long Rectangle', function() {
    
    var LongRectangle   = require('src/js/pieces/longRectangle');
    var Square          = require('src/js/pieces/square');

    var longRectangle;

    beforeEach(function() {
        longRectangle = new LongRectangle(30);

        longRectangle.setIndivSquares([
            new Square(90, 150, 30),
            new Square(120, 150, 30),
            new Square(150, 150, 30),
            new Square(180, 150, 30),
        ]);
    });

    it('should be able to move correctly to the right', function() {
        var newSquares = longRectangle.generateSquaresShiftedToTheRight();

        for(var i=0; i<3; i++) {
            expect(newSquares[i].x).toEqual(longRectangle.indivSquares[i].x+30);
            expect(newSquares[i].y).toEqual(150);
            expect(newSquares[i].length).toEqual(30);
        }
    });

    it('should be able to move correctly to the left', function() {
        var newSquares = longRectangle.generateSquaresShiftedToTheLeft();

         for(var i=0; i<3; i++) {
            expect(newSquares[i].x).toEqual(longRectangle.indivSquares[i].x-30);
            expect(newSquares[i].y).toEqual(150);
            expect(newSquares[i].length).toEqual(30);
        }
    });

    it('should be able to move down correctly', function() {
        var newSquares = longRectangle.generateSquaresShiftedDown();

        for(var i=0; i<3; i++) {
            expect(newSquares[i].x).toEqual(longRectangle.indivSquares[i].x);
            expect(newSquares[i].y).toEqual(180);
            expect(newSquares[i].length).toEqual(30);
        }
    });
});