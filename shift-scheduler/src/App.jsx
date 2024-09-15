import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import ShiftHoliday from './components/ShiftHoliday/ShiftHoliday';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shiftHoliday" element={<ShiftHoliday />} />
      </Routes>
    </Router>
  );
}

export default App;
