import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;        
  onClose: () => void;    
  children: ReactNode;    
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    // 1. 背景の半透明の黒い部分
    <div 
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {/* 2. モーダル本体の白い箱 */}
      <div 
        style={{
          backgroundColor: "white", 
          // バツボタンの下にフォームが始まるための安全地帯（上だけ35px）
          padding: "35px 20px 20px 20px", 
          borderRadius: "8px",
          width: "90%", maxWidth: "500px", 
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* 右上のバツボタン */}
        <button 
          onClick={onClose} 
          style={{ 
            position: "absolute", 
            top: "15px", 
            right: "15px", 
            cursor: "pointer", 
            border: "none", 
            background: "none", 
            fontSize: "1.2rem",
            color: "#999"
          }}
        >
          ✖
        </button>
        
        {/* ここに渡された中身（PlanFormやPlanDetail）が入る */}
        {children}
      </div>
    </div>
  );
};

export default Modal;