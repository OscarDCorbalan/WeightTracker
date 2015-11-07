// main.js
var React = require('react');
var ReactDOM = require('react-dom');

function run(){
    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('example')
    );
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
}
else {
    window.addEventListener('DOMContentLoaded', run, false);
}
