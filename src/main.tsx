import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
// CSS vinculado ao bundle Vite para evitar telas sem estilo após deploy/cache.
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import '../assets/css/animations.css';
import '../assets/css/landing.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
