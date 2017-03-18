/* jshint esversion:6 */
/* globals jQuery */

(function ($) {
    
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
        DOM.$game = $('#game');
    }
    
    // bind events
    function bindEvents() {
        
    }
    
    // main renderer
    function render() {
        DOM.$game
            .append(`<pre>${JSON.stringify(victories, null, 2)}</pre>`);
    }
    
    
    
    /* ========================== public methods =========================== */
    
    // autoexec on page load
    (function init () {
        
        cacheDom();
        bindEvents();
        render();
        
    }());
    
}(jQuery));