import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography, TextField } from '@mui/material';

const ShiftTime = ({ setTime }) => {
  // 時間と分をそれぞれ管理するState
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [workDuration, setWorkDuration] = useState(''); // 労働時間を管理するState

  // 時間のリスト（10時から20時）
  const hours = Array.from({ length: 11 }, (_, i) => i + 10);

  // 分のリスト（00, 15, 30, 45）
  const minutes = [0, 15, 30, 45];

  // Minutesを変換する関数
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

  useEffect(() => {
    setTime({
      hour: selectedHour,
      minute: selectedMinute,
      convertedMinute: convertMinuteToLetter(selectedMinute),
      workDuration: workDuration,
    });
  }, [selectedHour, selectedMinute, workDuration]);

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 6,
        padding: '20px',
        border: '1px solid black',
      }}
    >
      <Typography variant="h4" sx={{ margin: '10px' }}>
        一番多い出勤内容を以下で入力してください
      </Typography>
      {/* 上の列に時間のボタンを並べる */}
      <Grid
        container
        spacing={2}
        sx={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'middle',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginTop: '20px',
          }}
        >
          Hour:
        </Typography>
        {hours.map((hour) => (
          <Grid
            item
            key={hour}
            sx={{
              display: 'inline-flex',
              verticalAlign: 'middle',
            }}
          >
            <Button
              variant={selectedHour === hour ? 'contained' : 'outlined'}
              onClick={() => setSelectedHour(hour)}
            >
              {hour}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* 下の列に分のボタンを並べる */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginTop: '20px',
          }}
        >
          Minutes:
        </Typography>
        {minutes.map((minute) => (
          <Grid item key={minute}>
            <Button
              variant={selectedMinute === minute ? 'contained' : 'outlined'}
              onClick={() => setSelectedMinute(minute)}
            >
              {minute.toString().padStart(2, '0')}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* 労働時間を入力する欄を追加 */}
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          労働時間を入力してください（時間）:
        </Typography>
        <TextField
          type="number"
          value={workDuration}
          onChange={(e) => setWorkDuration(e.target.value)}
          InputProps={{ inputProps: { min: 1, max: 8, step: 0.25 } }} // 15分刻みで入力可能
          sx={{ width: '80px' }}
        />
      </Box>

      {/* 選択された時間と分の表示 */}
      {selectedHour !== null &&
        selectedMinute !== null &&
        workDuration !== '' && (
          <>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: 'flex',
                lineHeight: '50px',
                justifyContent: 'center',
                marginTop: '15px',
              }}
            >
              次の値を一度すべての出勤日に挿入します(後で調整可能)
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: 'flex',
                lineHeight: '50px',
                justifyContent: 'center',
                width: '100px',
                marginTop: '15px',
                border: '1px solid black',
                borderRadius: '10px',
              }}
            >
              {selectedHour}
              {convertMinuteToLetter(selectedMinute)}
              {workDuration}
            </Typography>
          </>
        )}
    </Box>
  );
};

export default ShiftTime;
