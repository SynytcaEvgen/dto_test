import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Groups } from '../../type/groups.enum';

import { Partner } from './partner.entity';

@Entity()
@Index(['partner', 'ip'], {
  unique: true,
})
export class PartnerWhitelistedIp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Partner)
  partner: Partner;

  @Column('text')
  @Expose({
    groups: [Groups.ADMIN],
  })
  ip: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
