import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {Provider} from 'react-redux'
import {store} from './Donor/store.js'
import { Toaster } from 'react-hot-toast';





createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <Toaster position='top-right'/>
      <App />
      
    </Provider>
  </StrictMode>
);
