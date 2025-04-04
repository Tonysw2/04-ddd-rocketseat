import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
    return answers
  }

  async findById(answerId: string) {
    const answer = this.items.find((item) => item.id.toString() === answerId)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async update(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[answerIndex] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)
  }
}
