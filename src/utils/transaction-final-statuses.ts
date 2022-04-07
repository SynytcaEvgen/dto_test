import { TransactionStatusesEnum } from '../type/transaction-statuses.enum';

export const TRANSACTION_FINAL_STATUSES: TransactionStatusesEnum[] = [
  TransactionStatusesEnum.FAILED,
  TransactionStatusesEnum.CANCELLED,
  TransactionStatusesEnum.EXPIRED,
  TransactionStatusesEnum.REVERSED,
  TransactionStatusesEnum.SUCCESS,
];
