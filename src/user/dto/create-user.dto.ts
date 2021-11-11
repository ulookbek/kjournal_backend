import { IsEmail, Length, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString({
    each: true,
    message: 'Должна быть строка!',
  })
  fullName: string;

  @IsEmail(undefined, {message: 'Неверный формат почты'})
  email: string;

  @Length(6, 32, { message: 'Длина пароля должна быть от 6 до 32'})
  password: string;
}
