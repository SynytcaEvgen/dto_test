import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Groups } from '../../type/groups.enum';

import { PartnerInformation } from './partner-information.entity';
import { PartnerWhitelistedIp } from './partner-whitelisted-ip.entity';
import { PartnerDashboardAccount } from './partner-dashboard-account.entity';
import { CurrencyConfiguration } from './currency-configuration.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  @Expose({
    groups: [Groups.ADMIN],
  })
  id: string;

  @Column('uuid', { nullable: true })
  @Exclude()
  affiliateId?: string;

  @ManyToOne(() => Partner, { nullable: true })
  @JoinColumn({
    name: 'affiliateId',
  })
  @Expose({
    groups: [Groups.ADMIN],
  })
  affiliate?: Partner;

  @OneToOne(
    () => PartnerInformation,
    (information: PartnerInformation) => information.partner,
  )
  @Expose({
    groups: [Groups.ADMIN],
  })
  information: PartnerInformation;

  @OneToOne(
    () => PartnerDashboardAccount,
    (account: PartnerDashboardAccount) => account.partner,
  )
  @Expose({
    groups: [Groups.ADMIN],
  })
  dashboardAccount: PartnerDashboardAccount;

  // @OneToMany(
  //   () => CurrencyConfiguration,
  //   (configuration) => configuration.partner,
  // )
  // @Expose({
  //   groups: [Groups.ADMIN],
  // })
  // currencyConfigurations: CurrencyConfiguration[];

  @Column('text')
  @Expose({
    groups: [Groups.ADMIN],
  })
  name: string;

  @Column('boolean', {
    default: true,
  })
  @Expose({
    groups: [Groups.ADMIN],
  })
  isActive: boolean;

  @Column('boolean', {
    default: true,
  })
  @Expose({
    groups: [Groups.ADMIN],
  })
  isIpWhitelisted: boolean;

  @OneToMany(
    () => PartnerWhitelistedIp,
    (whitelistedIp) => whitelistedIp.partner,
  )
  @Expose({
    groups: [Groups.ADMIN],
  })
  whitelistedIps: PartnerWhitelistedIp[];

  @CreateDateColumn()
  @Expose({
    groups: [Groups.ADMIN],
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose({
    groups: [Groups.ADMIN],
  })
  updatedAt: Date;
}
