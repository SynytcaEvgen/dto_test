import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Groups } from '../../type/groups.enum';

import { CurrencyConfiguration } from './currency-configuration.entity';
import { Partner } from './partner.entity';
import { HideFrom } from '../../decorators/hide-from.decorator';
import { BaseTerminalConfiguration } from './base-terminal-configuration';
import { TerminalApiPermissionsEnum } from '../../type/terminal-api-permissions.enum';

@Entity('terminal')
@Index(['name', 'partner'], {
  unique: true,
})
export class Terminal {
  @PrimaryGeneratedColumn('uuid')
  @HideFrom([Groups.CLIENT])
  id: string;

  @ManyToOne(() => Partner, { nullable: false, eager: true })
  @Expose({
    groups: [Groups.ADMIN],
  })
  partner: Partner;

  @Column('text')
  @HideFrom([Groups.CLIENT])
  name: string;

  @Column('text', { nullable: true })
  @HideFrom([Groups.CLIENT])
  description?: string;

  @Column('boolean', {
    default: true,
  })
  @HideFrom([Groups.CLIENT])
  isActive: boolean;

  @Column('text', { unique: true })
  @HideFrom([Groups.CLIENT])
  publicKey: string;

  @Column('text', { unique: true })
  @HideFrom([Groups.CLIENT])
  secretKey: string;

  @OneToMany(
    () => CurrencyConfiguration,
    (configuration) => configuration.terminal,
  )
  @Expose({
    groups: [Groups.ADMIN],
  })
  currencyConfigurations: CurrencyConfiguration[];

  @Column({ unique: true })
  @Generated('uuid')
  publicLinkIdentifier: string;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @Column('jsonb', {
    default: {},
  })
  terminalConfiguration: BaseTerminalConfiguration;

  @Column({ type: 'simple-array', default: '' })
  apiPermissions: TerminalApiPermissionsEnum[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
