import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Encuentra y devuelve todas las tareas de un usuarios
  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  // Crea y guarda una nueva tarea para un usuario
  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });
    return this.tasksRepository.save(newTask);
  }

  // Actualiza una tarea existente por su ID y el del usuario
  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    // Busca la tarea por su ID
    const task = await this.tasksRepository.findOne({ where: { id, user: { id: userId } } });
    // Si la tarea no se encuentra, lanza una excepción
    if (!task) {
      throw new NotFoundException('Tarea no encontrada o no te pertenece');
    }

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  // Elimina una tarea por su ID si pertenece al usuario
  async remove(id: number, userId: number): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id, user: { id: userId } } });

    if (!task) {
      throw new NotFoundException('Tarea no encontrada o no te pertenece');
    }

    await this.tasksRepository.remove(task);
  }
}
