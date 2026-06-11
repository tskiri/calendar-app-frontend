// 月/週の移動や計算ロジック

import { useState } from "react";


export const useCalendar = () => {
  const today = new Date();
  const [viewMode, setViewMode] = useState<"month" | "week">("month"); // 初期値はmonth

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - d.getDay()); // 今週の日曜日にセット
    return d;
  });

  // 次の月に移動する処理
  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  //前の月に移動する処理
  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  // 次の週に移動する処理
  const nextWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7);
    setCurrentWeekStart(d);
  };

  // 前の週に移動する処理
  const prevWeek = () => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7);
    setCurrentWeekStart(d);
  };

  return {
    viewMode, setViewMode,
    currentYear, currentMonth, nextMonth, prevMonth,
    currentWeekStart, nextWeek, prevWeek
  };
};