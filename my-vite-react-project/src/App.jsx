import React, { useState } from 'react';
import Modal from 'react-modal';

// アプリ全体でモーダルを使用するためのルート要素を設定
Modal.setAppElement('#root');

const App = () => {
  // モーダルの開閉状態を管理するステート
  const [modalIsOpen, setIsOpen] = useState(false);

  // モーダルを開く
  const openModal = () => {
    setIsOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1>Hello, Modal!</h1>
      <button onClick={openModal}>モーダルを開く</button>

      {/* モーダルの定義 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal} // モーダル外クリックやエスケープキーで閉じる
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        contentLabel="Example Modal"
      >
        <h2>モーダルの内容</h2>
        <button onClick={closeModal}>閉じる</button>
      </Modal>
    </div>
  );
};

export default App;
