import { Injectable, BadRequestException, NotFoundException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authentication, AuthenticationDocument } from '../authentication/entities/authentication.entity';
import { UserProfile} from  './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Types} from 'mongoose';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(Authentication.name) private authenticationModel: Model<AuthenticationDocument>,
      @InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>,
    ) {}
  
  async create(createUserDto: CreateUserDto) {
    const createdUserProfile = new this.userProfileModel(createUserDto);
    return createdUserProfile.save();
  }

  findAll(): Promise<Authentication[]> {
    return this.authenticationModel.find().exec();
  }


  async findOne(id: string): Promise<Authentication> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId format');
    }

    const userProfileData = await this.authenticationModel.findOne({ _id: new Types.ObjectId(id) }).exec();

    if (!userProfileData) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userProfileData;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
