import { useState } from "react";
import { EventType, PlanData } from "../../lib/types";

interface PlanDetailProps {
  plan: PlanData;
  onClose: () => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedPlan: Omit<PlanData, "id">) => void; // 編集機能を追加する際はここを使います
}

const eventLabels: Record<EventType, string> = {
  PRIVATE: "プライベート",
  OFFICIAL: "仕事",
  TASK: "タスク"
};

export const PlanDetail = ({ plan, onClose, onDelete, onUpdate }: PlanDetailProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(plan.title);
  const [startDate, setStartDate] = useState<string>(plan.startDate);
  const [endDate, setEndDate] = useState<string>(plan.endDate);
  const [eventType, setEventType] = useState<EventType>(plan.eventType);
  const [description, setDescription] = useState<string>(plan.description || "");

  const handleSave = () => {
    if (!title.trim()) return alert("タイトルを入力してください。");
    onUpdate(plan.id, { title, startDate, endDate, description, eventType });
    setIsEditing(false); 
  };

  if (isEditing) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3 style={{ margin: 0 }}>予定の編集</h3>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }} />
        <select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}>
          <option value="PRIVATE">プライベート</option>
          <option value="OFFICIAL">仕事</option>
          <option value="TASK">タスク</option>
        </select>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit", height: "60px" }} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={() => setIsEditing(false)} style={{ padding: "8px 16px", backgroundColor: "#eee", border: "none", borderRadius: "4px", cursor: "pointer" }}>キャンセル</button>
          <button onClick={handleSave} style={{ padding: "8px 16px", backgroundColor: "#57C3E9", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>保存する</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 予定のタイトル */}
      <h2 style={{ marginTop: 0 }}>
        {plan.title}
      </h2>
      
      <p style={{ fontSize: "0.95rem" }}>
        日付: {plan.startDate} 〜 {plan.endDate}
      </p>

      <p style={{ fontSize: "0.95rem" }}>
        種別: {eventLabels[plan.eventType]}
      </p>
      
      {/* 内容（あれば表示） */}
      {plan.description && (
        <div style={{ whiteSpace: "pre-wrap", backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "4px", fontSize: "0.9rem", marginBottom: "15px" }}>
          {plan.description}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        {/* 削除ボタン */}
        <button 
          onClick={() => { 
            if (window.confirm("この予定を削除してもよろしいですか？")) { onDelete(plan.id); onClose(); } 
          }} 
          style={{ padding: "8px 16px", backgroundColor: "#e53935", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            削除
        </button>

        {/* 編集ボタン */}
        <button 
          onClick={() => setIsEditing(true)} 
          style={{ padding: "8px 16px", backgroundColor: "#eee", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            編集
        </button>
        
        {/* 閉じるボタン */}
        <button 
          onClick={onClose} 
          style={{ padding: "8px 16px", backgroundColor: "#eee", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            閉じる
        </button>
      </div>
    </div>
  );
};