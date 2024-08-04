import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Password from "./pages/Password";
import UserInfo from "./pages/UserInfo";
import Resign from "./pages/Resign";
import Gruop from "./pages/Group";
import MyQList from "./pages/MyQList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<Password />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/resign" element={<Resign />} />
        <Route path="/group" element={<Gruop />} />
        <Route path="/qlist" element={<MyQList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
