import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { Role } from '../common/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const role = createUserDto.role ?? Role.Student;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltRounds,
    );

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      role,
      courses: createUserDto.courses?.map((id) => new Types.ObjectId(id)) ?? [],
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').lean().exec();
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<{ items: User[]; total: number }> {
    const [items, total] = await Promise.all([
      this.userModel
        .find()
        .select('-password')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.userModel.countDocuments().exec(),
    ]);
    return { items, total };
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const update: Record<string, unknown> = { ...updateUserDto };
    if (updateUserDto.courses) {
      update.courses = updateUserDto.courses.map(
        (courseId) => new Types.ObjectId(courseId),
      );
    }

    if (updateUserDto.password) {
      update.password = await bcrypt.hash(
        updateUserDto.password,
        this.saltRounds,
      );
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, update, { new: true })
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
