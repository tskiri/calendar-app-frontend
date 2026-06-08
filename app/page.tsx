'use client'
import { useEffect, useState } from 'react';
import { PlanData } from "./_interfaces/PlanData";
import { findAllPlans } from "./api/plans";
import Header from './_component/Header';
import CalendarView from "./_component/CalendarView";


const Home = () => {
  // 画面が開いた瞬間。バックエンドから帰ってくるデータの格納場所を定義
  const [plans, setPlans] = useState<PlanData[]>([]);

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
  }, []);

  // UIの記述
return (
    <div>
      <Header />
      
      <main>
        <CalendarView plans={plans} />
      </main>
    </div>
  );
}

export default Home;