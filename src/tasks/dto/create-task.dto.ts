import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskPriority, TaskStatus } from '../entity/tasks.entity';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus, { message: 'Status must be a valid task status' })
  @IsOptional()
  status?: TaskStatus = TaskStatus.TODO;

  @IsEnum(TaskPriority, { message: 'Priority must be a valid task priority' })
  @IsOptional()
  priority?: TaskPriority = TaskPriority.MEDIUM;

  @IsBoolean()
  @IsOptional()
  completed?: boolean = false;
}
