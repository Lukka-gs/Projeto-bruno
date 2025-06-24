import { PartialType } from '@nestjs/mapped-types';
import { CreateCarrinhoDeCompraDto } from './create-carrinho-de-compra.dto';

export class UpdateCarrinhoDeCompraDto extends PartialType(CreateCarrinhoDeCompraDto) {}
