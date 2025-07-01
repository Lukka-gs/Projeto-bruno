import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarrinhoProdutoDto } from './dto/create-carrinho-produto.dto';
import { UpdateCarrinhoProdutoDto } from './dto/update-carrinho-produto.dto';
import { CarrinhoProduto } from './entities/carrinho-produto.entity';

@Injectable()
export class CarrinhoProdutosService {
  constructor(
    @InjectRepository(CarrinhoProduto)
    private readonly carrinhoProdutoRepo: Repository<CarrinhoProduto>,
  ) {}

  async create(createCarrinhoProdutoDto: CreateCarrinhoProdutoDto) {
    const quantidade = createCarrinhoProdutoDto.quantidade ?? 1;
    const existing = await this.carrinhoProdutoRepo.findOne({
      where: {
        carrinhoId: createCarrinhoProdutoDto.carrinhoId,
        produtoId: createCarrinhoProdutoDto.produtoId,
      },
    });

    if (existing) {
      existing.quantidade += quantidade;
      return this.carrinhoProdutoRepo.save(existing);
    }

    const cp = this.carrinhoProdutoRepo.create({
      ...createCarrinhoProdutoDto,
      quantidade,
    });
    return this.carrinhoProdutoRepo.save(cp);
  }

  findAll() {
    return this.carrinhoProdutoRepo.find({
      relations: ['produto', 'carrinho'],
    });
  }

  findOne(id: number) {
    return this.carrinhoProdutoRepo.findOne({
      where: { id },
      relations: ['produto', 'carrinho'],
    });
  }

  async update(id: number, updateCarrinhoProdutoDto: UpdateCarrinhoProdutoDto) {
    await this.carrinhoProdutoRepo.update(id, updateCarrinhoProdutoDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.carrinhoProdutoRepo.delete(id);
  }
}
