
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
   const authorizationHeader = request.headers.authorization;
  
      if (!authorizationHeader) {
        throw new HttpException('Authorization header missing', HttpStatus.FORBIDDEN);
      }
  
      const parts = authorizationHeader.split(' ');
  
      // Check if the token starts with 'Bearer'
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new HttpException('Invalid authorization header format', HttpStatus.FORBIDDEN);
      }
      return true;

    
  }
}
