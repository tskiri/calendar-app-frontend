// 色やスタイルの定義

import { EventType } from "./types";


// 予定の種別ごとに背景色と文字色を返す関数
export const getPlanColors = (type: EventType) => {
  switch (type) {
    case "OFFICIAL":
      return { bg: "#e8f5e9", text: "#2e7d32" };
    case "TASK":
      return { bg: "#fff3e0", text: "#e65100" };
    case "PRIVATE":
    default:
      return { bg: "#e3f2fd", text: "#1e88e5" };
  }
};