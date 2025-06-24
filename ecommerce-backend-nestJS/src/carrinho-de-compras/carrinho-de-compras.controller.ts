import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrinhoDeComprasService } from './carrinho-de-compras.service';
import { CreateCarrinhoDeCompraDto } from './dto/create-carrinho-de-compra.dto';
import { UpdateCarrinhoDeCompraDto } from './dto/update-carrinho-de-compra.dto';

@Controller('carrinho-de-compras')
export class CarrinhoDeComprasController {
  constructor(private readonly carrinhoDeComprasService: CarrinhoDeComprasService) {}

  @Post()
  create(@Body() createCarrinhoDeCompraDto: CreateCarrinhoDeCompraDto) {
    return this.carrinhoDeComprasService.create(createCarrinhoDeCompraDto);
  }

  @Get()
  findAll() {
    return this.carrinhoDeComprasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrinhoDeComprasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrinhoDeCompraDto: UpdateCarrinhoDeCompraDto) {
    return this.carrinhoDeComprasService.update(+id, updateCarrinhoDeCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrinhoDeComprasService.remove(+id);
  }
}
