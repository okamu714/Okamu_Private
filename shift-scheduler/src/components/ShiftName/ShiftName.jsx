import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const ShiftName = ({ setName }) => {
  const [makeName, setMakeName] = useState('');
  const [isComposing, setIsComposing] = useState(false); // IMEの入力中かどうかを判定する状態

  // IMEの入力開始
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // IMEの入力確定
  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    setMakeName(e.target.value);
    setName(e.target.value);
  };

  // 通常の入力変更
  const handleChange = (e) => {
    setMakeName(e.target.value);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        誰のシフトを入力しますか？
      </Typography>
      <TextField
        type="text"
        value={makeName}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        sx={{
          width: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default ShiftName;
