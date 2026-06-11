// components/features/calendar/MonthView.tsx
import { PlanData } from "../../lib/types";
import { weekdays, getMonthCalendarDates, formatDate } from "../../lib/date";
import { getPlanColors } from "../../lib/theme";

interface MonthViewProps {
  plans: PlanData[];
  year: number;
  month: number;
  onClickDate: (date: string) => void;
  onClickPlan: (plan: PlanData) => void;
}

export const MonthView = ({ plans, year, month, onClickDate, onClickPlan }: MonthViewProps) => {
  const calendarDates = getMonthCalendarDates(year, month);

return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "1px", backgroundColor: "#ccc", border: "1px solid #ccc" }}>
      {/* 曜日ヘッダー */}
      {weekdays.map((day) => (
        <div key={day} style={{ textAlign: "center", backgroundColor: "#f5f5f5", padding: "6px 0", fontWeight: "bold" }}>
          {day}
        </div>
      ))}
      
      {/* 42日間のマスを1日ずつ完全に独立（単体）して描画 */}
      {calendarDates.map((date) => {
        const targetDateStr = formatDate(date);
        const isCurrentMonth = date.getMonth() + 1 === month;
        
        // その日に当てはまる予定だけをシンプルに抽出（期間予定は各日にそれぞれ表示される）
        const dayPlans = plans.filter((plan) => targetDateStr >= plan.startDate && targetDateStr <= plan.endDate);

        return (
          <div 
            key={targetDateStr} 
            onClick={() => onClickDate(targetDateStr)} 
            style={{ 
              minHeight: "100px", 
              backgroundColor: "#fff", 
              padding: "6px", 
              boxSizing: "border-box", 
              cursor: "pointer", 
              overflow: "hidden" 
            }}
          >
            {/* 日付の数字 */}
            <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: isCurrentMonth ? "#333" : "#bbb", marginBottom: "6px" }}>
              {date.getDate()}日
            </div>
            
            {/* その日の予定リスト（縦に素直に並ぶ） */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {dayPlans.map((plan) => {
                const colors = getPlanColors(plan.eventType);
                return (
                  <div 
                    key={plan.id} 
                    onClick={(e) => {
                      e.stopPropagation(); // マス自体のクリックイベントを止める
                      onClickPlan(plan);
                    }} 
                    style={{ 
                      backgroundColor: colors.bg, 
                      color: colors.text, 
                      padding: "2px 6px", 
                      borderRadius: "3px", 
                      fontSize: "0.75rem", 
                      fontWeight: "bold",
                      textOverflow: "ellipsis", 
                      whiteSpace: "nowrap", 
                      overflow: "hidden" 
                    }}
                  >
                    {plan.title}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};