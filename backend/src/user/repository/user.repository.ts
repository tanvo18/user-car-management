import { EntityManager, EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignupCredentialsDto } from '../dto/signup-credentials.dto';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { User } from '../entity/user.entity';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUser(
    userId: number,
    transactionalEntityManager: EntityManager,
  ): Promise<User> {
    const user = await transactionalEntityManager.getRepository(User).findOne({
      where: { id: userId },
    });

    return user;
  }

  async signUp(
    signupCredentialsDto: SignupCredentialsDto,
    transactionalEntityManager: EntityManager,
  ) {
    try {
      const { username, password, roles } = signupCredentialsDto;

      const user = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      user.roles = roles;

      return await transactionalEntityManager.getRepository(User).save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    signinCredentialDto: SignInCredentialsDto,
    transactionalEntityManager: EntityManager,
  ): Promise<JwtPayload> {
    const { username, password } = signinCredentialDto;
    const auth = await transactionalEntityManager.getRepository(User).findOne({
      where: { username },
    });

    if (auth && (await auth.validatePassword(password))) {
      return {
        username: auth.username,
      };
    } else {
      return null;
    }
  }

  async removeUser(
    userId: number,
    transactionalEntityManager: EntityManager,
  ): Promise<User | null> {
    const user = await this.findUser(userId, transactionalEntityManager);

    if (!user) {
      return null;
    }

    return await transactionalEntityManager.getRepository(User).remove(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
