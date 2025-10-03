import { Entity,
         Column,
         PrimaryGeneratedColumn }   from 'typeorm';

@Entity('login_history', { orderBy: {  id: 'ASC' } })
class LoginHistory {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  email: string;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @Column()
  success: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  constructor(email: string, ipAddress: string, success: boolean) {
    this.email = email;
    this.ipAddress = ipAddress;
    this.success = success;
    this.createdAt = new Date();
  }

}
export default LoginHistory;
