import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyConfiguration } from '../db/entity/currency-configuration.entity';
import { CurrencyConfigurationsAdminController } from './currency-configuration.controller';
import { CurrencyConfigurationsAdminService } from './currency-configuration.service';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyConfiguration])],
  controllers: [CurrencyConfigurationsAdminController],
  providers: [CurrencyConfigurationsAdminService],
})
export class CurrencyConfigurationsModule {}
