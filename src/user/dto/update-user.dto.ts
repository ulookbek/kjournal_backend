import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UniqueOnDatabase } from '../../utils/validation/unique-validation';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @IsString({
    message: 'Должна быть строка!',
  })
  fullName?: string;

  @IsEmail(undefined, {message: 'Неверный формат почты'})
  @UniqueOnDatabase(User, {message: 'Пользователь с такой почтой уже существует!'})
  email: string;
}
