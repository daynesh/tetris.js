define(function(require, module, exports) {

    var _ = require('underscore');
    var Templates = require('src/js/hbs-templates');

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
        $('.newgame')           .on('click', _.bind(this.startNewGame, this));
        $('.play-pause.pause')  .on('click', this.continueGame);
        $('.play-pause.play')   .on('click', this.pauseGame);
        // $('.left')              .on('click', this.movePieceLeft);
        // $('.down')              .on('click', this.movePieceDown);
        // $('.right')             .on('click', this.movePieceRight);
        // $('.rotate-left')       .on('click', this.rotatePieceLeft);
        // $('.rotate-right')      .on('click', this.rotatePieceRight);
    };

    TetrisGameController.prototype.startNewGame = function() {
        console.debug('startNewGame() called');

        // Reset everything
        this.initialize();
    };

    TetrisGameController.prototype.continueGame = function(target) {
        console.debug('continueGame() called');

        // Update button selector to .play
        $('.play-pause').removeClass('pause');
        $('.play-pause').addClass('play');
        $('.play-pause').attr('value', 'Pause');

        // Now actually restart interval, continue game where we left off

    };

    TetrisGameController.prototype.pauseGame = function(target) {
        console.debug('pauseGame() called');

        // Update button selector to .pause
        $('.play-pause').removeClass('play');
        $('.play-pause').addClass('pause');
        $('.play-pause').attr('value', 'Play');

        // Now actually restart interval, continue game where we left off

    };

    // Attach instantiated object to window
    tetris = new TetrisGameController();
    tetris.initialize();

    exports.TetrisGameController = TetrisGameController;
});
