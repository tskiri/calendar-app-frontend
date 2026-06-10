import { useState } from "react";
import { EventType, PlanData } from "../_interfaces/PlanData";

interface PlanDetailProps {
  // 予定データそのもの(配列じゃないので[]はつけない)
  plan: PlanData; 
  // モーダルを閉じるための関数
  onClose: () => void;
  // 予定を削除するための関数（引数に予定のIDを受け取る）
  onDelete: (id: number) => void;
  // 予定の更新する関数
  onUpdate: (id: number, updatedPlan: Omit<PlanData, "id">) => void;
}

const eventLabels: Record<EventType, string> = {
  PRIVATE: "プライベート",
  OFFICIAL: "オフィシャル",
  TASK: "タスク"
};

const PlanDetail = ({ plan, onClose, onDelete, onUpdate }: PlanDetailProps) => {
  // 編集モード（true）か、通常モード（false）かを管理
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 入力フォーム用のState
  const [title, setTitle] = useState<string>(plan.title);
  const [startDate, setStartDate] = useState<string>(plan.startDate);
  const [endDate, setEndDate] = useState<string>(plan.endDate);
  const [eventType, setEventType] = useState<EventType>(plan.eventType);
  const [description, setDescription] = useState<string>(plan.description || "");

  // 保存ボタンを押したときの処理
  const handleSave = () => {
    if (!title.trim()) {
      return alert("タイトルを入力してください。");
    }
  //  最新のデータセットを親に渡す
    onUpdate(plan.id, { title, startDate, endDate, description, eventType });
  };

  // 編集モードの画面
  if (isEditing) {
    return (
      <div>
        <h2>予定の編集</h2>
        <p>タイトル: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></p>
        <p>日付: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></p>
        <p>終了日: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></p>
        
        {/* 予定の種別を選択 */}
        <p>種別:
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
        </p>

        <p>内容: <textarea value={description} onChange={(e) => setDescription(e.target.value)} /></p>
        
        <button onClick={() => setIsEditing(false)}>キャンセル</button>
        <button onClick={handleSave}>保存する</button>
      </div>
    );
  }

  // 通常モードの画面（詳細表示）
  return (
    <div>
      <h2>{plan.title}</h2>
      <p>📅 日付: {plan.startDate} 〜 {plan.endDate}</p>
      <p>📝 内容: {plan.description || "（詳細なし）"}</p>
      
      <button onClick={() => { onDelete(plan.id); onClose(); }}>🗑️ 削除</button>
      <button onClick={() => setIsEditing(true)}>✏️ 編集</button>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};

export default PlanDetail;