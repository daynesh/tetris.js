define(function(require, module, exports) {

    var BigSquare       = require('src/js/pieces/bigSquare');
    var LongRectangle   = require('src/js/pieces/longRectangle');
    var LPiece          = require('src/js/pieces/lPiece');
    var MiddleFinger    = require('src/js/pieces/middleFinger');
    var ReverseLPiece   = require('src/js/pieces/reverseLPiece');
    var SPiece          = require('src/js/pieces/sPiece');
    var ZPiece          = require('src/js/pieces/zPiece');

    function GamePieceRandomizer() {
        this.gamePieceLibrary = [
            BigSquare,
            LongRectangle,
            //LPiece,
            //ZPiece,
            MiddleFinger,
            //SPiece,
            //ReverseLPiece
        ];
    }

    /**
     * Generate a piece at random
     */
    GamePieceRandomizer.prototype.generate = function() {
        var numOfPieces = this.gamePieceLibrary.length;
        var randomIndex = Math.floor(Math.random()*numOfPieces);
        console.debug('Random index: ', randomIndex);
        var GamePiece = this.gamePieceLibrary[randomIndex];

        //return new GamePiece(30);
        return new MiddleFinger(30);
    };

    return GamePieceRandomizer;
});