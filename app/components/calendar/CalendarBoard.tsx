import { PlanData } from "../../lib/types";
import { useCalendar } from "../../hooks/useCalendar";
import { CalendarHeader } from "./CalendarHeader";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";

interface CalendarBoardProps {
  plans: PlanData[];
  onClickDate: (dateStr: string) => void;
  onClickPlan: (plan: PlanData) => void;
}

export const CalendarBoard = ({ plans, onClickDate, onClickPlan }: CalendarBoardProps) => {
  const cal = useCalendar();

  // ヘッダーに渡すための「現在の表示タイトル」
  const title = cal.viewMode === "month" 
    ? `${cal.currentYear}年 ${cal.currentMonth}月`
    : `${cal.currentWeekStart.getFullYear()}年 ${cal.currentWeekStart.getMonth() + 1}月 (週表示)`;

  return (
    <div>
      {/* 操作ヘッダー */}
      <CalendarHeader 
        viewMode={cal.viewMode}
        setViewMode={cal.setViewMode}
        title={title}
        onPrev={cal.viewMode === "month" ? cal.prevMonth : cal.prevWeek}
        onNext={cal.viewMode === "month" ? cal.nextMonth : cal.nextWeek}
      />

      {/* 月表示と週表示の切り替え */}
      {/* 三項条件式で、monthなら月表示、それ以外なら週表示とした。（デフォルトはmonthなので月表示になる。） */}
      {cal.viewMode === "month" ? (
        <MonthView  plans={plans} 
                    year={cal.currentYear} 
                    month={cal.currentMonth} 
                    onClickDate={onClickDate} 
                    onClickPlan={onClickPlan} />
      ) : (
        <WeekView   plans={plans} 
                    weekStart={cal.currentWeekStart} 
                    onClickDate={onClickDate} 
                    onClickPlan={onClickPlan} />
      )}
    </div>
  );
};