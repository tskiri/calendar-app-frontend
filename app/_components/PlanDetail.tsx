import { useState } from "react";
import { PlanData } from "../_interfaces/PlanData";

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

const PlanDetail = ({ plan, onClose, onDelete, onUpdate }: PlanDetailProps) => {
  // 編集モード（true）か、通常モード（false）かを管理
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 入力フォーム用のState
  const [title, setTitle] = useState<string>(plan.title);
  const [startDate, setStartDate] = useState<string>(plan.startDate);
  const [endDate, setEndDate] = useState<string>(plan.endDate);
  const [description, setDescription] = useState<string>(plan.description || "");

  // 保存ボタンを押したときの処理
  const handleSave = () => {
    if (!title.trim()) return alert("タイトルを入力してください。");
    onUpdate(plan.id, { title, startDate, endDate, description, eventType: plan.eventType });
  };

  // 編集モードの画面
  if (isEditing) {
    return (
      <div>
        <h2>予定の編集</h2>
        <p>タイトル: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></p>
        <p>日付: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></p>
        <p>終了日: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></p>
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