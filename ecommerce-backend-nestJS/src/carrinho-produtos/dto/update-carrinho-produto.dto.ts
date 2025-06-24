import { PartialType } from '@nestjs/mapped-types';
import { CreateCarrinhoProdutoDto } from './create-carrinho-produto.dto';

export class UpdateCarrinhoProdutoDto extends PartialType(CreateCarrinhoProdutoDto) {}
