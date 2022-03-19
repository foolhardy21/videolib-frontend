import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { NotificationProvider, ThemeProvider, VideosProvider, FilterProvider, HistoryProvider, LikesProvider } from './contexts'
import './stylesheet/style.css'

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <VideosProvider>
          <FilterProvider>
            <HistoryProvider>
              <LikesProvider>
                <App />
              </LikesProvider>
            </HistoryProvider>
          </FilterProvider>
        </VideosProvider>
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
