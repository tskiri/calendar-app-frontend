import React from "react";

interface CalendarHeaderProps {
  viewMode: "month" | "week";
  setViewMode: (mode: "month" | "week") => void;
  title: string;
  onPrev: () => void;
  onNext: () => void;
}

export const CalendarHeader = ({ viewMode, setViewMode, title, onPrev, onNext }: CalendarHeaderProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      {/* 表示モード切り替えタブ */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button 
          onClick={() => setViewMode("month")} 
          style={{ padding: "6px 12px", fontWeight: "bold", backgroundColor: viewMode === "month" ? "#57C3E9" : "#eee", color: viewMode === "month" ? "#fff" : "#333", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          月表示
        </button>
        <button 
          onClick={() => setViewMode("week")} 
          style={{ padding: "6px 12px", fontWeight: "bold", backgroundColor: viewMode === "week" ? "#57C3E9" : "#eee", color: viewMode === "week" ? "#fff" : "#333", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          週表示
        </button>
      </div>

      {/* 月/週の移動ボタンと現在地 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button 
          onClick={onPrev}
          style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}
        >
          &lt; 前の{viewMode === "month" ? "月" : "週"}
        </button>
        
        <h2 style={{ margin: 0 }}>{title}</h2>
        
        <button 
          onClick={onNext}
          style={{ padding: "6px 12px", cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#fff" }}
        >
          次の{viewMode === "month" ? "月" : "週"} &gt;
        </button>
      </div>
    </div>
  );
};