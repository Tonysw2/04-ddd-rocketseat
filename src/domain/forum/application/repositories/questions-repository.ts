import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  fetchRecentQuestions(params: PaginationParams): Promise<Question[]>
  findById(questionId: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  update(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
