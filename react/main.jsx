'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import WeightsApp from './weights-app';

const LOADED_STATES = ['complete', 'loaded', 'interactive'];

function getId(str){return document.getElementById(str);}
function removeNode(node){node.parentElement.removeChild(node);}
function removeNodeById(id){removeNode(getId(id));}

function onLoadedHandler(evt /* param not used */ ){
    // Clean the listener if it was added
    window.removeEventListener('DOMContentLoaded', onLoadedHandler);

    // Render the title with the user name
    ReactDOM.render(<h1>Hello!</h1>, getId('title'));

    // Add a listener for the button to load the user's weights
    getId('btnLoadAllWeights').addEventListener('click', loadAllWeights);
};

// TODO: use a dynamic user to load the weights
function loadAllWeights(evt){
    // Cleanup the button...
    let btn = evt.target;
    btn.removeEventListener('click', loadAllWeights);

    let user = getId('iTxtUser').value;
    removeNodeById('frmUsername');

    // ... and render
    ReactDOM.render(<WeightsApp user={user} />, getId('weightData'));
    ReactDOM.render(<h1>Welcome, {user}</h1>, getId('title'));
};


// Start the app if everything is loaded, if not just add a listener since we're using async script loading in the browser
if (LOADED_STATES.includes(document.readyState) && document.body) {
    onLoadedHandler();
}
else {
    window.addEventListener('DOMContentLoaded', onLoadedHandler, false);
}
