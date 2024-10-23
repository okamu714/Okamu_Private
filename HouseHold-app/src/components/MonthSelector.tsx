import { Box, Button } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addMonths } from 'date-fns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ja } from 'date-fns/locale';

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  // DatePickerで日付を選択した時の処理
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };

  // 先月ボタンを押した時の処理
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    setCurrentMonth(previousMonth);
  };

  // 次月ボタンを押した時の処理
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, +1);
    setCurrentMonth(nextMonth);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button
          onClick={handlePreviousMonth}
          color={'error'}
          variant="contained"
        >
          先月
        </Button>
        <MobileDatePicker
          onChange={handleDateChange}
          label="年月を選択"
          sx={{ mx: 2, background: 'white' }}
          views={['year', 'month']}
          value={currentMonth}
          format="yyyy/MM"
          slotProps={{
            toolbar: { toolbarFormat: 'yyyy年MM月' },
            calendarHeader: { format: 'yyyy年MM月' },
          }}
        />
        <Button onClick={handleNextMonth} color={'primary'} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
