import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarrinhoProdutosService } from './carrinho-produtos.service';
import { CarrinhoProduto } from './entities/carrinho-produto.entity';

describe('CarrinhoProdutosService', () => {
  let service: CarrinhoProdutosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarrinhoProdutosService,
        { provide: getRepositoryToken(CarrinhoProduto), useValue: {} },
      ],
    }).compile();

    service = module.get<CarrinhoProdutosService>(CarrinhoProdutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
