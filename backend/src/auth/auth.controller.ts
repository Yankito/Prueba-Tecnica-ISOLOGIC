import { Controller, Post, Body, UnauthorizedException, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// El decorador @Controller('auth') define la ruta base para todos los endpoints en esta clase
// Todas las rutas comenzarán con "/auth"
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint para inicio de sesión en "/auth/login"
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Valida las credenciales del usuario usando el servicio de autenticación
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);

    // Si el usuario no es válido (validateUser devuelve null), lanza una excepción de no autorizado
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Si las credenciales son válidas, llama al método login del servicio para generar y devolver un token JWT
    return this.authService.login(user);
  }

  // Endpoint para el registro de nuevos usuarios en "/auth/register"
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.username, registerDto.password);
  }
}
