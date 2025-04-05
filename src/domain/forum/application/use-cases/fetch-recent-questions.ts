import { type Either, left, right } from '@/core/either'
import type { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  ResourceNotFoundError,
  Question[]
>

export class FetchRecentQuestionsUseCase {
  constructor(private readonly questionsRepo: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepo.fetchRecentQuestions({ page })

    if (!questions.length) {
      return left(new ResourceNotFoundError())
    }

    return right(questions)
  }
}
