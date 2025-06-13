import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para todas as origens
  app.enableCors();

  // Ou com opções específicas:
  /*
  app.enableCors({
    origin: 'http://localhost:5173', // seu frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  */

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
