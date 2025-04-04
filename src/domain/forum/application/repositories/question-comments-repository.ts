import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  findById(questionCommentId: string): Promise<QuestionComment | null>
  create(data: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
