import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhoneSignin from "./PhoneSignin";
import app from "./firebaseConfig";
import { Login } from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/phoneSignin" element={<PhoneSignin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
