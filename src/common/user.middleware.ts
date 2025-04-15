import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../jwt_security/jwt.constant';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new HttpException('Authorization header missing', HttpStatus.FORBIDDEN);
    }

    const parts = authorizationHeader.split(' ');

    // Check if the token starts with 'Bearer'
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException('Invalid authorization header format', HttpStatus.FORBIDDEN);
    }

    const token = parts[1];

    try {
      // Replace 'YOUR_SECRET_KEY' with your actual secret key used to sign the JWT
      const decoded = jwt.verify(token, jwtConstants.secret); 

      // Optionally, you can store the decoded token in the request object
      (req as any).user = decoded; 

      // Proceed to the next middleware/controller
      next();
    } catch (error) {
      throw new HttpException('Invalid or expired token', HttpStatus.FORBIDDEN);
    }
  }
}
