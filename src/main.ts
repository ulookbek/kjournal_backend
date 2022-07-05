import { CustomValidationPipe } from './validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('KJournal API')
    .setDescription('=======')
    .setVersion('1.0')
    .addTag('kjournal')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}

bootstrap();
