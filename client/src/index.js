import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextWrapper from './Context/ContextApi';
import App from './App';
import OurContextProvider from './Context/ContextApi';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <OurContextProvider>
      <App />
      </OurContextProvider>
  </React.StrictMode>
);


