define(function(require, module, exports) {

    var BigSquare = require('src/js/bigSquare');

    var gamePieceLibrary = [
            bigSquare,
            longRectangle,
            sPiece,
            zPiece,
            middleFinger,
            lPiece,
            reverseLPiece
    ];

    function GamePieceRandomizer() {

    }

    GamePieceRandomizer.prototype.generate = function() {
        return new BigSquare(30);
    };

    return GamePieceRandomizer;
});