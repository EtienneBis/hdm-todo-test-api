import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import { PrismaService } from '../prisma.service';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private prismaService: PrismaService) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    if (!dto.name || dto.name.trim() === '') {
      throw new Error('Task name cannot be empty');
    }
    
    try {
      const newTask = await this.prismaService.task.create({
        data: {
          name: dto.name,
        },
      });

      return newTask; 
    } catch (error) {
      console.error('Error saving task:', error);
      throw new Error('Error saving task');
    }
  }
}
