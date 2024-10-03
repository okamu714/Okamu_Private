import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NoPages from './pages/NoPages';
import Report from './pages/Report';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/report" element={<Report />} />
              <Route path="*" element={<NoPages />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
