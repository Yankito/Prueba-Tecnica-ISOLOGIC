// src/auth/auth.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'; // Instala bcrypt: npm install bcrypt

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // Verificar si ya existe un usuario admin
    const adminUser = await this.usersRepository.findOne({ where: { username: 'admin' } });

    if (!adminUser) {
      // Si no existe, crear y guardar el usuario
      console.log('Creando usuario administrador por defecto...');

      const defaultPassword = '1234';
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      const newAdmin = this.usersRepository.create({
        username: 'admin',
        password: hashedPassword,
      });

      await this.usersRepository.save(newAdmin);
      console.log('Usuario admin creado exitosamente.');
    }
  }

  // Método para validar las credenciales de un usuario
  async validateUser(username: string, pass: string): Promise<any> {
    // Busca al usuario por su nombre de usuario en la base de datos
    const user = await this.usersRepository.findOne({ where: { username } });

    // Si el usuario existe y la contraseña proporcionada coincide con la hasheada, se considera que el usuario es válido
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      // Retorna el objeto del usuario sin la contraseña hasheada
      return result;
    }
    return null;
  }

  // Método para generar un token JWT para un usuario válido
  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      // Firma el payload para crear el token y lo devuelve
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método para registrar un usuario
  async register(username: string, password: string): Promise<any> {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Hashear la contraseña por seguridad
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear y guardar el nuevo usuario
    const newUser = this.usersRepository.create({ username, password: hashedPassword });
    await this.usersRepository.save(newUser);

    // Genera un token para el usuario recién registrado
    const payload = { username: newUser.username, sub: newUser.id };
    return {
      message: 'Usuario registrado exitosamente',
      access_token: this.jwtService.sign(payload),
    };
  }
}
