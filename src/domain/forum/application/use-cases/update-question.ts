import { type Either, left, right } from '@/core/either'
import type { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface UpdateQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

type UpdateQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Question
>

export class UpdateQuestionUseCase {
  constructor(private questionsRepo: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: UpdateQuestionUseCaseRequest): Promise<UpdateQuestionUseCaseResponse> {
    const question = await this.questionsRepo.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepo.update(question)

    return right(question)
  }
}
