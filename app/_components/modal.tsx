import React, { ReactNode } from "react";

// モーダルが受け取るProps（引数）の型定義
interface ModalProps {
  isOpen: boolean;        // 開いているかどうかの判定
  onClose: () => void;    // 閉じるための関数
  children: ReactNode;    // modal.tsxをモーダルたらしめる記述。page.tsxで<Modal ***>***</Modal>にあるような***をそのままchildrenとして受け取る。
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // isOpen が false なら、何も表示しない（nullを返す）
  if (!isOpen) {
    return null;
  }

  return (
    // 1. 背景の半透明の黒い部分（ここをクリックしても閉じるようにする）
    <div 
      style={{
        // スクロール状態に関係なく、画面全体でモーダルを表示させる
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        // 背景に透明度50%の黒を設定
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
      }}
      onClick={onClose}
    >
       {/* 2. モーダル本体（白い箱） */}
      <div 
        style={{
          backgroundColor: "white", padding: "35px 20px 20px 20px", borderRadius: "8px",
          width: "90%", maxWidth: "500px", position: "relative"
        }}
        onClick={(e) => e.stopPropagation()} // モーダル本体をクリックした時は、背景クリック判定（閉じる）を無効にする
      >
        {/* 右上のバツボタン */}
        <button 
          onClick={onClose} 
          style={{ position: "absolute", top: "5px", right: "15px", cursor: "pointer", border: "none", background: "none", fontSize: "1.2rem" }}
        >
          ✖
        </button>
        
        {/* ここにpage.tsxから渡された中身（PlanFormなど）が入る */}
        {children}
      </div>
    </div>
  );
};

export default Modal;