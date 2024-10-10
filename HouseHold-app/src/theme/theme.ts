import { PaletteColor, PaletteColorOptions, createTheme } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
  }

  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
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
  },
});
