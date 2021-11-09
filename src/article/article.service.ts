import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article as ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {
  }

  create(createArticleDto: CreateArticleDto) {
    return this.articleRepository.save(createArticleDto);
  }

  findAll() {
    return this.articleRepository.find();
  }

  async findOne(id: number) {
    const found = await this.articleRepository.findOne(+id);

    if (!found) {
      throw new NotFoundException("Статья не найдена!")
    }
    return this.articleRepository.findOne(id);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const found = await this.articleRepository.findOne(+id)

    if (!found) {
      throw new NotFoundException("Статья не найдена!")
    }
    return this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    const found = await this.articleRepository.findOne(+id)

    if (!found) {
      throw new NotFoundException("Статья не найдена!")
    }
    return this.articleRepository.delete(id);
  }
}
