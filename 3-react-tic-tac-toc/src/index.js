import React from 'react';
import ReactDOM from 'react-dom';

import Game from 'components/Game.js';

import './index.css'

window.onload = function () {
    ReactDOM.render(
        <Game />,
        document.getElementById('root')
    );
};


