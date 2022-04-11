import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class TerminalConfigurationAdditionalField {
  @IsString()
  name: string;

  @IsString()
  key: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsString()
  @IsOptional()
  defaultValue: string;

  @IsBoolean()
  editable: boolean;

  @IsBoolean()
  required: boolean;

  @IsNumber()
  maxLength: number;
}

export class BaseTerminalConfiguration {
  @IsUrl()
  imageLink: string;

  @ValidateNested({ each: true })
  @Type(() => TerminalConfigurationAdditionalField)
  additionalFields: [];
}
