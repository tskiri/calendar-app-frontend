"use client";
import { useState, useEffect } from "react";
import CalendarView from "./_components/CalendarView";
import PlanForm from "./_components/PlanForm";
import { PlanData } from "./_interfaces/PlanData";
import { findAllPlans, createPlan, deletePlan } from "./api/plans";
import Header from "./_components/Header";


const Home = () => {
  // 画面が開いた瞬間。バックエンドから帰ってくるデータの格納場所を定義
  const [plans, setPlans] = useState<PlanData[]>([]);
  // カレンダーでクリックされた日付を記憶する場所
  const [selectedDate, setSelectedDate] = useState<string>("");

  // useEffect：コンポーネントのマウント時やState変更時の副作用処理を記述
  useEffect(() => {
    const getPlans = async () => {
      try {
        // バックエンドにデータを要求
        const response = await findAllPlans();
        // 状態を更新
        setPlans(response);
      } catch (error) {
        console.error('予定の取得に失敗しました:', error);
      }
    };
    getPlans();
  }, []); // 第二引数の [] によりuseEffectの無限ループを回避。

  // フォームから新しい予定が送られてきたときの処理（バックエンドへPOST送信）
  const handleAddPlan = async (newPlan: Omit<PlanData, "id">) => {
    try {
      // 1. バックエンドにデータを送信して保存
      await createPlan(newPlan);
      // 2. 保存に成功したら、最新のデータをもう一度取得し直す
      const updatedPlans = await findAllPlans();
      // 3. 最新のデータで状態を更新し、画面に反映させる
      setPlans(updatedPlans);
    } catch (error) {
      console.error('予定の追加に失敗:', error);
      alert("予定の追加に失敗しました。");
    }
  };

  // 予定を削除
  const handleDeletePlan = async (id: number) => {
    // 誤操作防止のために確認アラートを出す
    if (!window.confirm("この予定を削除してもよろしいですか？")) {
      return; 
    }

    try {
      // １．バックエンドの削除APIを呼び出す
      await deletePlan(id);
      // 2. 削除に成功したら、最新のデータをもう一度取得し直す
      const updatedPlans = await findAllPlans();
      // 3. 最新のデータで状態を更新し、画面に反映させる
      setPlans(updatedPlans);
    } catch (error) {
      console.error('予定の削除に失敗:', error);
      alert("予定の削除に失敗しました。");
    }
  };

  // UIの記述
  return (
    <div>
      <Header />
      
      <main style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}>
        {/* クリックされたら selectedDate を更新するリモコン（onClickDate）を渡す */}
        <CalendarView 
          plans={plans} 
          onClickDate={(dateStr) => setSelectedDate(dateStr)} 
          // 削除用
          onClickDelete={handleDeletePlan}
        />

        {/* 入力フォーム部品を表示し、選択された日付と追加用リモコンを渡す */}
        <PlanForm 
          selectedDate={selectedDate} 
          onClickAddPlan={handleAddPlan} 
        />
      </main>
    </div>
  );
}

export default Home;