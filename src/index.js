import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { ThemeProvider, AuthProvider, VideosProvider, FilterProvider } from './contexts'
import './stylesheet/style.css'

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <VideosProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </VideosProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode >,
  document.getElementById("root")
);
