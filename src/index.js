import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { ThemeProvider, VideosProvider, FilterProvider, HistoryProvider, LikesProvider, AuthProvider } from './contexts'
import './stylesheet/style.css'

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <VideosProvider>
          <FilterProvider>
            <HistoryProvider>
              <LikesProvider>
                <App />
              </LikesProvider>
            </HistoryProvider>
          </FilterProvider>
        </VideosProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
