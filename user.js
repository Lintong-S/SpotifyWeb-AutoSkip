// ==UserScript==
// @name         Spotify Wrapped Farming
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically skip songs on Spotify Web Player after a random interval between 75 to 90 seconds, then repeat.
// @author       L
// @match        https://open.spotify.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function doSkip() {
        // Spotify "Next" button usually has aria-label="Next"
        var button = document.querySelector('button[aria-label="Next"]');
        if(button) {
            button.click();
            console.log('Skipped song at', new Date().toLocaleTimeString());
        } else {
            console.log('Next button not found');
        }
    }

    (function loop() {
        var rand = getRandomInt(75000, 90000);
        console.log('Next skip in (ms):', rand);
        setTimeout(function() {
            doSkip();
            loop();
        }, rand);
    }());

})();
