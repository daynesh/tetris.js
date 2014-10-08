define(function(require, module, exports) {
    
    var _ = require('underscore');
    var GamePieceRandomizer = require('src/js/gamePieceRandomizer');

    function GameEventLoop(canvasManager) {
        this.gamePieceRandomizer = new GamePieceRandomizer();
        this.intervalID = null;
        this.interval = this.getInitialInterval();
        this.canvasManager = canvasManager;

        $('.game-canvas').on('gameover', _.bind(this.gameOver, this));
    } 

    /**
     * This function starts the event loop responsible for
     * periodically advance the active piece in the game
     */
    GameEventLoop.prototype.startEventLoop = function() {
        // Advance piece now
        this.advancePiece();

        // And start timer to advance the current piece periodically
        this.intervalID = window.setInterval(_.bind(this.advancePiece, this), this.interval);
    };

    /**
     * This function advnance the active piece by first checking
     * if we can advance it and then having the CanvasManager advance
     * the piece for us.
     * If we can't advance the piece, then we add a new piece to the
     * canvas using the GamePieceRandomizer.
     */
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

    /**
     * This function stops the event loop
     */
    GameEventLoop.prototype.stopEventLoop = function() {
        if (this.intervalID) {
            window.clearInterval(this.intervalID);
        }
    };

    /**
     * This function is the gameover event handler ensuring
     * that the event loop stops upon detecting that the game
     * is now over
     */
    GameEventLoop.prototype.gameOver = function() {
        console.debug('GameEventLoop.gameover() called');
        this.stopEventLoop();
    };

    /**
     * Returns the initial event loop interval
     */
    GameEventLoop.prototype.getInitialInterval = function() {
        return 2000;
    };

    /**
     * Updates the event loop interval upon updating the game level
     */
    GameEventLoop.prototype.updateInterval = function(newInterval) {
        this.stopEventLoop();
        this.interval = newInterval;
        this.startEventLoop();
    };

    return GameEventLoop;
});