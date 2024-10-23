import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { Transaction } from '../types';
import { Box, Typography, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface BarChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ monthlyTransactions, isLoading }: BarChartProps) => {
  const theme = useTheme();

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   position: 'top',
      // },
      title: {
        display: true,
        text: '日別収支',
      },
    },
  };

  // 各日の収支データ
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  // 日付用データ
  const dateLabels = Object.keys(dailyBalances).sort();
  // 支出用データ
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense);
  // 収入用データ
  const incomeData = dateLabels.map((day) => dailyBalances[day].income);

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: '支出',
        data: expenseData,
        backgroundColor: theme.palette.expenseColor.light,
      },
      {
        label: '収入',
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <Typography>データがありません</Typography>
      )}
    </Box>
  );
};

export default BarChart;
