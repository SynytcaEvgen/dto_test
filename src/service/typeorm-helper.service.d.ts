import {
  FindOperator,
  Connection,
  ObjectType,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
} from 'typeorm';
import { TimestampedEntity } from './interfaces/timestamped-entity.interface';
import { NumberComparisonOperators } from './types/number-comparison-operators.type';
import { BaseListDto } from './dto/base-list.dto';
export declare class TypeormHelper {
  private readonly connection;
  private readonly NUMBER_COMPARISON_OPERATORS;
  private readonly NUMBER_COLUMN_TYPES;
  private readonly STRING_COLUMN_TYPES;
  constructor(connection: Connection);
  getEntityInstance<T>(
    entity: ObjectType<T>,
    options: FindOneOptions<T>,
  ): Promise<T>;
  getEntitiesList<
    T extends TimestampedEntity,
    R extends DeepPartial<T> = DeepPartial<T>,
  >(
    entity: ObjectType<T>,
    options: FindManyOptions<T>,
    {
      dateBounds,
      options: filterOptions,
      order,
      limit,
      skip,
      fields,
    }: BaseListDto<T>,
  ): Promise<{
    items: R[];
    count: number;
  }>;
  simpleUpdate<T>(
    entity: ObjectType<T>,
    options: FindOneOptions<T>,
    updateDto: DeepPartial<T>,
  ): Promise<T>;
  prepareSearchOptions<T extends TimestampedEntity>(
    entity: ObjectType<T>,
    options: FindOneOptions<T> | FindManyOptions<T>,
    { dateBounds, order, options: searchOptions, fields }?: BaseListDto<T>,
  ): FindOneOptions<T> | FindManyOptions<T>;
  parseNumberComparison(
    operator: NumberComparisonOperators,
    value: number | any,
    columnName?: string,
  ): any;
  createNumberEqualsOperator(
    columnName: string,
    n: number,
  ): FindOperator<number>;
}
