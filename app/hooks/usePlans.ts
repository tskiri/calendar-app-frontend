// 予定データの取得・追加・更新ロジック

import { useState, useEffect, useCallback } from "react";
import { PlanData } from "../lib/types";
import * as plansApi from "../lib/plansApi";


export const usePlans = () => {
  // 画面が開いた瞬間。バックエンドから帰ってくるデータの格納場所を定義
  const [plans, setPlans] = useState<PlanData[]>([]);

  // データの再取得
  // 🔴 useCallbackとは
  const loadPlans = useCallback(async () => {
    try {
      const data = await plansApi.getPlans();
      setPlans(data);
    } catch (error) {
      console.error("予定の取得に失敗しました:", error);
    }
  }, []);


  // 初回マウント時に自動で取得
  // 第二引数に[loadPlans]を指定することで、[loadPlans]に変更があれば再描画するようにしている。この第二引数を指定しないと無限ループになる。
  useEffect(() => {
    loadPlans();
  }, [loadPlans]);


  // 各種操作（操作後に自動で最新データを取得し直す）
  const addPlan = async (newPlan: Omit<PlanData, "id">) => {
    await plansApi.createPlan(newPlan);
    await loadPlans();
  };

  const editPlan = async (id: number, updatedPlan: Omit<PlanData, "id">) => {
    await plansApi.updatePlan(id, updatedPlan);
    await loadPlans();
  };

  const removePlan = async (id: number) => {
    await plansApi.deletePlan(id);
    await loadPlans();
  };

  return { plans, addPlan, editPlan, removePlan };
};