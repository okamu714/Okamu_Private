import { Box, Button } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ja } from 'date-fns/locale';

interface MonthSelectorProps {
  currentMonth: Date;
}

const MonthSelector = ({ currentMonth }: MonthSelectorProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button color={'error'} variant="contained">
          先月
        </Button>
        <MobileDatePicker
          label="年月を選択"
          sx={{ mx: 2, background: 'white' }}
          views={['year', 'month']}
          defaultValue={currentMonth}
          format="yyyy/MM"
          slotProps={{
            toolbar: { toolbarFormat: 'yyyy年MM月' },
            calendarHeader: { format: 'yyyy年MM月' },
          }}
        />
        <Button color={'primary'} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
