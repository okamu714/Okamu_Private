import { signOut } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const logout = () => {
    // ログアウト
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate('/login');
    });
  };

  return (
    <div className="logoutPage">
      <div className="logoutContainer">
        <p>ログアウトしますか？</p>
        <button onClick={logout}>ログアウト</button>
      </div>
    </div>
  );
};

export default Logout;
