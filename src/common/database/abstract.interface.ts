import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): Promise<T>;
  save(data: DeepPartial<T>): Promise<T>;

  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findOneById(id: string): Promise<T>;
  findOne(options: FindOneOptions<T>): Promise<T>;
  findWithRelations(options: FindManyOptions<T>): Promise<T[]>;
  findOneWithCondition(filterConditions: FindOneOptions<T>): Promise<T>;

  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<DeleteResult>;
}
