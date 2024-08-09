import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity('ticket')
export class Ticket extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  contactInformation: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  status: string;
}
