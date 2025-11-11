import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { store } from '/src/stores/AppStore';
import { Provider } from 'react-redux';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './components/ErrorFallback';
// import { persistStore } from "redux-persist";
// import { PersistGate } from 'redux-persist/integration/react';
// import { GA_KEY } from '/src/utils/config';
// import { installGA } from './components/Analytics';


// let persistor = persistStore(store)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const logErrorToServer = async (error, info) => {
  // Extract file name, line number, and error message
  let fileName = "Unknown File";
  let lineNumber = "Unknown Line";
  let errorMessage = error.message || "No error message available";

  if (error.stack) {
    const stackLines = error.stack.split("\n");
    
    // Example Stack Trace: "at ComponentName (src/components/App.js:23:10)"
    const relevantLine = stackLines.find(line => line.includes("at ")); 
    
    if (relevantLine) {
      const match = relevantLine.match(/\((.*):(\d+):\d+\)/); // Extract file & line number
      if (match) {
        fileName = match[1];
        lineNumber = match[2];
      }
    }
  }

  // Generate a unique key for this error based on file name
  const errorKey = `${fileName}-${lineNumber}`;

  // Check if the error has already been reported in this session
  const reportedErrors = JSON.parse(sessionStorage.getItem("reportedErrors")) || {};
  if (reportedErrors[errorKey]) {
    console.log("Error already reported for this file & session. Skipping API call.");
    return;
  }

  // Mark the error as reported for this session
  reportedErrors[errorKey] = true;
  sessionStorage.setItem("reportedErrors", JSON.stringify(reportedErrors));

  const error_body = {
    err_body: 
      "🚨 React Error Report 🚨\r\n" +
      "-----------------------------------\r\n" +
      "📂 File: " + fileName + "\r\n" +
      "📍 Line: " + lineNumber + "\r\n" +
      "❌ Error: " + errorMessage + "\r\n" +
      "🛠 Component Stack: " + (info?.componentStack || "No component stack available") + "\r\n" +
      "⏳ Timestamp: " + new Date().toLocaleString() + "\r\n",
  };

  try {
    await fetch(`${process.env.REACT_APP_API_URL}api/v2/sms/send__error_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(error_body),
      // body: JSON.stringify({
      //   error: error.toString(),
      //   errorInfo: info?.componentStack || "No stack trace available",
      //   timestamp: new Date().toISOString(),
      // }),
    });
  } catch (error) {
    console.error("Failed to send error report:", error)
  }
};

// installGA(GA_KEY)
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        {/* <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logErrorToServer}
        > */}
          <App />
        {/* </ErrorBoundary> */}
      {/* </PersistGate> */}
    </Provider>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
