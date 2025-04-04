import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
    return questionComments
  }

  async findById(commentId: string) {
    const comment = this.items.find((item) => item.id.toString() === commentId)
    if (!comment) {
      return null
    }
    return comment
  }

  async create(data: QuestionComment) {
    this.items.push(data)
  }

  async delete(questionComment: QuestionComment) {
    const questionCommentIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )
    this.items.splice(questionCommentIndex, 1)
  }
}
