import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CarrinhoDeComprasService } from './carrinho-de-compras.service';
import { CreateCarrinhoDeCompraDto } from './dto/create-carrinho-de-compra.dto';
import { UpdateCarrinhoDeCompraDto } from './dto/update-carrinho-de-compra.dto';

@Controller('carrinho-de-compras')
export class CarrinhoDeComprasController {
  constructor(private readonly carrinhoDeComprasService: CarrinhoDeComprasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req) {
    const dto: CreateCarrinhoDeCompraDto = { userId: req.user.userId };
    return this.carrinhoDeComprasService.create(dto);
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
