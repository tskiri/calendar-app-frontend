import { useState, useEffect } from "react";
import { EventType, PlanData } from "../../lib/types";

interface PlanFormProps {
  selectedDate: string;
  onClickAddPlan: (newPlan: Omit<PlanData, "id">) => void;
}

export const PlanForm = ({ selectedDate, onClickAddPlan }: PlanFormProps) => {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState<EventType>("PRIVATE");
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setStartDate(selectedDate);
    setEndDate(selectedDate);
  }, [selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    onClickAddPlan({ title, eventType, startDate, endDate, description });

    setTitle("");
    setEventType("PRIVATE");
    setDescription("");
  };

  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: "15px" }}>予定を追加</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="予定のタイトル" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />

        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>開始日
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }} />
        </label>

        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>終了日
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }} />
        </label>

        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>種別
          <select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}>
            <option value="PRIVATE">プライベート</option>
            <option value="OFFICIAL">仕事</option>
            <option value="TASK">タスク</option>
          </select>
        </label>

        <label style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "4px" }}>内容
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="予定の詳細" style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", height: "60px", resize: "vertical", fontFamily: "inherit" }} />
        </label>

        <button type="submit" style={{ padding: "10px", backgroundColor: "#57C3E9", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", marginTop: "5px" }}>
          追加
        </button>
      </form>
    </div>
  );
};