import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

import 'react-big-calendar/lib/css/react-big-calendar.css';

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

const ShiftCalendar = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
        const uniqueDays = [...new Set(data.day)];

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
            data.time.hour,
            data.time.minute
          );
          const endDate = new Date(
            startDate.getTime() + data.time.workDuration * 60 * 60 * 1000
          );

          shifts.push({
            title: data.name,
            start: startDate,
            end: endDate,
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

  // const onSelectEvent = (event) => {
  //   alert(`${event.title}のシフト\n開始: ${event.start}\n終了: ${event.end}`);
  // };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const filteredEvents = selectedDate
    ? events.filter(
        (event) => event.start.toDateString() === selectedDate.toDateString()
      )
    : events;

  return (
    <div style={{ height: '80vh', margin: '80px 50px 50px 50px' }}>
      <Calendar
        localizer={localizer}
        culture="ja" // 日本語ロケールを指定
        events={filteredEvents}
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
        selectable
        onSelectSlot={(slotInfo) => handleSelectDate(slotInfo.start)}
      />
    </div>
  );
};

export default ShiftCalendar;
