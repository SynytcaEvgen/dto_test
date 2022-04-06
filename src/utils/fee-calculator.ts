import { amountPrettifier } from '@nt-backend/core';

import { FeeConfig } from '@app/domain';

export class FeeCalculator {
  static calculate(amount: number, feeConfig: FeeConfig): number {
    let fee: number;

    switch (feeConfig.type) {
      case 'amount':
        fee = feeConfig.amount;
        break;
      case 'percent':
        fee = this.calculatePercentage(amount, feeConfig.percent);
        break;
      case 'combined':
        fee =
          feeConfig.amount +
          this.calculatePercentage(amount, feeConfig.percent);
        break;
    }

    return fee;
  }

  private static calculatePercentage(amount: number, percent: number) {
    if (percent === 0) {
      return 0.00;
    }
    return Math.max(amountPrettifier((amount * percent) / 100), 0.01);
  }
}
