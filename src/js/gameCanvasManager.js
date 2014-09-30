define(function(require, module, exports) {

    var Square = require('src/js/square');

    function GameCanvasManager() {
        this.$canvas = $('.game-canvas');
        this.context = this.$canvas[0].getContext('2d');
    }

    GameCanvasManager.prototype.initialize = function() {
        // Clear canvas
        this.context.clearRect(0,0,300,420);
    };

    GameCanvasManager.prototype.canWeAdvance = function() {
        if (this.currentPiece === undefined) {
            return false;
        }
        else {
            return true;
        }
    };

    GameCanvasManager.prototype.getCurrentPiece = function() {
        return this.currentPiece;
    };

    GameCanvasManager.prototype.addNewPiece = function(newPiece) {
        // First, check if we can add this piece
        var indivSquares = newPiece.getIndivSquares();
        var that = this;

        // Determine whether the next position of each individual
        // piece that makes up the newPiece has a color of white
        var canWeAddNewPiece = _.every(indivSquares, function(square) {
             var colorOfNewPosition = that.context.getImageData(square.x+10, square.y+10 + square.length, 1, 1).data;
             if (_.isEqual(_.pick(colorOfNewPosition, 0, 1, 2), {0:0, 1:0, 2:0})) {
                 return true;
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

            // Check if we need to set currentPiece to undefined
            // indicating that we can no longer move this piece
            var colorOfNextPosition = that.context.getImageData(square.x+10, square.y+10 + square.length, 1, 1).data;
            if (!_.isEqual(_.pick(colorOfNextPosition, 0, 1, 2), {0:0, 1:0, 2:0}) || ((square.y + square.length + 10) > 420)) {
                console.debug('can\'t advance anymore...colorOfNextPosition: ', colorOfNextPosition);
                this.currentPiece = undefined;
            }
        });

        // Now paint newly positioned squares
        _.each(newSquares, function(newSquare) {
            that.context.fillRect(newSquare.x, newSquare.y, newSquare.length, newSquare.length);
        });

        // Update currentPiece
        if (this.currentPiece !== undefined) {
            this.currentPiece.setIndivSquares(newSquares);
        }

        console.debug('advanceCurrentPiece() - Finished moving currentPiece');
    };

    return GameCanvasManager;
});