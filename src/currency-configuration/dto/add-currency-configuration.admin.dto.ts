// eslint-disable-next-line prettier/prettier
import {
  IsOptional,
  Matches,
  Min,
  Max,
  IsNumber,
  IsIn,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CurrencyConfigurationTypesEnum } from '../../type/currency-configuration-types.enum';

export class AddCurrencyConfigurationAdminDto {
  @IsIn(Object.values(CurrencyConfigurationTypesEnum))
  type: CurrencyConfigurationTypesEnum;

  @IsOptional()
  @Matches(/^\s*(\d+Y)?\s*(\d+M)?\s*(\d+D)?\s*$/, {
    message: 'Period fields should be like "1Y1M1D"',
  })
  rollingReservePeriod?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  @Transform(({ value: v }) =>
    typeof v === 'number' ? Number(v.toFixed(3)) : v,
  )
  rollingReservePercentage?: number;
}
