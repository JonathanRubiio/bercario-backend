import { IsString, IsNotEmpty, IsEmail, IsOptional, IsObject } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsEmail({}, { message: 'El formato de correo no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  phone: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
