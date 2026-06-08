import { useState } from "react";
import { PlanData } from "../_interfaces/PlanData";


// page.tsxから plans を受け取るための「名簿（Propsの型）」を定義
interface CalendarViewProps {
  plans: PlanData[];
}

// page.tsxからpropsで{ plans }を受け取り、かつ{ plans }が CalendarViewProps型（つまり{ plans }がplans: PlanData[];を守っている）であることを確認
const CalendarView = ({ plans }: CalendarViewProps) => {
  const today = new Date(); // 今日の日時を取得
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  // getDay()：曜日を取得
  // プログラム上では、月だけ0(1月)～11(12月)で数える必要があるので、それに合うようマイナス1している。
  const startWeekday = new Date(currentYear, currentMonth - 1, 1).getDay();
  // getDate()：日付を取得
  // 第三引数に0を指定すると、指定の年月の1日より「1日前」という事なので、前月の最終日となる。これで月の最終日を取得できる。
  const lastDate = new Date(currentYear, currentMonth, 0).getDate();

  // 月の初日の前に作る空欄を定義。水曜が月初（日曜から火曜までが空欄）なら[0, 1, 2]となる。
  const emptyBoxes = [];
  for (let i = 0; i < startWeekday; i++) {
    emptyBoxes.push(i);
  }

  // 各月の日数を計算
  const dateNumbers = [];
  for (let i = 1; i <= lastDate; i++) {
    dateNumbers.push(i);
  }

  // 下記で呼び出す「1つの大きなGridの箱」を定義
  const gridLayout = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    backgroundColor: "#ddd",    // 背景色（グレー）を作り、
    gap: "1px",                 // ギャップを作って背景色を「線」にする
    border: "1px solid #ddd"    // カレンダーの一番外側を囲う枠線
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      
      {/* タイトル表示 */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {currentYear}年 {currentMonth}月
      </h2>

      {/* 1つの大きなGridの箱 */}
      <div style={gridLayout}>
        
        {/* １．曜日のマス：薄グレー */}
        {weekdays.map((day) => (
          <div key={day} style={{ textAlign: "center", fontWeight: "bold", backgroundColor: "#f5f5f5", padding: "5px 0" }}>
            {day}
          </div>
        ))}
        
        {/* ２．空白のマス：ほぼほぼ白 */}
        {emptyBoxes.map((index) => (
          <div key={`empty-${index}`} style={{ height: "100px", backgroundColor: "#fafafa" }} />
        ))}

        {/* ３．日付のマス：完全に白 */}
        {/* JavaScriptのStateで取ってきた日付は2026-6-5のようになっているが、バックエンドでは2026-06-05のようにしないといけない */}
        {/* 上記でdateNumbersという配列を作ったので、これを.mapで全日付についてぞれぞれ下記の処理を実行していく */}
        {/* 日付が変わるたびに実行され、そのたびにtargetDateStrが書き変わり、全日程に対応する予定が割り振られる。 */}
        {dateNumbers.map((date) => {
          const mm = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // 月の数字が10未満なら2桁にするために0を付ける
          const dd = date < 10 ? `0${date}` : date; // 日にちの数字が10未満なら2桁にするために0を付ける
          const targetDateStr = `${currentYear}-${mm}-${dd}`;

          // 今日だけの予定の集合になるようフィルターしている
          const dayPlans = plans.filter((plan) => plan.startDate === targetDateStr);

          return (
            <div key={date} style={{ height: "100px", backgroundColor: "#fff", padding: "5px", boxSizing: "border-box" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{date}</div>
              
              <div style={{ marginTop: "5px" }}>
                {dayPlans.map((plan) => (
                  <div key={plan.id} style={{ backgroundColor: "#e3f2fd", color: "#1e88e5", fontSize: "0.75rem", padding: "2px 4px", borderRadius: "3px", marginBottom: "3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {plan.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default CalendarView;