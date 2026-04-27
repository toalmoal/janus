import { Entity,
         Column,
         PrimaryGeneratedColumn } from 'typeorm';

@Entity('login_history', { orderBy: {  id: 'ASC' } })
export class LoginHistory {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  service: string;

  @Column()
  email: string;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @Column()
  success: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  constructor(service: string, email: string, ipAddress: string, success: boolean) {
    this.id = 0;
    this.service = service;
    this.email = email;
    this.ipAddress = ipAddress;
    this.success = success;
    this.createdAt = new Date();
  }

}
