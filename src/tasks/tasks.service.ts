import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { TaskRepository } from './entity/task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './entity/tasks.entity';

@Injectable()
export class TasksService {
  private logger = new Logger(TasksService.name);

  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(body: CreateTaskDTO): Promise<Task> {
    try {
      const task = await this.taskRepository.create(body);
      return task;
    } catch (error) {
      this.logger.error(`Failed to create task: ${error}`);
      if (error.code === '23505') {
        throw new BadRequestException('A task with this title already exists');
      }

      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.findAll();
      if (!tasks.length) {
        return [];
      }
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to fetch tasks: ${error}`);
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }
}
