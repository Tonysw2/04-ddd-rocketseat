import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
    })

    const deletedQuestion = await inMemoryQuestionsRepository.findById(
      question.id.toString(),
    )
    expect(deletedQuestion).toBeNull()
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    await inMemoryQuestionsRepository.create(question)

    await expect(
      sut.execute({
        authorId: 'author-2',
        questionId: question.id.toString(),
      }),
    ).rejects.instanceOf(Error)
  })
})
