import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Express } from 'express';
import { Model, Types } from 'mongoose';
import { StorageService } from '../storage/storage.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { Assignment, AssignmentDocument } from './schemas/assignment.schema';
import { Course, CourseDocument } from '../courses/schemas/course.schema';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private readonly assignmentModel: Model<AssignmentDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    private readonly storageService: StorageService,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const course = await this.courseModel.findById(createAssignmentDto.courseId).exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const assignment = await this.assignmentModel.create({
      course: course._id,
      title: createAssignmentDto.title,
      description: createAssignmentDto.description,
      deadline: createAssignmentDto.deadline ? new Date(createAssignmentDto.deadline) : undefined,
      assignedTo: createAssignmentDto.assignedTo?.map((id) => new Types.ObjectId(id)) ?? [],
    });

    await this.courseModel
      .findByIdAndUpdate(course._id, { $addToSet: { assignments: assignment._id } })
      .exec();

    return assignment.toObject();
  }

  async findByCourse(courseId: string) {
    return this.assignmentModel.find({ course: courseId }).lean().exec();
  }

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    const update: Record<string, unknown> = { ...updateAssignmentDto };

    if (updateAssignmentDto.deadline) {
      update.deadline = new Date(updateAssignmentDto.deadline);
    }

    if (updateAssignmentDto.assignedTo) {
      update.assignedTo = updateAssignmentDto.assignedTo.map((studentId) => new Types.ObjectId(studentId));
    }

    const assignment = await this.assignmentModel
      .findByIdAndUpdate(id, { $set: update }, { new: true })
      .lean()
      .exec();

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }

  async assignStudents(id: string, assignStudentsDto: AssignStudentsDto) {
    const assignment = await this.assignmentModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            assignedTo: assignStudentsDto.studentIds.map((studentId) => new Types.ObjectId(studentId)),
          },
        },
        { new: true },
      )
      .lean()
      .exec();

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }

  async submit(id: string, studentId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Submission file is required');
    }

    const assignment = await this.assignmentModel.findById(id).exec();
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    const studentObjectId = new Types.ObjectId(studentId);
    const isAssigned = assignment.assignedTo.length === 0 || assignment.assignedTo.some((assigned) => assigned.equals(studentObjectId));
    if (!isAssigned) {
      throw new ForbiddenException('You are not assigned to this assignment');
    }

    const uploadPath = 'courses/' + assignment.course.toString() + '/assignments/' + assignment.id + '/submissions';
    const url = await this.storageService.upload(file, uploadPath);

    assignment.submissions.push({
      student: studentObjectId,
      url,
      submittedAt: new Date(),
    });

    await assignment.save();
    return assignment.toObject();
  }

  async remove(id: string) {
    const assignment = await this.assignmentModel.findByIdAndDelete(id).exec();
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    await this.courseModel
      .findByIdAndUpdate(assignment.course, { $pull: { assignments: assignment._id } })
      .exec();
  }
}
