import { Controller, Param, Get } from '@nestjs/common';

@Controller('qw')
export class QWController {
  @Get('get/:id')
  getTest(@Param('id') id: string) {
    return `works ${id}`;
  }
}
