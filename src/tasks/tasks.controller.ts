import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
  InternalServerErrorException,
  HttpException,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  private logger = new Logger(TasksController.name);
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
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`Error fetching task ${id}:`, error);

      throw new InternalServerErrorException(
        'An error occurred while retrieving the task',
      );
    }
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: any /* Replace 'any' with UpdateTaskDTO */,
  ) {
    try {
      const task = await this.tasksService.updateTask(id, updateTaskDto);
      return { status: 'success', data: task, errors: null };
    } catch (error) {
      throw new BadRequestException('Failed to update task');
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      await this.tasksService.deleteTask(id);
      return {
        status: 'success',
        message: 'Task deleted successfully',
        errors: null,
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete task');
    }
  }

  @Patch(':id/complete')
  async markTaskComplete(@Param('id') id: string) {
    try {
      const task = await this.tasksService.markTaskAsCompleted(id);
      return { status: 'success', data: task, errors: null };
    } catch (error) {
      throw new BadRequestException('Failed to mark task as complete');
    }
  }
}
