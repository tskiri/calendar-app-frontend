import { useState } from "react";
import { EventType, PlanData } from "../_interfaces/PlanData";



interface CalendarViewProps {
  plans: PlanData[];
  onClickDate: (dateStr: string) => void;
  onClickDelete: (id: number) => void;
  onClickPlanTitle: (plan: PlanData) => void;
}

// page.tsxからpropsで{ plans }を受け取り、かつ{ plans }が CalendarViewProps型（つまり{ plans }がplans: PlanData[];を守っている）であることを確認
const CalendarView = ({ plans, onClickDate, onClickDelete, onClickPlanTitle }: CalendarViewProps) => {
  const today = new Date(); // 今日の日時を取得
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];


  // 前の月に移動する処理
  const handlePreMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };


  // 次の月に移動する処理
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };


// 予定の種別ごとに背景色と文字色を返す関数
const getPlanColors = (type: EventType) => {
  switch (type) {
    case "OFFICIAL":
      return { bg: "#e8f5e9", text: "#2e7d32" }; // 🟩 仕事：薄緑ベースに深緑の文字
    case "TASK":
      return { bg: "#fff3e0", text: "#e65100" }; // 🟧 タスク：薄オレンジベースに濃いオレンジの文字
    case "PRIVATE":
    default:
      return { bg: "#e3f2fd", text: "#1e88e5" }; // 🟦 プライベート：これまでの薄青ベースに青の文字
  }
};


  // getDay()：曜日を取得
  // プログラム上では、月だけ0(1月)～11(12月)で数える必要があるので、それに合うようマイナス1している。
  const startWeekday = new Date(currentYear, currentMonth - 1, 1).getDay();
  // getDate()：日付を取得
  // 第三引数に0を指定すると、指定の年月の1日より「1日前」という事なので、前月の最終日となる。これで月の最終日を取得できる。
  const lastDate = new Date(currentYear, currentMonth, 0).getDate();

  // 月の初日の前に置く空欄のための配列を定義。水曜が月初（日曜から火曜までが空欄）なら[0, 1, 2]となる。
  const emptyBoxes = [];
  for (let i = 0; i < startWeekday; i++) {
    emptyBoxes.push(i);
  }

  // 各月の日数を計算して配列にする。30日までなら、[1, 2, 3, ..., 30]になる。
  const dateNumbers = [];
  for (let i = 1; i <= lastDate; i++) {
    dateNumbers.push(i);
  }


  return (
    <div> 
      {/* 月移動ヘッダー */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={handlePreMonth}>&lt; 前の月</button>
        <h2>{currentYear}年 {currentMonth}月</h2>
        <button onClick={handleNextMonth}>次の月 &gt;</button>
      </div>

      {/* カレンダー本体 */} 
      {/* repeat(7, minmax(0, 1fr))は、minmax(0, 1fr)を７個並べているのと同義 */}
      {/* minmax(0, 1fr)→最小値0（タイトルの文字を最小限まで横に潰せる）とすることで、最大値の1fr（7個並ぶので7つの要素を１：１：１：１：１：１：１の割合にする）に徹することができる。 */}
      {/* これにより「どれだけ中身が長くても、最小幅を0とみなして絶対に強制的に7等分にする」という命令に変わり、曜日の幅が崩れなくなる */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: "1px", backgroundColor: "#ccc", border: "1px solid #ccc" }}>
        
        {/* １．曜日のマス */}
        {/* weekdaysから1つずつ取り出して「"日", "月", "火", "水", "木", "金", "土"」としている */}
        {weekdays.map((day) => (
          <div key={day} style={{ textAlign: "center", backgroundColor: "#f5f5f5", padding: "5px 0" }}>
            {day}
          </div>
        ))}
        
        {/* ２．空白のマス */}
        {/* 日付マスとの区別のため、「"empty-0", "empty-1", "empty-2", ...」としている。 */}
        {emptyBoxes.map((index) => (
          <div key={`empty-${index}`} style={{ height: "90px", backgroundColor: "#fafafa" }} />
        ))}

        {/* ３．日付のマス */}
        {/* JavaScriptのStateで取ってきた日付は2026-6-5のようになっているが、バックエンドでは2026-06-05のようにしないといけない */}
        {/* 上記でdateNumbersという配列を作ったので、これを.mapで全日付についてぞれぞれ下記の処理を実行していく */}
        {/* 日付が変わるたびに実行され、そのたびにtargetDateStrが書き変わり、全日程に対応する予定が割り振られる。 */}
        {dateNumbers.map((date) => {
          const mm = currentMonth < 10 ? `0${currentMonth}` : currentMonth; // 月の数字が10未満なら2桁にするために0を付ける
          const dd = date < 10 ? `0${date}` : date; // 日にちの数字が10未満なら2桁にするために0を付ける
          const targetDateStr = `${currentYear}-${mm}-${dd}`;

          // 予定の期間中だけの予定の集合になるようフィルターしている
          const dayPlans = plans.filter((plan) => {
            return targetDateStr >= plan.startDate && targetDateStr <= plan.endDate;
          });

          return (
            <div key={targetDateStr} // yyyy-mm-ddのユニークな値として他の日付と区別
                  // クリックされたら親に日付（targetDateStr）を渡す
                  onClick={() => onClickDate(targetDateStr)}
                  // 「overflow: "hidden"」：万が一文字がはみ出そうとしたときに、マスの外に突き抜けてカレンダーを壊すのを防ぐ。
                  style={{ height: "90px", backgroundColor: "#fff", padding: "4px", boxSizing: "border-box", cursor: "pointer", overflow: "hidden" }}
            >
              <div style={{ fontSize: "0.85rem", fontWeight: "bold"}}>
                {date}
              </div>
              
              <div>
                {dayPlans.map((plan) => {
                  const colors = getPlanColors(plan.eventType);
                  return (
                    <div 
                      key={plan.id} 
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.bg, color: colors.text, padding: "2px 4px", margin: "2px 0", borderRadius: "3px", fontSize: "0.8rem" }}>
                      {/* 予定のタイトル */}
                      <span onClick={(e) => {
                            e.stopPropagation();    // 親の「日付マスのクリックイベント」が発動するのを止める
                            onClickPlanTitle(plan); // クリックされた予定データを親に渡す
                            }}
                            style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}
                      >
                        {plan.title}
                      </span>

                      {/* 削除ボタン
                      <button onClick={(e) => {
                              e.stopPropagation(); // 親の「日付マスのクリックイベント」が発動するのを止める
                              onClickDelete(plan.id); // page.tsxから貰ったリモコンのスイッチを押す（IDを渡す）
                              }}
                              style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0 0 0 4px", fontSize: "0.7rem" }}
                      >
                        🗑️
                      </button> */}

                    </div>
                  )})
                }
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default CalendarView;