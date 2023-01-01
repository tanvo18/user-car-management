import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { SignInCredentialsDto } from '../dto/signin-credentials.dto';
import { SignupCredentialsDto } from '../dto/signup-credentials.dto';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<string> {
    return getConnection().transaction(async (transactionalEntityManager) => {
      const newUser = await this.userRepository.signUp(
        signupCredentialsDto,
        transactionalEntityManager,
      );

      return newUser ? 'OK' : 'FAIL';
    });
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    return getConnection().transaction(async (transactionalEntityManager) => {
      const resp = await this.userRepository.validateUserPassword(
        signInCredentialsDto,
        transactionalEntityManager,
      );
      if (!resp) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JwtPayload = resp;
      const accessToken = await this.jwtService.sign(payload);

      return {
        accessToken,
        user: resp,
      };
    });
  }
}
