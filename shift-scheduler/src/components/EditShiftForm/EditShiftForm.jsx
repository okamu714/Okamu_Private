import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase の初期化ファイルをインポート
import { Box, Button, Container, TextField, Grid } from '@mui/material';

const ShiftListEdit = ({ shift, onSave, onCancel }) => {
  const [shiftData, setShiftData] = useState(shift); // シフトデータを保存するステート

  const [editedShiftData, setEditedShiftData] = useState(shift); // 編集されたシフトデータを保存
  const [id, setId] = useState(shift.id);
  const [name, setName] = useState(shift.name);
  const [month, setMonth] = useState(shift.month);
  const [day, setDay] = useState([]);
  const [time, setTime] = useState({
    hour: shift.time.hour,
    minute: shift.time.minute,
    convertedMinute: shift.time.convertedMinute,
    workDuration: shift.time.workDuration,
  });
  const [hour, setHour] = useState(shift.time.hour || '');
  const [minute, setMinute] = useState(shift.time.minute || '');
  const [workDuration, setWorkDuration] = useState(shift.time.workDuration);
  const [convertedMinute, setConvertedMinute] = useState(
    shift.time.convertedMinute
  );

  useEffect(() => {
    const newDays = [];
    for (let i = 0; i < shiftData.dates.length; i++) {
      newDays.push(shiftData.dates[i][0]);
    }
    const sortedDays = newDays.map((num) => Number(num));
    // const sortedDays = newDays.sort((a, b) => Number(a) - Number(b));
    setDay(sortedDays);
  }, []);

  const convertMinuteToLetter = (m) => {
    switch (m) {
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

  useEffect(() => {
    const newCM = convertMinuteToLetter(minute);
    setConvertedMinute(newCM);
  }, [minute]);

  useEffect(() => {
    setTime({
      hour: hour,
      minute: minute,
      convertedMinute: convertedMinute,
      workDuration: workDuration,
    });
  }, [hour, minute, workDuration]);

  // editedShiftData状態が変更された後のログを確認するための useEffect
  useEffect(() => {
    console.log('editedShiftData が更新されました:', editedShiftData);
  }, [editedShiftData]);

  // day状態が変更された後のログを確認するための useEffect
  useEffect(() => {
    console.log('day が更新されました:', day);
  }, [day]);

  useEffect(() => {
    console.log('convertedMinute が更新されました:', convertedMinute);
  }, [convertedMinute]);

  // フォーム入力が変更されたときのハンドラ
  const handleInputChange = async () => {
    try {
      // 日付データを作成
      const dates = {};
      if (Array.isArray(day)) {
        const numbersDayArray = day;
        numbersDayArray.forEach((selectedDay) => {
          const monthString = selectedDay > 15 ? `${month - 1}` : `${month}`;
          const formattedDate = `${monthString}/${selectedDay}`; // 日付を月/日形式で作成

          dates[selectedDay] = {
            date: formattedDate, // 日付データ
            time: {
              hour: hour,
              minute: minute,
              convertedMinute: convertedMinute,
              workDuration: workDuration,
            },
          };
        });
      } else {
        const numbersDayArray = day.match(/\d+/g);
        numbersDayArray.forEach((selectedDay) => {
          const monthString = selectedDay > 15 ? `${month - 1}` : `${month}`;
          const formattedDate = `${monthString}/${selectedDay}`; // 日付を月/日形式で作成

          dates[selectedDay] = {
            date: formattedDate, // 日付データ
            time: {
              hour: hour,
              minute: minute,
              convertedMinute: convertedMinute,
              workDuration: workDuration,
            },
          };
        });
      }

      await setEditedShiftData({
        id,
        name, // 名前
        dates, // 整形したdatesオブジェクト
        month, // 月データ});
        time,
      });
      await handleSaveChanges(dates);
    } catch (error) {
      console.error('シフトデータの保存中にエラーが発生しました:', error);
    }
  };

  // Firestore に更新データを送信する関数
  const handleSaveChanges = async (dates) => {
    if (!editedShiftData) return;

    const docRef = doc(db, 'shifts', id);

    try {
      await updateDoc(docRef, {
        id,
        name, // 名前
        dates, // 整形したdatesオブジェクト
        month, // 月データ});
        time,
      });
      alert('シフトが更新されました');
      onSave();
    } catch (error) {
      console.error('シフトの更新中にエラーが発生しました: ', error);
      alert(`エラー: ${error.message}`);
    }
  };

  // データがまだロードされていない場合の処理
  if (!shiftData) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      component="form"
      maxWidth="lg"
      sx={{
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        marginTop: '80px',
        margin: '80px auto',
      }}
    >
      <Container>
        <h2>シフトリストの編集</h2>

        {/* 名前と月の表示 */}
        <div>
          <h3>
            {shiftData.name} - {shiftData.month}月のシフト
          </h3>
        </div>
        <Grid
          container
          spacing={2}
          maxWidth="lg"
          sx={{ width: '100%', margin: '0 auto' }}
        >
          <Grid item xs={4}>
            <TextField
              label="名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="月"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="日（カンマ区切り）"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        {/* 各日付ごとにシフトを編集するフォーム */}

        <Grid
          container
          spacing={2}
          maxWidth="lg"
          sx={{ width: '100%', margin: '0 auto' }}
        >
          <Grid item xs={4}>
            <TextField
              label="時間"
              value={hour}
              type="number"
              InputProps={{ inputProps: { min: 8, max: 20, step: 1 } }}
              onChange={(e) => setHour(parseInt(e.target.value))}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="分"
              value={minute}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 45, step: 15 } }}
              onChange={(e) => setMinute(parseInt(e.target.value))}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="労働時間"
              value={workDuration}
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8, step: 0.25 } }}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleInputChange}
          >
            変更を保存
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ShiftListEdit;
