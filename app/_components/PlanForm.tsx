"use client";
import { useEffect, useState } from "react";
import { EventType, PlanData } from "../_interfaces/PlanData";

interface PlanFormProps {
  selectedDate: string; // 親から「今選択されている日付」をもらう
  onClickAddPlan: (newPlan: Omit<PlanData, "id">) => void; // api/plans.ts に合わせてidを除いた型にする
}

const PlanForm = ({ selectedDate, onClickAddPlan }: PlanFormProps) => {
  // 予定のタイトルの初期値
  const [title, setTitle] = useState("");
  // 種別を管理するState（初期値は "PRIVATE"）。<EventType>でEventType型（3種類）しか受け付けないことを明記。
  const [eventType, setEventType] = useState<EventType>("PRIVATE");
  // 開始日と終了日
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  // 予定の内容の説明
  const [description, setDescription] = useState("");

  // カレンダーで別の日付がクリックされた時、フォームの日付も連動して自動で切り替わるようにする
  useEffect(() => {
    setStartDate(selectedDate);
    setEndDate(selectedDate);
  }, [selectedDate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 送信時の画面リロードを防ぐ
    // .trim()で前後の空白を削除することで、空白のみの入力は""（入力無し）とみなされ、空白のみの入力を防げる。
    if (title.trim() === "") { 
      return;
    };

    // バックエンドのルール（NOT NULL制約など）を満たすデータになるよう補完する
    const newPlan: Omit<PlanData, "id"> = {
      title: title,
      eventType: eventType,
      startDate: startDate,
      endDate: endDate,    // 開始日と同じ日付を入れる
      description: description           // 空文字を入れておく
    };

    onClickAddPlan(newPlan);

    // 次の入力のためにフォームをリセット
    setTitle("");
    setEventType("PRIVATE");
    setDescription("");
  };

  // 日付が選ばれている時は入力フォームを表示
  return (
    <div>
      {/* flexDirection: "column" で縦並びのフォームにした */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* 予定のタイトル入力欄 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="予定のタイトル"
          style={{ padding: "8px" , borderRadius: "4px", border: "1px solid #ccc"}}
        />

        {/* 開始日の選択欄 */}
        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>
          開始日
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }}
          />
        </label>

        {/* 終了日の選択欄 */}
        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>
          終了日
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }}
          />
        </label>
        
        {/* 予定の種別を選択 */}
        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>
          種別
          <select
            value={eventType}
          // プルダウンはEventType型しか許されないので、「e.target.value as EventType」で型変更してあげる
            onChange={(e) => setEventType(e.target.value as EventType)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}
          >
            <option value="PRIVATE">プライベート</option>
            <option value="OFFICIAL">仕事</option>
            <option value="TASK">タスク</option>
          </select>
        </label>

        {/* 予定の説明の入力欄 */}
        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>
          内容
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="予定の説明"
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit", 
              height: "60px",        // 最初から3行分ほどの高さを確保
              resize: "vertical"     // ユーザーが上下にだけ枠を広げられるようにする 
            }}
          />
        </label>

        {/* 予定追加ボタン */}
        <button type="submit"
                style={{ padding: "10px", backgroundColor: "#57C3E9", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginTop: "5px"}}>
          追加
        </button>
      </form>
    </div>
  );
};

export default PlanForm;