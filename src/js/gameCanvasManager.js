define(function(require, module, exports) {

    var Square = require('src/js/pieces/square');

    function GameCanvasManager() {
        this.$canvas = $('.game-canvas');
        this.context = this.$canvas[0].getContext('2d');
        this.height = this.$canvas.height();
        this.width = this.$canvas.width();
        this.squareLength = 30;
    }

    GameCanvasManager.prototype.initialize = function() {
        // Clear canvas
        this.context.clearRect(0, 0, this.width, this.height);

        // Flag for checking if we've already checked for line completions
        this.checkedForLineCompletion = false;
    };

    /**
     * This function serves as an alias for canWeMovePieceDown
     * intended to be used by modules outside of GameCanvasManager
     */
    GameCanvasManager.prototype.canWeAdvance = function() {
        return this.canWeMovePieceDown();
    };

    /**
     * Returns the currently active piece on the game canvas
     */
    GameCanvasManager.prototype.getCurrentPiece = function() {
        return this.currentPiece;
    };

    /**
     * Function for adding a new piece to the game canvas
     */
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
                that.context.fillRect(square.x+2, square.y+2, square.length-4, square.length-4);
                that.context.strokeRect(square.x+1, square.y+1, square.length-2, square.length-2);
            });
        }
        else {
            // If we can't even add a new piece, then the game is over
            this.$canvas.trigger('gameover');
        }

        // Reset checkedForLineCompletion flag
        this.checkedForLineCompletion = false;
    };

    /**
     * Advances the current piece without checking whether we can actually
     * do so (i.e., assumes canWeAdvance() was previously called)
     *
     * @param {Function} Function to generate a new square to advance to
     *                   (Default function is to generate a square directly below)
     */
    GameCanvasManager.prototype.advanceCurrentPiece = function(generateNewSquare) {
        generateNewSquare = generateNewSquare || Square.generateNewSquareBelow;
        var currentSquares = this.currentPiece.getIndivSquares();
        var that = this;
        var newSquares = [];

        // Define newly positioned squares based on currentSquares
        _.each(currentSquares, function(square) {
            var newSquare = generateNewSquare(square);
            newSquares.push(newSquare);

            // Clear previous square
            that.context.clearRect(square.x, square.y, square.length, square.length);
        });

        // Now paint newly positioned squares
        _.each(newSquares, function(newSquare) {
            that.context.fillStyle = that.currentPiece.getColor();
            that.context.fillRect(newSquare.x+2, newSquare.y+2, newSquare.length-4, newSquare.length-4);
            that.context.strokeRect(newSquare.x+1, newSquare.y+1, newSquare.length-2, newSquare.length-2);
        });

        // Finally, update currentPiece
        this.currentPiece.setIndivSquares(newSquares);
    };

    /**
     * Move current piece left by one position
     */
    GameCanvasManager.prototype.movePieceLeft = function() {
        // If not currently occupied, then go ahead and move piece
        if ( this.canWeMovePieceLeft() ) {
            this.advanceCurrentPiece(Square.generateNewSquareToTheLeft);
        }
    };

    /**
     * Move current piece right by one position
     */
    GameCanvasManager.prototype.movePieceRight = function() {
        // If not currently occupied, then go ahead and move piece
        if ( this.canWeMovePieceRight() ) {
            this.advanceCurrentPiece(Square.generateNewSquareToTheRight);
        }
    };

    /**
     * Move current piece down by one position
     */
    GameCanvasManager.prototype.movePieceDown = function() {
        // Check if next position isn't currently occupied already
        if ( this.canWeMovePieceDown() ) {
            this.advanceCurrentPiece();
        }

        // Now we need to check if we can fuse lines
        this.fuseLinesIfNeeded();
    };

    /**
     * Check whether we can move the currentPiece one position to the left
     */
    GameCanvasManager.prototype.canWeMovePieceLeft = function() {
        // First make sure there is in fact a currentPiece
        if (this.currentPiece) {
            // Check if left position isn't currently occupied already
            var that = this;
            var canMoveLeft = _.every(this.currentPiece.getLeftMostSquares(), function(square) {
                // If we reached the left rail, then
                // we know we can't go any further left
                if (square.x - 10 < 0) {
                    return false;
                }

                // Now ensure that the square to the left is empty (i.e., has a color of white)
                var colorOfNextPosition = that.context.getImageData(square.x-10, square.y+10, 1, 1).data;
                if (_.isEqual(_.pick(colorOfNextPosition, 0, 1, 2), {0:0, 1:0, 2:0})) {
                    return true;
                }
                else {
                    return false;
                }
            });

            return canMoveLeft;
        }
        else {
            return false;
        }
    };

    /**
     * Check whether we can move the currentPiece one position to the right
     */
    GameCanvasManager.prototype.canWeMovePieceRight = function() {
        // First make sure there is in fact a currentPiece
        if (this.currentPiece) {
            // Check if right position isn't currently occupied already
            var that = this;
            var canMoveRight = _.every(this.currentPiece.getRightMostSquares(), function(square) {
                // If we reached the right rail, then
                // we know we can't go any further right
                if (square.x+10 + square.length > that.width) {
                    return false;
                }

                // Now ensure that the square to the right is empty (i.e., has a color of white)
                var colorOfNextPosition = that.context.getImageData(square.x+10 + square.length, square.y+10, 1, 1).data;

                // Every one of these must be white...otherwise, we cannot move right!
                if (_.isEqual(_.pick(colorOfNextPosition, 0, 1, 2), {0:0, 1:0, 2:0})) {
                    return true;
                }
                else {
                    return false;
                }
            });

            return canMoveRight;
        }
        else {
            return false;
        }
    };

    /**
     * Check whether we can move the currentPiece one position down
     */
    GameCanvasManager.prototype.canWeMovePieceDown = function() {
        // First make sure there is in fact a currentPiece
        if (this.currentPiece) {
            // Check if below position isn't currently occupied already
            var that = this;
            var canMoveDown = _.every(this.currentPiece.getBottomMostSquares(), function(square) {
                // If we've reached the bottom of the canvas, then
                // we know we can't go any further down
                if (square.y+10 + square.length > that.height) {
                    return false;
                }

                // Now ensure that the square below is empty (i.e., has a color of white)
                var colorOfNextPosition = that.context.getImageData(square.x+10, square.y+10 + square.length, 1, 1).data;
                if (_.isEqual(_.pick(colorOfNextPosition, 0, 1, 2), {0:0, 1:0, 2:0})) {
                    return true;
                }
                else {
                    return false;
                }
            });

            return canMoveDown;
        }
        else {
            return false;
        }
    };

    GameCanvasManager.prototype.fuseLinesIfNeeded = function() {
        if (!this.canWeMovePieceDown() && !this.checkedForLineCompletion) {
            var beginTime = Date.now();
            // Get left-most squares that make up the current piece
            // and check if each one completes a line
            var that = this;
            var fusedSquares = [];
            _.each(this.currentPiece.getLeftMostSquares(), function(square) {
                // Check if all squares to the left of this one
                // has any empty slots...if so, continue to next
                // left-most square
                var squareToCheck = Square.generateNewSquareToTheLeft(square);
                var foundEmptySpace = false;
                while (squareToCheck.x - 10 > 0) {
                    var colorOfLeftSquare = that.context.getImageData(squareToCheck.x+10, squareToCheck.y+10, 1, 1).data;
                    if (_.isEqual(_.pick(colorOfLeftSquare, 0, 1, 2), {0:0, 1:0, 2:0})) {
                        foundEmptySpace = true;
                        break;
                    }

                    squareToCheck = Square.generateNewSquareToTheLeft(squareToCheck);
                }

                // If we've found an empty space, move on to the next square
                if (foundEmptySpace) {
                    return;
                }

                // Now check all squares to the right
                squareToCheck = Square.generateNewSquareToTheRight(square);
                foundEmptySpace = false;
                while (squareToCheck.x + 10 < that.width) {
                    var colorOfRightSquare = that.context.getImageData(squareToCheck.x+10, squareToCheck.y+10, 1, 1).data;
                    if (_.isEqual(_.pick(colorOfRightSquare, 0, 1, 2), {0:0, 1:0, 2:0})) {
                        foundEmptySpace = true;
                        break;
                    }

                    squareToCheck = Square.generateNewSquareToTheRight(squareToCheck);
                }

                // If we haven't found an empty square then we know we've fused this line
                if (!foundEmptySpace) {
                    fusedSquares.push(square);
                }
            });

            // If we found completed lines
            var numOfCompletedLines = fusedSquares.length;
            if (numOfCompletedLines) {
                var topMostSquare = _.min(fusedSquares, function(square) { return square.y; });

                // Clear lines
                this.context.clearRect(0, topMostSquare.y, this.width, numOfCompletedLines * this.squareLength);

                // Now shift everything down
                var rowsToShiftDown = this.context.getImageData(0, 0, this.width, topMostSquare.y);
                this.context.putImageData(rowsToShiftDown, 0, fusedSquares.length * this.squareLength);

                // Notify anyone interested that numOfCompletedLines have been cleared
                this.$canvas.trigger('linescleared', numOfCompletedLines);
            }

            // Mark as already checked
            this.checkedForLineCompletion = true;

            // Calculate execution time for logging purposes
            var endTime = Date.now();
            console.debug('GameCanvasManager.fusionLinesIfNeeded() - execution time: ', endTime - beginTime, 'ms');
        }
    };

    return GameCanvasManager;
});