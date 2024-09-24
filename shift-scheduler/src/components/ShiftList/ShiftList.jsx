import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import EditShiftForm from '../EditShiftForm/EditShiftForm';

const ShiftList = () => {
  const [shiftList, setShiftList] = useState([]);
  const [editingShift, setEditingShift] = useState(null);
  const [loading, setLoading] = useState(true); // ローディング状態の管理

  const fetchShiftData = async () => {
    try {
      const q = query(collection(db, 'shifts'));
      const querySnapshot = await getDocs(q);
      const shifts = [];
      querySnapshot.forEach((doc) => {
        shifts.push({ id: doc.id, ...doc.data() });
      });

      const sortByDate = (dates) => {
        const dateArray = Object.entries(dates);

        return dateArray.sort((a, b) => {
          const dateA = new Date(a[1].date);
          const dateB = new Date(b[1].date);
          return dateA - dateB;
        });
      };

      // シフトデータに対して日付順にソートする
      const sortedShifts = shifts.map((shift) => {
        const sortedDates = sortByDate(shift.dates);
        return { ...shift, dates: sortedDates };
      });

      setShiftList(sortedShifts);
    } catch (error) {
      console.error('シフトデータの取得中にエラーが発生しました:', error);
    } finally {
      setLoading(false); // データ取得が完了したらローディングを解除
    }
  };

  if (shiftList) {
    console.log(shiftList); // shiftListが存在する場合は出力
  } else {
    console.log('datesプロパティが存在しません');
  }

  useEffect(() => {
    fetchShiftData();
  }, []);

  const handleDelete = async (shiftId) => {
    try {
      await deleteDoc(doc(db, 'shifts', shiftId));
      alert('シフトデータが削除されました');
      // シフトリストを更新
      setShiftList(shiftList.filter((shift) => shift.id !== shiftId));
    } catch (error) {
      console.error('シフトデータの削除中にエラーが発生しました:', error);
    }
  };

  const handleEdit = (shift) => {
    setEditingShift(shift);
  };

  const handleSaveEdit = () => {
    // 編集モードを終了し、シフトリストを再取得
    setEditingShift(null);
    fetchShiftData();
  };

  const handleCancelEdit = () => {
    setEditingShift(null);
  };

  // ローディング中に表示するコンテンツ
  if (loading) {
    return (
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          marginTop: '80px',
          textAlign: 'center',
        }}
      >
        ロード中...
      </Typography>
    );
  }

  // データがnullの場合にエラーを防ぐ
  if (!shiftList || shiftList.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          marginTop: '80px',
          textAlign: 'center',
        }}
      >
        シフトデータが存在しません。
      </Typography>
    );
  }
  // 以下で取得したデータを表示します
  return (
    <div>
      {editingShift ? (
        <EditShiftForm
          shift={editingShift}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <Grid
          container
          spacing={2}
          maxWidth="lg"
          sx={{ width: '100%', margin: '0 auto' }}
        >
          {shiftList.map((shift) => (
            <Grid key={shift.id} item xs={6}>
              <Card
                key={shift.id}
                sx={{
                  marginBottom: 2,
                  marginTop: '80px',
                  border: '1px solid black',
                }}
              >
                <CardContent>
                  <Typography variant="h6">シフトID: {shift.id}</Typography>
                  <Typography variant="body1">名前: {shift.name}</Typography>
                  {/* {/* <Typography variant="body1">月: {shift.date}</Typography> */}
                  <Typography variant="body1">
                    {' '}
                    日付:
                    {shift.dates.map(([key, value]) => (
                      <span key={key}>{value.date},</span>
                    ))}
                  </Typography>
                  <Typography variant="body1">
                    時間: {shift.time.hour}
                    {shift.time.convertedMinute}
                    {shift.time.workDuration}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: '10px' }}
                    onClick={() => handleEdit(shift)}
                  >
                    編集
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(shift.id)}
                  >
                    削除
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ShiftList;
