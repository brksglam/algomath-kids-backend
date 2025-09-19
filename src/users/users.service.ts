import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../common/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const roles = createUserDto.roles && createUserDto.roles.length > 0 ? createUserDto.roles : [Role.Student];
    const createdUser = new this.userModel({
      ...createUserDto,
      roles,
    });

    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().lean().exec();
  }

  findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
}
