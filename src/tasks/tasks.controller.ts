import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
      return {
        status: 'success',
        data: task,
        errors: null,
      };
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
      return {
        status: 'success',
        count: tasks.length,
        data: tasks,
        errors: null,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException('Failed to fetch tasks');
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      const task = await this.tasksService.getTaskById(id);
      return {
        status: 'success',
        data: task,
        errors: null,
      };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException({
        success: false,
        message: 'Failed to fetch task',
        error: error.message,
      });
    }
  }


}
