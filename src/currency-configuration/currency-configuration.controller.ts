import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Req,
  BadRequestException,
} from '@nestjs/common';

import { Request } from 'express';

import { CurrencyConfigurationsAdminService } from './currency-configuration.service';
import { AddCurrencyConfigurationAdminDto } from './dto';
import { CurrencyConfigurationTypesEnum } from '../type/currency-configuration-types.enum';
import { CurrencyConfigurationOwnerType } from '../type/currency-configuration-owner.type';

@Controller('admin')
export class CurrencyConfigurationsAdminController {
  constructor(private readonly service: CurrencyConfigurationsAdminService) {}

  @Post('partners/:id/currency-configurations/:currencyCode/:type')
  async createPartnerCurrencyConfiguration(
    @Param('id') id: string,
    @Param('currencyCode') currencyCode: string,
    @Param('type') type: CurrencyConfigurationTypesEnum,
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

  @Get('get/:id')
  getTest(@Param('id') id: string) {
    return `works ${id}`;
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
