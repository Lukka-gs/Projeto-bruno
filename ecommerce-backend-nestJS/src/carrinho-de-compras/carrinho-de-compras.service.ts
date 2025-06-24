import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarrinhoDeCompraDto } from './dto/create-carrinho-de-compra.dto';
import { UpdateCarrinhoDeCompraDto } from './dto/update-carrinho-de-compra.dto';
import { CarrinhoDeCompra } from './entities/carrinho-de-compra.entity';

@Injectable()
export class CarrinhoDeComprasService {
  constructor(
    @InjectRepository(CarrinhoDeCompra)
    private readonly carrinhoRepo: Repository<CarrinhoDeCompra>,
  ) {}

  create(createCarrinhoDeCompraDto: CreateCarrinhoDeCompraDto) {
    const carrinho = this.carrinhoRepo.create(createCarrinhoDeCompraDto);
    return this.carrinhoRepo.save(carrinho);
  }

  findAll() {
    return this.carrinhoRepo.find({ relations: ['produtos'] });
  }

  findOne(id: number) {
    return this.carrinhoRepo.findOne({
      where: { id },
      relations: ['produtos'],
    });
  }

  async update(
    id: number,
    updateCarrinhoDeCompraDto: UpdateCarrinhoDeCompraDto,
  ) {
    await this.carrinhoRepo.update(id, updateCarrinhoDeCompraDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.carrinhoRepo.delete(id);
  }
}
