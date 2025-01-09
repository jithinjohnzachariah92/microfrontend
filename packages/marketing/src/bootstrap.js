import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
// Mount function to start app
const mount = (el) => {
    ReactDOM.render(
        <div><App /></div>,
        el
    );
}

// If we are in dev and in isolattion call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');
    if (devRoot) {
        mount(devRoot);
    }
}

// we are running through container and export mount function
export { mount };