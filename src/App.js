import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup, Login, Videos, History, Playlists } from "pages";
import { SignupProvider, LoginProvider, useAuth } from 'contexts'
import { ROUTE_HISTORY, ROUTE_LOGIN, ROUTE_PLAYLISTS, ROUTE_SIGNUP, ROUTE_VIDEOS } from "utils/constants.util";

const App = () => {
  const { RequireAuth } = useAuth()

  return (

    /* All the routes in the app */

    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_SIGNUP} element={
          <SignupProvider>
            <Signup />
          </SignupProvider>
        } />
        <Route path={ROUTE_LOGIN} element={
          <LoginProvider>
            <Login />
          </LoginProvider>} />
        <Route path={ROUTE_VIDEOS} element={<Videos />} />
        <Route path={ROUTE_HISTORY} element={
          <RequireAuth>
            <History />
          </RequireAuth>
        } />
        <Route path={ROUTE_PLAYLISTS} element={
          <RequireAuth>
            <Playlists />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
