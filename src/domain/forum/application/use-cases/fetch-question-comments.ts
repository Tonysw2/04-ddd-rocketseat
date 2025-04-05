import { type Either, left, right } from '@/core/either'
import type { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  QuestionComment[]
>

export class FetchQuestionCommentsUseCase {
  constructor(
    private readonly questionCommentsRepo: QuestionCommentsRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepo.findManyByQuestionId(questionId, { page })

    if (!questionComments.length) {
      return left(new ResourceNotFoundError())
    }

    return right(questionComments)
  }
}
