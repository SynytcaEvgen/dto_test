import { Column, Entity, PrimaryGeneratedColumn, Check } from 'typeorm';

import { PostgresInterval } from '../../interface/postgres-interval.interface';

import { CurrencyConfigurationTypesEnum } from '../../type/currency-configuration-types.enum';

@Entity('currency_configuration')
@Check(`"type" = '${CurrencyConfigurationTypesEnum.PROCESSING}'`)
export class CurrencyConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: CurrencyConfigurationTypesEnum;

  @Column('interval', { nullable: true })
  rollingReservePeriod: PostgresInterval | string;

  @Column('float', { nullable: true })
  rollingReservePercentage: number;
}
