import React, { useState, useEffect } from 'react';
import './ShiftTable.css'; // カスタムスタイルを適用
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase設定ファイルをインポート
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// 16日〜31日の列を先に定義
const lateMonthColumns = Array.from({ length: 16 }, (_, i) => ({
  key: `day-${i + 16}`,
  name: `${i + 16}日`,
}));

// 1日〜15日の列を次に定義
const earlyMonthColumns = Array.from({ length: 15 }, (_, i) => ({
  key: `day-${i + 1}`,
  name: `${i + 1}日`,
}));

// 全ての列を結合（16日〜31日、1日〜15日）
const columns = [...lateMonthColumns, ...earlyMonthColumns];

const ShiftTable = () => {
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(''); // 選択された月
  const [loading, setLoading] = useState(false); // データの読み込み状態

  // Firestoreからデータを取得する関数
  const fetchShiftData = async (month) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'shifts'), where('month', '==', month));
      const querySnapshot = await getDocs(q);
      const fetchedRows = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = { id: doc.id, name: data.name || 'No Name' };
        try {
          for (let day = 1; day <= 31; day++) {
            if (data.dates[day]) {
              row[
                `day-${day}`
              ] = `${data.dates[day].time.hour}${data.dates[day].time.convertedMinute}${data.dates[day].time.workDuration}`;
            } else {
              row[`day-${day}`] = '◎'; // 空データとして'◎'を表示
            }
          }
        } finally {
          fetchedRows.push(row);
        }
      });
      setRows(fetchedRows);
    } catch (error) {
      console.error('データ取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchShiftData(selectedMonth);
    }
  }, [selectedMonth]);

  // 各日付の出勤人数をカウントする関数
  const countShiftsForDay = (day) => {
    return rows.reduce((count, row) => {
      return row[`day-${day}`] !== '◎' ? count + 1 : count;
    }, 0);
  };

  // 月の選択時に呼び出される関数
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // 1行だけコピーする関数
  const handleCopyRow = (row) => {
    // 行データをタブ区切りで結合
    const rowData = columns.map((col) => row[col.key]).join('\t');

    // クリップボードに書き込み
    navigator.clipboard
      .writeText(rowData)
      .then(() => {
        alert('行データがクリップボードにコピーされました');
      })
      .catch((error) => {
        console.error('コピーに失敗しました:', error);
      });
  };

  // 全てコピーする関数
  const handleCopyAll = () => {
    // 全ての行データをタブ区切りで結合
    const allData = rows
      .map((row) => {
        return columns.map((col) => row[col.key]).join('\t');
      })
      .join('\n');

    // クリップボードに書き込み
    navigator.clipboard
      .writeText(allData)
      .then(() => {
        alert('テーブル全体のデータがクリップボードにコピーされました');
      })
      .catch((error) => {
        console.error('コピーに失敗しました:', error);
      });
  };

  return (
    <div className="excel-table-container">
      {/* 月の選択 */}
      <FormControl
        variant="outlined"
        sx={{ minWidth: 200, marginBottom: '10px' }}
      >
        <InputLabel id="month-select-label">月を選択</InputLabel>
        <Select
          labelId="month-select-label"
          value={selectedMonth}
          onChange={handleMonthChange}
          label="月を選択"
        >
          <MenuItem value={1}>1月度(12月16日〜1月15日のシフト)</MenuItem>
          <MenuItem value={2}>2月度(1月16日〜2月15日のシフト)</MenuItem>
          <MenuItem value={3}>3月度(2月16日〜3月15日のシフト)</MenuItem>
          <MenuItem value={4}>4月度(3月16日〜4月15日のシフト)</MenuItem>
          <MenuItem value={5}>5月度(4月16日〜5月15日のシフト)</MenuItem>
          <MenuItem value={6}>6月度(5月16日〜6月15日のシフト)</MenuItem>
          <MenuItem value={7}>7月度(6月16日〜7月15日のシフト)</MenuItem>
          <MenuItem value={8}>8月度(7月16日〜8月15日のシフト)</MenuItem>
          <MenuItem value={9}>9月度(8月16日〜9月15日のシフト)</MenuItem>
          <MenuItem value={10}>10月度(9月16日〜10月15日のシフト)</MenuItem>
          <MenuItem value={11}>11月度(10月16日〜11月15日のシフト)</MenuItem>
          <MenuItem value={12}>12月度(11月16日〜12月15日のシフト)</MenuItem>
        </Select>
      </FormControl>

      {/* ローディング中の表示 */}
      {loading ? (
        <div>データを読み込み中...</div>
      ) : (
        <div>
          <table className="excel-table">
            <thead>
              <tr>
                <th>Name</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      backgroundColor:
                        countShiftsForDay(col.key.split('-')[1]) < 3
                          ? 'red'
                          : 'inherit', // 出勤人数が3人未満なら赤く表示
                    }}
                  >
                    {col.name}
                  </th>
                ))}
                <th>操作</th> {/* 操作列を追加 */}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                  <td>
                    <button
                      onClick={() => handleCopyRow(row)}
                      style={{ fontSize: '10px', padding: '2px' }}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCopyAll} style={{ marginTop: '10px' }}>
            全てのデータをコピー
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiftTable;
