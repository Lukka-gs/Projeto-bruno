import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrinhoProdutosService } from './carrinho-produtos.service';
import { CarrinhoProdutosController } from './carrinho-produtos.controller';
import { CarrinhoProduto } from './entities/carrinho-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarrinhoProduto])],
  controllers: [CarrinhoProdutosController],
  providers: [CarrinhoProdutosService],
})
export class CarrinhoProdutosModule {}
