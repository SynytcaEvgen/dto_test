import {
  ValidateNested,
  IsBoolean,
  IsUUID,
  IsDefined,
  IsOptional,
  Matches,
  Min,
  Max,
  IsIn,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { FeeConfigAdminDto } from './fee-config.admin.dto';
import { CurrencyConfigurationTypesEnum } from '../../type/currency-configuration-types.enum';

export class AddCurrencyConfigurationAdminDto {
  @IsIn(Object.values(CurrencyConfigurationTypesEnum))
  type: CurrencyConfigurationTypesEnum;

  @IsBoolean()
  isEnabled = true;

  @IsDefined()
  @ValidateNested()
  @Type(() => FeeConfigAdminDto)
  fee: FeeConfigAdminDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FeeConfigAdminDto)
  affiliateIncome?: FeeConfigAdminDto;

  @IsUUID()
  providerId: string;

  @IsOptional()
  @Matches(/^\s*(\d+Y)?\s*(\d+M)?\s*(\d+D)?\s*$/, {
    message: 'Period fields should be like "1Y1M1D"',
  })
  @Transform(({ value: v }) => (v === null ? (v = '0D') : v))
  rollingReservePeriod: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  @Transform(({ value: v }) =>
    typeof v === 'number' ? Number(v.toFixed(3)) : v,
  )
  rollingReservePercentage: number;

  @IsOptional()
  @IsBoolean()
  isActionsRestricted?: boolean;

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  allowedActions?: string[];
}
