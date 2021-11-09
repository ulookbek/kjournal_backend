import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment as CommentEntity } from '../comment/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {
  }

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save({
      text: createCommentDto.text,
      article: { id: createCommentDto.articleId },
      user: { id: 1}
    });
  }

  findAll() {
    return this.commentRepository.find();
  }

  async findOne(id: number) {
    const found = await this.commentRepository.findOne(id);

    if (!found) {
      throw new NotFoundException('Комментарий не найдена!');
    }
    return found;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const found = await this.commentRepository.findOne(id);

    if (!found) {
      throw new NotFoundException('Комментарий не найден!');
    }
    return this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const found = await this.commentRepository.findOne(+id);

    if (!found) {
      throw new NotFoundException('Комментарий не найдена!');
    }
    return this.commentRepository.delete(id);
  }
}
