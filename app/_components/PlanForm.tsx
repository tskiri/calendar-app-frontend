"use client";
import { useState } from "react";
import { PlanData } from "../_interfaces/PlanData";

interface PlanFormProps {
  selectedDate: string; // 親から「今選択されている日付」をもらう
  onClickAddPlan: (newPlan: Omit<PlanData, "id">) => void; // api/plans.ts に合わせてidを除いた型にする
}

const PlanForm = ({ selectedDate, onClickAddPlan }: PlanFormProps) => {
  const [title, setTitle] = useState(""); // 予定のタイトルの初期値

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 送信時の画面リロードを防ぐ
    // .trim()で前後の空白を削除することで空白のみの入力を防ぐ。
    if (title.trim() === "") { 
      return;
    };

    // バックエンドのルール（NOT NULL制約など）を満たすデータになるよう補完する
    const newPlan: Omit<PlanData, "id"> = {
      title: title,
      eventType: "PRIVATE",     // 固定でPRIVATEにしておく
      startDate: selectedDate,
      endDate: selectedDate,    // 開始日と同じ日付を入れる
      description: ""           // 空文字を入れておく
    };

    onClickAddPlan(newPlan);
    setTitle(""); // 送信後は入力欄をリセット
  };

  // 日付が選ばれていない時はメッセージを表示
  if (!selectedDate) {
    return (
      <div>
        カレンダーの日付をクリックして予定を追加してください
      </div>
    );
  }

  // 日付が選ばれている時は入力フォームを表示
  return (
    <div>
      <h3>{selectedDate} の予定を追加</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="予定のタイトル"
        />
        <button type="submit">
          追加
        </button>
      </form>
    </div>
  );
};

export default PlanForm;