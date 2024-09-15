import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const navigate = useNavigate();

  const createPost = async () => {
    await addDoc(collection(db, 'posts'), {
      title: title,
      contents: contents,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });

    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を投稿する</h1>
        <div className="inputPost">
          <div>Title</div>
          <input
            type="text"
            placeholder="タイトルを記入"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="inputPost">
          <div>Contents</div>
          <textarea
            type="text"
            placeholder="投稿内容を記入"
            onChange={(e) => {
              setContents(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="postButton" onClick={createPost}>
          Let's Post!
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
