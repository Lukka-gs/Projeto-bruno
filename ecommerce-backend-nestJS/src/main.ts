import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const usersService = app.get(UsersService);
  const admin = await usersService.findByUsername('admin');
  if (!admin) {
    await usersService.create('admin', 'senha123');
    console.log('Default admin user created');
  }
  app.enableCors({ origin: 'http://localhost:3000' });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
