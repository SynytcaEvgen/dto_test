import { Expose, Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Groups } from '../../type/groups.enum';
import { PartnerDashboardAccountStatusesEnum } from '../../type/partner-dashboard-account-statuses.enum';
import { DashboardAccountMFATypesEnum } from '../../type/dashboard-account-mfa-types.enum';
import { PartnerSurveyStatusesEnum } from '../../type/partner-survey-statuses.enum';
import { PartnerSurveyApproveStatusesEnum } from '../../type/partner-survey-approve-statuses.enum';

import { Partner } from './partner.entity';
import { environment } from '../../config/environment';

@Entity()
export class PartnerDashboardAccount {
  @PrimaryColumn('uuid')
  @Expose({
    groups: [Groups.ADMIN],
  })
  id: string;

  @OneToOne(() => Partner, (partner: Partner) => partner.dashboardAccount)
  @JoinColumn({ name: 'id' })
  @Expose({
    groups: [Groups.ADMIN],
  })
  partner: Partner;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    nullable: true,
  })
  phone?: string;

  @Column('text')
  @Exclude()
  password: string;

  @Column('text', {
    default: PartnerDashboardAccountStatusesEnum.ACTIVE,
  })
  @Expose({
    groups: [Groups.ADMIN],
  })
  status: PartnerDashboardAccountStatusesEnum;

  @Column('text', { default: PartnerSurveyStatusesEnum.INITIAL })
  surveyStatus: PartnerSurveyStatusesEnum;

  @Column('text', { default: PartnerSurveyApproveStatusesEnum.PENDING })
  surveyApproveStatus: PartnerSurveyApproveStatusesEnum;

  @Expose({
    groups: [Groups.ADMIN],
  })
  @Column('text', { nullable: true })
  surveyToken: string;

  @Expose({
    groups: [Groups.ADMIN],
  })
  @Column('text', { nullable: true })
  surveyDocumentsLink: string;

  @Expose({
    groups: [Groups.ADMIN],
  })
  @Column('text', { nullable: true })
  surveyData: string;

  @Expose()
  get surveyLink() {
    return this.surveyToken
      ? `${environment.surveyHosts.web}/${this.surveyToken}`
      : null;
  }

  @Column('int', {
    default: 5,
  })
  @Expose({
    groups: [Groups.ADMIN],
  })
  maxLoginAttempts: number;

  @Column('int', {
    default: 0,
  })
  @Expose({
    groups: [Groups.ADMIN],
  })
  failedLoginAttempts: number;

  @Column('boolean', {
    default: false,
  })
  isMFAEnabled: boolean;

  @Column('text', {
    nullable: true,
  })
  MFAType: DashboardAccountMFATypesEnum;

  @UpdateDateColumn()
  @Expose({
    groups: [Groups.ADMIN],
  })
  updatedAt: Date;

  @CreateDateColumn()
  @Expose({
    groups: [Groups.ADMIN],
  })
  createdAt: Date;
}
