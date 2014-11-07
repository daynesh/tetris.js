describe('Game Canvas Manager', function() {
    
    var GameCanvasManager = require('src/js/gameCanvasManager');
    var LongRectangle     = require('src/js/pieces/longRectangle');
    var Square            = require('src/js/pieces/square');

    var canvasManager;

    beforeEach(function() {
        canvasManager = new GameCanvasManager();

        var longRectangle = new LongRectangle(30);
        longRectangle.setIndivSquares([
            new Square(90,  150, 30),
            new Square(120, 150, 30),
            new Square(150, 150, 30),
            new Square(180, 150, 30),
        ]);

        // Initialize canvas
        canvasManager.currentPiece = longRectangle;
        canvasManager.context = document.createElement('canvas').getContext('2d');
        canvasManager.height = 420;
        canvasManager.width = 300;
    });

    it('should rotate right correctly', function() {
        // Now rotate piece
        canvasManager.rotatePieceRight();

        // Prepare for check
        var sortedSquares = _.sortBy(canvasManager.currentPiece.getIndivSquares(), function(square) {
            return square.y;
        });

        var expectedSquares = [
            {x: 120, y: 120}, 
            {x: 120, y: 150}, 
            {x: 120, y: 180}, 
            {x: 120, y: 210}
        ]; 

        for (var i=0; i<3; i++) {
            expect(sortedSquares[i].x).toEqual(expectedSquares[i].x);
            expect(sortedSquares[i].y).toEqual(expectedSquares[i].y);
        }
    });

    it('should rotate left correctly', function() {
        // Now rotate piece
        canvasManager.rotatePieceLeft();

        // Prepare for check
        var sortedSquares = _.sortBy(canvasManager.currentPiece.getIndivSquares(), function(square) {
            return square.y;
        });

        var expectedSquares = [
            {x: 120, y: 90}, 
            {x: 120, y: 120}, 
            {x: 120, y: 150}, 
            {x: 120, y: 180}
        ]; 

        for (var i=0; i<3; i++) {
            expect(sortedSquares[i].x).toEqual(expectedSquares[i].x);
            expect(sortedSquares[i].y).toEqual(expectedSquares[i].y);
        }
    });
});