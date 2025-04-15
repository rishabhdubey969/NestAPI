
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PostGresDataBaseConst } from '../../../database/postgres.constant';

@Entity(PostGresDataBaseConst.POST)
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column({ default: null, nullable: true })
  image: string;

  @Column({ type: 'varchar' })
  user_id: string;

  @Column()
  isPublished: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

}
