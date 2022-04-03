import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { makeServer } from "server";
import { AuthProvider, ThemeProvider, VideosProvider, FilterProvider, HistoryProvider, LikesProvider, PlaylistsProvider, WatchlaterProvider } from 'contexts'
import 'stylesheet/style.css'

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <VideosProvider>
          <FilterProvider>
            <HistoryProvider>
              <PlaylistsProvider>
                <LikesProvider>
                  <WatchlaterProvider>
                    <App />
                  </WatchlaterProvider>
                </LikesProvider>
              </PlaylistsProvider>
            </HistoryProvider>
          </FilterProvider>
        </VideosProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
