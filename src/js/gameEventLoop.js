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

        // Now start timer
        this.intervalID = window.setInterval(_.bind(this.advancePiece, this), this.interval);
    };

    GameEventLoop.prototype.advancePiece = function() {
        var currentPiece = this.canvasManager.getCurrentPiece();

        // If there is a currentPiece and we can advance it,
        //  then what are you waiting for!
        if (currentPiece && this.canvasManager.canWeAdvancePiece(currentPiece)) {
            this.canvasManager.advanceCurrentPiece();
        }
        else {
            // Generate random piece
            var newPiece = this.gamePieceRandomizer.generate();

            this.canvasManager.addNewPiece(newPiece);
        }

        // Check if we completed a line (or lines)
        //this.canvasManager.
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