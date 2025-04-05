import { type Either, left, right } from '@/core/either'
import type { Answer } from '../../enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<
  ResourceNotFoundError,
  Answer[]
>

export class FetchQuestionAnswersUseCase {
  constructor(private readonly answersRepo: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepo.findManyByQuestionId(questionId, {
      page,
    })

    if (!answers.length) {
      return left(new ResourceNotFoundError())
    }

    return right(answers)
  }
}
