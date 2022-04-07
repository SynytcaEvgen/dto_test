import { CurrencyConfigurationTypesEnum } from '../type/currency-configuration-types.enum';
import { TransactionTypesEnum } from '../type/transaction-types.enum';

export const CURRENCY_CONFIGURATIONS_POSSIBLE_ACTIONS: Record<
  CurrencyConfigurationTypesEnum,
  string[]
> = {
  [CurrencyConfigurationTypesEnum.PROCESSING]:
    Object.values(TransactionTypesEnum),
  [CurrencyConfigurationTypesEnum.FORWARD_P2P]: [],
  [CurrencyConfigurationTypesEnum.WITHDRAWALS]: [],
};
