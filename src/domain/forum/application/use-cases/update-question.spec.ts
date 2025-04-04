import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UpdateQuestionUseCase } from './update-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: UpdateQuestionUseCase

describe('Update Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new UpdateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to update a question', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: 'Updated Title',
      content: 'Updated Content',
    })

    expect(question).toMatchObject({
      title: 'Updated Title',
      content: 'Updated Content',
    })
  })

  it('should not be able to update a question from another user', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'anotherUserId',
        title: 'Updated Title',
        content: 'Updated Content',
      }),
    ).rejects.instanceOf(Error)
  })

  it('should not be able to update a question with a wrong question id', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      sut.execute({
        questionId: 'wrong-question-id',
        authorId: newQuestion.authorId.toString(),
        title: 'Updated Title',
        content: 'Updated Content',
      }),
    ).rejects.instanceOf(Error)
  })
})
