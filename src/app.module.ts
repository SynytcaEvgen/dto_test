import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '@nt-backend/core';
import { LoggerModule } from '@nt-backend/logger';

import { CurrencyConfiguration } from './db/entity/currency-configuration.entity';
import { Partner } from './db/entity/partner.entity';
import { Terminal } from './db/entity/terminal.entity';
import { ProcessingProvider } from './db/entity/processing-provider.entity';
import { PartnerInformation } from './db/entity/partner-information.entity';
import { QWModule } from './qw/qw.module';
import { CurrencyConfigurationsModule } from './currency-configuration/currency-configuration.module';
import { PartnerDashboardAccount } from './db/entity/partner-dashboard-account.entity';
import { PartnerWhitelistedIp } from './db/entity/partner-whitelisted-ip.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [
        CurrencyConfiguration,
        Partner,
        Terminal,
        ProcessingProvider,
        PartnerInformation,
        PartnerDashboardAccount,
        PartnerWhitelistedIp,
      ],
    }),
    LoggerModule.registerElastic('securepaycard'),
    CoreModule.registerDefaultAsync({
      useFactory: () => {
        return {
          enableInterceptors: {
            transform: null,
          },
          enablePipes: {
            validation: {
              transform: true,
              transformOptions: {
                enableImplicitConversion: true,
              },
            },
          },
        };
      },
    }),
    QWModule,
    CurrencyConfigurationsModule,
  ],
})
export class AppModule {}
