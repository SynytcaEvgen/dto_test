import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: Request = ctx?.switchToHttp()?.getRequest();

    return req?.headers?.['x-real-ip'] ?? req?.headers?.['ip'];
  },
);
