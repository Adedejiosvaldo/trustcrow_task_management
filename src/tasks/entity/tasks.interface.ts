import { BaseInterfaceRepository } from 'src/common/database/abstract.interface';
import { Task } from './tasks.entity';

export interface TaskRepositoryInterface
  extends BaseInterfaceRepository<Task> {}
