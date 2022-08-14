import React from 'react';
import {createRoot} from 'react-dom/client';
//import Router from './components/Router.jsx';
import App from './components/App.jsx';

const root = createRoot(document.getElementById('app'));
root.render(<App />);