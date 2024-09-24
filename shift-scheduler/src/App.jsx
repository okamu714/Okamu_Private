import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import ShiftDay from './components/ShiftDay/ShiftDay';
import Navber from './components/Navber/Navber';
import ShiftTime from './components/ShiftTime/ShiftTime';
import ShiftMonth from './components/ShiftMonth/ShiftMonth';
import ShiftMake from './components/ShiftMake';
import ShiftList from './components/ShiftList/ShiftList';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  return (
    <Router>
      <Navber isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/ShiftMake" element={<ShiftMake />} />
        <Route path="/shiftDay" element={<ShiftDay />} />
        <Route path="/shiftTime" element={<ShiftTime />} />
        <Route path="/shiftMonth" element={<ShiftMonth />} />
        <Route path="/shiftList" element={<ShiftList />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/logout" element={<Logout setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
