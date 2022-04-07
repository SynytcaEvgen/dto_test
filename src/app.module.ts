import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyConfiguration } from './db/entity/currency-configuration.entity';
import { QWModule } from './qw/qw.module';
import { CurrencyConfigurationsModule } from './currency-configuration/currency-configuration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Maseratti2020',
      database: 'current_config',
      synchronize: true,
      entities: [CurrencyConfiguration],
    }),
    QWModule,
    CurrencyConfigurationsModule,
  ],
})
export class AppModule {}
