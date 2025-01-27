import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Answer } from '../entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  content: string
  instructorId: string
  questionId: string
}

type AnswerQuestionUseCaseResponse = {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private AnswersRepository: AnswersRepository) {}

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

    await this.AnswersRepository.create(answer)

    return {
      answer,
    }
  }
}
