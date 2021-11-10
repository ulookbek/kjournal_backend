import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User as UserEntity } from './user/entities/user.entity';
import { ArticleModule } from './article/article.module';
import { Comment as CommentEntity} from './comment/entities/comment.entity';
import { Article as ArticleEntity } from './article/entities/article.entity';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123123',
      database: 'kjournal',
      entities: [UserEntity, ArticleEntity, CommentEntity],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
