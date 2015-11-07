// main.js
var React = require('react');
var ReactDOM = require('react-dom');

function run(){
    ReactDOM.render(
        <h1>WOP! (Work In Progress)</h1>,
        document.getElementById('title')
    );
    ReactDOM.render(
        <p>
            Please go to <a href="http://localhost/oscardc/weights/">http://localhost/oscardc/weights/</a>.<br/>
            <strong>TODO</strong>: show here a list of users instead of this stub page.
        </p>,
        document.getElementById('text')
    );
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
    run();
}
else {
    window.addEventListener('DOMContentLoaded', run, false);
}
