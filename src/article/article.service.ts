import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article as ArticleEntity } from './entities/article.entity';
import { SearchArticleDto } from './dto/search-article.dto';

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

  async findPopular() {
    const qb = this.articleRepository.createQueryBuilder();

    qb.orderBy('views', 'DESC');
    qb.limit(5);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  findAll() {
    return this.articleRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async search(dto: SearchArticleDto) {
    const qb = this.articleRepository.createQueryBuilder('article');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.views) {
      qb.orderBy('views', dto.views);
    } else {
      qb.orderBy('article.createdAt', 'DESC');
    }

    if (dto.body) {
      qb.andWhere(`article.body ILIKE '%${dto.body}%'`);
    }

    if (dto.title) {
      qb.andWhere(`article.body ILIKE '%${dto.title}%'`);
    }

    if (dto.tags) {
      qb.andWhere(`article.body ILIKE '%${dto.tags}%'`);
    }

    const [data, total] = await qb.getManyAndCount();
    return { data, total };

  }

  async findOne(id: number) {
    const found = await this.articleRepository.findOne(id);

    if (!found) {
      throw new NotFoundException('Статья не найдена!');
    }
    this.articleRepository.increment({ id }, 'views', 1).then(() => null).catch(() => null);
    return found;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const found = await this.articleRepository.findOne(+id);

    if (!found) {
      throw new NotFoundException('Статья не найдена!');
    }
    return this.articleRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    const found = await this.articleRepository.findOne(+id);

    if (!found) {
      throw new NotFoundException('Статья не найдена!');
    }
    return this.articleRepository.delete(id);
  }
}
