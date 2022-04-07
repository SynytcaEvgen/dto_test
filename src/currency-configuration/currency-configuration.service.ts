import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CurrencyConfiguration } from '../db/entity/currency-configuration.entity';

import { AddCurrencyConfigurationAdminDto } from './dto';

@Injectable()
export class CurrencyConfigurationsAdminService {
  constructor(
    @InjectRepository(CurrencyConfiguration)
    private readonly currencyConfigurationRepository: Repository<CurrencyConfiguration>,
  ) {}

  async createConfiguration(
    dto: AddCurrencyConfigurationAdminDto,
  ): Promise<CurrencyConfiguration> {
    console.log(dto);
    const configuration = this.currencyConfigurationRepository.create(dto);

    return this.currencyConfigurationRepository.save(configuration);
  }
}
