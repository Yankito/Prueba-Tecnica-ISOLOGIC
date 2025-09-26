import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString() // Valida que sea un formato de fecha válido
  dueDate?: string;
}
