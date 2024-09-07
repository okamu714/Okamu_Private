import { useState } from 'react';
import classes from './Post.module.css';

function Post(props) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function onBodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function onAuthorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }
  return (
    <li className={classes.post}>
      <p className={classes.author}>{props.author}</p>
      <p className={classes.text}>{props.body}</p>
    </li>
  );
}

export default Post;
