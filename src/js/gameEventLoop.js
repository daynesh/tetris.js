define(function(require, module, exports) {
    
    var _ = require('underscore');
    var GamePieceRandomizer = require('src/js/gamePieceRandomizer');

    function GameEventLoop(canvasManager) {
        this.gamePieceRandomizer = new GamePieceRandomizer();
        this.intervalID = null;
        this.interval = 2000;
        this.canvasManager = canvasManager;

        $('.game-canvas').on('gameover', _.bind(this.gameOver, this));
    } 

    GameEventLoop.prototype.startEventLoop = function() {
        // Advance piece now
        this.advancePiece();

        // And start timer to advance the current piece periodically
        this.intervalID = window.setInterval(_.bind(this.advancePiece, this), this.interval);
    };

    GameEventLoop.prototype.advancePiece = function() {
        // Check if we can advance first
        if (this.canvasManager.canWeAdvance()) {
            this.canvasManager.advanceCurrentPiece();
        }
        else {
            // Generate random piece
            var newPiece = this.gamePieceRandomizer.generate();

            this.canvasManager.addNewPiece(newPiece);
        }

        // Check if we completed a line (or lines)
        this.canvasManager.fuseLinesIfNeeded();
    };

    GameEventLoop.prototype.stopEventLoop = function() {
        if (this.intervalID) {
            window.clearInterval(this.intervalID);
        }
    };

    GameEventLoop.prototype.gameOver = function() {
        console.debug('GameEventLoop.gameover() called');
        this.stopEventLoop();
    };

    return GameEventLoop;
});