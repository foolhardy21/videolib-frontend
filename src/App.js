import { Signup, Login, Videos, History, PlayLists } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup, Login, Videos, History } from "./pages";
import { SignupProvider, LoginProvider } from './contexts'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={
          <SignupProvider>
            <Signup />
          </SignupProvider>
        } />
        <Route path='/login' element={
          <LoginProvider>
            <Login />
          </LoginProvider>} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/history' element={<History />} />
        <Route path='/playlists' element={<PlayLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
