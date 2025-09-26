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

  // Encuentra y devuelve todas las tareas de la base de datos.
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  // Crea y guarda una nueva tarea.
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Crea y guarda una nueva instancia de la entidad Task con los datos del DTO.
    const newTask = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(newTask);
  }

  // Actualiza una tarea existente por su ID.
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Busca la tarea por su ID.
    const task = await this.tasksRepository.findOneBy({ id });
    // Si la tarea no se encuentra, lanza una excepción.
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    // Fusiona los datos del DTO con la tarea existente.
    Object.assign(task, updateTaskDto);
    // Guarda los cambios en la base de datos y retorna la tarea actualizada.
    return this.tasksRepository.save(task);
  }

  // Elimina una tarea por su ID.
  async remove(id: number): Promise<void> {
    // Borra la tarea de la base de datos.
    await this.tasksRepository.delete(id);
  }
}
