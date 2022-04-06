import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { FeeConfig } from '../../interface/fee-config.interface';

import { Partner } from './partner.entity';
import { ProcessingProvider } from './processing-provider.entity';
import { PostgresInterval } from '../../interface/postgres-interval.interface';
import { Terminal } from './terminal.entity';
import { CurrencyConfigurationTypesEnum } from '../../type/currency-configuration-types.enum';

@Entity('currency_configuration')
@Unique(['partner', 'currencyCode', 'type'])
@Unique(['terminal', 'currencyCode', 'type'])
@Check(`
  "partnerId" is not null or "terminalId" is not null
`)
@Check(`
  type != '${CurrencyConfigurationTypesEnum.PROCESSING}'
  or ("rollingReservePercentage" is not null and "rollingReservePeriod" is not null) 
`)
export class CurrencyConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Partner, { nullable: true })
  partner: Partner;

  @ManyToOne(() => Terminal, { nullable: true })
  terminal?: Terminal;

  @Column('text')
  currencyCode: string;

  @Column('text')
  type: CurrencyConfigurationTypesEnum;

  @Column('boolean', {
    default: true,
  })
  isEnabled: boolean;

  @Column('jsonb')
  fee: FeeConfig;

  @Column('jsonb', { nullable: true })
  affiliateIncome?: FeeConfig;

  @Column('interval', { nullable: true })
  rollingReservePeriod?: PostgresInterval | string | null;

  @Column('float', { nullable: true })
  rollingReservePercentage?: number | null;

  @Column('boolean', { default: false })
  isActionsRestricted: boolean;

  @Column('text', { array: true, nullable: true })
  allowedActions?: string[];

  @Column('double precision', { nullable: true })
  minAmount?: number;

  @Column('double precision', { nullable: true })
  maxAmount?: number;

  @ManyToOne(() => ProcessingProvider, { nullable: false })
  provider: ProcessingProvider;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
