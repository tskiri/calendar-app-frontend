// 日付計算・フォーマット


export const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

// 日付を "YYYY-MM-DD" の形にする
// 🔴 .padStart使い方
export const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// 週表示用。指定した日曜日の日付から1週間分（7日分）のDateオブジェクト配列をつくる。
export const getWeekDates = (weekStart: Date): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
};

// 月表示用。前月・翌月も含めた、カレンダー画面用の全42日間（6週間分）のDateオブジェクトを連続生成する。
export const getMonthCalendarDates = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month - 1, 1);
  const startSunday = new Date(firstDay);
  startSunday.setDate(firstDay.getDate() - firstDay.getDay());

  const dates: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(startSunday);
    d.setDate(startSunday.getDate() + i);
    dates.push(d);
  }
  return dates;
};