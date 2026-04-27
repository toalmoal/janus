import { Entity,
         Unique,
         Column,
         PrimaryGeneratedColumn } from 'typeorm';

import { Buffer }                 from 'buffer';
import * as bcrypt                from 'bcryptjs';

@Entity('user', { orderBy: {  id: 'ASC' } })
export class User {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName?: string | null;

  @Column()
  roles: string;

  @Column({
    type: 'bit',
    transformer: { from: (v: Buffer) => !!v.readInt8(0), to: (v) => v },
  })
  disabled: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  static passwordHash = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  constructor(email: string, firstName: string, lastName: string, roles: string, disabled: boolean = false) {
    this.id = 0;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = '';
    this.roles = roles;
    this.disabled = disabled;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

}
