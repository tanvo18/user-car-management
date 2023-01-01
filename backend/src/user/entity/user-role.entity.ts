import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Role } from '../../enums/role';

@Entity()
export class UserRoles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
  })
  roleName: Role;
}
