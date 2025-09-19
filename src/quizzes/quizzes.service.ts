import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { Course, CourseDocument } from '../courses/schemas/course.schema';
import { MessagingService } from '../messaging/messaging.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly messagingService: MessagingService,
  ) {}

  async create(createQuizDto: CreateQuizDto) {
    const course = await this.courseModel
      .findById(createQuizDto.courseId)
      .exec();
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    createQuizDto.questions.forEach((question, index) => {
      if (!question.options.includes(question.correctAnswer)) {
        throw new BadRequestException(
          'Question ' +
            (index + 1) +
            ' correct answer must be one of the options',
        );
      }
    });

    const quiz = await this.quizModel.create({
      course: course._id,
      title: createQuizDto.title,
      description: createQuizDto.description,
      questions: createQuizDto.questions,
    });

    await this.courseModel
      .findByIdAndUpdate(course._id, { $addToSet: { quizzes: quiz._id } })
      .exec();

    // Publish event
    const payload = JSON.stringify({
      quizId: String(quiz._id),
      courseId: String(course._id),
      title: String(quiz.title ?? ''),
    });
    this.messagingService.publish(
      'events',
      'quiz.created',
      Buffer.from(payload),
    );

    return quiz.toObject();
  }

  async findByCourse(courseId: string) {
    return this.quizModel.find({ course: courseId }).lean().exec();
  }

  async findByCoursePaginated(courseId: string, page: number, limit: number) {
    const [items, total] = await Promise.all([
      this.quizModel
        .find({ course: courseId })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec(),
      this.quizModel.countDocuments({ course: courseId }).exec(),
    ]);
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const quiz = await this.quizModel.findById(id).lean().exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    if (updateQuizDto.questions) {
      updateQuizDto.questions.forEach((question, index) => {
        if (!question.options.includes(question.correctAnswer)) {
          throw new BadRequestException(
            'Question ' +
              (index + 1) +
              ' correct answer must be one of the options',
          );
        }
      });
    }

    const quiz = await this.quizModel
      .findByIdAndUpdate(id, { $set: updateQuizDto }, { new: true })
      .lean()
      .exec();

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    return quiz;
  }

  async remove(id: string) {
    const quiz = await this.quizModel.findByIdAndDelete(id).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    await this.courseModel
      .findByIdAndUpdate(quiz.course, { $pull: { quizzes: quiz._id } })
      .exec();
  }

  async submit(id: string, studentId: string, submitQuizDto: SubmitQuizDto) {
    const quiz = await this.quizModel.findById(id).lean().exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const total = quiz.questions.length;
    const answers = submitQuizDto.answers;
    if (answers.length !== total) {
      throw new BadRequestException('Answers count must match questions count');
    }

    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        correct += 1;
      }
    });

    return {
      quizId: id,
      studentId,
      total,
      correct,
      incorrect: total - correct,
    };
  }
}
