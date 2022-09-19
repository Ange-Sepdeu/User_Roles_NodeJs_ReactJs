import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./Login";
import Admin from "./Admin";
import Register from "./Register";
import Edit from "./Edit";

function App() {
  return (
    <>
      <Router>
        <ToastContainer position='top-center' />
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="/edit/:adminId/:id" element={<Edit />} />
        </Routes>
      </Router>
   </>
  );
}

export default App;
