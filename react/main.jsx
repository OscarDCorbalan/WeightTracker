'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import WeightsApp from './weights-app';

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
            k++;
        }
        return false;
    };
}

const HARDCODED_USER = 'oscardc'; // TODO: multi-user app
const LOADED_STATES = ['complete', 'loaded', 'interactive'];

function getId(str){return document.getElementById(str);};

function onLoadedHandler(evt /* param not used */ ){
    // Clean the listener if it was added
    window.removeEventListener('DOMContentLoaded', onLoadedHandler);

    // Render the title with the user name
    ReactDOM.render(<h1>Hello, {HARDCODED_USER}!</h1>, getId('title'));

    // Add a listener for the button to load the user's weights
    getId('btnLoadAllWeights').addEventListener('click', loadAllWeights);
};

// TODO: use a dynamic user to load the weights
function loadAllWeights(evt){
    // Cleanup the button...
    let btn = evt.target;
    btn.removeEventListener('click', loadAllWeights)
    btn.parentElement.removeChild( btn );

    // ... and render
    ReactDOM.render(<WeightsApp />, getId('weightData'));
    ReactDOM.render(<h1>These are your weight records, {HARDCODED_USER}</h1>, getId('title'));
};


// Start the app if everything is loaded, if not just add a listener since we're using async script loading in the browser
if (LOADED_STATES.includes(document.readyState) && document.body) {
    onLoadedHandler();
}
else {
    window.addEventListener('DOMContentLoaded', onLoadedHandler, false);
}
