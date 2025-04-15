// import {
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//     ValidationArguments,
// } from 'class-validator';
// import { Injectable } from '@nestjs/common';
// import { Authentication, AuthenticationDocument } from '../../api/authentication/entities/authentication.entity'; // Update the path based on your project
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class EmailExistsValidator implements ValidatorConstraintInterface {
//     constructor(@InjectModel(Authentication.name) private authenticationModel: Model<AuthenticationDocument>) { }

//     async validate(email: string, args: ValidationArguments): Promise<boolean> {
//         const user = await this.authenticationModel.findByEmail(email);
//         return !user; // Return true if email does NOT exist (i.e., valid for registration)
//     }

//     defaultMessage(args: ValidationArguments) {
//         return 'Email already exists';
//     }
// }
