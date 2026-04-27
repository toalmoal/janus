import { Entity,
         Column,
         PrimaryGeneratedColumn } from 'typeorm';

import { Buffer }                 from 'buffer';

@Entity('password_reset', { orderBy: {  id: 'ASC' } })
export class PasswordReset {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  code: string;

  @Column({
    type: 'bit',
    transformer: { from: (v: Buffer) => !!v.readInt8(0), to: (v) => v },
  })
  used: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  constructor(userId: number, code: string) {
    this.id = 0;
    this.userId = userId;
    this.code = code;
    this.used = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

}
