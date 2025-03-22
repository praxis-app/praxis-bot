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

  /**
   * The URL of the Praxis instance
   */
  @Column()
  apiUrl: string;

  /**
   * The API key for the Praxis instance
   */
  @Column()
  apiKey: string;

  /**
   * The API key for the Discord bot (self)
   */
  @Column()
  botApiKey: string;

  /**
   * The ID of the server config for the Praxis instance
   */
  @Column()
  serverConfigId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
