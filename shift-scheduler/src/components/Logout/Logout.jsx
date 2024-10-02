import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = ({ setIsAuth }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    // ログアウト
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate('/login');
    });
  };
  // console.log(currentUser);

  return (
    <div className="logoutPage">
      <div className="logoutContainer">
        <h2>{currentUser?.displayName}さん</h2>
        <p>ログアウトしますか？</p>
        <button onClick={logout}>ログアウト</button>
      </div>
    </div>
  );
};

export default Logout;
