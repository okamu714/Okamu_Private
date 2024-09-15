import React, { useState } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import './ShiftHoliday.css';

function ShiftFormPage() {
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
  };

  // 16日〜31日をトグル
  const toggleDaySecondHalf = (index) => {
    const newSelectedDays = [...selectedDaysSecondHalf];
    newSelectedDays[index] = !newSelectedDays[index];
    setSelectedDaysSecondHalf(newSelectedDays);
  };

  return (
    <Container className="ShiftHolidayPage" maxWidth="lg">
      <h2>シフト希望日を選択してください</h2>

      {/* 16日〜31日 */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          marginLeft: '50px',
        }}
      >
        16日〜31日
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
        1日〜15日
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
                backgroundColor: isSelected ? 'primary.main' : 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {index + 1}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ShiftFormPage;
