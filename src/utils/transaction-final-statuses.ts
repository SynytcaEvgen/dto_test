import { TransactionStatusesEnum } from '../enums';

export const TRANSACTION_FINAL_STATUSES: TransactionStatusesEnum[] = [
  TransactionStatusesEnum.FAILED,
  TransactionStatusesEnum.CANCELLED,
  TransactionStatusesEnum.EXPIRED,
  TransactionStatusesEnum.REVERSED,
  TransactionStatusesEnum.SUCCESS,
];
