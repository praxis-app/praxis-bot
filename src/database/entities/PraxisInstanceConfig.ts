import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PraxisInstanceConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  botApiKey: string;

  @Column()
  praxisInstanceApiKey: string;

  @Column()
  praxisInstanceApiUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
