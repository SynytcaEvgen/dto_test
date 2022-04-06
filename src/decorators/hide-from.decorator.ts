import { Groups } from '../type/groups.enum';
import { Expose, ExposeOptions } from 'class-transformer';

export const HideFrom = (groups: Groups[], options: ExposeOptions = {}) =>
  Expose({
    ...options,
    groups: Object.values(Groups).filter((g) => !groups.includes(g)),
  });
