import { Min, Max, IsIn, ValidateIf, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

import { FeeConfig } from '../../interface/fee-config.interface';

export class FeeConfigAdminDto implements FeeConfig {
  @IsIn(['amount', 'percent', 'combined'])
  type: 'amount' | 'percent' | 'combined';

  @IsNumber()
  @Min(0)
  @Max(1_000_000_000)
  @Transform(({ value: v }) => (typeof v === 'number' ? v : v))
  @ValidateIf((fee: FeeConfig) => ['amount', 'combined'].includes(fee.type))
  amount?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @Transform(({ value: v }) => (typeof v === 'number' ? v : v))
  @ValidateIf((fee: FeeConfig) => ['percent', 'combined'].includes(fee.type))
  percent?: number;
}
