import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Corrected import for App component. The '.tsx' extension is not needed.
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);