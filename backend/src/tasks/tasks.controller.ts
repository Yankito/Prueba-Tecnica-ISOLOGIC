import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, NotFoundException, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

// El decorador @Controller('tasks') define que todas las rutas en esta clase
// comenzarán con '/tasks'.
@Controller('tasks')
// El decorador @UseGuards(AuthGuard('jwt')) protege todas las rutas del controlador.
// Cada solicitud debe incluir un token JWT válido para ser procesada.
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Endpoint para manejar las solicitudes GET a '/tasks'.
  // Esta ruta devuelve todas las tareas.
  @Get()
  async findAll(@Request() req): Promise<Task[]> {
    return this.tasksService.findAll(req.user.id);
  }

  // Endpoint para las solicitudes POST a '/tasks'.
  // Esta ruta se usa para crear una nueva tarea.
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  // Endpoint para las solicitudes PUT a '/tasks/:id'.
  // Se usa para actualizar una tarea específica, identificada por su ID.
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ): Promise<Task> {
    const task = await this.tasksService.update(id, updateTaskDto, req.user.id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada o no te pertenece');
    }
    return task;
  }

  // Endpoint para las solicitudes DELETE a '/tasks/:id'.
  // Se usa para eliminar una tarea específica por su ID.
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<void> {
    await this.tasksService.remove(id, req.user.id);
  }
}
