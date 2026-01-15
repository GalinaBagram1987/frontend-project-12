import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './index.css'
import App from './App.jsx'
import { store } from './store/store.js';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18nIndex.js';

import {  Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; 

// const rollbarConfig = {
//   accessToken: '01835758e5f54ed98756beb10aadff96', // свой
//   captureUncaught: true,
//   captureUnhandledRejections: true,
//   environment: 'development',
//   payload: {
//     client: {
//       javascript: {
//         code_version: '1.0.0'
//       }
//     }
//   }
// };

{/* <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store = {store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode> */}

  // <React.StrictMode>
  //   <I18nextProvider i18n={i18n}>
  //     <Provider store = {store}>
  //       <App />
  //     </Provider>
  //   </I18nextProvider>
  // </React.StrictMode>

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store = {store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode> 
)
