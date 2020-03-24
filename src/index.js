import React from 'react';
import ReactDOM from 'react-dom';

import './assets/tailwind/tailwind.css';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { AppProvider } from './context/AppContext';
import App from './components/App/App';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
