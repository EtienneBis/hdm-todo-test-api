import { Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import { Task } from "@prisma/client";
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from "../../Repositories/TaskRepository";


@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    const data = { name: dto.name };

    return dto.id
      ? this.taskRepository.update(dto.id, data)
      : this.taskRepository.create(data);
  }
}
