"use client";
import { useState, useEffect } from "react";
import CalendarView from "./_components/CalendarView";
import PlanForm from "./_components/PlanForm";
import { PlanData } from "./_interfaces/PlanData";
import { findAllPlans, createPlan, deletePlan, updatePlan } from "./api/plans";
import Modal from "./_components/modal";
import PlanDetail from "./_components/PlanDetail";


const Home = () => {
  // 画面が開いた瞬間。バックエンドから帰ってくるデータの格納場所を定義
  const [plans, setPlans] = useState<PlanData[]>([]);
  // カレンダーでクリックされた日付を記憶する場所
  const [selectedDate, setSelectedDate] = useState<string>("");
  // 後々、詳細表示の時はPlanData、新規作成の時はnullをselectedPlanに入れたいのでこの記述にしている。初期値はnull。
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  // モーダルのON/OFF。初期値はOFF。
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


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


  // 予定の新規作成
  const handleAddPlan = async (newPlan: Omit<PlanData, "id">) => {
    try {
      // 1. バックエンドにデータを送信して保存
      await createPlan(newPlan);
      // 2. 保存に成功したら、最新のデータをもう一度取得し直す
      const updatedPlans = await findAllPlans();
      // 3. 最新のデータで状態を更新し、画面に反映させる
      setPlans(updatedPlans);
      // 保存に成功したら追加モーダルを閉じる
      setIsModalOpen(false);
    } catch (error) {
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
      alert("予定の削除に失敗しました。");
    }
  };


  // 予定を更新（編集）する関数
  const handleUpdatePlan = async (id: number, updatedPlan: Omit<PlanData, "id">) => {
    try {
      // 1. APIクライアントを使って、バックエンドのデータを更新
      await updatePlan(id, updatedPlan);
      // 2. 更新に成功したら、最新のデータをもう一度取得し直す
      const updatedPlans = await findAllPlans();
      // 3. 最新のデータで状態を更新し、カレンダーの画面に反映させる
      setPlans(updatedPlans);
      // 4. 編集が終わったら自動でモーダルを閉じる
      setIsModalOpen(false);
    } catch (error) {
      alert("予定の更新に失敗しました。");
    }
  };


  const handleSelectPlan = (plan: PlanData) => {
    setSelectedPlan(plan); // クリックされた予定データを保存
    setIsModalOpen(true);  // モーダルを開く
  };


  // renderBodyの定義
  const renderBody = () => {
    // 1. もし選択された予定が null なら「新規追加フォーム」を出す
    if (selectedPlan === null) {
      return (
        <PlanForm selectedDate={selectedDate} onClickAddPlan={handleAddPlan} />
      );
    }
    // 2. 🌟 選択された予定があるなら、今作った「詳細画面」を出す！
    return (
      <PlanDetail 
        plan={selectedPlan} 
        onClose={() => setIsModalOpen(false)} 
        onDelete={handleDeletePlan} 
        onUpdate={handleUpdatePlan}
      />
    );
  };


  // UIの記述
  return (
    <div>
      <main style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "40px" }}>
        {/* クリックされたら selectedDate を更新するリモコン（onClickDate）を渡す */}
        <CalendarView 
          plans={plans} 
          // 日付マスをクリックした時
          onClickDate={(dateStr) => {
            setSelectedDate(dateStr);
            setSelectedPlan(null); // 新規追加なので選択された予定をクリア
            setIsModalOpen(true);  // モーダルを開く
          }}
          // 削除ボタンを押したとき
          onClickDelete={handleDeletePlan}
          // 予定のタイトルをクリックした時
          onClickPlanTitle={handleSelectPlan}
        />
        
        {/* 中身が入れ替わるモーダル部品 */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} // ✖ボタンや背景を押したら閉じる
        >
          {/* renderBody関数を呼び出して、状況に応じた中身を動的に表示する */}
          {renderBody()} 
        </Modal>

      </main>
    </div>
  );
}

export default Home;