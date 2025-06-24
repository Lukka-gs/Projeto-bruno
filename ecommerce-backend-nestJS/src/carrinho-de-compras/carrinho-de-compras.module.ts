import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrinhoDeComprasService } from './carrinho-de-compras.service';
import { CarrinhoDeComprasController } from './carrinho-de-compras.controller';
import { CarrinhoDeCompra } from './entities/carrinho-de-compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarrinhoDeCompra])],
  controllers: [CarrinhoDeComprasController],
  providers: [CarrinhoDeComprasService],
})
export class CarrinhoDeComprasModule {}
