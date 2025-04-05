import { type Either, left, right } from '@/core/either'
import type { Answer } from '../../enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface UpdateAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type UpdateAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Answer
>

export class UpdateAnswerUseCase {
  constructor(private answersRepo: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: UpdateAnswerUseCaseRequest): Promise<UpdateAnswerUseCaseResponse> {
    const answer = await this.answersRepo.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answersRepo.update(answer)

    return right(answer)
  }
}
