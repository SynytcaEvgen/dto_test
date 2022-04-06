import { IsUrl, ArrayNotEmpty, IsIn } from 'class-validator';
import { ACCEPTABLE_CURRENCIES } from '../utils';

export class BaseProviderCredentials {
  @IsUrl({
    require_tld: false,
  })
  url: string;

  @IsIn(ACCEPTABLE_CURRENCIES, {
    each: true,
  })
  @ArrayNotEmpty()
  currencies: string[];
}
