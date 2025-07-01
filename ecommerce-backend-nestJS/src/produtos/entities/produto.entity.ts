import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column({ nullable: true })
  descricao?: string;

  @Column('int')
  quantidade: number;

  @Column({ nullable: true })
  foto?: string;
}
