/* jshint esversion:6 */
/* globals jQuery, console, document, setTimeout */

var Game = (function ($) {

    'use strict';

    var DOM = {},        // populated by cacheDom()

        gameState = {},  // populated by reset()
        
        victories = [    // possible victory square combos
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ],
        
        playerToken,     // populated by setPlayerToken()
        computerToken;


    /* ========================== private methods ========================== */

    // cache DOM elements
    function cacheDom() {
        DOM.$game     = $('#game');
        
        // player token select
        DOM.$pModal   = $(document.createElement('div'));
        DOM.$pButtonX = $(document.createElement('button'));
        DOM.$pButtonO = $(document.createElement('button'));
        
        // victory modal and reset button
        DOM.$vModal   = $(document.createElement('div'));
        DOM.$vButton  = $(document.createElement('button'));
    }


    // bind events
    function bindEvents() {
        DOM.$game.on('click', '.square', squareClickHandler);
        DOM.$game.on('click', '.play-again', resetGame);
        DOM.$game.on('click', '.p-token-btn', setPlayerToken);
    }


    // handle clicks to squares
    function squareClickHandler(e) {
        
        if (gameState.gameOver) { return; }

        // get clicked square's index
        var sqIndex = (e.target.id).slice(2, 3);

        // make sure it's player's turn & space is free
        if (gameState.playerTurn && isAvailable(sqIndex)) {

            // register move in gameState
            gameState.spaces[sqIndex].val = playerToken;
            
            // set board text
            $(e.target).text(playerToken);
            
            // increment turns
            step();

        }
    }
    
    
    // handle player token selection
    function setPlayerToken(e) {
        DOM.$pModal
            .hide();
        
        if (e.target.id === 'playerX') {
            playerToken   = 'X';
            computerToken = 'O';
        } else {
            playerToken   = 'O';
            computerToken = 'X';
        }
    }
    
    
    // check if square avaialble
    function isAvailable(sq) {
        return gameState.spaces[sq].val === null;
    }


    // find remaining available moves
    function availableMoves() {
        return gameState.spaces.filter( s => s.val === null );
    }


    // computer's turn
    function computerTurn(e) {
        
        if (gameState.gameOver) { return; }

        var spaces = availableMoves(),
            pick   = Math.floor(Math.random() * spaces.length),
            square = $('#sq' + spaces[pick].ind);
        
        // set board text
        square.text(computerToken);
        
        // register move in gameState
        gameState.spaces[spaces[pick].ind].val = computerToken;
        
        // increment turns
        step();
    }


    // check for a winner
    function checkIfWinner() {
        
        ['X', 'O'].forEach(function (player) {
            var occupiedSpaces = gameState.spaces
                .filter( space => space.val === player )
                .map(    space => space.ind );
            
            victories.forEach(function (v) {
                var match = v.every( el => occupiedSpaces.indexOf(el) > -1 );
                if (match) {
                    // call victory with specified player
                    victory(player);
                }
            });
        });
    }
    
    
    // handle victory
    function victory(player) {
        gameState.gameOver = true;
        showVictoryModal(player);
    }
    
    
    // build and show victory modal
    function showVictoryModal(player) {
        
        DOM.$vButton
            .addClass('play-again')
            .attr('type', 'button')
            .text('Play Again?');
        
        DOM.$vModal
            .addClass('modal')
            .appendTo(DOM.$game)
            .html(`<p>Player ${player} wins!</p>`)
            .append(DOM.$vButton)
            .show();
    }


    // build the game board
    function makeBoard() {

        var i,
            $board  = $(document.createElement('div')),
            $square = $(document.createElement('div'));

        $square.addClass('square');
        $board.addClass('board');

        // build board from squares
        for (i = 0; i < 9; i += 1) {
            $square.clone()
                .attr('id', 'sq' + i)
                .appendTo($board);
        }

        // append the board to the DOM
        DOM.$game
            .append($board);

    }
    
    
    // clear each square's text
    function clearBoard() {
        $('.square').each(function (ind, el) {
            $(el).text('');
        }); 
    }

    
    // reset game
    function resetGame() {
        
        // erase sqares' text
        clearBoard();

        // hide victory modal
        DOM.$vModal
            .hide();

        // reset game state
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
        };
    }
    
    
    // advance game one turn at a time
    function step() {
        
        checkIfWinner();
        gameState.numberTurns += 1;
        
        // check if it's the computer's turn
        if (gameState.numberTurns % 2 !== 0) {
            
            // computer plays after a slight delay
            setTimeout(function () {
                computerTurn();
            }, 500);
            
        }
        
        // toggle player's turn
        gameState.playerTurn = !gameState.playerTurn;
        
    }
    
    
    // modal for player token select
    function chooseSides() {
        
        var group = $(document.createElement('div'));
        
        DOM.$pButtonX
            .addClass('p-token-btn')
            .attr('id', 'playerX')
            .attr('type', 'button')
            .text('X')
            .appendTo(group);
        
        DOM.$pButtonO
            .addClass('p-token-btn')
            .attr('id', 'playerO')
            .attr('type', 'button')
            .text('O')
            .appendTo(group);
        
        DOM.$pModal
            .addClass('modal')
            .appendTo(DOM.$game)
            .html(`<p>Choose Sides!</p>`)
            .append(group)
            .show();
    }


    /* ========================== public methods =========================== */

    // autoexec on page load
    function init() {

        cacheDom();
        bindEvents();
        makeBoard();
        resetGame();
        chooseSides();

    }


    /* ====================== export  public methods ======================= */

    return {
        init: init
    };

}(jQuery));
