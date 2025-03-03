import { Injectable } from '@nestjs/common';
import { TaskRepository } from './entity/task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(body: CreateTaskDTO) {
    try {
      const task = await this.taskRepository.create(body);
      return task;
    } catch (error) {}
  }
}
