import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

// Define esta clase como una entidad de base de datos.
@Entity()
export class Task {
  // Columna para el ID de la tarea, que se auto-genera.
  @PrimaryGeneratedColumn()
  id: number;

  // Columna para el título de la tarea.
  @Column()
  title: string;

  // Columna para el estado de la tarea (completada o no).
  // 'default: false' establece el valor por defecto en 'false'.
  @Column({ default: false })
  isCompleted: boolean;

  // Define la relación de muchos a uno, muchas tareas pertenecen a un usuario.
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
