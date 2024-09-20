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
  const [name, setName] = useState();
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState([]); // 複数の日付を選択する場合は配列
  const [time, setTime] = useState({
    hour: null,
    minute: null,
    workDuration: null,
  });
  let year = new Date().getFullYear();

  const handleNext = () => {
    const shiftData = {
      name,
      date: `${year}-${month}-${day}`,
      day,
      month,
      time,
    };

    // データをデータベースに保存する関数をここで呼び出す
    // 例えば、Firebase Firestore に保存する
    saveShiftData(shiftData);
  };

  // データベースに保存する関数（例として）
  const saveShiftData = async (shiftData) => {
    try {
      // Firebase Firestore にデータを保存する処理をここに実装
      // 例:
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
