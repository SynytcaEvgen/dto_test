import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class IsInTypePipe<T extends object>
  implements PipeTransform<string>
{
  private readonly enumerable;
  constructor(enumerable: T);
  transform(value: string, { data }: ArgumentMetadata): string;
}
