import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarrinhoDeComprasService } from './carrinho-de-compras.service';
import { CarrinhoDeCompra } from './entities/carrinho-de-compra.entity';

describe('CarrinhoDeComprasService', () => {
  let service: CarrinhoDeComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarrinhoDeComprasService,
        { provide: getRepositoryToken(CarrinhoDeCompra), useValue: {} },
      ],
    }).compile();

    service = module.get<CarrinhoDeComprasService>(CarrinhoDeComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
