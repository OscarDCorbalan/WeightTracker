'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import WeightsApp from './weights-app';


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
};


// Start the app if everything is loaded, if not just add a listener since we're using async script loading in the browser
if (LOADED_STATES.includes(document.readyState) && document.body) {
    onLoadedHandler();
}
else {
    window.addEventListener('DOMContentLoaded', onLoadedHandler, false);
}
