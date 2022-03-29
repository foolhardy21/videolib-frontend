import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider, ThemeProvider, VideosProvider, FilterProvider, HistoryProvider, LikesProvider, PlaylistsProvider } from './contexts'
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
                <PlaylistsProvider>
                  <App />
                </PlaylistsProvider>
              </LikesProvider>
            </HistoryProvider>
          </FilterProvider>
        </VideosProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
