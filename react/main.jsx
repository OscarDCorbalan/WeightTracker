'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import WeightsApp from './weights-app';


const USER = 'oscardc'; // TODO: multi-user app

function getId(str){return document.getElementById(str);};

function bareRender(){
    ReactDOM.render(<h1>Hello, oscardc!</h1>,
                    getId('title'));
    ReactDOM.render(<p><strong>TODO</strong>: show here a list of users instead of this page, to select which user to load data from.</p>,
                    getId('text'));
};

function loadAllWeights(evt){
    console.log('loadAllWeights', 'before');
    let arWeights = [
        {date: new Date(2015, 11, 7), weight:66},
        {date: new Date(2015, 11, 6), weight:64},
        {date: new Date(2015, 11, 5), weight:86}
    ];
    ReactDOM.render(<WeightsApp weights={arWeights} />, getId('weightData')); // TODO: multi-user
    console.log('loadAllWeights', 'after');
};

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    bareRender();
    window.removeEventListener('DOMContentLoaded', bareRender);
    getId('btnLoadAllWeights').addEventListener('click', loadAllWeights)
}
else {
    window.addEventListener('DOMContentLoaded', bareRender, false);
}
