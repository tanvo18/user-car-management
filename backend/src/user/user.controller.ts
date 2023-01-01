import {
  Post,
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
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
  signUp(@Body() signupCredentialsDto: SignupCredentialsDto): Promise<string> {
    return this.userService.signUp(signupCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    return this.userService.signIn(signinCredentialsDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.removeUser(userId);
  }
}
