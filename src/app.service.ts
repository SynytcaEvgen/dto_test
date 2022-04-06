import {
  Injectable,
  BadRequestException,
  Type,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { TypeormHelper } from '@nt-backend/typeorm-helpers';

import { CurrencyConfiguration } from './db/entity/currency-configuration.entity';
import { Partner } from './db/entity/partner.entity';
import { ProcessingProvider } from './db/entity/processing-provider.entity';
import { Terminal } from './db/entity/terminal.entity';

import {
  UpdateCurrencyConfigurationAdminDto,
  AddCurrencyConfigurationAdminDto,
} from './dto';
import { CurrencyConfigurationOwnerType } from './type/currency-configuration-owner.type';
import { CurrencyConfigurationTypesEnum } from './type/currency-configuration-types.enum';

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
    private readonly typeormHelper: TypeormHelper,

    @InjectRepository(ProcessingProvider)
    private readonly processingProviderRepository: Repository<ProcessingProvider>,

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

    const owner = await this.typeormHelper.getEntityInstance(
      this.ownerEntityTypes[ownerType],
      {
        where: {
          id: ownerId,
        },
      },
    );

    const provider = await this.processingProviderRepository.findOne(
      dto.providerId,
    );

    if (!provider) {
      throw new BadRequestException('Specified provider not found');
    }

    const configuration = this.currencyConfigurationRepository.create({
      ...dto,
      [ownerType]: owner,
      currencyCode,
      provider,
      type,
    });

    return this.currencyConfigurationRepository.save(configuration);
  }

  async updateConfiguration(
    ownerType: CurrencyConfigurationOwnerType,
    ownerId: string,
    currencyCode: string,
    type: CurrencyConfigurationTypesEnum,
    dto: UpdateCurrencyConfigurationAdminDto,
  ) {
    if (!(ownerType in this.ownerEntityTypes)) {
      throw new BadRequestException('Wrong owner type');
    }

    const owner = await this.typeormHelper.getEntityInstance(
      this.ownerEntityTypes[ownerType],
      {
        where: {
          id: ownerId,
        },
      },
    );

    const configuration = await this.currencyConfigurationRepository.findOne({
      where: {
        [ownerType]: owner,
        currencyCode,
        type,
      },
    });

    if (!configuration) {
      throw new NotFoundException('Existing configuration not found');
    }

    const updateDto: DeepPartial<CurrencyConfiguration> = {
      ...dto,
    };

    if (dto.providerId) {
      const provider = await this.processingProviderRepository.findOne(
        dto.providerId,
      );

      if (!provider) {
        throw new BadRequestException('Specified provider not found');
      }

      updateDto.provider = provider;
    }

    return this.currencyConfigurationRepository.save(
      this.currencyConfigurationRepository.merge(configuration, updateDto),
    );
  }

  async deleteConfiguration(
    ownerType: CurrencyConfigurationOwnerType,
    ownerId: string,
    currencyCode: string,
    type: CurrencyConfigurationTypesEnum,
  ) {
    if (!(ownerType in this.ownerEntityTypes)) {
      throw new BadRequestException('Wrong owner type');
    }

    const owner = await this.typeormHelper.getEntityInstance(
      this.ownerEntityTypes[ownerType],
      {
        where: {
          id: ownerId,
        },
      },
    );

    const configuration = await this.currencyConfigurationRepository.findOne({
      where: {
        [ownerType]: owner,
        currencyCode,
        type,
      },
    });

    if (!configuration) {
      throw new NotFoundException('Existing configuration not found');
    }

    return this.currencyConfigurationRepository.remove(configuration);
  }
}
