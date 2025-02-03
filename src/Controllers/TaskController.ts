import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import TaskRepository from "../Repositories/TaskRepository";
import SaveTaskUseCase from "../UseCase/SaveTask/SaveTaskUseCase";

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory,
              private readonly taskRepository: TaskRepository,) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    console.log('Received task data:', dto); // Add this line for debugging
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Patch('/tasks/:id')
  async update(@Param('id') id: string,@Body() dto: SaveTaskDto) {
    if (!dto.name) {
      throw new BadRequestException('The name field is required.');
    }
    const saveTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);
    dto.id = Number(id);
    return saveTaskUseCase.handle(dto);
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return await ((await this.useCaseFactory.create(DeleteTask)).handle(Number(id)));
  }
}
