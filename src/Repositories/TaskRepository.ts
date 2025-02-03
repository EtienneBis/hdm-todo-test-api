import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import {Prisma, Task} from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id
      },
    });
  }

  async create(data: Prisma.TaskCreateInput | Prisma.TaskUncheckedCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }
  async update(id: number, data: Prisma.TaskUpdateInput | Prisma.TaskUncheckedUpdateInput): Promise<Task> {
    return this.prisma.task.update({
      where: {id},
      data,
    });
  }
}
