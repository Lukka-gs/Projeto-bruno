import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { CarrinhoDeComprasModule } from './carrinho-de-compras/carrinho-de-compras.module';
import { CarrinhoProdutosModule } from './carrinho-produtos/carrinho-produtos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProdutosModule,
    CarrinhoDeComprasModule,
    CarrinhoProdutosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
