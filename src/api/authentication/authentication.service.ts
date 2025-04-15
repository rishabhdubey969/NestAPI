import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import {Authentication, AuthenticationDocument} from './entities/authentication.entity'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../../../constant/auth.constant';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectModel(Authentication.name) private authenticationModel: Model<AuthenticationDocument>,
    private jwtService: JwtService
  ) {}

  async register(createAuthenticationDto: CreateAuthenticationDto) {
    const { email } = createAuthenticationDto;
    const existingAuthentication = await this.authenticationModel.findOne({ email }).exec();

    if (existingAuthentication) {
      throw new HttpException(Auth.EmailExist, HttpStatus.FORBIDDEN);
    }

    const createdAuthentication = new this.authenticationModel(createAuthenticationDto);
    return createdAuthentication.save();
  }

  async signIn(loginAuthenticationDto: LoginAuthenticationDto) {

    const { email } = loginAuthenticationDto;
    const { password } = loginAuthenticationDto;
    const existingAuthenticationLogin = await this.authenticationModel.findOne({ email }).exec();

    if (!existingAuthenticationLogin) {
      throw new HttpException(Auth.EMAIL_NOT_FOUND, HttpStatus.FORBIDDEN);
    }
    
    if (existingAuthenticationLogin?.password !== password) {
      throw new HttpException(Auth.PASSWORD_NOT_FOUND, HttpStatus.FORBIDDEN);
    }

    const payload = { sub: existingAuthenticationLogin._id, email: existingAuthenticationLogin.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
 
   
  }

  findAll(): Promise<Authentication[]> {
    return this.authenticationModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
