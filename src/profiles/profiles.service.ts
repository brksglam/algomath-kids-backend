import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TeacherProfile, TeacherProfileDocument } from './schemas/teacher-profile.schema';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(TeacherProfile.name) private readonly profileModel: Model<TeacherProfileDocument>) {}

  async upsert(userId: string, data: Partial<TeacherProfile>) {
    return this.profileModel
      .findOneAndUpdate({ user: new Types.ObjectId(userId) }, { $set: data, $setOnInsert: { user: new Types.ObjectId(userId) } }, { new: true, upsert: true })
      .lean()
      .exec();
  }

  async findByUser(userId: string) {
    const doc = await this.profileModel.findOne({ user: userId }).lean().exec();
    if (!doc) {
      throw new NotFoundException('Profile not found');
    }
    return doc;
  }
}


