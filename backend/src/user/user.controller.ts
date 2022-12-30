import { Post, Body, ValidationPipe, Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from './service/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto,
  ): Promise<void> {
    Logger.log(
      '======signupCredentialsDto',
      JSON.stringify(signupCredentialsDto),
    );
    return this.userService.signUp(signupCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    return this.userService.signIn(signinCredentialsDto);
  }
}
