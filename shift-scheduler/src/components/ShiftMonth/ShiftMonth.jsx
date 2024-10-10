import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

// 月のリスト（日本語表記と英語表記）
const months = [
  { value: 0, label: '1月 (January)' },
  { value: 1, label: '2月 (February)' },
  { value: 2, label: '3月 (March)' },
  { value: 3, label: '4月 (April)' },
  { value: 4, label: '5月 (May)' },
  { value: 5, label: '6月 (June)' },
  { value: 6, label: '7月 (July)' },
  { value: 7, label: '8月 (August)' },
  { value: 8, label: '9月 (September)' },
  { value: 9, label: '10月 (October)' },
  { value: 10, label: '11月 (November)' },
  { value: 11, label: '12月 (December)' },
  { value: -1, label: '---' }, // 選択肢の最後に「---」を追加
];

const ShiftMonth = ({ setMonth }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // 月の変更処理
  const handleMonthChange = (event) => {
    const value = event.target.value;

    // 「---」が選ばれたらプルダウンを閉じる
    if (value === -1) {
      setIsOpen(false);
      setSelectedMonth('');
    } else {
      setSelectedMonth(value);
      setMonth(value + 1);
    }
  };

  // プルダウンを開く/閉じる管理
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // 次の月を取得（12月の場合は1月に戻る）
  const getPreviousMonth = (month) => {
    return (month - 1 + 12) % 12;
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        marginBottom: 6,
        padding: '20px',
        border: '1px solid black',
        height: 'fit-contents',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // 縦方向にコンテンツを揃える
      }}
    >
      <h3>何月度のシフトを作りますか？</h3>
      {/* プルダウンメニューで月を選択 */}
      <FormControl sx={{ width: '300px' }}>
        <InputLabel id="month-select-label">何月度？</InputLabel>
        <Select
          labelId="month-select-label"
          value={selectedMonth}
          label="何月度？"
          onChange={handleMonthChange}
          open={isOpen}
          onOpen={handleOpen}
          onClose={handleClose}
        >
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 選択された月と次の月のシフト期間を表示 */}
      {selectedMonth !== '' && selectedMonth !== -1 && (
        <Box mt={4} mb={4} textAlign="center">
          <Typography variant="h6">
            シフト期間: {months[getPreviousMonth(selectedMonth)].label} 16日 〜{' '}
            {months[selectedMonth].label} 15日
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ShiftMonth;
