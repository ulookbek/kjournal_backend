import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({
    default: 0
  })
  views: number;

  @Column({nullable: true})
  tags?: string;

  @CreateDateColumn({ type: 'timestamp'})
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp'})
  updatedAt: Date
}