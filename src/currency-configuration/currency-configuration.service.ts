import { Injectable, BadRequestException, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CurrencyConfiguration } from '../db/entity/currency-configuration.entity';

import { AddCurrencyConfigurationAdminDto } from './dto';

import { CurrencyConfigurationOwnerType } from '../type/currency-configuration-owner.type';
import { CurrencyConfigurationTypesEnum } from '../type/currency-configuration-types.enum';
import { Partner } from '../db/entity/partner.entity';
import { Terminal } from '../db/entity/terminal.entity';

@Injectable()
export class CurrencyConfigurationsAdminService {
  private readonly ownerEntityTypes: Record<
    CurrencyConfigurationOwnerType,
    Type<any>
  > = {
    partner: Partner,
    terminal: Terminal,
  };
  constructor(
    @InjectRepository(CurrencyConfiguration)
    private readonly currencyConfigurationRepository: Repository<CurrencyConfiguration>,
  ) {}
  async createConfiguration(
    ownerType: CurrencyConfigurationOwnerType,
    ownerId: string,
    currencyCode: string,
    type: CurrencyConfigurationTypesEnum,
    dto: AddCurrencyConfigurationAdminDto,
  ): Promise<CurrencyConfiguration> {
    if (!(ownerType in this.ownerEntityTypes)) {
      throw new BadRequestException('Wrong owner type');
    }
    this.cheackTerminal(ownerType);
    const owner = {
      createdAt: '2022-04-06T11:14:36.514Z',
      id: '0051cce2-a4d3-497e-8e73-b1a1ccd40bbc',
      isActive: true,
      isIpWhitelisted: false,
      name: 'test 0604',
      updatedAt: '2022-04-06T11:14:36.514Z',
    };
    const configuration = this.currencyConfigurationRepository.create({
      ...dto,
      // [ownerType]: owner,
      currencyCode,
      // provider: {
      //   id: 'c995105d-0587-45af-98d4-cd77060489d8',
      //   name: 'UPC Money transfer',
      //   createdAt: '2022-01-11T12:08:48.434Z',
      //   updatedAt: '2022-02-09T11:32:49.767Z',
      // },
      type,
    });

    return this.currencyConfigurationRepository.save(configuration);
  }
  private cheackTerminal(owner) {
    if (owner === 'terminal') {
      throw new BadRequestException(
        'Currency configuration in the terminal temporarily blocked',
      );
    }
  }
}
