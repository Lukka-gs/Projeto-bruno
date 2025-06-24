import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarrinhoProdutosController } from './carrinho-produtos.controller';
import { CarrinhoProdutosService } from './carrinho-produtos.service';
import { CarrinhoProduto } from './entities/carrinho-produto.entity';

describe('CarrinhoProdutosController', () => {
  let controller: CarrinhoProdutosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhoProdutosController],
      providers: [
        CarrinhoProdutosService,
        { provide: getRepositoryToken(CarrinhoProduto), useValue: {} },
      ],
    }).compile();

    controller = module.get<CarrinhoProdutosController>(CarrinhoProdutosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
