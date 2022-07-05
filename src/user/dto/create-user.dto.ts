import {
  IsEmail,
  Length,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { UniqueOnDatabase } from '../../utils/validation/unique-validation';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Никнейм не может быть пустым!',
  })
  @IsString({
    message: 'Должна быть строка!',
  })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверный формат почты' })
  @UniqueOnDatabase(User, {
    message: 'Пользователь с такой почтой уже существует!',
  })
  email: string;

  @IsNotEmpty({
    message: 'Пароль обязателен для заполнения!',
  })
  @MinLength(8, {
    message: 'Пароль должен состоять из более 8 символов',
  })
  password: string;
}
