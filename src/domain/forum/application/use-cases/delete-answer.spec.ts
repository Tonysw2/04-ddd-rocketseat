import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
    })

    const deletedAnswer = await inMemoryAnswersRepository.findById(
      answer.id.toString(),
    )

    expect(deletedAnswer).toBeNull()
  })

  it('should not be able to delete a answer from another user', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryAnswersRepository.create(answer)

    await expect(
      sut.execute({
        authorId: 'author-2',
        answerId: answer.id.toString(),
      }),
    ).rejects.instanceOf(Error)
  })
})
