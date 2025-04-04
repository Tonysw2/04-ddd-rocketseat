import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
    return answerComments
  }

  async findById(answerCommentId: string) {
    const answerComment = this.items.find(
      (item) => item.id.toString() === answerCommentId,
    )
    if (!answerComment) {
      return null
    }
    return answerComment
  }

  async create(data: AnswerComment): Promise<void> {
    this.items.push(data)
  }

  async delete(answerComment: AnswerComment) {
    const answerCommentIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )
    this.items.splice(answerCommentIndex, 1)
  }
}
