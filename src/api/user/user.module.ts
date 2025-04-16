import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { AuthenticationModule } from  '../authentication/authentication.module';
import { Authentication, AuthenticationSchema } from '../authentication/entities/authentication.entity';
import {UserProfile, UserProfileSchema} from './entities/user.entity';
import { UserMiddleware } from '../../middleware/user.middleware';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Authentication.name, schema: AuthenticationSchema }, { name: UserProfile.name, schema: UserProfileSchema },]),
  AuthenticationModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UserController);
}
}
