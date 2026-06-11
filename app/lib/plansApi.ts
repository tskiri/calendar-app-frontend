// エンドポイントの定義

import { PlanData } from './types';
import { apiClient } from './apiClient';


export const getPlans = async (): Promise<PlanData[]> => {
  const response = await apiClient.get<PlanData[]>('/plans/');
  return response.data;
};

export const createPlan = async (planForm: Omit<PlanData, 'id'>): Promise<void> => {
  await apiClient.post('/plans/', planForm);
};

export const updatePlan = async (id: number, planForm: Omit<PlanData, 'id'>): Promise<void> => {
  await apiClient.put(`/plans/${id}`, planForm);
};

export const deletePlan = async (id: number): Promise<void> => {
  await apiClient.delete(`/plans/${id}`);
};