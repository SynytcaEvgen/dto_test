import {
  Entity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Partner } from './partner.entity';

@Entity()
export class PartnerInformation {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => Partner, (partner: Partner) => partner.information)
  @JoinColumn({
    name: 'id',
  })
  partner: Partner;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
