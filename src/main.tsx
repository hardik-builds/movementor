import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { GymProvider } from './context/GymContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GymProvider>
      <App />
    </GymProvider>
  </React.StrictMode>,
);
