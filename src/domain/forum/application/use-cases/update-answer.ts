import type { Answer } from '../../enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'

interface UpdateAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface UpdateAnswerUseCaseResponse {
  answer: Answer
}

export class UpdateAnswerUseCase {
  constructor(private answersRepo: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: UpdateAnswerUseCaseRequest): Promise<UpdateAnswerUseCaseResponse> {
    const answer = await this.answersRepo.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepo.update(answer)

    return {
      answer,
    }
  }
}
