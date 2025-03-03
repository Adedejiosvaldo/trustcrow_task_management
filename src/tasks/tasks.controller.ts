import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() body: CreateTaskDTO) {
    try {
      const task = await this.tasksService.createTask(body);
      return task;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to create task');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTasks() {
    try {
      const tasks = await this.tasksService.getAllTasks();
      if (!tasks.length) {
        return { message: 'No tasks found' };
      }
      return tasks;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Failed to fetch tasks');
    }
  }
}
