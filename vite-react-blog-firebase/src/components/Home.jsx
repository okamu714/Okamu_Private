import React from 'react';

const Home = () => {
  return (
    <div className="homePage">
      <div className="postContents">
        <div className="postHeader">
          <h1>title</h1>
        </div>
        <div className="postTextContainer">
          今はReactの学習中です。就活も頑張ります。
        </div>
        <div className="nameAndDeleteButton">
          <h3>@Ryohei</h3>
          <button>削除</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
