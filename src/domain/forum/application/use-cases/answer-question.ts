import { type Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'
import type { ResourceNotFoundError } from './errors/resource-not-found'

interface AnswerQuestionUseCaseRequest {
  content: string
  instructorId: string
  questionId: string
}

type AnswerQuestionUseCaseResponse = Either<ResourceNotFoundError, Answer>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    content,
    questionId,
    instructorId,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)

    return right(answer)
  }
}
