import { Container,} from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.js";
import Home from "./Components/Home/Home.js";
import Auth from "./Components/Auth/Auth.js";

const App = () => {
  return (
    <BrowserRouter>
    <Container minwidth='lg'>
      <Navbar/>
      <Routes>
        <Route path='/' exact element ={<Home/>}></Route>
        <Route path='/auth' element ={<Auth/>}></Route>
      </Routes>
    </Container>
    </BrowserRouter>
  );
};

export default App;
