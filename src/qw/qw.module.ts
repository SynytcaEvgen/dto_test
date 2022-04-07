import { Module } from '@nestjs/common';
import { QWController } from './qw.controller';

@Module({
  controllers: [QWController],
})
export class QWModule {}
