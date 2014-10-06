define(function(require, module, exports) {

    var _ = require('underscore');
    var Templates = require('src/js/hbs-templates');
    var GameCanvasManager = require('src/js/gameCanvasManager');
    var GameEventLoop = require('src/js/gameEventLoop');

    function TetrisGameController() {
    }

    /**
     * Initialize the GameController:
     *  - initialize variables
     *  - render views
     *  - attach to events
     *  - initialize canvas
     */
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
        this.attachToEvents();

        // Initialize the canvas
        this.gameCanvasManager = new GameCanvasManager();
        this.gameCanvasManager.initialize();
    };

    /**
     * Attach to all relevant events
     */
    TetrisGameController.prototype.attachToEvents = function() {
        // Button events
        $('.newgame')           .on('click', _.bind(this.startNewGame,   this));
        $('.play-pause')        .on('click', _.bind(this.playPauseGame,  this));
        $('.left')              .on('click', _.bind(this.movePieceLeft,  this));
        $('.down')              .on('click', _.bind(this.movePieceDown,  this));
        $('.right')             .on('click', _.bind(this.movePieceRight, this));
        // $('.rotate-left')       .on('click', this.rotatePieceLeft);
        // $('.rotate-right')      .on('click', this.rotatePieceRight);

        // Bind keys to certain functions
        $(window).off('keydown');
        $(window).on('keydown', _.bind(function(e) {
            switch (e.which) {
                case 39: // the right key
                    this.movePieceRight();
                    break;
                case 37: // the left key
                    this.movePieceLeft();
                    break;
                case 40: // the down key
                    this.movePieceDown();
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }, this));

        // Custom events
        $('.game-canvas')       .on('gameover',     _.bind(this.onGameOver,     this));
        $('.game-canvas')       .on('linescleared', _.bind(this.onLinesCleared, this));
    };

    /**
     * Start a new game, initializing the GameController
     * as well as starting the main event loop
     */
    TetrisGameController.prototype.startNewGame = function() {
        console.debug('startNewGame() called');

        // Reset everything
        this.initialize();

        this.gameEventLoop = new GameEventLoop(this.gameCanvasManager, this.gameOver);
        this.gameEventLoop.startEventLoop();
    };

    /**
     * Handle the clicking of the Play or Pause button
     */
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

    /**
     * Lines have been cleared on the canvas
     * @param {number} Number of lines that were cleared from the canvas
     */
    TetrisGameController.prototype.onLinesCleared = function(event, numOfLinesCleared) {
        if (numOfLinesCleared) {
            // Update Lines shown in the gameMetrics view
            this.lines += numOfLinesCleared;
            $('.game-metrics .lines').html(this.lines);

            // Now check if we need to update the Level as well
            var calculatedLevel = Math.floor(this.lines / 10);
            if (this.level != calculatedLevel) {
                this.level = calculatedLevel;
                $('.game-metrics .level').html(this.level);
            }
        }
    };

    // Attach instantiated object to window
    tetris = new TetrisGameController();
    tetris.initialize();

    exports.TetrisGameController = TetrisGameController;
});
