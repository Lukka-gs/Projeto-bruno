import { IsInt, IsOptional, Min } from 'class-validator';

export class CreateCarrinhoProdutoDto {
  @IsInt()
  carrinhoId: number;

  @IsInt()
  produtoId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantidade?: number;
}
