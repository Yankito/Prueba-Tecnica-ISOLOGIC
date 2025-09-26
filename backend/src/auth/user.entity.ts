import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

// Define esta clase como una entidad de base de datos.
@Entity()
export class User {
  // Columna para el ID del usuario, que se auto-genera.
  @PrimaryGeneratedColumn()
  id: number;

  // Columna para el nombre de usuario, con restricción de unicidad.
  @Column({ unique: true })
  username: string;

  // Columna para guardar la contraseña hasheada.
  @Column()
  password: string;

  // Define la relación de unoa muchos, un usuario tiene muchas tareas.
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
