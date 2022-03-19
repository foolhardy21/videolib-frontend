import { Signup, Login, Videos, History, PlayLists } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/history' element={<History />} />
        <Route path='/playlists' element={<PlayLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
