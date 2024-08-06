import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Password from "./pages/Password";
import UserInfo from "./pages/UserInfo";
import Resign from "./pages/Resign";
import Main from "./pages/Main";
import Group from "./pages/Group";
import MyQList from "./pages/MyQList";
import WriteLetter from "./pages/WriteLetter";
import MailBox from "./pages/Mailbox";
import { useNavigate } from "react-router-dom";


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
<<<<<<< HEAD
        <Route path="/main" element={<Main />}/>
        <Route path="/group" element={<Group />} />
        <Route path="/member/:memberSeq/quizlist" element={<MyQList />} />
        <Route path="/writeletter" element={<WriteLetter />} />
        <Route path="/mailbox" element = {<MailBox />}/>
=======
        <Route path="/group" element={<Gruop />} />
        <Route path="/member/:memberSeq/quizlist" element={<MyQList />} />
>>>>>>> 8eeadc7dd3a9fdaa121a3785907a1cd6cfeff2a2
      </Routes>
    </BrowserRouter>
  );
}

export default App;
