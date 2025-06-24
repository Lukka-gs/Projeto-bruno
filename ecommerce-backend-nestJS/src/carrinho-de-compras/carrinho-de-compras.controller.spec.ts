import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarrinhoDeComprasController } from './carrinho-de-compras.controller';
import { CarrinhoDeComprasService } from './carrinho-de-compras.service';
import { CarrinhoDeCompra } from './entities/carrinho-de-compra.entity';

describe('CarrinhoDeComprasController', () => {
  let controller: CarrinhoDeComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrinhoDeComprasController],
      providers: [
        CarrinhoDeComprasService,
        { provide: getRepositoryToken(CarrinhoDeCompra), useValue: {} },
      ],
    }).compile();

    controller = module.get<CarrinhoDeComprasController>(CarrinhoDeComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
