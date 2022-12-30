import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Car } from '../../car/entity/car.entity';
import { UserRoles } from './user-role.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  salt: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;

  @OneToMany((type) => UserRoles, (role) => role.user, { cascade: true })
  @JoinColumn()
  roles: UserRoles[];

  @OneToMany((type) => Car, (car) => car.user)
  @JoinColumn()
  cars: Car[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
