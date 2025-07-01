import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  preco: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  quantidade: number;

  @IsOptional()
  @IsString()
  foto?: string;
}
