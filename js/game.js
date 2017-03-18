/* jshint esversion:6 */
/* globals jQuery, console, document, setTimeout */

var Game = (function ($) {

    'use strict';

    var DOM = {},

        gameState = {
            spaces: [
                { "val": null, "ind": 0 },
                { "val": null, "ind": 1 },
                { "val": null, "ind": 2 },
                { "val": null, "ind": 3 },
                { "val": null, "ind": 4 },
                { "val": null, "ind": 5 },
                { "val": null, "ind": 6 },
                { "val": null, "ind": 7 },
                { "val": null, "ind": 8 }
            ],
            playerTurn: true,
            gameOver: false,
            gameResult: '',
            numberTurns: 0
        },

        victories = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];


    /* ========================== private methods ========================== */

    // cache DOM elements
    function cacheDom() {
        DOM.$game   = $('#game');
        DOM.$logger = $('#logger');
    }


    // bind events
    function bindEvents() {
        DOM.$game.on('click', '.square', squareClickHandler);
    }


    // handle clicks to squares
    function squareClickHandler(e) {

        var sqIndex = (e.target.id).slice(2, 3);

        if (gameState.playerTurn) {

            // players's turn

            // check if clicked square is available
            if (gameState.spaces[sqIndex].val === null) {
                gameState.spaces[sqIndex].val = 'X';
                gameState.playerTurn = false;
                gameState.numberTurns += 1;

                $(e.target).text('X');
                logger(gameState);

            } else {
                logger(`square ${++sqIndex} is not empty`);
            }



        }

        setTimeout(function() {
            computerTurn(e);
        }, 1500);

    }


    // find remaining available moves
    function availableMoves() {
        return gameState.spaces.filter( s => s.val === null );
    }


    // computer's turn
    function computerTurn(e) {

        var spaces = availableMoves(),
            pick   = Math.floor(Math.random() * spaces.length),
            square = $('#sq' + spaces[pick].ind);
        
        gameState.spaces[spaces[pick].ind].val = 'O';
        square.text('O');
        gameState.playerTurn = true;
        gameState.numberTurns += 1;
                
        logger(gameState);
    }


    // log to screen
    function logger(blah) {

        DOM.$logger
            .html(`<pre>${JSON.stringify(blah, null, 2)}</pre>`);

    }


    // build game board
    function makeBoard() {

        var i,
            $board = $(document.createElement('div')),
            $square = $(document.createElement('div'));

        $square.addClass('square');
        $board.addClass('board');

        // build board from squares
        for (i = 0; i < 9; i += 1) {
            $square.clone()
                .attr('id', 'sq' + i)
                .appendTo($board);
        }

        DOM.$game
            .append($board);

    }


    // main renderer
    function render() {}


    /* ========================== public methods =========================== */

    // autoexec on page load
    function init() {

        cacheDom();
        bindEvents();
        makeBoard();

    }


    /* ====================== export  public methods ======================= */

    return {
        init: init
    };

}(jQuery));