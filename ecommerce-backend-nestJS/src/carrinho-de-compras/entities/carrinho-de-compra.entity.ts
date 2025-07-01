import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CarrinhoProduto } from '../../carrinho-produtos/entities/carrinho-produto.entity';

@Entity()
export class CarrinhoDeCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.carrinhos, { onDelete: 'SET NULL' })
  user: User;

  @OneToMany(() => CarrinhoProduto, (cp) => cp.carrinho)
  produtos: CarrinhoProduto[];
}
