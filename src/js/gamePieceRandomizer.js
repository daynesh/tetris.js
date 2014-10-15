define(function(require, module, exports) {

    var BigSquare       = require('src/js/pieces/bigSquare');
    var LongRectangle   = require('src/js/pieces/longRectangle');
    var LPiece          = require('src/js/pieces/lPiece');
    var MiddleFinger    = require('src/js/pieces/middleFinger');
    var ReverseLPiece   = require('src/js/pieces/reverseLPiece');
    var SPiece          = require('src/js/pieces/sPiece');
    var ZPiece          = require('src/js/pieces/zPiece');

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
        //return new BigSquare(30);
        //return new LongRectangle(30);
        //return new LPiece(30);
        return new MiddleFinger(30);
        //return new ReverseLPiece(30);
        //return new SPiece(30);
    };

    return GamePieceRandomizer;
});