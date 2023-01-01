import {
  Post,
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/signup')
  async signUp(
    @Body() signupCredentialsDto: SignupCredentialsDto,
  ): Promise<string> {
    return this.userService.signUp(signupCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    return this.userService.signIn(signinCredentialsDto);
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    try {
      const resp = await this.userService.removeUser(userId);

      if (!resp) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return this.userService.removeUser(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
