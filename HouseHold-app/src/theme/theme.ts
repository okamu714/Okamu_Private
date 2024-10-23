import { PaletteColor, PaletteColorOptions, createTheme } from '@mui/material';
import {
  amber,
  blue,
  cyan,
  deepOrange,
  green,
  lightBlue,
  lightGreen,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';
import { ExpenseCategory, IncomeCategory } from '../types';

declare module '@mui/material/styles' {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
    incomeCategoryColor: Record<IncomeCategory, string>;
    expenseCategoryColor: Record<ExpenseCategory, string>;
  }

  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
    incomeCategoryColor?: Record<IncomeCategory, string>;
    expenseCategoryColor?: Record<ExpenseCategory, string>;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
    // 収入用のカラー設定
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },

    // 支出用のカラー設定
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },

    // 残高用のカラー設定
    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
    },

    incomeCategoryColor: {
      給与: lightBlue[600],
      副収入: cyan[200],
      お小遣い: lightGreen['A700'],
    },

    expenseCategoryColor: {
      食費: deepOrange[500],
      日用品: lightGreen[500],
      住宅費: amber[500],
      交際費: pink[300],
      娯楽: cyan[200],
      自己投資: yellow['A200'],
      電子決済: red[400],
      銀行送金: teal[500],
    },
  },
});
