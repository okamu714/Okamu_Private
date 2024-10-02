import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import './Navber.css';

const Navber = ({ isAuth }) => {
  return (
    <nav className="nav-container">
      <Link to="/" className="nav-link">
        <HomeIcon className="nav-icon" />
        <span className="nav-text">Home</span>
      </Link>

      {!isAuth ? (
        <Link to="Login" className="nav-link">
          <EditCalendarIcon className="nav-icon" />
          <span className="nav-text">Login</span>
        </Link>
      ) : (
        <>
          <Link to="ShiftTable" className="nav-link">
            <EditCalendarIcon className="nav-icon" />
            <span className="nav-text">TableCopy</span>
          </Link>

          <Link to="shiftMake" className="nav-link">
            <EditCalendarIcon className="nav-icon" />
            <span className="nav-text">ShiftMake</span>
          </Link>

          <Link to="ShiftList" className="nav-link">
            <EditCalendarIcon className="nav-icon" />
            <span className="nav-text">ShiftList</span>
          </Link>
          <Link to="Logout" className="nav-link">
            <EditCalendarIcon className="nav-icon" />
            <span className="nav-text">Logout</span>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navber;
