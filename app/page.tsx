"use client";
import { useState } from "react";
import { usePlans } from "./hooks/usePlans";
import { PlanData } from "./lib/types";
import { CalendarBoard } from "./components/calendar/CalendarBoard";
import { PlanForm } from "./components/plans/PlanForm";
import { PlanDetail } from "./components/plans/PlanDetail";
import Modal from "./components/Modal"


const Home = () => {
  // hooksからデータと操作メソッドを受け取る
  const { plans, addPlan, editPlan, removePlan } = usePlans();


  // ページ側で持つべきUI状態（モーダル関連）
  const [selectedDate, setSelectedDate] = useState<string>("");
  // 後々、詳細表示の時はPlanData、新規作成の時はnullをselectedPlanに入れたいのでこの記述にしている。初期値はnull。
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);
  // モーダルのON/OFF。初期値はOFF。
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  // モーダルの中身を出し分ける関数
const renderModalContent = () => {
    if (selectedPlan === null) {
      return (
        <PlanForm 
          selectedDate={selectedDate} 
          onClickAddPlan={async (plan) => {
            await addPlan(plan);
            setIsModalOpen(false);
          }} 
        />
      );
    }
    return (
      <PlanDetail 
        plan={selectedPlan} 
        onClose={() => setIsModalOpen(false)} 
        onDelete={async (id) => {
          await removePlan(id);
          setIsModalOpen(false);
        }} 
        onUpdate={async (id, plan) => {
          await editPlan(id, plan);
          setIsModalOpen(false);
        }}
      />
    );
  };

  return (
    <div>
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "20px 10px 40px 10px" }}>
        
        <CalendarBoard 
          plans={plans}
          onClickDate={(dateStr) => {
            setSelectedDate(dateStr);
            setSelectedPlan(null); 
            setIsModalOpen(true);  
          }}
          onClickPlan={(plan) => {
            setSelectedPlan(plan); 
            setIsModalOpen(true);  
          }}
        />
        
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {renderModalContent()} 
        </Modal>

      </main>
    </div>
  );
};

export default Home;