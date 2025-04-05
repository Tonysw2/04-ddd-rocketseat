import { type Either, left, right } from '@/core/either'
import type { AnswerComment } from '../../enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  ResourceNotFoundError,
  AnswerComment[]
>

export class FetchAnswerCommentsUseCase {
  constructor(private readonly answerCommentsRepo: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepo.findManyByAnswerId(
      answerId,
      { page },
    )

    if (!answerComments.length) {
      return left(new ResourceNotFoundError())
    }

    return right(answerComments)
  }
}
