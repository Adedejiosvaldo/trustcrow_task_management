import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TaskRepository } from './entity/task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './entity/tasks.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private logger = new Logger(TasksService.name);

  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(body: CreateTaskDTO): Promise<Task> {
    try {
      return await this.taskRepository.create(body);
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

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOneById(id);
      if (!task) {
        throw new NotFoundException({
          status: 'failed',
          data: null,
          error: `Task with ID ${id} not found`,
        });
      }
      return task;
    } catch (error) {
      this.logger.error(`Failed to fetch task: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch task');
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDTO): Promise<Task> {
    try {
      const existingTask = await this.taskRepository.findOneById(id);
      if (!existingTask) {
        throw new BadRequestException({
          status: 'failed',
          data: null,
          error: `Task with ID ${id} not found`,
        });
      }
      const updatedTask = await this.taskRepository.update(id, updateTaskDto);

      if (!updatedTask) {
        throw new BadRequestException({
          status: 'failed',
          data: null,
          error: `Task with ID ${id} not found`,
        });
      }
      return updatedTask;
    } catch (error) {
      this.logger.error(`Failed to update task ${id}: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.delete(id);
    } catch (error) {
      this.logger.error(`Failed to delete task ${id}: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  async markTaskAsCompleted(id: string): Promise<Task> {
    try {
      const updatedTask = await this.taskRepository.update(id, {
        completed: true,
      });
      if (!updatedTask) {
        throw new BadRequestException(`Task with ID ${id} not found`);
      }
      return updatedTask;
    } catch (error) {
      this.logger.error(`Failed to mark task as completed: ${error}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to mark task as completed',
      );
    }
  }
}
