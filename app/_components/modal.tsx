import React, { ReactNode } from "react";

// モーダルが受け取るProps（引数）の型定義
interface ModalProps {
  isOpen: boolean;        // 開いているかどうかの判定
  onClose: () => void;    // 閉じるための関数
  children: ReactNode;    // モーダルの中身（フォームなど）
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // isOpen が false なら、何も表示しない（nullを返す）
  if (!isOpen) return null;

  return (
    // 1. 背景の半透明の黒い部分（ここをクリックしても閉じるようにする）
    <div 
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000 // カレンダーより手前に出す
      }}
      onClick={onClose}
    >
       {/* 2. モーダル本体の白い箱 */}
      <div 
        style={{
          backgroundColor: "white", padding: "20px", borderRadius: "8px",
          width: "90%", maxWidth: "500px", position: "relative"
        }}
        onClick={(e) => e.stopPropagation()} // 白い箱の中をクリックした時は、背景クリック判定（閉じる）を無効にする
      >
        {/* 右上のバツボタン */}
        <button 
          onClick={onClose} 
          style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", border: "none", background: "none", fontSize: "1.2rem" }}
        >
          ✖
        </button>
        
        {/* ここに、page.tsxから渡された中身（PlanFormなど）が入る */}
        {children}
      </div>
    </div>
  );
};

export default Modal;