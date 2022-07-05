import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByConditions({
      email,
      password,
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async search(dto: SearchUserDto) {
    const qb = this.usersRepository.createQueryBuilder('user');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.email) {
      qb.andWhere(`article.body ILIKE '%${dto.email}%'`);
    }

    if (dto.fullName) {
      qb.andWhere(`article.body ILIKE '%${dto.fullName}%'`);
    }

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const found = await this.usersRepository.find();
    if (!found) {
      throw new HttpException(
        { message: 'Произошла ошибка при получении данных!' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return found;
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  findByConditions(dto: { email: string; password?: string }) {
    return this.usersRepository.findOne(dto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
