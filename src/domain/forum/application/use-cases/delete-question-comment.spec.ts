import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

describe('Delete Question Comment', () => {
  let sut: DeleteQuestionCommentUseCase
  let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString(),
    })

    const questionComment = inMemoryQuestionCommentsRepository.items

    expect(questionComment).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await expect(
      sut.execute({
        authorId: 'author-2',
        questionCommentId: newQuestionComment.id.toString(),
      }),
    ).rejects.instanceOf(Error)
  })
})
