import { Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from "../../Repositories/TaskRepository";
import {Task} from "@prisma/client";

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    if (dto.id) {
      const data = {
        name: dto.name,

      };
      return this.taskRepository.update(dto.id, data);
    } else {
      const data = {
        name: dto.name,

      };
      console.log('Creating task with data:', data);
      return this.taskRepository.create(data);
    }
  }
}
