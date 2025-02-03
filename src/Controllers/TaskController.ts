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
import UpdateTaskUseCase from "../UseCase/UpdateTask/UpdateTaskUseCase"; // Import du use case de mise à jour

@Controller()
export default class TaskController {
  constructor(
    private readonly useCaseFactory: UseCaseFactory,
    private readonly taskRepository: TaskRepository,
  ) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    console.log('Received task data:', dto);
    return (await this.useCaseFactory.create<SaveTaskUseCase>(SaveTaskUseCase)).handle(dto);
  }

  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    if (!dto.name) {
      throw new BadRequestException('The name field is required.');
    }
    const updateTaskUseCase = await this.useCaseFactory.create<UpdateTaskUseCase>(UpdateTaskUseCase);

    dto.id = Number(id);
    return updateTaskUseCase.handle(dto);
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return await (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
