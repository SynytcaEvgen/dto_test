import {
  IsBoolean,
  ValidateNested,
  IsUUID,
  IsOptional,
  IsPositive,
  Matches,
  Max,
  Min,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { FeeConfigAdminDto } from './fee-config.admin.dto';

export class UpdateCurrencyConfigurationAdminDto {
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => FeeConfigAdminDto)
  fee?: FeeConfigAdminDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FeeConfigAdminDto)
  affiliateIncome?: FeeConfigAdminDto;

  @IsUUID()
  @IsOptional()
  providerId?: string;

  @IsOptional()
  @Matches(/^\s*(\d+Y)?\s*(\d+M)?\s*(\d+D)?\s*$/, {
    message: 'Period fields should be like "1Y1M1D"',
  })
  rollingReservePeriod?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  @Transform(({ value: v }) =>
    typeof v === 'number' ? Number(v.toFixed(3)) : v,
  )
  rollingReservePercentage?: number | null;

  @IsOptional()
  @IsBoolean()
  isActionsRestricted?: boolean;

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  allowedActions?: string[];
}
