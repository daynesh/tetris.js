define(function(require, module, exports) {

    var BigSquare       = require('src/js/pieces/bigSquare');
    var LongRectangle   = require('src/js/pieces/longRectangle');
    var LPiece          = require('src/js/pieces/lPiece');
    var MiddleFinger    = require('src/js/pieces/middleFinger');
    var ReverseLPiece   = require('src/js/pieces/reverseLPiece');
    var SPiece          = require('src/js/pieces/sPiece');
    var ZPiece          = require('src/js/pieces/zPiece');

    function GamePieceRandomizer() {
        this.gamePieceLibrary = {
            'img/bigSquare.png'     : BigSquare,
            'img/longRectangle.png' : LongRectangle,
            'img/lPiece.png'        : LPiece,
            'img/zPiece.png'        : ZPiece,
            'img/middleFinger.png'  : MiddleFinger,
            'img/sPiece.png'        : SPiece,
            'img/reverseLPiece.png' : ReverseLPiece
        };

        this.nextPieceUrl = null;
    }

    /**
     * Generate a piece at random
     */
    GamePieceRandomizer.prototype.generate = function() {
        var randomIndex = null;
        var pieceToReturn = null;
        var numOfPieces = _.keys(this.gamePieceLibrary).length;

        // Check if next piece hasn't been generated yet
        if (_.isNull(this.nextPieceUrl)) {
            randomIndex = Math.floor(Math.random()*numOfPieces);
            var GamePiece = _.values(this.gamePieceLibrary)[randomIndex];

            pieceToReturn = new GamePiece(30);
        }
        else {
            pieceToReturn = new this.gamePieceLibrary[this.nextPieceUrl](30);
        }

        // Now generate new next-piece
        randomIndex = Math.floor(Math.random()*numOfPieces);
        this.nextPieceUrl = _.keys(this.gamePieceLibrary)[randomIndex];

        return pieceToReturn;
    };

    /**
     * Access the next piece
     */
    GamePieceRandomizer.prototype.getNextPieceUrl = function() {
        return this.nextPieceUrl;
    };

    return GamePieceRandomizer;
});