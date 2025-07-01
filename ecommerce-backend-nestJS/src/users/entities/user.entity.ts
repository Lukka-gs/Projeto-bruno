import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarrinhoDeCompra } from '../../carrinho-de-compras/entities/carrinho-de-compra.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => CarrinhoDeCompra, (carrinho) => carrinho.user)
  carrinhos: CarrinhoDeCompra[];
}
