import {
  BadRequestException,
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { IsInTypePipe } from '@nt-backend/core';

import { ACCEPTABLE_CURRENCIES } from './utils';

import { CurrencyConfigurationOwnerType } from './type/currency-configuration-owner.type';
import { CurrencyConfigurationsAdminService } from './app.service';
import {
  AddCurrencyConfigurationAdminDto,
  UpdateCurrencyConfigurationAdminDto,
} from './dto';
import { CurrencyConfigurationTypesEnum } from './type/currency-configuration-types.enum';
import { CURRENCY_CONFIGURATIONS_POSSIBLE_ACTIONS } from './currency-configuration-possible-actions';

@Controller('admin')
export class CurrencyConfigurationsAdminController {
  constructor(private readonly service: CurrencyConfigurationsAdminService) {}

  @Post('partners/:id/currency-configurations/:currencyCode/:type')
  async createPartnerCurrencyConfiguration(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('currencyCode', new IsInTypePipe(ACCEPTABLE_CURRENCIES))
    currencyCode: string,
    @Param('type', new IsInTypePipe(CurrencyConfigurationTypesEnum))
    type: CurrencyConfigurationTypesEnum,
    @Body() dto: AddCurrencyConfigurationAdminDto,
    @Req() req: Request,
  ) {
    return this.service.createConfiguration(
      this.getOwner(req.path),
      id,
      currencyCode,
      type,
      dto,
    );
  }

  @Patch('partners/:id/currency-configurations/:currencyCode/:type')
  async updateCurrencyConfiguration(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('currencyCode', new IsInTypePipe(ACCEPTABLE_CURRENCIES))
    currencyCode: string,
    @Param('type', new IsInTypePipe(CurrencyConfigurationTypesEnum))
    type: CurrencyConfigurationTypesEnum,
    @Body() dto: UpdateCurrencyConfigurationAdminDto,
    @Req() req: Request,
  ) {
    return this.service.updateConfiguration(
      this.getOwner(req.path),
      id,
      currencyCode,
      type,
      dto,
    );
  }

  private getOwner(path: string) {
    const ownerType = /admin\/(?<type>partners|terminals)/.exec(path)?.groups
      ?.type;

    if (!ownerType) {
      throw new BadRequestException(
        'Invalid owner type for currency configuration',
      );
    }

    return ownerType.slice(0, -1) as CurrencyConfigurationOwnerType;
  }
}
