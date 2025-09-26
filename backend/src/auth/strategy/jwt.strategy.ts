import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Configura la estrategia de autenticación
    super({
      // Extrae el token JWT del encabezado de la solicitud HTTP
      // Busca un token con el formato 'Bearer <token>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 'ignoreExpiration: false' asegura que si el token ha expirado, la solicitud sea rechazada por seguridad
      ignoreExpiration: false,
      // Define la clave secreta para verificar la firma del token
      // La obtiene de las variables de entorno para mayor seguridad
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  // Se llama automáticamente cuando se recibe un token válido
  validate(payload: any) {
    // Retorna un objeto con los datos del usuario
    return {  id: payload.sub, username: payload.username };
  }
}
