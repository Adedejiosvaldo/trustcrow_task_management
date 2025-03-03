import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseInterfaceRepository } from './abstract.interface';
import { NotFoundException } from '@nestjs/common';

interface HasId {
  id: string;
}

export abstract class BaseRepository<T extends HasId>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data);
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    const newEntity = this.entity.create(data);
    return this.entity.save(newEntity);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  public async findOneById(id: string): Promise<T> {
    const options = {
      id: id,
    } as FindOptionsWhere<T>;
    const entity = await this.entity.findOneBy(options);

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.entity.findOne(options);

    if (!entity) {
      throw new NotFoundException(`Entity not found`);
    }

    return entity;
  }
  public async findWithRelations(options: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  public async findOneWithCondition(
    filterConditions: FindOneOptions<T>,
  ): Promise<T> {
    const entity = await this.entity.findOne(filterConditions);

    if (!entity) {
      throw new NotFoundException(`Entity not found with given conditions`);
    }

    return entity;
  }

  public async update(id: string, data: Partial<T>): Promise<T | null> {
    await this.entity.update(id, data as any);
    return this.findOneById(id);
  }

  public async delete(id: string): Promise<DeleteResult> {
    const result = await this.entity.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return result;
  }
}
