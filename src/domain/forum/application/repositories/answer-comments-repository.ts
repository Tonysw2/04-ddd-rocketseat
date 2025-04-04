import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  findById(answerCommentId: string): Promise<AnswerComment | null>
  create(data: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
