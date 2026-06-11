// TypeScriptの型定義

export type EventType = 'OFFICIAL' | 'TASK' | 'PRIVATE';

export interface PlanData {
  id: number;
  title: string;
  eventType: EventType;
  startDate: string;
  endDate: string;
  description: string;
}