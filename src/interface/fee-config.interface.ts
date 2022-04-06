export interface FeeConfig {
  type: 'amount' | 'percent' | 'combined';
  amount?: number;
  percent?: number;
}
