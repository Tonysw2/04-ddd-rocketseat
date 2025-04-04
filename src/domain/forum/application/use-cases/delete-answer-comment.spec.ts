import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'

describe('Delete Answer Comment', () => {
  let sut: DeleteAnswerCommentUseCase
  let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should delete a answer comment', async () => {
    const newAnswerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString(),
    })

    const answerComment = inMemoryAnswerCommentsRepository.items

    expect(answerComment).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another user', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await expect(
      sut.execute({
        authorId: 'author-2',
        answerCommentId: newAnswerComment.id.toString(),
      }),
    ).rejects.instanceOf(Error)
  })
})
