import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './api/authentication/authentication.module';
import { jwtConstants } from '../jwt_security/jwt.constant';
import { JwtModule } from '@nestjs/jwt';
import { UserMiddleware } from './common/user.middleware';
import { UserModule } from './api/user/user.module';
import { PostModule } from './api/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the config globally available
    }),
    // Connect to MongoDB using the connection URL from the .env file
    MongooseModule.forRoot(process.env.DB_CONNECTION_URL as string),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER_NAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthenticationModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    PostModule,
    //CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
}
