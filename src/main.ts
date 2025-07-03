import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serveStatic = express.static(join(__dirname, '..', 'public'));
  app.use(serveStatic);

  // Habilita o CORS para todas as origens
  app.enableCors();

  // Ou com opções específicas (descomente se necessário):
  /*
  app.enableCors({
    origin: 'http://localhost:5173', // seu frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  */

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
bootstrap();
