import { BaseRepository } from 'src/common/database/abstract.repository';
import { Task } from './tasks.entity';
import { TaskRepositoryInterface } from './tasks.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TaskRepository
  extends BaseRepository<Task>
  implements TaskRepositoryInterface
{
  constructor(@InjectRepository(Task) readonly taskRepo: Repository<Task>) {
    super(taskRepo);
  }
}
