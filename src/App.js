
import { Signup, Login, Home } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
