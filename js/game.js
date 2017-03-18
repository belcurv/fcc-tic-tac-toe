/* jshint esversion:6 */
/* globals jQuery, document */

var Game = (function ($) {
    
    'use strict';
    
    var DOM = {},
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
        DOM.$game  = $('#game');
    }
    
    // bind events
    function bindEvents() {
        
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

        return $board;
                
    }
    

    // main renderer
    function render() {
        DOM.$game
            .append(makeBoard);
    }
    
    
    /* ========================== public methods =========================== */
    
    // autoexec on page load
    function init () {
        
        cacheDom();
        bindEvents();
        render();
        
    }
    
    
    /* ====================== export  public methods ======================= */
    
    return {
        init: init
    };
    
}(jQuery));
