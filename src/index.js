import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { ThemeProvider, SignupProvider, AuthProvider } from './contexts'
import './stylesheet/style.css'

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SignupProvider>

          <App />

        </SignupProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode >,
  document.getElementById("root")
);
