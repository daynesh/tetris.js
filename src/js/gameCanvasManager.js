define(function(require, module, exports) {

    var Square = require('src/js/square');

    function GameCanvasManager() {
        this.$canvas = $('.game-canvas');
        this.context = this.$canvas[0].getContext('2d');
        this.height = this.$canvas.height();
        this.width = this.$canvas.width();
    }

    GameCanvasManager.prototype.initialize = function() {
        // Clear canvas
        this.context.clearRect(0, 0, this.width, this.height);
    };

    /**
     * This function returns whether the piece (passed as a parameter)
     * can be advanced to the next position (directly below its current
     * position)
     */
    GameCanvasManager.prototype.canWeAdvancePiece = function(piece) {
        var squaresToCheck = piece.getSquaresForAdvanceChecking();
        var that = this;
        return _.every(piece.getSquaresForAdvanceChecking(), function(square) {
                // If we've reached the bottom of the canvas...
                if (square.y+10 + square.length > that.height) {
                    return false;
                }

                var colorOfNextPosition = that.context.getImageData(square.x+10, square.y+10 + square.length, 1, 1).data;

                // Every one of these must be white...otherwise, we cannot advance this piece!
                if (_.isEqual(_.pick(colorOfNextPosition, 0, 1, 2), {0:0, 1:0, 2:0})) {
                    return true;
                }
                else {
                    return false;
                }
            });
    };

    GameCanvasManager.prototype.getCurrentPiece = function() {
        return this.currentPiece;
    };

    GameCanvasManager.prototype.addNewPiece = function(newPiece) {
        // First, check if we can add this piece
        var indivSquares = newPiece.getIndivSquares();
        var that = this;

        // First, determine whether the position for this newPiece
        // is not currently occupied by another piece (i.e., make sure
        // it each square has the color white)
        var canWeAddNewPiece = _.every(indivSquares, function(square) {
             var colorOfNewPosition = that.context.getImageData(square.x+10, square.y+10, 1, 1).data;
             if (_.isEqual(_.pick(colorOfNewPosition, 0, 1, 2), {0:0, 1:0, 2:0})) {
                 return true;
             }
             else {
                return false;
             }
        });

        if (canWeAddNewPiece) {
            console.debug('GameCanvasManager.addNewPiece() - adding new piece');
            this.currentPiece = newPiece;

            // Now paint the piece on the canvas
            this.context.fillStyle = this.currentPiece.getColor();
            _.each(indivSquares, function(square) {
                that.context.fillRect(square.x, square.y, square.length, square.length);
            });
        }
        else {
            // If we can't even add a new piece, then the game is over
            this.$canvas.trigger('gameover');
        }
    };

    /**
     * Assumes that we already know that we can advance for certain
     * (i.e., canWeAdvance() was previously called)
     */
    GameCanvasManager.prototype.advanceCurrentPiece = function() {
        var currentSquares = this.currentPiece.getIndivSquares();
        var that = this;
        var newSquares = [];

        // Define newly positioned squares based on currentSquares
        _.each(currentSquares, function(square) {
            var newSquare = new Square(square.x, square.y + square.length, square.length);
            newSquares.push(newSquare);

            // Clear previous square
            that.context.clearRect(square.x, square.y, square.length, square.length);
        });

        // Now paint newly positioned squares
        _.each(newSquares, function(newSquare) {
            that.context.fillRect(newSquare.x, newSquare.y, newSquare.length, newSquare.length);
        });

        // Finally, update currentPiece
        this.currentPiece.setIndivSquares(newSquares);
    };

    return GameCanvasManager;
});