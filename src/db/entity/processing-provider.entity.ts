import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

import { ProcessingFlowsEnum } from '../../type/processing-flows.enum';
import { ProcessingProvidersEnum } from '../../type/processing-providers.enum';

import { BaseProviderCredentials } from '../base.provider-credentials';

@Entity()
export class ProcessingProvider<
  TCreds extends BaseProviderCredentials = BaseProviderCredentials,
  TConfig = unknown,
> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  type: ProcessingProvidersEnum;

  @Column('text', { default: ProcessingFlowsEnum.STANDARD })
  processingFlow: ProcessingFlowsEnum;

  @Column('jsonb', {
    default: {},
  })
  config: TConfig;

  credentials: TCreds;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
