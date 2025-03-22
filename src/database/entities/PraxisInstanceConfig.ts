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
  apiUrl: string;

  @Column()
  apiKey: string;

  @Column()
  botApiKey: string;

  @Column()
  serverConfigId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
