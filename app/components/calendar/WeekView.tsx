import { PlanData } from "../../lib/types";
import { getWeekDates, formatDate, weekdays } from "../../lib/date";
import { getPlanColors } from "../../lib/theme";

interface WeekViewProps {
  plans: PlanData[];
  weekStart: Date;
  onClickDate: (dateStr: string) => void;
  onClickPlan: (plan: PlanData) => void;
}

export const WeekView = ({ plans, weekStart, onClickDate, onClickPlan }: WeekViewProps) => {
  // 1週間分のDateオブジェクト配列を取得
  const weekDates = getWeekDates(weekStart);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "1px", backgroundColor: "#ccc", border: "1px solid #ccc" }}>
      {/* 曜日ヘッダー */}
      {weekdays.map((day) => (
        <div key={day} style={{ textAlign: "center", backgroundColor: "#f5f5f5", padding: "6px 0", fontWeight: "bold" }}>
          {day}
        </div>
      ))}

      {/* 7日分の縦長の柱（マス）を1日ずつ独立して並べる */}
      {weekDates.map((date) => {
        const targetDateStr = formatDate(date);
        
        // その日に当てはまる予定をシンプルに抽出
        const dayPlans = plans.filter((plan) => targetDateStr >= plan.startDate && targetDateStr <= plan.endDate);

        return (
          <div
            key={targetDateStr}
            onClick={() => onClickDate(targetDateStr)}
            style={{
              minHeight: "350px", // 縦幅をしっかり確保してウィークリーらしく
              backgroundColor: "#fff",
              padding: "8px",
              boxSizing: "border-box",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}
          >
            {/* 日付の数字 */}
            <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#666", textAlign: "center", borderBottom: "1px solid #eee", paddingBottom: "6px", marginBottom: "2px" }}>
              {date.getDate()}日
            </div>

            {/* その日の予定リスト（縦にきれいに並ぶ） */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {dayPlans.map((plan) => {
                const colors = getPlanColors(plan.eventType);
                return (
                  <div
                    key={plan.id}
                    onClick={(e) => {
                      e.stopPropagation(); // 柱のクリックイベントを止める
                      onClickPlan(plan);
                    }}
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      padding: "4px 6px",
                      borderRadius: "4px",
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