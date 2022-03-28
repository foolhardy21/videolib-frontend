import { Signup } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <Signup />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/signup' element={<Signup />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
