import { Signup, Login, Videos } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/videos' element={<Videos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
