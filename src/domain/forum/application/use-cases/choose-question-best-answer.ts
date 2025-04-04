import type { Question } from '../../enterprise/entities/question'
import type { AnswersRepository } from '../repositories/answers-repository'
import type { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly questionsRepo: QuestionsRepository,
    private readonly answersRepo: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepo.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepo.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepo.update(question)

    return {
      question,
    }
  }
}
