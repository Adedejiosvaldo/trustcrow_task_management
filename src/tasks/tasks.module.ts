import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/tasks.entity';
import { TaskRepository } from './entity/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'TASK_REPOSITORY',
      useClass: TaskRepository,
    },
  ],
})
export class TasksModule {}
