import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ja from 'date-fns/locale/ja';
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Modal from 'react-modal';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from '@mui/material';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import zIndex from '@mui/material/styles/zIndex';
import ShiftTable from '../ShiftTable';

Modal.setAppElement('#root');

const locales = {
  ja,
};

const localizer = dateFnsLocalizer({
  format: (date, formatString, culture) =>
    format(date, formatString, { locale: locales[culture] }),
  parse: (dateString, formatString, culture) =>
    parse(dateString, formatString, new Date(), { locale: locales[culture] }),
  startOfWeek: (culture) =>
    startOfWeek(new Date(), { locale: locales[culture] }),
  getDay,
  locales,
});

// function isValidDate(year, month, day) {
//   const date = new Date(year, month - 1, day); // JavaScript の月は 0 始まり
//   return (
//     date.getFullYear() === year &&
//     date.getMonth() === month - 1 &&
//     date.getDate() === day
//   );
// }

const ShiftCalendar = ({ isAuth }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [workDuration, setWorkDuration] = useState('');
  const [convertedMinute, setConvertedMinute] = useState('');
  const [time, setTime] = useState(
    selectedDate
      ? {
          hour: selectedDate.dates.time.hour,
          convertedMinute: selectedDate.dates.time.convertedMinute,
          workDuration: selectedDate.dates.time.workDuration,
        }
      : ''
  );

  // モーダルの開閉状態を管理するステート

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // モーダルを開く
  const openModal = () => {
    setIsOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsOpen(false);
  };

  // スタッフ名と色のマッピング
  const nameColorMap = {
    岡村: '#f44336',
    市東: '#3f51b5',
    鈴木: '#4caf50',
    // 他のスタッフを追加
  };

  const fetchShiftData = async () => {
    try {
      const q = query(collection(db, 'shifts'));
      const querySnapshot = await getDocs(q);
      const shifts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // console.log(data);
        const uniqueDays = [...new Set(Object.keys(data.dates))];
        // console.log(uniqueDays);

        uniqueDays.forEach((day) => {
          let year = new Date().getFullYear();
          let adjustedMonth = data.month - 1; // data.month は 0 始まり

          if (day > 15) {
            adjustedMonth -= 1;
            if (adjustedMonth < 0) {
              adjustedMonth = 11; // 12月
              year -= 1;
            }
          }

          // if (!isValidDate(year, adjustedMonth + 1, day)) {
          //   console.warn(
          //     `無効な日付が検出されました: ${year}/${adjustedMonth + 1}/${day}`
          //   );
          //   return; // この日付の処理をスキップ
          // }

          // Date オブジェクトを使用して日付を作成
          const startDate = new Date(
            year,
            adjustedMonth,
            day,
            data.dates[day].time.hour,
            data.dates[day].time.minute,
            data.dates[day].time.workDuration
          );

          let totalDuration = data.dates[day].time.workDuration;
          if (totalDuration > 5.5) {
            totalDuration += 1; // 1時間の休憩を追加
          }
          const endDate = new Date(
            startDate.getTime() + totalDuration * 60 * 60 * 1000
          );
          shifts.push({
            title: data.name,
            start: startDate,
            end: endDate,
            dates: data.dates[day],
            day: parseInt(day),
            id: doc.id,
            createdBy: data.createdBy,
          });

          // 同じ開始日時と終了日時を持つイベントが既に存在するか確認
        });
      });
      setEvents(shifts);
    } catch (error) {
      console.error('シフトデータの取得中にエラーが発生しました:', error);
    }
  };
  // console.log(events);

  useEffect(() => {
    fetchShiftData();
  }, []);

  useEffect(() => {
    // console.log(selectedDate);
    if (selectedDate) {
      setTime({
        hour: selectedDate.dates.time.hour,
        convertedMinute: selectedDate.dates.time.convertedMinute,
        workDuration: selectedDate.dates.time.workDuration,
      });
    }
  }, [selectedDate]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = nameColorMap[event.title] || '#3174ad';
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '1px solid #fff',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  const onSelectEvent = (slotInfo) => {
    setSelectedDate(slotInfo);
    // console.log(slotInfo);
    openModal();
  };

  useEffect(() => {
    if (selectedDate) {
      setHour(selectedDate.dates.time.hour);
      setMinute(selectedDate.dates.time.minute);
      setWorkDuration(selectedDate.dates.time.workDuration);
    }
  }, [selectedDate]);

  const convertMinuteToLetter = (m) => {
    switch (m) {
      case 0:
        return 'A';
      case 15:
        return 'B';
      case 30:
        return 'C';
      case 45:
        return 'D';
      default:
        return '';
    }
  };

  useEffect(() => {
    const newCM = convertMinuteToLetter(minute);
    setConvertedMinute(newCM);
  }, [minute]);

  // useEffect(() => {
  //   console.log(convertedMinute);
  // }, [convertedMinute]);

  // useEffect(() => {
  //   console.log(selectedDate);
  // }, [selectedDate]);

  const handleInput = () => {
    updateFireBase();
  };

  // useEffect(() => {
  //   console.log();
  // }, [currentUser]);

  const updateFireBase = async () => {
    if (!selectedDate || !selectedDate.id || !selectedDate.day) {
      alert('選択された日付が無効です。');
      return;
    }
    // if (shifts)
    const docRef = doc(db, 'shifts', selectedDate.id);
    // let newDay = selectedDate.day;

    try {
      await updateDoc(docRef, {
        [`dates.${selectedDate.day}.time`]: {
          hour: hour,
          minute: minute,
          workDuration: workDuration,
          convertedMinute: convertedMinute,
        },
      });

      alert('シフトが更新されました');
      setIsOpen(false);
      await fetchShiftData();
    } catch (error) {
      console.error('シフトの更新中にエラーが発生しました: ', error);
      alert(`エラー: ${error.message}`);
    }
  };

  // useEffect(() => {
  //   console.log(events);
  // }, [modalIsOpen]);

  return (
    <>
      {modalIsOpen ? (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal} // モーダル外クリックやエスケープキーで閉じる
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            },
            zIndex: '100',
          }}
          contentLabel="Example Modal"
        >
          <Box
            component="form"
            maxWidth="lg"
            sx={{
              padding: 2,
              // border: '1px solid #ccc',
              borderRadius: 2,
              marginTop: '80px',
              margin: '80px auto',
            }}
          >
            <h2>
              {selectedDate ? format(selectedDate.start, 'yyyy年MM月dd日') : ''}
              {'  '}
              {selectedDate ? `${selectedDate.title}さん` : ''}
              のシフト編集
            </h2>
            <h3>
              現在の出勤内容は
              {selectedDate ? `${time.hour}` : ''}
              {selectedDate ? `${time.convertedMinute}` : ''}
              {selectedDate ? `${time.workDuration}` : ''}
              です
            </h3>

            <Container>
              {/* 各日付ごとにシフトを編集するフォーム */}

              <Grid
                container
                spacing={2}
                maxWidth="lg"
                sx={{ width: '100%', margin: '0 auto' }}
              >
                <Grid item xs={4}>
                  <TextField
                    label="時間"
                    value={hour}
                    type="number"
                    InputProps={{ inputProps: { min: 8, max: 20, step: 1 } }}
                    onChange={(e) => setHour(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="分"
                    value={minute}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 45, step: 15 } }}
                    onChange={(e) => setMinute(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="労働時間"
                    value={workDuration}
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 8, step: 0.25 } }}
                    onChange={(e) =>
                      setWorkDuration(parseFloat(e.target.value))
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>

              {/* ボタン */}

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={closeModal}
                  sx={{ marginRight: 1 }}
                >
                  キャンセル
                </Button>
                {/* 作成者のUIDと現在のユーザーのUIDを比較 */}
                {(selectedDate.createdBy === currentUser?.uid ||
                  currentUser?.uid === 'ObWUJkMVHBZd4FwutvQRcT8TKFh2') && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInput}
                  >
                    変更を保存
                  </Button>
                )}
              </Box>
            </Container>
          </Box>
        </Modal>
      ) : isAuth ? (
        <>
          <div style={{ height: '80vh', margin: '80px 50px 50px 50px' }}>
            <Calendar
              localizer={localizer}
              culture="ja" // 日本語ロケールを指定
              events={events}
              startAccessor="start"
              endAccessor="end"
              views={['month', 'week', 'day']}
              defaultView="month"
              messages={{
                next: '次',
                previous: '前',
                today: '今日',
                month: '月',
                week: '週',
                day: '日',
                agenda: '予定',
                date: '日付',
                time: '時間',
                event: 'イベント',
              }}
              eventPropGetter={eventStyleGetter}
              style={{ height: '100%' }}
              onSelectEvent={onSelectEvent}
            />
          </div>
        </>
      ) : (
        <Container sx={{ textAlign: 'center', marginTop: '80px' }}>
          <div>
            <h1>シフト管理アプリ</h1>
            <Link to="/login">
              <button>シフト希望日入力</button>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
};

export default ShiftCalendar;
