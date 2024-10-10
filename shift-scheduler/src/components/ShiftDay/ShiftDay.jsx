import React, { useState } from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import './ShiftDay.css';

function ShiftDay({ setDay }) {
  const [selectedDaysFirstHalf, setSelectedDaysFirstHalf] = useState(
    Array(15).fill(false)
  );
  const [selectedDaysSecondHalf, setSelectedDaysSecondHalf] = useState(
    Array(16).fill(false)
  );

  // 1日〜15日をトグル
  const toggleDayFirstHalf = (index) => {
    const newSelectedDays = [...selectedDaysFirstHalf];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDaysFirstHalf(newSelectedDays);
    updateSelectedDays(newSelectedDays, selectedDaysSecondHalf);
  };

  // 16日〜31日をトグル
  const toggleDaySecondHalf = (index) => {
    const newSelectedDays = [...selectedDaysSecondHalf];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDaysSecondHalf(newSelectedDays);
    updateSelectedDays(selectedDaysFirstHalf, newSelectedDays);
  };

  const updateSelectedDays = (firstHalf, secondHalf) => {
    const days = [];
    firstHalf.forEach((isSelected, index) => {
      if (isSelected) days.push(index + 1);
    });
    secondHalf.forEach((isSelected, index) => {
      if (isSelected) days.push(index + 16);
    });
    setDay(days); // 親コンポーネントの状態を更新
  };

  return (
    <Container
      sx={{
        marginTop: 4,
        marginBottom: 6,
        padding: '20px',
        border: '1px solid black',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: 'center',
        }}
      >
        出勤する日程を入力してください
        <br />
        (存在しない日付を選択しないでください 例：2月31日、9月31日など)
      </Typography>
      {/* 16日〜31日 */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          marginLeft: '50px',
        }}
      >
        選択した月の一つ前の月の16日〜31日
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        {selectedDaysSecondHalf.map((isSelected, index) => (
          <Grid item xs={0} key={index}>
            <Box
              onClick={() => toggleDaySecondHalf(index)}
              sx={{
                width: 50,
                height: 50,
                backgroundColor: isSelected ? 'primary.main' : 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {index + 16}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* 1日〜15日 */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          marginLeft: '50px',
        }}
      >
        選択した月の1日〜15日
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {selectedDaysFirstHalf.map((isSelected, index) => (
          <Grid item xs={0} key={index}>
            <Box
              onClick={() => toggleDayFirstHalf(index)}
              sx={{
                width: 50,
                height: 50,
                backgroundColor: isSelected ? '#c6ff00' : 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {index + 1}
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* <ShiftTime /> */}
    </Container>
  );
}

export default ShiftDay;
