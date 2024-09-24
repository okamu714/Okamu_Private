import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  provider.setCustomParameters({
    prompt: 'select_account', // アカウント選択画面を強制的に表示
  });

  const loginInWithGoogle = () => {
    // Googleでログイン
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);

      navigate('/');
    });
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginContainer">
          <p>ログインして始める</p>
          <button onClick={loginInWithGoogle}>Googleでログイン</button>
        </div>
      </div>
    </>
  );
};

export default Login;
