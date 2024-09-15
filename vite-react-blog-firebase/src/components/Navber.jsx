import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navber.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faHouse,
  faFilePen,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

const Navber = ({ isAuth }) => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // 下にスクロールした場合、ヘッダーを隠す
        setIsVisible(false);
      } else {
        // 上にスクロールした場合、ヘッダーを表示
        setIsVisible(true);
      }

      lastScrollTop = scrollTop;
    };

    // スクロールイベントの監視を開始
    window.addEventListener('scroll', handleScroll);

    // クリーンアップ処理: コンポーネントがアンマウントされたときにイベントリスナーを解除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 初回レンダリング後にのみ実行するため、空の依存配列を指定

  return (
    <nav className={`header ${isVisible ? '' : 'hidden'}`}>
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} />
        ホーム
      </Link>

      {!isAuth ? (
        <Link to="/login">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          ログイン
        </Link>
      ) : (
        <>
          <Link to="/createpost">
            <FontAwesomeIcon icon={faFilePen} />
            ポスト
          </Link>
          <Link to="/logout">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            ログアウト
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navber;
