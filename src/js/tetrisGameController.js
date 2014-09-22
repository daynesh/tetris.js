define(['jquery', 'underscore'], function($, _) {

    function TetrisGameController() {
        // Then listen to all necessary events
        $('.newgame').on('click', _.bind(this.startNewGame, this));
        $('.play-pause.pause').on('click', this.continueGame);
        $('.play-pause.play').on('click', this.pauseGame);
        // $('.left').on('click', this.movePieceLeft);
        // $('.down').on('click', this.movePieceDown);
        // $('.right').on('click', this.movePieceRight);
        // $('.rotate-left').on('click', this.rotatePieceLeft);
        // $('.rotate-right').on('click', this.rotatePieceRight);
    }

    TetrisGameController.prototype.initialize = function() {
        this.level = 0;
        this.lines = 0;
    };

    TetrisGameController.prototype.startNewGame = function() {
        // First initialize all member variables
        this.initialize();

        // Render views
        //   Tetris.templates.gamePlayArea();
        //   Tetris.templates.gameMetrics();
        //   Tetris.templates.gameControls();
    };

    TetrisGameController.prototype.continueGame = function(target) {

        // Update button selector to .play
        $('.play-pause').removeClass('pause');
        $('.play-pause').addClass('play');
        $('.play-pause').attr('value', 'Pause');

        // Now actually restart interval, continue game where we left off

    };

    TetrisGameController.prototype.pauseGame = function(target) {
        // Update button selector to .pause
        $('.play-pause').removeClass('play');
        $('.play-pause').addClass('pause');
        $('.play-pause').attr('value', 'Play');

        // Now actually restart interval, continue game where we left off

    };

    // Attach instantiated object to window
    window.tetris = new TetrisGameController();
});
