import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: errors.map(err => ({
            field: err.property,
            errors: err.constraints ? Object.values(err.constraints) : [],
          })),
        });
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
