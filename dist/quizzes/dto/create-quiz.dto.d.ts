export declare class CreateQuizQuestionDto {
    text: string;
    options: string[];
    correctAnswer: string;
}
export declare class CreateQuizDto {
    courseId: string;
    title: string;
    description?: string;
    questions: CreateQuizQuestionDto[];
}
