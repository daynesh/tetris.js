define(function(require, module, exports) {

    var _ = require('underscore');
    var Templates = require('src/js/hbs-templates');
    var GameCanvasManager = require('src/js/gameCanvasManager');
    var GameEventLoop = require('src/js/gameEventLoop');

    function TetrisGameController() {
    }

    TetrisGameController.prototype.initialize = function() {
        // Initialize variables
        this.level = 0;
        this.lines = 0;

        // Render views
        $('.gameplay-container')
            .replaceWith(
                Templates.gamePlayArea()
            );
        $('.game-metrics')
            .replaceWith(
                Templates.gameMetrics({
                    level: this.level,
                    lines: this.lines
                })
            );
        $('.game-controls')
            .replaceWith(
                Templates.gameControls()
            );

        // Attach to events
        $('.newgame')           .on('click', _.bind(this.startNewGame,   this));
        $('.play-pause')        .on('click', _.bind(this.playPauseGame,  this));
        $('.left')              .on('click', _.bind(this.movePieceLeft,  this));
        $('.down')              .on('click', _.bind(this.movePieceDown,  this));
        $('.right')             .on('click', _.bind(this.movePieceRight, this));
        // $('.rotate-left')       .on('click', this.rotatePieceLeft);
        // $('.rotate-right')      .on('click', this.rotatePieceRight);
        $('.game-canvas')       .on('gameover', _.bind(this.onGameOver,  this));

        // Bind keys to certain functions
        $(window).keydown(_.bind(function(e) {
            switch (e.keyCode) {
                case 39: // the right key
                    this.movePieceRight();
                    return false;
                case 37: // the left key
                    this.movePieceLeft();
                    return false;
                case 40: // the down key
                    this.movePieceDown();
                    return false;
            }
            return;
        }, this));

        this.gameCanvasManager = new GameCanvasManager();
        this.gameCanvasManager.initialize();
    };

    TetrisGameController.prototype.startNewGame = function() {
        console.debug('startNewGame() called');

        // Reset everything
        this.initialize();

        this.gameEventLoop = new GameEventLoop(this.gameCanvasManager, this.gameOver);
        this.gameEventLoop.startEventLoop();
    };

    TetrisGameController.prototype.playPauseGame = function(target) {
        var $currentTarget = $(target.currentTarget);
        if ($currentTarget.hasClass('play')) {
            this.continueGame();
        }
        else {
            this.pauseGame();
        }
    };

    /**
     * Continue game that was previously paused by first updating
     * button appearance and then continue Game Event Loop
     */
    TetrisGameController.prototype.continueGame = function(target) {
        console.debug('continueGame() called');

        // Update button selector to .pause
        $('.play-pause').removeClass('play');
        $('.play-pause').addClass('pause');
        $('.play-pause').html('Pause');

        // Now actually restart interval, continue game where we left off
        this.gameEventLoop.startEventLoop();
    };

    /**
     * Pause game by first updating button appearance and then
     * stop the Game Event Loop
     */
    TetrisGameController.prototype.pauseGame = function(target) {
        console.debug('pauseGame() called');

        // Update button selector to .play
        $('.play-pause').removeClass('pause');
        $('.play-pause').addClass('play');
        $('.play-pause').html('Play');

        // Now actually pause Game Event Loop
        this.gameEventLoop.stopEventLoop();
    };

    /**
     * Move piece left by one position on canvas
     */
    TetrisGameController.prototype.movePieceLeft = function() {
        this.gameCanvasManager.movePieceLeft();
    };

    /**
     * Move piece right by one position on canvas
     */
    TetrisGameController.prototype.movePieceRight = function() {
        this.gameCanvasManager.movePieceRight();
    };

    /**
     * Move piece down by one position on canvas
     */
    TetrisGameController.prototype.movePieceDown = function() {
        this.gameCanvasManager.movePieceDown();
    };

    /**
     * Handle gameover event
     */
    TetrisGameController.prototype.onGameOver = function() {
        window.alert('The Game is over!');
    };

    // Attach instantiated object to window
    tetris = new TetrisGameController();
    tetris.initialize();

    exports.TetrisGameController = TetrisGameController;
});
