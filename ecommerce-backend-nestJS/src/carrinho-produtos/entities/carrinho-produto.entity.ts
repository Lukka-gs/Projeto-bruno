import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarrinhoDeCompra } from '../../carrinho-de-compras/entities/carrinho-de-compra.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity()
export class CarrinhoProduto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carrinhoId: number;

  @Column()
  produtoId: number;

  @Column({ default: 1 })
  quantidade: number;

  @ManyToOne(() => CarrinhoDeCompra, (carrinho) => carrinho.produtos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carrinhoId' })
  carrinho: CarrinhoDeCompra;

  @ManyToOne(() => Produto, { eager: true })
  @JoinColumn({ name: 'produtoId' })
  produto: Produto;
}
