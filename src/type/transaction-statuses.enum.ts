/*
  Transaction statuses from initial to final settled
*/
export enum TransactionStatusesEnum {
  INITIAL = 'initial',
  FLOW_INITIATED = 'flow-initiated',
  PRE_AUTHORIZED = 'pre-authorized',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  REVERSED = 'reversed',
  VERIFICATION = 'verification',
  EXISTING_CARD_CONFIRMATION = 'existing-card-confirmation',
  PROCESSING = 'processing',
  SUCCESS = 'success',
}
