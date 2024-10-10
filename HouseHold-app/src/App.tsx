import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NoPages from './pages/NoPages';
import Report from './pages/Report';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { Transaction } from './types/index';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
// import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';

function App() {
  // Firestoreエラーかどうか判定する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === 'object' && err !== null && 'code' in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // format(currentMonth, 'yyyy-MM');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Transactions'));
        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });

        // console.log(transactionsData);
        setTransactions(transactionsData);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error('firestoreのエラー;', err);
          // console.error('firebaseのエラーメッセージ;', err.message);
          // console.error('firebaseのエラーコード;', err.code);
        } else {
          console.error('一般的なエラー:', err);
        }
      }
    };
    fetchTransactions();
  }, []);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // console.log(monthlyTransactions);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Home
                    monthlyTransactions={monthlyTransactions}
                    setCurrentMonth={setCurrentMonth}
                  />
                }
              />
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
