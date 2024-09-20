import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import EditShiftForm from '../EditShiftForm/EditShiftForm';

const ShiftList = () => {
  const [shiftList, setShiftList] = useState([]);
  const [editingShift, setEditingShift] = useState(null);

  const fetchShiftData = async () => {
    try {
      const q = query(collection(db, 'shifts'));
      const querySnapshot = await getDocs(q);
      const shifts = [];
      querySnapshot.forEach((doc) => {
        shifts.push({ id: doc.id, ...doc.data() });
      });
      setShiftList(shifts);
      // console.log(shifts);
    } catch (error) {
      console.error('シフトデータの取得中にエラーが発生しました:', error);
    }
  };
  console.log(shiftList);

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
            <Grid item xs={6}>
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
                  <Typography variant="body1">月: {shift.month}</Typography>
                  <Typography variant="body1">
                    日: {shift.day.join(', ')}
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
