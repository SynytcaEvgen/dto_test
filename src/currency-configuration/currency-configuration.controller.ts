import { Body, Controller, Param, Post, Get } from '@nestjs/common';

import { CurrencyConfigurationsAdminService } from './currency-configuration.service';
import { AddCurrencyConfigurationAdminDto } from './dto';

@Controller('admin')
export class CurrencyConfigurationsAdminController {
  constructor(private readonly service: CurrencyConfigurationsAdminService) {}

  @Post('partners')
  async createCurrencyConfiguration(
    @Body() dto: AddCurrencyConfigurationAdminDto,
  ) {
    return this.service.createConfiguration(dto);
  }

  @Get('get/:id')
  getTest(@Param('id') id: string) {
    return `works ${id}`;
  }
}
