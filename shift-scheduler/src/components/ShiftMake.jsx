import React, { useState } from 'react';
import ShiftName from './ShiftName/ShiftName';
import ShiftMonth from './ShiftMonth/ShiftMonth';
import ShiftDay from './ShiftDay/ShiftDay';
import ShiftTime from './ShiftTime/ShiftTime';
import { Box, Button, Container } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './ShiftMake.css';
import { useNavigate } from 'react-router-dom';

const ShiftMake = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(''); // 名前を空文字で初期化
  const [month, setMonth] = useState(null); // 月をnullで初期化
  const [day, setDay] = useState([]); // 複数の日付を選択するための配列
  const [time, setTime] = useState({
    hour: null,
    minute: null,
    convertedMinute: null,
    workDuration: null,
  });

  const handleNext = async () => {
    try {
      // 日付データを作成
      const dates = {};
      day.forEach((selectedDay) => {
        const monthString = selectedDay > 15 ? `${month - 1}` : `${month}`;
        const formattedDate = `${monthString}/${selectedDay}`; // 日付を月/日形式で作成

        dates[selectedDay] = {
          date: formattedDate, // 日付データ
          time: {
            hour: time.hour,
            minute: time.minute,
            convertedMinute: time.convertedMinute,
            workDuration: time.workDuration,
          },
        };
      });

      // **現在のユーザーを取得**
      const user = auth.currentUser;
      console.log(user);
      if (!user) {
        alert('ユーザーがログインしていません');
        return;
      }

      const shiftData = {
        name, // 名前
        dates, // 整形したdatesオブジェクト
        month, // 月データ
        time, //出勤内容
        createdBy: user.uid,
      };

      // データベースに保存
      await saveShiftData(shiftData);
    } catch (error) {
      console.error('シフトデータの保存中にエラーが発生しました:', error);
    }
  };

  // Firebase Firestoreにデータを保存する関数
  const saveShiftData = async (shiftData) => {
    try {
      // Firebase Firestoreにデータを保存
      await addDoc(collection(db, 'shifts'), shiftData);
      console.log('シフトデータが保存されました:', shiftData);
      alert('シフトデータが保存されました');
      navigate('/ShiftList');
    } catch (error) {
      console.error('シフトデータの保存中にエラーが発生しました:', error);
    }
  };

  return (
    <Container className="ShiftHolidayPage" maxWidth="lg">
      <h2>シフト作成に必要な情報を入力してください</h2>
      <ShiftName setName={setName} />
      <ShiftMonth setMonth={setMonth} />
      <ShiftDay setDay={setDay} />
      <ShiftTime setTime={setTime} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleNext}
        >
          次へ進む
        </Button>
      </Box>
    </Container>
  );
};

export default ShiftMake;
