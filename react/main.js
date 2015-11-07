// main.js
var React = require('react');
var ReactDOM = require('react-dom');

const USER = 'oscardc'; // TODO: multi-user app

function getId(str){return document.getElementById(str);};

function bareRender(){
    ReactDOM.render(<h1>Hello, oscardc!</h1>,
                    getId('title'));
    ReactDOM.render(<p><strong>TODO</strong>: show here a list of users instead of this page, to select which user to load data from.</p>,
                    getId('text'));
};

function loadAllWeights(evt){
    fetch('/' + USER + '/weights/')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
    

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
