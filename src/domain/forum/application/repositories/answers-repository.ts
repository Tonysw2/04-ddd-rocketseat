import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  findById(answerId: string): Promise<Answer | null>
  create(data: Answer): Promise<void>
  update(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
