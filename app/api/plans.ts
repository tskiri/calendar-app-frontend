import axios from 'axios';
import { EventType, PlanData } from '../_interfaces/PlanData';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// 予定一覧を取得
export const findAllPlans = async (): Promise<PlanData[]> => {
  try{
    const response = await api.get<PlanData[]>('/plans/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('予定の取得に失敗しました');
    }
    throw error;
  }
};

// 予定の新規作成
// Omit：補集合の形にしてカラムを羅列しないので、簡潔に書ける。
// ここはリクエスト段階であり、idがまだ振られていないため、PlanDataから除外する。
export const createPlan = async (planForm: Omit<PlanData, 'id'>): Promise<void> => {
  try {
    await api.post('/plans/', planForm);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('予定の作成に失敗しました');
    }
    throw error;
  }
};

// 予定の削除
export const deletePlan = async (id: number) :Promise<void> => {
  try {
    await api.delete(`/plans/${id}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('予定の削除に失敗しました');
    }
  throw error;
  }
};

// 予定の更新（編集）
export const updatePlan = async (id: number, planForm: Omit<PlanData, 'id'>): Promise<void> => {
  try {
    // どのIDを書き換えるかをURLで指定し、新しいデータを一緒に送る（PUT送信）
    await api.put(`/plans/${id}`, planForm);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('予定の更新に失敗しました');
    }
    throw error;
  }
};