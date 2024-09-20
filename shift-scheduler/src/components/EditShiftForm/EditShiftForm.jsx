import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditShiftForm = ({ shift, onSave, onCancel }) => {
  // 編集用のステートを定義
  const [name, setName] = useState(shift.name || '');
  const [month, setMonth] = useState(shift.month || '');
  const [day, setDay] = useState(shift.day || []);
  const [hour, setHour] = useState(shift.time.hour || '');
  const [minute, setMinute] = useState(shift.time.minute || '');
  const [workDuration, setWorkDuration] = useState(
    shift.time.workDuration || ''
  );

  // 分を文字（A, B, C, D）に変換する関数
  const convertMinuteToLetter = (minute) => {
    switch (minute) {
      case 0:
        return 'A';
      case 15:
        return 'B';
      case 30:
        return 'C';
      case 45:
        return 'D';
      default:
        return '';
    }
  };

  // フォームの送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 更新するシフトデータを作成
    const updatedShift = {
      ...shift,
      name,
      month,
      day,
      time: {
        hour,
        minute,
        convertedMinute: convertMinuteToLetter(minute),
        workDuration,
      },
    };

    try {
      // Firestore のドキュメントを更新
      const shiftRef = doc(db, 'shifts', shift.id);
      await updateDoc(shiftRef, updatedShift);
      alert('シフトが更新されました');
      // 保存後の処理を呼び出す
      onSave();
    } catch (error) {
      console.error('シフトの更新中にエラーが発生しました:', error);
      alert('シフトの更新中にエラーが発生しました');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        margin: '0 auto',
        width: '90%',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        marginTop: '80px',
      }}
    >
      <Typography variant="h6" gutterBottom>
        シフトの編集
      </Typography>
      <Grid container spacing={2}>
        {/* 名前の入力 */}
        <Grid item xs={4}>
          <TextField
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* 月の入力 */}
        <Grid item xs={4}>
          <TextField
            label="月"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>

        {/* 日の入力 */}
        <Grid item xs={4}>
          <TextField
            label="日（カンマ区切り）"
            value={day.join(', ')}
            onChange={(e) =>
              setDay(e.target.value.split(',').map((d) => d.trim()))
            }
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      {/* 時間の入力 */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="時間（時）"
            type="number"
            value={hour}
            onChange={(e) => setHour(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 8, max: 20, step: 1 } }}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="時間（分）"
            type="number"
            value={minute}
            onChange={(e) => setMinute(parseInt(e.target.value))}
            InputProps={{ inputProps: { min: 0, max: 45, step: 15 } }}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="労働時間"
            type="number"
            value={workDuration}
            onChange={(e) => setWorkDuration(parseFloat(e.target.value))}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      {/* ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="outlined" onClick={onCancel} sx={{ marginRight: 1 }}>
          キャンセル
        </Button>
        <Button variant="contained" color="primary" type="submit">
          保存
        </Button>
      </Box>
    </Box>
  );
};

export default EditShiftForm;
