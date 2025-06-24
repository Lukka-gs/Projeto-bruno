import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarrinhoProduto } from '../../carrinho-produtos/entities/carrinho-produto.entity';

@Entity()
export class CarrinhoDeCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @OneToMany(() => CarrinhoProduto, (cp) => cp.carrinho)
  produtos: CarrinhoProduto[];
}
