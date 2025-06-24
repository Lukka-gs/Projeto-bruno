import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrinhoProdutosService } from './carrinho-produtos.service';
import { CreateCarrinhoProdutoDto } from './dto/create-carrinho-produto.dto';
import { UpdateCarrinhoProdutoDto } from './dto/update-carrinho-produto.dto';

@Controller('carrinho-produtos')
export class CarrinhoProdutosController {
  constructor(private readonly carrinhoProdutosService: CarrinhoProdutosService) {}

  @Post()
  create(@Body() createCarrinhoProdutoDto: CreateCarrinhoProdutoDto) {
    return this.carrinhoProdutosService.create(createCarrinhoProdutoDto);
  }

  @Get()
  findAll() {
    return this.carrinhoProdutosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrinhoProdutosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrinhoProdutoDto: UpdateCarrinhoProdutoDto) {
    return this.carrinhoProdutosService.update(+id, updateCarrinhoProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrinhoProdutosService.remove(+id);
  }
}
