import type { Answer } from '../entities/answer'

export interface AnswersRepository {
  create(data: Answer): Promise<void>
}
