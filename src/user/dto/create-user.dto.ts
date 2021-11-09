import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  fullName: string;

  @IsEmail(undefined, {message: 'Неверный формат почты'})
  email: string;

  @Length(6, 32, { message: 'Длина пароля должна быть от 6 до 32'})
  password: string;
}
