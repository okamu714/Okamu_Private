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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
// import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Firestoreエラーかどうか判定する型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === 'object' && err !== null && 'code' in err;
  }

  // format(currentMonth, 'yyyy-MM');

  // firebaseのデータをすべて取得
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    // firestoreのデータ保存

    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, 'Transactions'), transaction);
      console.log('Document written with ID: ', docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      };
      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);
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

  // 取引を削除する処理
  const handoleDeleteTransaction = async (
    transactionIds: string | string[]
  ) => {
    // firestoreのデータ削除
    try {
      const idsToDelete = Array.isArray(transactionIds)
        ? transactionIds
        : [transactionIds];

      for (const id of idsToDelete) {
        await deleteDoc(doc(db, 'Transactions', id));
      }

      const filteredTransactions = transactions.filter(
        (transaction) => !idsToDelete.includes(transaction.id)
      );
      setTransactions(filteredTransactions);
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
  // console.log(monthlyTransactions);

  // 取引を更新する処理
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    // firestoreのデータ更新
    try {
      const docRef = doc(db, 'Transactions', transactionId);
      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);
      // フロント更新
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      );
      setTransactions(updatedTransactions);
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
                    onSaveTransaction={handleSaveTransaction}
                    onDeleteTransaction={handoleDeleteTransaction}
                    onUpdateTransaction={handleUpdateTransaction}
                  />
                }
              />
              <Route
                path="/report"
                element={
                  <Report
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    monthlyTransactions={monthlyTransactions}
                    isLoading={isLoading}
                    onDeleteTransaction={handoleDeleteTransaction}
                  />
                }
              />
              <Route path="*" element={<NoPages />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
