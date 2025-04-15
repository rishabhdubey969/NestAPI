import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { Authentication, AuthenticationSchema } from './entities/authentication.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Authentication.name, schema: AuthenticationSchema }]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
