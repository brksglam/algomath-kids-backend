import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import {
  TeacherProfile,
  TeacherProfileSchema,
} from './schemas/teacher-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeacherProfile.name, schema: TeacherProfileSchema },
    ]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
