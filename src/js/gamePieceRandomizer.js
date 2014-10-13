define(function(require, module, exports) {

    var BigSquare       = require('src/js/pieces/bigSquare');
    var ReverseLPiece   = require('src/js/pieces/reverseLPiece');

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
        //return new ReverseLPiece(30);
    };

    return GamePieceRandomizer;
});