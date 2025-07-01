import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });
  await app.init();
  const usersService = app.get(UsersService);
  const admin = await usersService.findByUsername('admin');
  if (!admin) {
    await usersService.create('admin', 'senha123');
    console.log('Default admin user created');
  }
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
