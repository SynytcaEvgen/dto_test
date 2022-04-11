import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyConfiguration } from '../db/entity/currency-configuration.entity';
import { Partner } from '../db/entity/partner.entity';
import { Terminal } from '../db/entity/terminal.entity';
import { ProcessingProvider } from '../db/entity/processing-provider.entity';
import { CurrencyConfigurationsAdminController } from './currency-configuration.controller';
import { CurrencyConfigurationsAdminService } from './currency-configuration.service';
import { PartnerInformation } from '../db/entity/partner-information.entity';
import { PartnerDashboardAccount } from '../db/entity/partner-dashboard-account.entity';
import { PartnerWhitelistedIp } from '../db/entity/partner-whitelisted-ip.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CurrencyConfiguration,
      Partner,
      Terminal,
      ProcessingProvider,
      PartnerInformation,
      PartnerDashboardAccount,
      PartnerWhitelistedIp,
    ]),
  ],
  controllers: [CurrencyConfigurationsAdminController],
  providers: [CurrencyConfigurationsAdminService],
})
export class CurrencyConfigurationsModule {}
